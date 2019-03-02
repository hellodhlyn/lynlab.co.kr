<template>
  <div id="blog">
    <div class="container">
      <div v-for="post in posts" :key="post.id" class="post">
        <p v-if="post.thumbnailURL" class="thumbnail">
          <img :src="post.thumbnailURL">
        </p>
        <p class="tags">
          <span v-for="tag in post.tagList" :key="tag.name">#{{ tag.name }}</span>
        </p>
        <h1>
          <nuxt-link :to="{ name: 'blog-id', params: { id: post.id } }">
            {{ post.title }}
          </nuxt-link>
        </h1>
        <p class="meta">
          <ion-icon name="time" /> {{ post.createdAt | moment('YYYY. MM. DD.') }} ・ <ion-icon name="people" /> {{ post.readCount }}
        </p>
        <p class="description">
          {{ post.description }}
        </p>
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
  padding: 20px 0;
  &:first-child { padding-top: 40px; }

  border-bottom: #eeeeee solid 1px;

  h1 {
    margin: 0;
    font-size: 200%;
  }

  p {
    font-weight: 400;

    &.tags {
      margin: 0;
      color: #757575;
    }
    &.thumbnail img {
      max-height: 320px;
      width: 100%;
      object-fit: cover;
    }
    &.description {
      line-height: 2.0;
    }
    &.meta {
      margin-top: 10px;
      color: #9e9e9e;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }
}

.paginator {
  margin: 20px 0;
  text-align: center;
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
        items { id thumbnailURL title description readCount createdAt tagList { name } }
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
