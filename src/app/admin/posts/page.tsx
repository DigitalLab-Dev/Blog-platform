'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { FilePlus, Edit, Trash2, Eye } from 'lucide-react';

interface Post {
    id: string;
    title: string;
    slug: string;
    status: string;
    created_at: string;
    published_at: string | null;
}

export default function PostsManagementPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');
    const router = useRouter();

    useEffect(() => {
        fetchPosts();
    }, [filter]);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from('posts')
                .select('id, title, slug, status, created_at, published_at')
                .order('created_at', { ascending: false });

            if (filter !== 'all') {
                query = query.eq('status', filter);
            }

            const { data, error } = await query;

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        try {
            const { error } = await supabase.from('posts').delete().eq('id', id);

            if (error) throw error;

            // Refresh the list
            fetchPosts();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post. You may need admin privileges.');
        }
    };

    const formatDate = (date: string | null) => {
        if (!date) return 'Not published';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">All Posts</h2>
                    <p className="text-gray-600 mt-1">Manage your blog posts</p>
                </div>
                <Link
                    href="/admin/posts/new"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <FilePlus className="h-5 w-5 mr-2" />
                    New Post
                </Link>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
                <div className="flex space-x-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${filter === 'all'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        All ({posts.length})
                    </button>
                    <button
                        onClick={() => setFilter('published')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${filter === 'published'
                                ? 'bg-green-100 text-green-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Published
                    </button>
                    <button
                        onClick={() => setFilter('draft')}
                        className={`px-4 py-2 rounded-md font-medium transition-colors ${filter === 'draft'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        Drafts
                    </button>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="text-gray-600 mt-4">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-500">No posts found.</p>
                        <Link
                            href="/admin/posts/new"
                            className="text-blue-600 hover:text-blue-800 font-medium mt-2 inline-block"
                        >
                            Create your first post →
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {posts.map((post) => (
                                    <tr key={post.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">{post.title}</p>
                                                <p className="text-sm text-gray-500">/{post.slug}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${post.status === 'published'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                            >
                                                {post.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(post.published_at || post.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                {post.status === 'published' && (
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        target="_blank"
                                                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                                        title="View"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                )}
                                                <Link
                                                    href={`/admin/posts/edit/${post.id}`}
                                                    className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post.id, post.title)}
                                                    className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
