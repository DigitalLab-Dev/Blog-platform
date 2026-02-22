import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
    post: {
        id: string;
        title: string;
        slug: string;
        excerpt: string;
        featured_image?: string;
        published_at: string | null;
        created_at: string;
        author_id: string;
    };
}

export default function BlogCard({ post }: BlogCardProps) {
    const formatDate = (date: string | null) => {
        if (!date) return '';
        const d = new Date(date);
        // Check if date is valid
        if (isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <article className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            {post.featured_image && (
                <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-48 w-full">
                        <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                </Link>
            )}

            <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-1" />
                    <time dateTime={post.published_at || post.created_at}>
                        {formatDate(post.published_at || post.created_at)}
                    </time>
                </div>

                <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>

                <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
                >
                    Read more
                    <span className="ml-1">→</span>
                </Link>
            </div>
        </article>
    );
}
