




const nextConfig = {
  transpilePackages: ["@amcharts/amcharts4"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
export default nextConfig;
const a = `
/** @type {import('next').NextConfig} */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};
`;
