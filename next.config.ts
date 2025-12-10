// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    // ESLint'i build sırasında devre dışı bırak
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [];
  },
};

module.exports = nextConfig;