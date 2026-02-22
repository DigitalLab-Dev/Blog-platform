import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { supabaseAdmin } from '@/lib/supabase/server';
import BlogContent from '@/components/BlogContent';
import { Calendar } from 'lucide-react';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
    const { data: post } = await supabaseAdmin
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

    return post;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found | The Blogtide',
        };
    }

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.meta_title || post.title,
            description: post.meta_description || post.excerpt,
            type: 'article',
            publishedTime: post.published_at || post.created_at || new Date().toISOString(),
            images: post.featured_image ? [post.featured_image] : [],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
        notFound();
    }

    const formatDate = (date: string) => {
        const d = date ? new Date(date) : new Date();
        const validDate = isNaN(d.getTime()) ? new Date() : d;
        return validDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Schema.org JSON-LD
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.featured_image,
        datePublished: post.published_at || post.created_at || new Date().toISOString(),
        dateModified: post.updated_at || post.created_at || new Date().toISOString(),
        author: {
            '@type': 'Person',
            name: 'The Blogtide Team',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <article className="min-h-screen bg-white">
                {/* Article Header */}
                <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-6">
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                            <Calendar className="h-4 w-4 mr-2" />
                            <time dateTime={post.published_at || post.created_at}>
                                {formatDate(post.published_at || post.created_at)}
                            </time>
                        </div>
                        <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {post.title}
                        </h1>
                        {post.excerpt && (
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {post.excerpt}
                            </p>
                        )}
                    </div>

                    {post.featured_image && (
                        <div className="relative w-full h-96 rounded-lg overflow-hidden">
                            <Image
                                src={post.featured_image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}
                </header>

                {/* Article Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <BlogContent content={post.content} />
                </div>

                {/* Share Section */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-gray-200">
                    <p className="text-gray-600">Share this article:</p>
                    {/* Add social share buttons here */}
                </div>
            </article>
        </>
    );
}
