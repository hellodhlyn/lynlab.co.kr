<template>
  <div id="wiki" class="bg-gray-000 text-gray-800">
    <div class="container max-w-lg mx-auto px-4 pt-16 md:pt-48">
      <p class="text-4xl md:text-6xl py-4 font-bold tracking-widest">WIKI:</p>

      <form @submit.prevent="onSearch()">
        <div class="p-4 flex flex-row items center border-4 border-gray-800 rounded-lg">
          <div class="text-lg md:text-2xl"><ion-icon name="search" /></div>
          <input v-model="title" type="search" class="w-full px-2 text-lg md:text-xl bg-transparent" placeholder="문서 찾기...">
        </div>
        <div class="w-full p-4 text-center">
          <button type="submit" class="px-12 py-2 bg-blue-500 hover:bg-blue-600 text-gray-000 font-bold rounded">검색</button>
          <button type="button" class="px-10 py-2 bg-gray-500 hover:bg-gray-600 text-gray-000 font-bold rounded" @click="onRandom()">무작위</button>
        </div>
      </form>

      <div class="mt-4 py-4 border-t border-gray-300">
        <p class="font-bold">최근 업데이트</p>
        <p class="text-gray-700">
          <span v-for="t in recentTitles" :key="t" class="mr-2 underline whitespace-no-wrap">
            <nuxt-link :to="{ name: 'wiki-title', params: { title: t } }">{{ t }}</nuxt-link>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { queryWiki } from '../../components/lynlab-api';

export default {
  data() {
    return { title: '', recentTitles: [] };
  },
  mounted() {
    this.loadRecentRevisions();
  },
  methods: {
    onSearch() {
      if (this.title) {
        this.$router.push({ name: 'wiki-title', params: { title: this.title } });
      }
    },
    async onRandom() {
      const { randomDocument } = await queryWiki('randomDocument { title }');
      this.$router.push({ name: 'wiki-title', params: { title: randomDocument.title } });
    },
    async loadRecentRevisions() {
      const { revisions } = await queryWiki('revisions(last: 10) { edges { node { document { title createdAt } } } }');
      const titles = revisions.edges
        .map((edge) => edge.node.document)
        .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
        .map((doc) => doc.title);

      this.recentTitles = [...new Set(titles)];
    },
  },
  head() {
    return { title: 'LYnLab Wiki' };
  },
};
</script>
