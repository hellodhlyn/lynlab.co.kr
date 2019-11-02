<!-- eslint-disable vue/singleline-html-element-content-newline -->

<template>
  <div id="app">
    <navbar v-if="showNavbar()" />
    <nuxt />
  </div>
</template>

<script>
export default {
  methods: {
    showNavbar() {
      return false;
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
