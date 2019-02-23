<template>
  <div id="admin" class="container">
    <div id="blog">
      <h1>블로그 포스트 관리</h1>
      <div class="actions buttons">
        <router-link :to="{ name: 'admin-blog', params: { id: 'new' } }">
          <button>새 글 작성하기</button>
        </router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성일</th>
            <th>공개</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" v-bind:key="post.id">
            <td>{{ post.id }}</td>
            <td><router-link :to="{ name: 'blog-post', params: { id: post.id } }">{{ post.title }}</router-link></td>
            <td>{{ post.createdAt | moment('LL') }}</td>
            <td><ion-icon name="lock" v-if="!post.isPublic"></ion-icon></td>
            <td>
              <router-link :to="{ name: 'admin-blog', params: { id: post.id } }"><ion-icon name="create"></ion-icon></router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="paginator buttons" v-if="postPageInfo">
        <button :disabled="!postPageInfo.hasBefore" v-on:click="fetchPosts(null, posts[0].id)">이전 페이지</button>
        <button :disabled="!postPageInfo.hasNext" v-on:click="fetchPosts(posts[posts.length - 1].id)">다음 페이지</button>
      </div>
    </div>

    <div id="snippet">
      <h1>스니펫 관리</h1>
      <div class="actions buttons">
        <router-link :to="{ name: 'admin-snippet', params: { title: 'new' } }">
          <button>새 스니펫 작성하기</button>
        </router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>작성일</th>
            <th>공개</th>
            <th>동작</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="snippet in snippets" v-bind:key="snippet.title">
            <td><router-link :to="{ name: 'snippet', params: { title: snippet.title } }">{{ snippet.title }}</router-link></td>
            <td>{{ snippet.createdAt | moment('LL') }}</td>
            <td><ion-icon name="lock" v-if="!snippet.isPublic"></ion-icon></td>
            <td>
              <router-link :to="{ name: 'admin-snippet', params: { title: snippet.title } }"><ion-icon name="create"></ion-icon></router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="paginator buttons" v-if="snippetPageInfo">
        <button :disabled="!snippetPageInfo.hasBefore" v-on:click="fetchSnippets(null, snippets[0].id)">이전 페이지</button>
        <button :disabled="!snippetPageInfo.hasNext" v-on:click="fetchSnippets(snippets[snippets.length - 1].id)">다음 페이지</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#admin {
  font-weight: 400;

  table {
    width: 100%;
    border-collapse: collapse;

    thead tr { border-bottom: #e0e0e0 solid 1px; }
    tbody tr { &:hover { background: #eeeeee; } }
    th, td { padding: 5px; }
  }

  a { color: inherit; }

  .buttons { padding: 10px 0; }
  .actions { text-align: right; }
  .paginator { text-align: center; }
}
</style>


<script>
import { query } from '@/lynlab-api';

export default {
  data() {
    return {
      posts: [],
      postPageInfo: null,
      snippets: [],
      snippetPageInfo: null,
    };
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
      }`).then((data) => {
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
      }`).then((data) => {
        this.snippets = data.snippetList.items;
        this.snippetPageInfo = data.snippetList.pageInfo;
      });
    },
  },
  created() {
    if (!this.$localStorage.get('auth.access_token')) {
      this.$router.push({ name: 'redirects-auth' });
    }
  },
  mounted() {
    this.fetchPosts();
    this.fetchSnippets();
  },
};
</script>
