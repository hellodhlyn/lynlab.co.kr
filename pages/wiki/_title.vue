<template>
  <div id="wiki-document">
    <form class="flex px-6 py-4 border-b border-gray-300" @submit.prevent="onSearch()">
      <div class="flex-grow w-3/4">
        <input v-model="searchTitle" type="search" placeholder="다른 문서 찾기...">
      </div>
      <button class="hover:underline">검색</button>
    </form>

    <div class="container max-w-4xl mx-auto p-4 md:p-8">
      <p class="text-4xl text-gray-800 font-bold">{{ title }}</p>
      <div v-if="document">
        <p v-if="document.lastRevision.description">
          {{ document.lastRevision.description }}
        </p>
        <div class="border-b border-gray-300 py-1" />

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="markdown-body" v-html="$options.filters.marked(document.lastRevision.body)" />
      </div>
      <div v-else>
        <div class="border-b border-gray-300 py-1" />
        <p class="py-8">문서를 찾을 수 없습니다 :(</p>
      </div>
    </div>
  </div>
</template>

<script>
import { queryWiki } from '../../components/lynlab-api';

export default {
  data() {
    return { searchTitle: '' };
  },
  async asyncData({ params, error }) {
    const queryString = `document(title: """${params.title}""") {
      lastRevision { description body }
    }`;

    try {
      return { title: params.title, ...await queryWiki(queryString) };
    } catch {
      error({ statusCode: 400, message: 'Failed to fetch the document' });
      return { title: params.title };
    }
  },
  head() {
    if (this.document) {
      return {
        title: `${this.title} | LYnLab Wiki`,
        meta: [
          { property: 'title', content: `${this.title} | LYnLab Wiki` },
          { property: 'description', content: this.document.lastRevision.description },
          { property: 'canonical', content: `https://lynlab.co.kr${this.$route.fullPath}` },
          { property: 'og:site_name', content: 'LYnLab' },
          { property: 'og:title', content: `${this.title} | LYnLab Wiki` },
          { property: 'og:description', content: this.document.lastRevision.description },
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: `https://lynlab.co.kr${this.$route.fullPath}` },
          { property: 'twitter:card', content: 'summary_large_image' },
          { property: 'twitter:site', content: '@hellodhlyn' },
          { property: 'twitter:creator', content: '@hellodhlyn' },
        ],
      };
    }

    return {
      title: `${this.title} | LYnLab Wiki`,
      meta: [
        { property: 'title', content: `${this.title} | LYnLab Wiki` },
        { property: 'og:title', content: `${this.title} | LYnLab Wiki` },
        { name: 'robots', content: 'noindex' },
      ],
    };
  },
  methods: {
    onSearch() {
      if (this.searchTitle) {
        this.$router.push({ name: 'wiki-title', params: { title: this.searchTitle } });
      }
    },
  },
};
</script>
