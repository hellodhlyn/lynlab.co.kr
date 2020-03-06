const axios = require('axios');
const marked = require('marked');

const pkg = require('./package');


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
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/styles/default.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700&subset=korean' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
      { rel: 'alternate', type: 'application/rss+xml', href: 'https://lynlab.co.kr/blog/feed' },
    ],
    script: [
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.13.1/highlight.min.js' },
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
    '~/plugins/simplemde.client.js',
  ],

  /*
  ** Nuxt.js modules
  */
  buildModules: [
    '@nuxtjs/google-analytics',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/universal-storage',
  ],

  googleAnalytics: {
    id: 'UA-51514713-1',
  },

  sitemap: {
    exclude: [
      '/redirects/**',
      '/snippet/**',
    ],
    routes(callback) {
      axios.get('https://cms.lynlab.co.kr/graphql?query=query{posts(limit:9999){id updated_at}}')
        .then((res) => callback(null, res.data.data.posts.map((post) => ({
          url: `/blog/${post.id}`,
          changefreq: 'weekly',
          lastmod: post.updated_at,
        }))))
        .catch((e) => callback(e));
    },
  },

  feed: [
    {
      path: '/blog/feed',
      async create(feed) {
        // eslint-disable-next-line no-param-reassign
        feed.options = {
          title: 'LYnLab Blog',
          link: 'https://lynlab.co.kr/blog',
          description: 'Stories about programming and software development',
          favicon: 'https://lynlab.co.kr/favicon.ico',
        };

        const res = await axios.get('https://cms.lynlab.co.kr/graphql?query=query{posts(limit:9999){id title description thumbnail_url body created_at}}');
        res.data.data.posts
          .sort((a, b) => b.id - a.id)
          // eslint-disable-next-line array-callback-return
          .map((post) => {
            const item = {
              title: post.title,
              id: `https://lynlab.co.kr/blog/${post.id}`,
              link: `https://lynlab.co.kr/blog/${post.id}`,
              description: post.description,
              content: marked(post.body),
              author: { name: 'Do Hoerin', email: 'lyn@lynlab.co.kr', link: 'https://lynlab.co.kr' },
              date: new Date(post.created_at),
              image: post.thumbnail_url || null,
            };

            feed.addItem(item);
          });

        ['programming', 'software', 'development', 'IT'].forEach((it) => feed.addCategory(it));
      },
      cacheTime: 10 * 60 * 1000,
      type: 'rss2',
    },
  ],

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
