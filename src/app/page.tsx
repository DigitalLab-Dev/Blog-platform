import React from 'react';
import { supabaseAdmin } from '@/lib/supabase/server';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 60; // Revalidate every 60 seconds

async function getLatestPosts() {
  const { data: posts } = await supabaseAdmin
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(6);

  return posts || [];
}

export default async function HomePage() {
  const posts = await getLatestPosts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to The Blogtide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your go-to destination for insightful articles, expert opinions, and inspiring stories.
            Join our community of readers and discover content that matters.
          </p>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
            >
              View all posts
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No posts available yet. Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter to receive the latest articles and insights directly in your inbox.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
