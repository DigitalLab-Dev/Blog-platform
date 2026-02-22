'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils/slugify';
import { generateExcerpt } from '@/lib/utils/excerpt';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { Save, Eye, ArrowLeft, Upload, Trash2 } from 'lucide-react';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const postId = params.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState<any>(null);
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [metaTitle, setMetaTitle] = useState('');
    const [metaDescription, setMetaDescription] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [publishedAt, setPublishedAt] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (postId) {
            fetchPost();
        }
    }, [postId]);

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', postId)
                .single();

            if (error) throw error;

            if (data) {
                setTitle(data.title);
                setSlug(data.slug);
                setContent(data.content);
                setExcerpt(data.excerpt || '');
                setFeaturedImage(data.featured_image || '');
                setMetaTitle(data.meta_title || '');
                setMetaDescription(data.meta_description || '');
                setStatus(data.status);
                setPublishedAt(data.published_at);
            }
        } catch (error: any) {
            alert('Failed to load post: ' + error.message);
            router.push('/admin/posts');
        } finally {
            setLoading(false);
        }
    };

    const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `blog-images/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('blog-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
            setFeaturedImage(data.publicUrl);
        } catch (error: any) {
            alert('Failed to upload image: ' + error.message);
        } finally {
            setUploadingImage(false);
        }
    };

    const handleEditorImageUpload = async () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `blog-images/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('blog-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage.from('blog-images').getPublicUrl(filePath);
                alert(`Image uploaded! URL: ${data.publicUrl}\n\nManually insert this URL in the editor for now.`);
            } catch (error: any) {
                alert('Failed to upload image: ' + error.message);
            }
        };

        input.click();
    };

    const handleUpdate = async (newStatus: 'draft' | 'published') => {
        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }

        setSaving(true);
        setStatus(newStatus);

        try {
            const finalExcerpt = excerpt || (content ? generateExcerpt(content.content) : '');

            const postData: any = {
                title,
                slug,
                content: content || { type: 'doc', content: [] },
                excerpt: finalExcerpt,
                featured_image: featuredImage || null,
                status: newStatus,
                meta_title: metaTitle || title,
                meta_description: metaDescription || finalExcerpt,
            };

            // If being published for the first time, or if already published but has no date
            if (newStatus === 'published' && !publishedAt) {
                postData.published_at = new Date().toISOString();
            }

            const { error } = await supabase
                .from('posts')
                .update(postData)
                .eq('id', postId);

            if (error) throw error;

            alert(`Post ${newStatus === 'published' ? 'published' : 'updated'} successfully!`);
            router.push('/admin/posts');
        } catch (error: any) {
            alert('Failed to update post: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
            return;
        }

        try {
            const { error } = await supabase.from('posts').delete().eq('id', postId);
            if (error) throw error;

            alert('Post deleted successfully!');
            router.push('/admin/posts');
        } catch (error: any) {
            alert('Failed to delete post: ' + error.message);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                    <h2 className="text-2xl font-bold text-gray-900">Edit Post</h2>
                </div>

                <div className="flex items-center space-x-3">
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                    >
                        <Trash2 className="h-4 w-4 inline mr-2" />
                        Delete
                    </button>
                    <button
                        onClick={() => handleUpdate('draft')}
                        disabled={saving}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleUpdate('published')}
                        disabled={saving}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        <Eye className="h-4 w-4 mr-2" />
                        {status === 'published' ? 'Update' : 'Publish'}
                    </button>
                </div>
            </div>

            {/* Main Content - Same as New Post */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Editor Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-3xl font-bold border-0 focus:ring-0 p-0 placeholder-gray-400"
                            placeholder="Enter post title..."
                            required
                        />
                    </div>

                    {/* Content Editor */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content
                        </label>
                        <RichTextEditor
                            content={content}
                            onChange={setContent}
                            onImageUpload={handleEditorImageUpload}
                        />
                    </div>
                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">
                    {/* Featured Image */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image
                        </label>
                        {featuredImage ? (
                            <div className="relative">
                                <img
                                    src={featuredImage}
                                    alt="Featured"
                                    className="w-full h-48 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => setFeaturedImage('')}
                                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-md text-xs"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 cursor-pointer">
                                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                <span className="text-sm text-gray-600">
                                    {uploadingImage ? 'Uploading...' : 'Click to upload'}
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFeaturedImageUpload}
                                    className="hidden"
                                    disabled={uploadingImage}
                                />
                            </label>
                        )}
                    </div>

                    {/* URL Slug */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            URL Slug *
                        </label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(slugify(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="post-url-slug"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            /blog/{slug || 'post-url-slug'}
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt
                        </label>
                        <textarea
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            placeholder="Short description"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {excerpt.length}/160 characters
                        </p>
                    </div>

                    {/* SEO Fields */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-900 mb-4">SEO Settings</h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                                    placeholder="SEO title"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {metaTitle.length}/60 characters
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Meta Description
                                </label>
                                <textarea
                                    value={metaDescription}
                                    onChange={(e) => setMetaDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm"
                                    placeholder="SEO description"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    {metaDescription.length}/160 characters
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
