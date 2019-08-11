<template>
  <div id="blog">
    <div class="posts container">
      <div v-for="post in posts" :key="post.id" class="post">
        <nuxt-link :to="{ name: 'blog-id', params: { id: post.id } }">
          <div>
            <h1>{{ post.title }}</h1>
            <p v-if="post.thumbnailURL" class="thumbnail">
              <img :src="post.thumbnailURL">
            </p>
            <p class="description">
              {{ post.description }}
            </p>
            <p class="tags">
              <span v-for="tag in post.tagList" :key="tag.name">#{{ tag }}&nbsp;&nbsp;</span>
            </p>
          </div>
        </nuxt-link>
      </div>

      <div v-if="pageInfo" class="paginator">
        <nuxt-link :to="`?after=${posts[0].id}`">
          <button :disabled="!pageInfo.hasBefore">
            이전 페이지
          </button>
        </nuxt-link>
        <nuxt-link :to="`?before=${posts[posts.length - 1].id}`">
          <button :disabled="!pageInfo.hasNext">
            다음 페이지
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post {
  width: 100%;
  padding: 20px;
  border-bottom: #eeeeee solid 1px;

  h1 {
    margin: 0;
    font-size: 200%;
    font-weight: 900;

    &:hover { text-decoration: underline; }
  }

  p {
    &.tags {
      margin: 0;
      color: #757575;
    }
    &.thumbnail img {
      height: 240px;
      width: 100%;
      object-fit: cover;
    }
    &.description {
      font-size: 18px;
      line-height: 2.0;
      color: #424242;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }
}

.paginator {
  width: 100%;
  margin: 20px 0;
  text-align: center;
}

@media only screen and (max-width: 480px) {
  .post {
    padding: 20px 0;
  }
}
</style>

<script>
import { query } from '../../components/lynlab-api';

export default {
  data() {
    return {
      posts: null,
      pageInfo: null,
    };
  },
  watch: {
    '$route.query': function watchQuery() {
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
      let pageArgs;
      if (this.$route.query.before != null) {
        pageArgs = `{ count: 10, before: ${this.$route.query.before} }`;
      } else if (this.$route.query.after) {
        pageArgs = `{ count: 10, after: ${this.$route.query.after}, sortDirection: ASC }`;
      } else {
        pageArgs = '{ count: 10 }';
      }

      query(`postList(page: ${pageArgs}) { 
        items { id thumbnailURL title description tagList { name } }
        pageInfo { hasBefore hasNext }
      }`).then((data) => {
        this.posts = data.postList.items;
        this.pageInfo = data.postList.pageInfo;
        if (this.$route.query.after) {
          this.posts.reverse();
          this.pageInfo = {
            hasBefore: this.pageInfo.hasNext,
            hasNext: this.pageInfo.hasBefore,
          };
        }

        window.scrollTo(0, 0);
      });
    },
  },
};
</script>
