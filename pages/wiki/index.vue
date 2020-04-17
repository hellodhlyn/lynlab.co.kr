<template>
  <div id="wiki" class="flex justify-center items-center pb-64">
    <div class="text-center">
      <p class="text-4xl text-gray-800 font-bold">LYnLab Wiki</p>
      <form @submit.prevent="onSearch()">
        <p class="my-8 mb-4">
          <input v-model="title" type="search" class="w-11/12 p-2 border border-gray-300 focus:border-blue-300 focus:shadow-md rounded" placeholder="문서 찾기...">
        </p>
        <p>
          <button type="submit" class="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-gray-000 font-bold rounded">
            검색
          </button>
          <button type="button" class="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-gray-000 font-bold rounded" @click="onRandom()">
            무작위
          </button>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { queryWiki } from '../../components/lynlab-api';

export default {
  data() {
    return { title: '' };
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
  },
  head() {
    return { title: 'LYnLab Wiki' };
  },
};
</script>
