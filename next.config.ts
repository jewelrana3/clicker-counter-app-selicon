import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore
    allowedDevOrigins: ["http://10.10.7.54:3000", "http://localhost:3000"],
  },
};

export default nextConfig;
