/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.cdn-hotels.com',
            },
        ],
    },
};

module.exports = nextConfig;
