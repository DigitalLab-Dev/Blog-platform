import React from 'react';
import { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/server';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

export const metadata: Metadata = {
    title: 'Blog | The Blogtide',
    description: 'Explore all our articles, stories, and insights. Find content that inspires and informs.',
};

const POSTS_PER_PAGE = 10;

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}

async function getPosts(page: number) {
    const from = (page - 1) * POSTS_PER_PAGE;
    const to = from + POSTS_PER_PAGE - 1;

    const { data: posts, count } = await supabaseAdmin
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .range(from, to);

    return {
        posts: posts || [],
        totalCount: count || 0,
    };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const { posts, totalCount } = await getPosts(currentPage);
    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover insightful articles, expert opinions, and stories that inspire.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No posts available yet. Check back soon for new content!
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            basePath="/blog"
                        />
                    </>
                )}
            </div>
        </div>
    );
}
