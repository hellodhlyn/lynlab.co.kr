module.exports = {
  images: {
    domains: ['storage.lynlab.co.kr'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://hello.dhlyn.me',
        permanent: true,
        basePath: false,
      },
    ];
  },
};
