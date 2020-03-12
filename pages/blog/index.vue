<template>
  <div id="blog" class="bg-gray-000">
    <div class="mx-auto container px-4 sm:px-8 pt-8">
      <p class="text-4xl text-gray-800 font-bold pb-8">
        Blog
        <a rel="alternate" type="application/rss+xml" href="/blog/feed" target="_blank">
          <span class="px-1 text-sm font-medium bg-orange-700 hover:bg-orange-800 text-gray-100 rounded cursor-pointer"><icon-text icon="logo-rss" text="RSS" /></span>
        </a>
      </p>
    </div>

    <div class="mx-auto container px-4 sm:px-8">
      <div v-if="posts.length === 0" class="flex flex-wrap justify-center">
        <div v-for="idx in [1, 2, 3]" :key="idx" class="w-full md:w-1/2 xl:w-1/3 mb-4">
          <div class="md:m-2 rounded-lg shadow-lg bg-white p-6">
            <vcl-facebook />
          </div>
        </div>
      </div>

      <div v-else class="flex flex-wrap justify-center">
        <div v-for="post in posts" :key="post.id" class="w-full md:w-1/2 xl:w-1/3 mb-4">
          <div class="md:m-2 rounded shadow-lg bg-white hover:bg-gray-000">
            <a :href="`/blog/${post.id}`">
              <img class="h-56 w-full object-cover rounded-t" :src="post.thumbnail_url || '/images/header.jpg'">
              <div class="h-56 md:h-64 p-4 overflow-y-hidden">
                <p class="text-sm">{{ post.tags.map((t) => `#${t.name}`).join(' ') }}</p>
                <p class="text-xl md:text-2xl font-bold text-gray-800">{{ post.title }}</p>

                <p class="py-2 md:py-4">{{ post.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="posts.length > 0" class="text-center my-8">
      <nuxt-link v-if="page > 1" :to="`?page=${page - 1}`">
        <button class="bg-gray-400 px-4 py-2 rounded font-bold">이전 페이지</button>
      </nuxt-link>
      <button v-else class="bg-gray-400 px-4 py-2 rounded font-bold opacity-50" disabled>이전 페이지</button>

      <nuxt-link v-if="!noMore" :to="`?page=${page + 1}`">
        <button class="bg-gray-400 px-4 py-2 rounded font-bold">다음 페이지</button>
      </nuxt-link>
      <button v-else class="bg-gray-400 px-4 py-2 rounded font-bold opacity-50" disabled>다음 페이지</button>
    </div>
  </div>
</template>

<script>
import { VclFacebook } from 'vue-content-loading';
import { query } from '../../components/lynlab-api';

export default {
  components: { VclFacebook },
  data() {
    return {
      posts: [],
      noMore: false,
      page: 1,
      perPage: 18,
    };
  },
  head() {
    return { title: 'Blog | LYnLab' };
  },
  watch: {
    '$route.query': function watchQuery() {
      this.fetchPosts();
      this.noMore = false;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      this.page = parseInt(this.$route.query.page || 1, 10);

      query(`posts(sort: "id:desc", limit: ${this.perPage}, start: ${(this.page - 1) * this.perPage}) {
        id thumbnail_url title description created_at tags{ name }
      }`).then((data) => {
        if (data.posts.length === 0) {
          this.noMore = true;
          return;
        }

        if (data.posts.length < this.perPage) {
          this.noMore = true;
        }
        this.posts = data.posts;
        window.scrollTo(0, 0);
      });
    },
  },
};
</script>
