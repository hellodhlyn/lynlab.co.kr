module.exports = {
  images: {
    domains: ['storage.lynlab.co.kr'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/blog',
        permanent: false,
        basePath: false,
      },
    ];
  },
};
