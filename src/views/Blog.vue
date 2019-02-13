<template>
  <div id="blog">
    <div class="container">
      <div class="post" v-for="post in posts" v-bind:key="post.id">
        <p class="thumbnail" v-if="post.thumbnailURL"><img :src="post.thumbnailURL"></p>
        <p class="tags">
          <span v-for="tag in post.tagList" v-bind:key="tag.name">#{{ tag.name }}</span>
        </p>
        <h1><router-link :to="{ name: 'blog-post', params: { id: post.id } }">
          {{ post.title }}
        </router-link></h1>
        <p class="meta"><ion-icon name="time"></ion-icon> {{ post.createdAt | moment('YYYY. MM. DD.') }} ・ <ion-icon name="people"></ion-icon> {{ post.readCount }}</p>
        <p class="description">{{ post.description }}</p>
      </div>

      <div class="paginator" v-if="pageInfo">
        <router-link :to="`?after=${posts[0].id}`"><button :disabled="!pageInfo.hasBefore">이전 페이지</button></router-link>
        <router-link :to="`?before=${posts[posts.length - 1].id}`"><button :disabled="!pageInfo.hasNext">다음 페이지</button></router-link>
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

  button {
    margin: 0 4px;
  }
}
</style>

<script>
import { query } from '@/lynlab-api';

export default {
  data() {
    return {
      posts: null,
      pageInfo: null,
    };
  },
  watch: {
    '$route.query': function watchQuery(to) {
      this.fetchPosts(to.before, to.after);
    },
  },
  methods: {
    fetchPosts(before, after) {
      let pageArgs;
      if (before != null) {
        pageArgs = `{ count: 10, before: ${before} }`;
      } else if (after) {
        pageArgs = `{ count: 10, after: ${after} }`;
      } else {
        pageArgs = '{ count: 10 }';
      }

      query(`postList(page: ${pageArgs}) { 
        items { id thumbnailURL title description readCount createdAt tagList { name } }
        pageInfo { hasBefore hasNext }
      }`).then((data) => {
        this.posts = data.postList.items;
        this.pageInfo = data.postList.pageInfo;

        window.scrollTo(0, 0);
      });
    },
  },
  mounted() {
    this.fetchPosts(this.$route.query.before, this.$route.query.after);
  },
};
</script>
