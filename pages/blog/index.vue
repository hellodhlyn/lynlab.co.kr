<template>
  <div id="blog" class="bg-white">
    <div class="mx-auto container px-4 sm:px-8 py-8 leading-relaxed">
      <p class="text-4xl">Posts</p>
      <div v-for="post in posts" :key="post.id" class="flex flex-col-reverse md:flex-row py-6">
        <div :class="post.thumbnailURL ? ['w-full', 'md:w-2/3'] : 'w-full'">
          <p class="text-xl md:text-3xl font-medium hover:underline">
            <nuxt-link :to="{ name: 'blog-id', params: { id: post.id } }">{{ post.title }}</nuxt-link>
          </p>
          <div class="flex flex-col md:flex-row py-2 text-sm md:text-base text-gray-600">
            <div>
              <icon-text class="mr-2" icon="time" :text="post.createdAt | moment('YYYY. MM. DD.')" />
              <icon-text class="mr-2" icon="people" :text="post.readCount.toString()" />
            </div>
            <div>
              <icon-text v-if="post.tagList.length > 0" icon="pricetag" :text="post.tagList.map((t) => `#${t.name}`).join(' ')" />
            </div>
          </div>
          <p class="md:mt-4">{{ post.description }}</p>
        </div>
        <img v-if="post.thumbnailURL" class="h-40 xl:h-56 mx-0 md:mx-4 mb-4 md:mb-0 w-full md:w-1/3 object-cover" :src="post.thumbnailURL">
      </div>
    </div>

    <div v-if="pageInfo" class="text-center my-8">
      <nuxt-link v-if="pageInfo.hasBefore" :to="`?after=${posts[0].id}`">
        <button class="bg-gray-400 px-4 py-2 rounded font-bold">이전 페이지</button>
      </nuxt-link>
      <button v-else class="bg-gray-400 px-4 py-2 rounded font-bold opacity-50" disabled>이전 페이지</button>

      <nuxt-link v-if="pageInfo.hasNext" :to="`?before=${posts[posts.length - 1].id}`">
        <button class="bg-gray-400 px-4 py-2 rounded font-bold">다음 페이지</button>
      </nuxt-link>
      <button v-else class="bg-gray-400 px-4 py-2 rounded font-bold opacity-50" disabled>다음 페이지</button>
    </div>
  </div>
</template>

<script>
import { query } from '../../components/lynlab-api';

export default {
  data() {
    return {
      posts: null,
      pageInfo: null,
    };
  },
  head() {
    return { title: 'Blog | LYnLab' };
  },
  watch: {
    '$route.query': function watchQuery() {
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      let pageArgs;
      if (this.$route.query.before != null) {
        pageArgs = `{ count: 15, before: ${this.$route.query.before} }`;
      } else if (this.$route.query.after) {
        pageArgs = `{ count: 15, after: ${this.$route.query.after}, sortDirection: ASC }`;
      } else {
        pageArgs = '{ count: 15 }';
      }

      query(`postList(page: ${pageArgs}) { 
        items { id thumbnailURL title description readCount createdAt tagList { name } }
        pageInfo { hasBefore hasNext }
      }`).then((data) => {
        this.posts = data.postList.items;
        this.pageInfo = data.postList.pageInfo;
        if (this.$route.query.after) {
          this.posts.reverse();
          this.pageInfo = {
            hasBefore: this.pageInfo.hasNext,
            hasNext: this.pageInfo.hasBefore,
          };
        }

        window.scrollTo(0, 0);
      });
    },
  },
};
</script>
