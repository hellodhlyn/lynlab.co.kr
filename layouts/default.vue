<!-- eslint-disable vue/singleline-html-element-content-newline -->

<template>
  <div id="app" class="flex flex-col h-screen">
    <navbar v-if="showNavbar()" />
    <nuxt class="flex-grow text-gray-900" />
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

.markdown-body {
  font-size: 17px;
  line-height: 2.0;
  word-break: break-word;

  strong { font-weight: 500; }

  h1, h2, h3, h4, h5, h6 { font-weight: 500; }
  h1 {
    font-size: 200%;
    padding-top: 40px;
  }
  h2 {
    font-size: 160%;
    padding: 20px 0 10px 0;
  }
  h3 {
    font-size: 120%;
    padding-bottom: 10px;
  }

  p {padding-bottom: 20px; }

  a {
    color: #228be6; // blue-600
    &:hover { text-decoration: underline; }
  }

  img {
    display: block;
    max-height: 50vh;
    max-width: 700px;
    margin: 20px auto;
  }

  ul, ol {
    padding: 10px 0;
    list-style-type: disc;
    list-style-position: inside;
    ul, ol { padding: 10px; }
  }
  li li {
    margin-left: 20px;
  }

  blockquote {
    margin: 10px 0;
    background-color: #f1f3f5; // gray-100
    border-left: #dee2e6 solid 10px; // gray-300
    p { padding: 20px; }
  }

  pre {
    padding: 20px;
    margin-bottom: 10px;
    background-color: #f1f3f5; // gray-100
    font-size: 14px;
    overflow-y: auto;
  }

  p code, ul code, ol code {
    background-color: #f1f3f5; // gray-100
    padding: 0 4px;
  }

  table {
    width: 100%;
    margin: 10px 0;

    & th {
      border-bottom: #dee2e6 solid 2px; // gray-300
    }
    & td {
      padding: 4px 10px;
      border-bottom: #dee2e6 solid 1px; // gray-300
    }
    & tr:hover {
      background-color: #f1f3f5; // gray-100
    }
  }
}

@media only screen and (max-width: 768px) {
  .markdown-body {
    font-size: 15px;
    img { max-width: 100%; }
  }
}
</style>
