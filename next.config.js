const withLinaria = require('next-with-linaria');

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // transpilePackages: ['@auth/prisma-adapter'],
};

module.exports = withLinaria(nextConfig);
