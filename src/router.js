import Vue from 'vue';
import Router from 'vue-router';

import Admin from './views/admin/Admin.vue';
import AdminBlog from './views/admin/Blog.vue';

import Blog from './views/blog/Blog.vue';
import BlogPost from './views/blog/BlogPost.vue';

import CallbackAuth from './callbacks/Auth.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
    },
    {
      path: '/admin/blog/:id',
      name: 'admin-blog',
      component: AdminBlog,
    },
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
    {
      path: '/callbacks/auth',
      name: 'callbacks-auth',
      component: CallbackAuth,
    },
  ],
});
