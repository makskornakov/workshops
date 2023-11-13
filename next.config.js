const withLinaria = require('next-with-linaria');

/** @type {import('next-with-linaria').LinariaConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
};

module.exports = withLinaria(nextConfig);
