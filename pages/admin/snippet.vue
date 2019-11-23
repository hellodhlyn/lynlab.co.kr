<template>
  <authenticated id="admin-snippet" class="container mx-auto px-4 md:px-8 py-8">
    <div>
      <p class="text-2xl">제목</p>
      <textarea v-model="snippet.title" class="w-full p-2 mt-2 mb-8 rounded border border-gray-300" rows="1" />
      <p class="text-2xl">본문</p>
      <vue-simplemde v-model="snippet.body" rows="20" :configs="{ spellChecker: false }" />
      <input id="checkbox-is-public" v-model="snippet.isPublic" type="checkbox">
      <label for="checkbox-is-public">공개 여부</label>
    </div>

    <div class="text-center">
      <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white" @click="submit()">
        작성
      </button>
    </div>
  </authenticated>
</template>

<script>
import { query, mutation } from '../../components/lynlab-api';

export default {
  data() {
    return {
      snippet: {},
    };
  },
  mounted() {
    const { title } = this.$route.query;
    if (title) {
      query(`snippet(title: "${title}") {
        id title body isPublic
      }`).then((data) => { this.snippet = data.snippet; });
    }
  },
  methods: {
    submit() {
      let mutateStr;
      if (!this.snippet.id) {
        mutateStr = `createSnippet(input: {
          title: "${this.snippet.title}"
          body: """${this.snippet.body}"""
          isPublic: ${this.snippet.isPublic === true}
        }) { id }`;
      } else {
        mutateStr = `updateSnippet(id: ${this.snippet.id}, input: {
          body: """${this.snippet.body}"""
        }) { id }`;
      }

      const token = this.$storage.getLocalStorage('auth.accessToken');
      mutation(mutateStr, token)
        .then(() => this.$router.push({ name: 'admin' }));
    },
  },
};
</script>
