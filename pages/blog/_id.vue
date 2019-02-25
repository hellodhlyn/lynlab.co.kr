<template>
  <div id="blog-post">
    <div id="header">
      <div class="layer img">
        <img v-if="post && post.thumbnailURL" :src="post.thumbnailURL">
        <img v-else src="/images/header.jpg">
      </div>
      <div class="layer data">
        <div v-if="post" class="container">
          <p id="tags">
            <span v-for="tag in post.tagList" :key="tag.name">#{{ tag.name }}</span>
          </p>
          <h1>{{ post.title }}</h1>
          <p>{{ post.description }}</p>
          <p>{{ post.createdAt | moment('YYYY. MM. DD.') }} ・ {{ post.readCount }}명 읽음</p>
        </div>
      </div>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div id="contents" class="container markdown-body" v-html="$options.filters.marked(post.body)" />

    <div id="footer" class="container">
      <VueDisqus shortname="lynlab" :url="'https://lynlab.co.kr' + this.$route.fullPath" />

      <img alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png">
      <p>이 저작물은 <a href="https://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0</a> 국제 라이선스에 따라 이용할 수 있습니다. </p>
    </div>

    <AddThis public-id="ra-5a8713a8c30b87b5" />
  </div>
</template>

<style lang="scss">
#blog-post {
  #header {
    height: 600px;
    width: 100%;
    color: #fafafa;

    .layer {
      width: 100%;
      position: absolute;
    }

    .img {
      img {
        height: 600px;
        width: 100%;
        filter: brightness(30%);
        object-fit: cover;
      }
    }

    .data {
      height: 480px;
      padding-top: 120px;

      h1 {
        font-size: 300%;
        font-weight: 300;
        margin: 0;
      }

      p {
        font-size: 18px;
        &#tags { margin: 36px 0 0 0; }
      }
    }
  }

  #contents {
    padding: 40px 0;
    margin: 0 auto;
    width: 800px;
  }

  #footer {
    padding: 40px 0;
    text-align: center;

    hr {
      margin: 20px 0;
      border: 0;
      border-bottom: 1px solid;
      color: #e0e0e0;
    }

    p {
      margin: 0;
    }

    #disqus_thread {
      margin-bottom: 40px;
    }
  }
}
</style>

<script>
import { query } from '../../components/lynlab-api';

export default {
  async asyncData({ params, error }) {
    const data = await query(`post(id: ${params.id}) {
      thumbnailURL title description readCount createdAt tagList { name } body
    }`);

    if (data.post) {
      return { post: data.post };
    }
    error({ statusCode: 404, message: 'Post not found' });
    return null;
  },
  head() {
    return {
      title: `${this.post.title} | LYnLab`,
      meta: [
        { property: 'og:site_name', content: 'LYnLab' },
        { property: 'og:title', content: `${this.post.title} | LYnLab` },
        { property: 'og:description', content: this.post.description },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: `https://lynlab.co.kr${this.$route.fullPath}` },
      ],
    };
  },
};
</script>
