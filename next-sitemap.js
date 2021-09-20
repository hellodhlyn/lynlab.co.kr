module.exports = {
  siteUrl: process.env.SITE_URL || 'https://lynlab.co.kr',
  generateRobotsTxt: true,
  autoLastmod: false,
  exclude: [
    '/blog',
    '/about',
  ],
};
