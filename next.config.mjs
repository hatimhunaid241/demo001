/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100mb",
    },
  },
  experimental: {
    proxyClientMaxBodySize: '100mb',
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exyrxjlxax0fnljb.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
