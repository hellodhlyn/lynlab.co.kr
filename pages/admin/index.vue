<template>
  <authenticated id="admin" class="container mx-auto py-8">
    <div id="blog">
      <h1>블로그 포스트 관리</h1>
      <div class="actions buttons">
        <nuxt-link :to="{ name: 'admin-blog' }">
          <button>새 글 작성하기</button>
        </nuxt-link>
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
          <tr v-for="post in posts" :key="post.id">
            <td>{{ post.id }}</td>
            <td>
              <nuxt-link :to="{ name: 'blog-id', params: { id: post.id } }">
                {{ post.title }}
              </nuxt-link>
            </td>
            <td>{{ post.createdAt | moment('LL') }}</td>
            <td><ion-icon v-if="!post.isPublic" name="lock" /></td>
            <td>
              <nuxt-link :to="{ name: 'admin-blog', query: { id: post.id } }">
                <ion-icon name="create" />
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="postPageInfo" class="paginator buttons">
        <button :disabled="!postPageInfo.hasBefore" @click="fetchPosts(null, posts[0].id)">
          이전 페이지
        </button>
        <button :disabled="!postPageInfo.hasNext" @click="fetchPosts(posts[posts.length - 1].id)">
          다음 페이지
        </button>
      </div>
    </div>

    <div id="snippet">
      <h1>스니펫 관리</h1>
      <div class="actions buttons">
        <nuxt-link :to="{ name: 'admin-snippet'}">
          <button>새 스니펫 작성하기</button>
        </nuxt-link>
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
          <tr v-for="snippet in snippets" :key="snippet.title">
            <td>
              <nuxt-link :to="{ name: 'snippet-title', params: { title: snippet.title } }">
                {{ snippet.title }}
              </nuxt-link>
            </td>
            <td>{{ snippet.createdAt | moment('LL') }}</td>
            <td><ion-icon v-if="!snippet.isPublic" name="lock" /></td>
            <td>
              <nuxt-link :to="{ name: 'admin-snippet', query: { title: snippet.title } }">
                <ion-icon name="create" />
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="snippetPageInfo" class="paginator buttons">
        <button :disabled="!snippetPageInfo.hasBefore" @click="fetchSnippets(null, snippets[0].id)">
          이전 페이지
        </button>
        <button :disabled="!snippetPageInfo.hasNext" @click="fetchSnippets(snippets[snippets.length - 1].id)">
          다음 페이지
        </button>
      </div>
    </div>
  </authenticated>
</template>

<style lang="scss" scoped>
#admin {
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
