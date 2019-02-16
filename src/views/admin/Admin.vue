<template>
  <div id="admin" class="container">
    <div id="blog">
      <h1>Manage Posts</h1>
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
      <div class="paginator buttons">
        <button :disabled="!postPageInfo.hasBefore" v-on:click="fetchPosts(null, posts[0].id)">이전 페이지</button>
        <button :disabled="!postPageInfo.hasNext" v-on:click="fetchPosts(posts[posts.length - 1].id)">다음 페이지</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#admin {
  font-weight: 400;

  table {
    border-collapse: collapse;

    thead tr { border-bottom: #e0e0e0 solid 1px; }
    tbody tr { &:hover { background: #eeeeee; } }
    th, td { padding: 5px; }
  }

  .buttons { padding: 10px 0; }
  .actions { text-align: right; }
  .paginator { text-align: center; }

  #blog {
    a { color: inherit; }
  }
}
</style>


<script>
import { query } from '@/lynlab-api';

export default {
  data() {
    return {
      posts: [],
      postPageInfo: null,
    };
  },
  methods: {
    fetchPosts(before, after) {
      let pageArgs;
      if (before != null) {
        pageArgs = `{ count: 20, before: ${before} }`;
      } else if (after) {
        pageArgs = `{ count: 20, after: ${after} }`;
      } else {
        pageArgs = '{ count: 20 }';
      }

      query(`postList(page: ${pageArgs}) { 
        items { id title createdAt isPublic }
        pageInfo { hasBefore hasNext }
      }`).then((data) => {
        this.posts = data.postList.items;
        this.postPageInfo = data.postList.pageInfo;
      });
    },
  },
  created() {
    if (!this.$localStorage.get('auth.access_token')) {
      this.$router.push('https://auth.lynlab.co.kr/web/signin?callback_url=https://lynlab.co.kr/callbacks/auth');
    }
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>
