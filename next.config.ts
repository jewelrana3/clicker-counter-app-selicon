import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    // @ts-ignore
    allowedDevOrigins: ["http://10.10.7.54:3000", "http://localhost:3000"],
  },
};

export default nextConfig;
