<template>
  <div id="admin-snippet" class="container">
    <div class="editor">
      <h4>제목</h4>
      <textarea v-model="snippet.title" rows="1" />
      <h4>본문</h4>
      <textarea v-model="snippet.body" rows="20" />
      <input id="checkbox-is-public" v-model="snippet.isPublic" type="checkbox">
      <label for="checkbox-is-public">공개 여부</label>
    </div>

    <div class="actions">
      <button @click="submit()">
        작성
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.editor {
  textarea {
    font-family: inherit;
    font-weight: 400;
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
    return { snippet: {} };
  },
  created() {
    if (!this.$storage.getLocalStorage('auth.access_token')) {
      this.$router.push({ name: 'redirects-auth' });
    }
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

      const token = this.$storage.getLocalStorage('auth.access_token');
      mutation(mutateStr, token)
        .then(() => this.$router.push({ name: 'admin' }));
    },
  },
};
</script>
