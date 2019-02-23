<template>
  <div id="admin-snippet" class="container">
    <div class="editor">
      <h4>제목</h4>
      <textarea rows="1" v-model="snippet.title"></textarea>
      <h4>본문</h4>
      <markdown-editor id="body" rows="20" v-model="snippet.body" v-bind:configs="{spellChecker: false}"></markdown-editor>
      <input type="checkbox" id="checkbox-is-public" v-model="snippet.isPublic">
      <label for="checkbox-is-public">공개 여부</label>
    </div>

    <div class="actions">
      <button v-on:click="submit()">작성</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~simplemde/dist/simplemde.min.css';

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

<style lang="scss">
.CodeMirror { height: 600px; }
</style>

<script>
import { query, mutation } from '@/lynlab-api';

export default {
  data() {
    return { snippet: {} };
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

      const token = this.$localStorage.get('auth.access_token');
      mutation(mutateStr, token)
        .then(() => this.$router.push({ name: 'admin' }));
    },
  },
  created() {
    if (!this.$localStorage.get('auth.access_token')) {
      this.$router.push({ name: 'redirects-auth' });
    }
  },
  mounted() {
    const { title } = this.$route.params;
    if (title !== 'new') {
      query(`snippet(title: "${title}") {
        id title body isPublic
      }`).then((data) => { this.snippet = data.snippet; });
    }
  },
};
</script>
