/** @type {import('next').NextConfig} */
const nextConfig = {
  // nextjs won't fetch ImageUrls from backend if we don't specify the hostname
  images: {
    remotePatterns: [
      {
        hostname: "localhost",
      },
    ],
  },
  // for better and more complete url fetch logs (with cache status)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
