<template>
  <div id="snippet" class="container">
    <div id="header">
      <h1>{{ snippet.title }}</h1>
      <p>
        <icon-text icon="time" :text="snippet.updatedAt | moment('LLL')" />
      </p>
    </div>

    <div v-if="redirected" class="alert">
      <icon-text icon="information-circle-outline" text="LYnWiki 서비스가 종료되었습니다. 이 페이지는 기존의 문서의 가장 마지막 버전을 아카이빙한 것입니다." />
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div id="contents" class="markdown-body" v-html="$options.filters.marked(snippet.body)" />
  </div>
</template>

<style lang="scss" scoped>
#header {
  padding: 40px 0;
  border-bottom: #eeeeee solid 1px;
  text-align: center;

  h1 {
    font-size: 300%;
    margin: 0;
  }
}

.alert {
  margin: 20px 0;
  padding: 20px;
  background-color: #eeeeee;
}
</style>

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
