const pkg = require('./package');

const axios = require('axios');
const https = require('https');


module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'LYnLab',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: 'https://unpkg.com/ionicons@4.5.5/dist/ionicons.js' },
    ],
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/plugins',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-universal-storage',
    '@nuxtjs/google-analytics',
    '@nuxtjs/sitemap',
  ],

  storage: {
    localStorage: true,
  },

  googleAnalytics: {
    id: 'UA-51514713-1',
  },

  sitemap: {
    generate: true,
    exclude: [
      '/admin',
      '/admin/**',
      '/redirects/**',
      '/snippet/**',
    ],
    routes(callback) {
      const httpsAgent = new https.Agent({ rejectUnauthorized: false });
      axios.post(`https://apis.lynlab.co.kr/graphql`, 'query{postList(page:{count:999999}){items{id updatedAt}}}', { httpsAgent })
        .then(res => callback(null, res.data.data.postList.items.map(post => {
          return {
            url: `/blog/${post.id}`,
            changeFreq: 'weekly',
            lastmodISO: post.updatedAt,
          };
        })))
        .catch(e => callback(e));
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
};
