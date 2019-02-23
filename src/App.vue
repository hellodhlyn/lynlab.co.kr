<template>
  <div id="app">
    <div id="navbar">
      <div>
        <ul>
          <li class="primary">LYNLAB</li>
          <li><router-link :to="{ name: 'blog' }">BLOG</router-link></li>
          <li><router-link :to="{ name: 'snippet', params: { title: 'resume' } }">RESUME</router-link></li>
        </ul>
        <ul class="right">
          <li class="icon"><a target="_blank" href="https://twitter.com/HelloDHLyn"><ion-icon name="logo-twitter"></ion-icon></a></li>
          <li class="icon"><a target="_blank" href="https://github.com/HelloDHLyn"><ion-icon name="logo-github"></ion-icon></a></li>
          <li class="icon"><a target="_blank" href="https://www.linkedin.com/in/hoerin-do-13b065105/"><ion-icon name="logo-linkedin"></ion-icon></a></li>
        </ul>
      </div>
    </div>

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

  #navbar {
    height: 80px;
    padding: 0 30px;
    background: #212121;
    color: #ffffff;

    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;

      &.right {
        float: right;
        right: 30px;
      }

      li {
        float: left;
        height: 80px;
        padding: 0 10px;
        font-size: 18px;
        font-weight: 400;
        line-height: 80px;
        letter-spacing: 1.5px;

        &.primary { font-weight: 700; }
        &.icon { font-size: 24px; }
      }

      a {
        color: inherit;
        text-decoration: none;

        &:hover { text-decoration: underline; }
      }
    }

  }

  .container {
    margin: 0 auto;
    max-width: 800px;
  }

  .markdown-body {
    font-size: 18px;
    font-weight: 400;
    line-height: 2.0;
    word-break: break-all;

    h1, h2, h3, h4, h5, h6 { margin-bottom: 0; }

    a { color: #03A9F4; }

    img {
      display: block;
      max-width: 600px;
      margin: 40px auto;
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
</style>
