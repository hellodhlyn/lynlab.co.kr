<template>
  <div id="blog-post">
    <div class="h-screen-35 md:h-screen-half w-full mx-auto bg-center bg-cover shadow-lg" :style="`background-image: url('${(post && post.thumbnail_url) || '/images/header.jpg'}')`" />

    <div class="container max-w-4xl px-2 lg:px-0 -mt-20 mx-auto leading-relaxed md:leading-loose">
      <div class="p-4 md:p-8 bg-white border border-gray-200">
        <div class="mb-4">
          <p class="text-xl md:text-2xl font-bold">{{ post.title }}</p>
          <p class="text-normal md:text-lg text-gray-700">{{ post.description }}</p>
        </div>
        <p class="text-sm">
          <icon-text class="mr-2" icon="time" :text="post.created_at | moment('YYYY. MM. DD.')" />
          <icon-text v-if="post.tags.length > 0" icon="pricetag" :text="post.tags.map((t) => `#${t.name}`).join(' ')" />
        </p>
      </div>
    </div>

    <div class="container max-w-4xl mx-auto p-4 md:p-8">
      <div v-if="post.language_group" class="text-sm md:text-base mb-8 p-2 md:p-4 border-t border-b border-gray-300 leading-loose">
        <p v-for="langPost in post.language_group.posts.filter((p) => p.language !== post.language)" :key="langPost.id">
          <span v-if="langPost.language === 'ko'">
            이 포스트는 <nuxt-link :to="{ name: 'blog-id', params: { id: langPost.id } }" class="text-blue-600 hover:underline">한국어</nuxt-link>로도 읽을 수 있습니다.
          </span>
          <span v-if="langPost.language === 'en'">
            You can read this post in <nuxt-link :to="{ name: 'blog-id', params: { id: langPost.id } }" class="text-blue-600 hover:underline">English</nuxt-link>.
          </span>
          <span v-if="langPost.language === 'ja'">
            このポストは<nuxt-link :to="{ name: 'blog-id', params: { id: langPost.id } }" class="text-blue-600 hover:underline">日本語</nuxt-link>でも書いています。
          </span>
        </p>
      </div>

      <div v-if="post.series" class="text-sm md:text-base mb-8 p-2 md:p-4 border-t border-b border-gray-300 leading-loose">
        <p class="pb-2 font-bold">"{{ post.series.name }}" 시리즈 글</p>
        <ul class="list-disc list-inside">
          <li v-for="seriesPost in post.series.posts" :key="seriesPost.id">
            <nuxt-link v-if="post.id !== seriesPost.id" class="text-blue-600 hover:underline" :to="`/blog/${seriesPost.id}`">{{ seriesPost.title }}</nuxt-link>
            <span v-else>{{ seriesPost.title }} (현재 글)</span>
          </li>
        </ul>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="markdown-body" v-html="$options.filters.marked(post.body)" />
    </div>

    <div v-if="relatedPosts.length > 0" class="py-8 px-4 mt-8 md:px-8 bg-gray-900 text-gray-000">
      <div class="container max-w-4xl mx-auto">
        <p class="pb-4 text-2xl font-bold">관련 포스트</p>
        <div
          v-for="relatedPost in relatedPosts"
          :key="relatedPost.id"
          class="h-32 md:h-48 w-full bg-cover bg-center rounded my-2 hover:opacity-75"
          :style="`background-image: url('${(relatedPost.thumbnail_url) || '/images/header.jpg'}')`"
        >
          <nuxt-link :to="`/blog/${relatedPost.id}`">
            <div class="h-full w-full relative">
              <div class="absolute h-full w-full bg-black opacity-50" />
              <div class="absolute h-full w-full flex justify-center">
                <p class="self-center px-4 font-bold md:text-xl">{{ relatedPost.title }}</p>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>

    <div class="container max-w-4xl mx-auto mt-16 p-4 bg-white border border-gray-300 rounded">
      <VueDisqus shortname="lynlab" :url="'https://lynlab.co.kr' + this.$route.fullPath" />
    </div>

    <div class="container max-w-4xl mx-auto px-4 py-16 text-center text-xs">
      <img class="mx-auto" alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png">
      <p class="py-2">이 저작물은 <a class="text-blue-600 hover:underline" href="https://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0</a> 국제 라이선스에 따라 이용할 수 있습니다. </p>
      <p>© 2011 - {{ 1900 + new Date().getYear() }} Do Hoerin, LYnLab</p>
    </div>
  </div>
</template>

<script>
import { queryCms } from '../../components/lynlab-api';

export default {
  data() {
    return { relatedPosts: [] };
  },
  async asyncData({ params, error }) {
    const data = await queryCms(`post(id: ${params.id}) {
      id thumbnail_url title description created_at body language
      tags { id name }
      series { name posts { id title thumbnail_url } }
      language_group { posts { id language } }
    }`);

    if (!data.post) {
      error({ statusCode: 404, message: 'Post not found' });
      return null;
    }

    return { post: data.post };
  },
  head() {
    return {
      title: `${this.post.title} | LYnLab`,
      meta: [
        { property: 'title', content: `${this.post.title} | LYnLab` },
        { property: 'description', content: this.post.description },
        { property: 'canonical', content: `https://lynlab.co.kr${this.$route.fullPath}` },
        { property: 'og:site_name', content: 'LYnLab' },
        { property: 'og:title', content: `${this.post.title} | LYnLab` },
        { property: 'og:description', content: this.post.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:image', content: this.post.thumbnail_url },
        { property: 'og:url', content: `https://lynlab.co.kr${this.$route.fullPath}` },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:site', content: '@hellodhlyn' },
        { property: 'twitter:creator', content: '@hellodhlyn' },
      ],
    };
  },
  async mounted() {
    await this.fetchRelatedPosts();
  },
  methods: {
    async fetchRelatedPosts() {
      const maxRelatedPost = 3;

      let posts = [];
      if (this.post.series) {
        posts = this.post.series.posts.filter((p) => p.id !== this.post.id);
      }
      if (posts.length < maxRelatedPost && this.post.tags.length > 0) {
        const data = await queryCms(`posts(sort: "id:desc", where: {
          tags_in: [${this.post.tags.map((p) => p.id).join(', ')}],
          id_nin: [${[...posts.map((p) => p.id), this.post.id].join(', ')}]
        }) { id title thumbnail_url }`);
        posts = [...posts, ...data.posts];
      }

      this.relatedPosts = posts.slice(0, Math.min(maxRelatedPost, posts.length));
    },
  },
};
</script>
