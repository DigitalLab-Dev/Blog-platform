import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navigation = {
        main: [
            { name: 'Home', href: '/' },
            { name: 'Blog', href: '/blog' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms & Conditions', href: '/terms' },
        ],
    };

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/' },
        { name: 'Twitter', icon: Twitter, href: 'https://www.twitter.com/' },
        { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/' },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo and Description */}
                    <div className="col-span-1">
                        <Image
                            src="/logo.png"
                            alt="The Blogtide"
                            width={240}
                            height={90}
                            className="h-16 w-auto mb-4"
                        />
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Your go-to destination for insightful articles, expert opinions, and inspiring stories.
                            Join our community of readers and discover content that matters.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="col-span-1">
                        <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {navigation.main.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal & Social */}
                    <div className="col-span-1">
                        <h3 className="text-gray-900 font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 mb-6">
                            {navigation.legal.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        className="text-gray-600 hover:text-gray-900 transition-colors"
                                        aria-label={social.name}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 mt-8 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} The Blogtide. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
