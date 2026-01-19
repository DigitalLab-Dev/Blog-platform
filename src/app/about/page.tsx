import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us | The Blogtide',
    description: 'Learn more about The Blogtide - our mission, vision, and the team behind our content.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">About Us</h1>

                <div className="prose prose-lg max-w-none">
                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Who We Are</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Welcome to The Blogtide, your trusted source for insightful articles, expert opinions,
                            and inspiring stories. We are a passionate team of writers, editors, and content creators
                            dedicated to bringing you high-quality content that informs, educates, and entertains.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Founded with the mission to create a platform where ideas flow freely and knowledge is
                            shared generously, The Blogtide has grown into a community of readers and contributors
                            who value thoughtful discourse and meaningful content.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our mission is simple yet profound: to provide a space where quality content meets
                            curious minds. We strive to:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>Deliver well-researched, accurate, and engaging articles</li>
                            <li>Foster meaningful discussions and diverse perspectives</li>
                            <li>Support and promote talented writers and content creators</li>
                            <li>Build a community centered around learning and growth</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">What We Cover</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our content spans a wide range of topics, ensuring there's something for everyone:
                        </p>
                        <ul className="list-disc ml-6 text-gray-700 space-y-2">
                            <li>Technology and innovation</li>
                            <li>Business and entrepreneurship</li>
                            <li>Personal development and productivity</li>
                            <li>Health and wellness</li>
                            <li>Arts, culture, and lifestyle</li>
                            <li>And much more...</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Join Our Community</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            We believe in the power of community and invite you to become part of The Blogtide family.
                            Whether you're a regular reader, occasional visitor, or aspiring contributor, we welcome you
                            and value your presence.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Stay connected with us through our newsletter, social media channels, or reach out directly
                            through our contact page. Your feedback, suggestions, and stories help us grow and improve.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
