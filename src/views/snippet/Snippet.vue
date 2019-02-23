<template>
  <div id="snippet" class="container">
    <div id="header">
      <h1>{{ snippet.title }}</h1>
      <p><ion-icon name="time"></ion-icon> {{ snippet.updatedAt | moment('LLL') }}</p>
    </div>

    <div id="contents" class="markdown-body" v-html="$options.filters.marked(snippet.body)"></div>
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
import { query } from '@/lynlab-api';

export default {
  data() {
    return {
      snippet: null,
    };
  },
  mounted() {
    query(`snippet(title: "${this.$route.params.title}") {
      title body updatedAt
    }`).then((data) => { this.snippet = data.snippet; });
  },
};
</script>
