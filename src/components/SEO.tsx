import React from 'react';
import Head from 'next/head';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
}

export default function SEO({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    publishedTime,
    modifiedTime,
    author,
}: SEOProps) {
    const siteName = 'The Blogtide';
    const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
    const canonicalUrl = canonical || siteUrl;
    const defaultImage = `${siteUrl}/logo.jpg`;

    return (
        <>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph */}
            <meta property="og:site_name" content={siteName} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={ogImage || defaultImage} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage || defaultImage} />

            {/* Article specific */}
            {ogType === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {ogType === 'article' && modifiedTime && (
                <meta property="article:modified_time" content={modifiedTime} />
            )}
            {ogType === 'article' && author && (
                <meta property="article:author" content={author} />
            )}
        </>
    );
}
