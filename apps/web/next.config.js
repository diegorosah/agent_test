/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@monorepo/ui', '@monorepo/shared-types'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

module.exports = nextConfig;
