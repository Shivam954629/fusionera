import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
