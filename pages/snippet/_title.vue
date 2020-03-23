<template>
  <div id="snippet" class="container mx-auto px-4 md:px-8">
    <div class="px-4 py-16 text-center">
      <p class="text-4xl">{{ $route.params.title }}</p>
      <p class="text-gray-700">
        <icon-text v-if="snippet" icon="time" :text="snippet.updated_at | moment('LLL')" />
      </p>
    </div>

    <div v-if="$route.query.redirect === 'true'" class="p-4 my-4 bg-gray-200">
      <icon-text icon="information-circle-outline" text="LYnWiki 서비스가 종료되었습니다. 이 페이지는 기존의 문서의 가장 마지막 버전을 아카이빙한 것입니다." />
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-if="snippet" class="markdown-body" v-html="$options.filters.marked(snippet.body)" />
    <div v-else-if="loaded">
      <p>{{ $route.params.title }} 문서를 찾을 수 없습니다.</p>
    </div>
    <div v-else class="max-w-md"><vcl-facebook /></div>
  </div>
</template>

<script>
import { VclFacebook } from 'vue-content-loading';

import { queryCms } from '../../components/lynlab-api';

export default {
  components: { VclFacebook },
  data() {
    return { snippet: null, loaded: false };
  },
  async created() {
    let data;
    try {
      data = await queryCms(`snippets(where: {title: "${this.$route.params.title}"}) { title body updated_at }`);
    } finally {
      this.loaded = true;
    }

    if (data && data.snippets.length > 0) {
      // eslint-disable-next-line prefer-destructuring
      this.snippet = data.snippets[0];
    }
  },
};
</script>
