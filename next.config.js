/** @type {import('next').NextConfig} */
const nextConfig = {
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
