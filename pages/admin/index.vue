<template>
  <authenticated id="admin" class="container mx-auto px-4 md:px-8 py-8">
    <div class="mb-8">
      <p class="text-4xl">블로그 포스트 관리</p>
      <div class="text-right">
        <nuxt-link :to="{ name: 'admin-blog' }">
          <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white">새 글 작성하기</button>
        </nuxt-link>
      </div>
      <table class="w-full table-auto">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="py-2">#</th>
            <th class="py-2">제목</th>
            <th class="py-2">작성일</th>
            <th class="py-2">공개</th>
            <th class="py-2">동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id" class="hover:bg-gray-100">
            <td class="py-1">{{ post.id }}</td>
            <td class="py-1">
              <nuxt-link class="hover:underline" :to="{ name: 'blog-id', params: { id: post.id } }">
                {{ post.title }}
              </nuxt-link>
            </td>
            <td class="py-1">{{ post.createdAt | moment('LL') }}</td>
            <td class="py-1"><ion-icon v-if="!post.isPublic" name="lock" /></td>
            <td class="py-1">
              <nuxt-link :to="{ name: 'admin-blog', query: { id: post.id } }">
                <ion-icon name="create" />
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="postPageInfo" class="text-center">
        <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white" :disabled="!postPageInfo.hasBefore" @click="fetchPosts(null, posts[0].id)">
          이전 페이지
        </button>
        <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white" :disabled="!postPageInfo.hasNext" @click="fetchPosts(posts[posts.length - 1].id)">
          다음 페이지
        </button>
      </div>
    </div>

    <div id="snippet">
      <h1 class="text-4xl">스니펫 관리</h1>
      <div class="text-right">
        <nuxt-link class="hover:underline" :to="{ name: 'admin-snippet'}">
          <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white">새 스니펫 작성하기</button>
        </nuxt-link>
      </div>
      <table class="w-full table-auto">
        <thead>
          <tr class="border-b border-gray-300">
            <th class="py-2">제목</th>
            <th class="py-2">작성일</th>
            <th class="py-2">공개</th>
            <th class="py-2">동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="snippet in snippets" :key="snippet.title" class="hover:bg-gray-100">
            <td class="py-1">
              <nuxt-link class="hover:underline" :to="{ name: 'snippet-title', params: { title: snippet.title } }">
                {{ snippet.title }}
              </nuxt-link>
            </td>
            <td class="py-1">{{ snippet.createdAt | moment('LL') }}</td>
            <td class="py-1"><ion-icon v-if="!snippet.isPublic" name="lock" /></td>
            <td class="py-1">
              <nuxt-link :to="{ name: 'admin-snippet', query: { title: snippet.title } }">
                <ion-icon name="create" />
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="snippetPageInfo" class="text-center">
        <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white" :disabled="!snippetPageInfo.hasBefore" @click="fetchSnippets(null, snippets[0].id)">
          이전 페이지
        </button>
        <button class="px-4 py-2 my-2 rounded bg-gray-900 hover:bg-gray-700 text-white" :disabled="!snippetPageInfo.hasNext" @click="fetchSnippets(snippets[snippets.length - 1].id)">
          다음 페이지
        </button>
      </div>
    </div>
  </authenticated>
</template>

<script>
import { query } from '../../components/lynlab-api';

export default {
  data() {
    return {
      posts: [],
      postPageInfo: null,
      snippets: [],
      snippetPageInfo: null,
    };
  },
  mounted() {
    this.fetchPosts();
    this.fetchSnippets();
  },
  methods: {
    fetchPosts(before, after) {
      let pageArgs;
      if (before != null) {
        pageArgs = `{ count: 15, before: ${before} }`;
      } else if (after) {
        pageArgs = `{ count: 15, after: ${after} }`;
      } else {
        pageArgs = '{ count: 15 }';
      }

      query(`postList(page: ${pageArgs}) { 
        items { id title createdAt isPublic }
        pageInfo { hasBefore hasNext }
      }`, this.$storage.getLocalStorage('auth.accessToken')).then((data) => {
        this.posts = data.postList.items;
        this.postPageInfo = data.postList.pageInfo;
      });
    },
    fetchSnippets(before, after) {
      let pageArgs;
      if (before != null) {
        pageArgs = `{ count: 15, before: ${before} }`;
      } else if (after) {
        pageArgs = `{ count: 15, after: ${after} }`;
      } else {
        pageArgs = '{ count: 15 }';
      }

      query(`snippetList(page: ${pageArgs}) { 
        items { id title createdAt isPublic }
        pageInfo { hasBefore hasNext }
      }`, this.$storage.getLocalStorage('auth.accessToken')).then((data) => {
        this.snippets = data.snippetList.items;
        this.snippetPageInfo = data.snippetList.pageInfo;
      });
    },
  },
};
</script>
