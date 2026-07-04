import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["html5-qrcode", "@resvg/resvg-js", "satori"],
};

export default nextConfig;
