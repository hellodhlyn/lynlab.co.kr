<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,700&subset=korean');

body {
  margin: 0;
}

#app {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212121;

  .container {
    margin: 0 auto;
    max-width: 800px;
  }
}
</style>
