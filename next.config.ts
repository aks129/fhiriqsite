import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/mappingguide',
        destination: '/mappingguide/index.html',
      },
    ];
  },
};

export default nextConfig;
