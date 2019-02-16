<template>
  <div id="admin-blog" class="container">
    <div class="editor">
      <h4>제목</h4>
      <textarea rows="1" v-model="post.title"></textarea>
      <h4>요약</h4>
      <textarea rows="3" v-model="post.description"></textarea>
      <h4>썸네일</h4>
      <textarea rows="1" v-model="post.thumbnailURL"></textarea>
      <h4>본문</h4>
      <markdown-editor id="body" rows="20" v-model="post.body" v-bind:configs="{spellChecker: false}"></markdown-editor>
      <input type="checkbox" id="checkbox-is-public" v-model="post.isPublic">
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
    return { post: {} };
  },
  methods: {
    submit() {
      const input = `{
        title: "${this.post.title}"
        description: "${this.post.description}"
        body: """${this.post.body}"""
        thumbnailURL: "${this.post.thumbnailURL}"
        tagNameList: []
        isPublic: ${this.post.isPublic === true}
      }`;

      const { id } = this.$route.params;
      let mutateStr;
      if (id === 'new') {
        mutateStr = `createPost(input: ${input}) { id }`;
      } else {
        mutateStr = `updatePost(id: ${id}, input: ${input}) { id }`;
      }

      const token = this.$localStorage.get('auth.access_token');
      mutation(mutateStr, token)
        .then(() => this.$router.push({ name: 'admin' }));
    },
  },
  created() {
    if (!this.$localStorage.get('auth.access_token')) {
      this.$router.push('https://auth.lynlab.co.kr/web/signin?callback_url=https://lynlab.co.kr/callbacks/auth');
    }
  },
  mounted() {
    const { id } = this.$route.params;
    if (id !== 'new') {
      query(`post(id: ${id}) {
        thumbnailURL title description tagList { name } body isPublic
      }`).then((data) => { this.post = data.post; });
    }
  },
};
</script>
