<template>
  <div id="snippet" class="container">
    <div id="header">
      <h1>{{ snippet.title }}</h1>
      <p><ion-icon name="time" /> {{ snippet.updatedAt | moment('LLL') }}</p>
    </div>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <div id="contents" class="markdown-body" v-html="$options.filters.marked(snippet.body)" />
  </div>
</template>

<style lang="scss" scoped>
#header {
  padding: 40px 0;
  border-bottom: #E0E0E0 solid 1px;
  text-align: center;

  h1 {
    font-size: 300%;
    font-weight: 300;
    margin: 0;
  }
}
</style>

<script>
import { query } from '../../components/lynlab-api';

export default {
  async asyncData({ params }) {
    const data = await query(`snippet(title: "${params.title}") { title body updatedAt }`);
    return { snippet: data.snippet };
  },
};
</script>
