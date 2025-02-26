/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@amcharts/amcharts4"],
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
