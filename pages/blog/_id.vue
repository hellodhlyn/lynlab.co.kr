<template>
  <div id="blog-post">
    <div class="h-screen-35 md:h-screen-half w-full mx-auto bg-center bg-cover shadow-lg" :style="`background-image: url('${(post && post.thumbnailURL) || '/images/header.jpg'}')`" />

    <div class="container max-w-4xl px-2 lg:px-0 -mt-20 mx-auto leading-relaxed md:leading-loose">
      <div class="p-4 md:p-8 bg-white border border-gray-200">
        <div class="mb-4">
          <p class="text-xl md:text-2xl font-bold">{{ post.title }}</p>
          <p class="text-normal md:text-lg text-gray-700">{{ post.description }}</p>
        </div>
        <p class="text-sm">
          <icon-text class="mr-2" icon="time" :text="post.created_at | moment('YYYY. MM. DD.')" />
          <icon-text v-if="post.tags.length > 0" icon="pricetag" :text="post.tags.map((t) => `#${t.name}`).join(' ')" />
        </p>
      </div>
    </div>

    <div class="container max-w-4xl mx-auto p-4 md:p-8">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="markdown-body" v-html="$options.filters.marked(post.body)" />
    </div>

    <div class="container max-w-4xl mx-auto px-4 py-8 text-center text-xs">
      <img class="mx-auto" alt="크리에이티브 커먼즈 라이선스" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png">
      <p class="py-2">이 저작물은 <a class="text-blue-600 hover:underline" href="https://creativecommons.org/licenses/by-sa/4.0/">크리에이티브 커먼즈 저작자표시-동일조건변경허락 4.0</a> 국제 라이선스에 따라 이용할 수 있습니다. </p>
      <p>© 2011 - {{ 1900 + new Date().getYear() }} Do Hoerin, LYnLab</p>
    </div>

    <div class="container max-w-4xl mx-auto mb-16 px-4 py-4 bg-white border border-gray-300 rounded">
      <VueDisqus shortname="lynlab" :url="'https://lynlab.co.kr' + this.$route.fullPath" />
    </div>
  </div>
</template>

<script>
import { query } from '../../components/lynlab-api';

export default {
  async asyncData({ params, error }) {
    const data = await query(`post(id: ${params.id}) {
      thumbnail_url title description created_at tags{ name } body
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
        { property: 'og:image', content: this.post.thumbnail_url },
        { property: 'og:url', content: `https://lynlab.co.kr${this.$route.fullPath}` },
      ],
    };
  },
};
</script>
