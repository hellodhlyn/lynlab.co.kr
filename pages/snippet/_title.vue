<template>
  <div id="snippet" class="container mx-auto">
    <div class="px-4 py-16 text-center">
      <p class="text-4xl">{{ snippet.title }}</p>
      <p class="text-gray-700">
        <icon-text icon="time" :text="snippet.updatedAt | moment('LLL')" />
      </p>
    </div>

    <div v-if="redirected" class="p-4 bg-gray-200">
      <icon-text icon="information-circle-outline" text="LYnWiki 서비스가 종료되었습니다. 이 페이지는 기존의 문서의 가장 마지막 버전을 아카이빙한 것입니다." />
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="markdown-body" v-html="$options.filters.marked(snippet.body)" />
  </div>
</template>

<script>
import { query } from '../../components/lynlab-api';

export default {
  async asyncData(ctx) {
    const data = await query(`snippet(title: "${ctx.params.title}") { title body updatedAt }`);

    if (data.snippet) {
      return {
        snippet: data.snippet,
        redirected: ctx.query.redirect === 'true',
      };
    }
    ctx.error({ statusCode: 404, message: 'Snippet not found' });
    return null;
  },
};
</script>
