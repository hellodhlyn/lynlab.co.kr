<!-- eslint-disable vue/singleline-html-element-content-newline -->

<template>
  <div id="app">
    <navbar v-if="showNavbar()" />
    <nuxt class="bg-gray-100 text-gray-900" />
  </div>
</template>

<script>
export default {
  methods: {
    showNavbar() {
      return this.$route.path !== '/';
    },
  },
};
</script>


<style lang="scss">
#app {
  font-family: 'Noto Sans KR', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
