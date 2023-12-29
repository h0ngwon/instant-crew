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
        ],
        domains: ['rummvqozlgllyttgdnqh.supabase.co'],
    },
};

module.exports = nextConfig;
