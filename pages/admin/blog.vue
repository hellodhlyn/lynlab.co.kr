<template>
  <authenticated id="admin-blog" class="container">
    <div class="editor">
      <h4>제목</h4>
      <textarea v-model="post.title" rows="1" />
      <h4>요약</h4>
      <textarea v-model="post.description" rows="3" />
      <h4>썸네일</h4>
      <textarea v-model="post.thumbnailURL" rows="1" />
      <h4>본문</h4>
      <markdown-editor v-model="post.body" rows="20" :configs="{ spellChecker: false }" />
      <input id="checkbox-is-public" v-model="post.isPublic" type="checkbox">
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
      post: {},
    };
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      const token = this.$storage.getLocalStorage('auth.accessToken');
      query(`post(id: ${id}) { thumbnailURL title description tagList { name } body isPublic }`, token)
        .then((data) => { this.post = data.post; });
    }
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

      const { id } = this.$route.query;
      let mutateStr;
      if (!id) {
        mutateStr = `createPost(input: ${input}) { id }`;
      } else {
        mutateStr = `updatePost(id: ${id}, input: ${input}) { id }`;
      }

      const token = this.$storage.getLocalStorage('auth.accessToken');
      mutation(mutateStr, token)
        .then(() => this.$router.push({ name: 'admin' }));
    },
  },
};
</script>
