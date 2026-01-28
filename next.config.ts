import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure compatibility with Vercel
  reactStrictMode: true,
  // Disable turbopack for Vercel builds if needed
  experimental: {},
};

export default nextConfig;
