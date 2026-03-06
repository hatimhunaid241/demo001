/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "exyrxjlxax0fnljb.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
