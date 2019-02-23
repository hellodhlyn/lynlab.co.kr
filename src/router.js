import Vue from 'vue';
import Router from 'vue-router';

import Admin from './views/admin/Admin.vue';
import AdminBlog from './views/admin/Blog.vue';
import AdminSnippet from './views/admin/Snippet.vue';

import Blog from './views/blog/Blog.vue';
import BlogPost from './views/blog/BlogPost.vue';
import Snippet from './views/snippet/Snippet.vue';

import CallbackAuth from './callbacks/Auth.vue';
import RedirectAuth from './views/RedirectAuth.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Views
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
      path: '/snippet/:title',
      name: 'snippet',
      component: Snippet,
    },

    // Admin
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
      path: '/admin/snippet/:title',
      name: 'admin-snippet',
      component: AdminSnippet,
    },

    // Callbacks
    {
      path: '/callbacks/auth',
      name: 'callbacks-auth',
      component: CallbackAuth,
    },

    // Redirects
    {
      path: '/redirects/auth',
      name: 'redirects-auth',
      component: RedirectAuth,
    },
  ],
});
