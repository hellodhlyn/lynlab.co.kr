<template>
  <authenticated id="admin-blog" class="container mx-auto px-4 md:px-8 py-8">
    <div>
      <p class="text-2xl">제목</p>
      <textarea v-model="post.title" class="w-full p-2 mt-2 mb-8 rounded border border-gray-300" rows="1" />
      <p class="text-2xl">요약</p>
      <textarea v-model="post.description" class="w-full p-2 mt-2 mb-8 rounded border border-gray-300" rows="3" />
      <p class="text-2xl">썸네일</p>
      <textarea v-model="post.thumbnailURL" class="w-full p-2 mt-2 mb-8 rounded border border-gray-300" rows="1" />
      <p class="text-2xl">본문</p>
      <vue-simplemde v-model="post.body" rows="20" :configs="{ spellChecker: false }" />
      <input id="checkbox-is-public" v-model="post.isPublic" type="checkbox">
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
