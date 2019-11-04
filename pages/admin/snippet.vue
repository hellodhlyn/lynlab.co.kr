<template>
  <authenticated id="admin-snippet" class="container mx-auto py-8">
    <div class="editor">
      <h4>제목</h4>
      <textarea v-model="snippet.title" rows="1" />
      <h4>본문</h4>
      <vue-simplemder v-model="snippet.body" rows="20" :configs="{ spellChecker: false }" />
      <input id="checkbox-is-public" v-model="snippet.isPublic" type="checkbox">
      <label for="checkbox-is-public">공개 여부</label>
    </div>

    <div class="actions">
      <button @click="submit()">
        작성
      </button>
    </div>
  </authenticated>
</template>

<style lang="scss" scoped>
.editor {
  textarea {
    font-family: inherit;
    width: 100%;
    font-size: 16px;
  }
}

.actions {
  padding: 10px 0;
  text-align: center;
}
</style>

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
