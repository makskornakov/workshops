const withLinaria = require('next-with-linaria');

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'utfs.io'],
  },
  // transpilePackages: ['@auth/prisma-adapter'],
};

module.exports = withLinaria(nextConfig);
