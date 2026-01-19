import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**', // Allow all HTTPS domains for blog content images
      },
    ],
  },
  // Enable static export for better SEO
  output: 'standalone',
};

export default nextConfig;
