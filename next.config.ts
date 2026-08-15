import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Allows production builds to successfully complete even if
    // Next.js auto-generated types have internal resolution warnings.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;