/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: "i.scdn.co",
          },
          {
            protocol: 'https',
            hostname: "t.scdn.co",
          },
          {
            protocol: 'https',
            hostname:"charts-images.scdn.co"
          }
        ],
      },
};

export default nextConfig;
