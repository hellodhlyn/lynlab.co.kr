<template>
  <div v-if="authenticated" id="admin-blog" class="container">
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
import 'simplemde/dist/simplemde.min.css';
import { query, mutation } from '../../components/lynlab-api';

export default {
  data() {
    return {
      authenticated: false,
      post: {},
    };
  },
  created() {
    const accessToken = this.$storage.getLocalStorage('auth.access_token');
    if (!accessToken) {
      this.$router.push({ name: 'redirects-auth' });
    } else {
      query('me { isAdmin }', accessToken).then((data) => {
        if (data.me.isAdmin) {
          this.authenticated = true;
        } else {
          this.$router.push({ name: 'redirects-auth' });
        }
      }).catch(() => this.$router.push({ name: 'redirects-auth' }));
    }
  },
  mounted() {
    const { id } = this.$route.query;
    if (id) {
      query(`post(id: ${id}) { thumbnailURL title description tagList { name } body isPublic }`, this.$storage.getLocalStorage('auth.access_token'))
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

      const token = this.$storage.getLocalStorage('auth.access_token');
      mutation(mutateStr, token)
        .then(() => this.$router.push({ name: 'admin' }));
    },
  },
};
</script>
