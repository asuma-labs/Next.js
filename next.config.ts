import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "asuma.my.id",
      },
      {
        protocol: "https",
        hostname: "*.asuma.my.id",
      },
    ],
  },
};

export default nextConfig;
