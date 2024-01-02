/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.cdn-hotels.com',
            },
            {
                protocol: 'https',
                hostname: 'rummvqozlgllyttgdnqh.supabase.co',
            },
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            }
        ],
        domains: ['rummvqozlgllyttgdnqh.supabase.co', 'localhost', 'lh3.googleusercontent.com'],
    },
};

module.exports = nextConfig;
