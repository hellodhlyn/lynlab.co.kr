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
      return this.$route.path !== '/';
    },
  },
};
</script>


<style lang="scss">
body {
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  padding-bottom: 5vh;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #292f38;

  button {
    background-color: #292f38;
    color: #ffffff;
    border: none;
    padding: 12px 16px;
    display: inline-block;
    cursor: default;

    &:disabled { background-color: #e0e0e0; }
    &:not(:disabled):hover { background-color: #424242; }
  }

  .container {
    margin: 0 auto;
    max-width: 800px;
    &.wide { max-width: 1200px; }
  }

  .markdown-body {
    font-size: 17px;
    line-height: 2.0;
    word-break: break-word;

    h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      margin-bottom: 0;
    }

    h2 { border-bottom: #eeeeee solid 1px; }
    h2, h3 { margin-top: 40px; }
    ul { padding-left: 20px; }
    a { color: #03A9F4; }
    strong { font-weight: 700; }

    img {
      display: block;
      max-height: 50vh;
      max-width: 800px;
      margin: 40px auto;
      object-fit: contain;
    }

    pre {
      padding: 20px;
      font-size: 14px;
      overflow-y: scroll;
      background-color: #F5F5F5;
    }

    p code, ul code, ol code {
      background: #EEEEEE;
      padding: 0 4px;
    }

    blockquote {
      margin: 0;
      padding: 10px 20px;
      background-color: #F5F5F5;
      border-left: #E0E0E0 solid 10px;
    }
  }
}

@media only screen and (max-width: 480px) {
  #app {
    .markdown-body {
      font-size: 16px;
      img { max-width: 100%; }
    }
  }
}
</style>
