'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { FileText, FilePlus, Eye, Edit, TrendingUp } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

interface Stats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
}

interface RecentPost {
    id: string;
    title: string;
    status: string;
    created_at: string;
}

export default function AdminDashboard() {
    const { profile } = useAuth();
    const [stats, setStats] = useState<Stats>({
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
    });
    const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats
            const { data: allPosts } = await supabase
                .from('posts')
                .select('id, status');

            if (allPosts) {
                setStats({
                    totalPosts: allPosts.length,
                    publishedPosts: allPosts.filter((p) => p.status === 'published').length,
                    draftPosts: allPosts.filter((p) => p.status === 'draft').length,
                });
            }

            // Fetch recent posts
            const { data: recent } = await supabase
                .from('posts')
                .select('id, title, status, created_at')
                .order('created_at', { ascending: false })
                .limit(5);

            if (recent) {
                setRecentPosts(recent);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            name: 'Total Posts',
            value: stats.totalPosts,
            icon: FileText,
            color: 'bg-blue-500',
        },
        {
            name: 'Published',
            value: stats.publishedPosts,
            icon: Eye,
            color: 'bg-green-500',
        },
        {
            name: 'Drafts',
            value: stats.draftPosts,
            icon: Edit,
            color: 'bg-yellow-500',
        },
    ];

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900">
                    Welcome back, {profile?.name || 'Admin'}!
                </h2>
                <p className="text-gray-600 mt-1">Here's an overview of your content</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/admin/posts/new"
                        className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                    >
                        <FilePlus className="h-8 w-8 text-blue-600 mr-4" />
                        <div>
                            <p className="font-medium text-gray-900">Create New Post</p>
                            <p className="text-sm text-gray-600">Start writing a new article</p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/posts"
                        className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200"
                    >
                        <FileText className="h-8 w-8 text-gray-600 mr-4" />
                        <div>
                            <p className="font-medium text-gray-900">Manage Posts</p>
                            <p className="text-sm text-gray-600">View and edit all posts</p>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Posts</h3>
                </div>
                <div className="divide-y divide-gray-200">
                    {recentPosts.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            No posts yet. Create your first post to get started!
                        </div>
                    ) : (
                        recentPosts.map((post) => (
                            <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">{post.title}</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formatDate(post.created_at)}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-4 ml-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${post.status === 'published'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                        <Link
                                            href={`/admin/posts/edit/${post.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Edit →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
