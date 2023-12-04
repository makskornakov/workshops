const withLinaria = require('next-with-linaria');

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'lh3.googleusercontent.com'},
      { hostname: 'avatars.githubusercontent.com' },
      { hostname: 'utfs.io' }, // вроде utfs.io это и есть uploadthing
      { hostname: 'uploadthing.com' },
    ],
  },
  // transpilePackages: ['@auth/prisma-adapter'],
};

module.exports = withLinaria(nextConfig);
