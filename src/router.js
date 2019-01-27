import Vue from 'vue';
import Router from 'vue-router';
import Blog from './views/Blog.vue';
import BlogPost from './views/BlogPost.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
    },
    {
      path: '/blog/:id',
      name: 'blog-post',
      component: BlogPost,
    },
  ],
});
