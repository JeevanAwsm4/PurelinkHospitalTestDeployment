/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['https://api.purelink.in'], // ✅ Allow image loading from localhost
  },
  transpilePackages: ["@amcharts/amcharts4"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
export default nextConfig;
