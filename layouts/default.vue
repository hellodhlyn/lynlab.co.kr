<!-- eslint-disable vue/singleline-html-element-content-newline -->

<template>
  <div id="app">
    <div id="navbar">
      <ul class="title">
        <li id="menu-btn" @click="navbarOpened = !navbarOpened;"><ion-icon name="menu" /></li>
        <li class="primary">LYNLAB</li>
      </ul>
      <ul :class="navbarOpened ? ['left', 'mobile-visible'] : ['left']">
        <li><nuxt-link to="/blog">BLOG</nuxt-link></li>
        <li><nuxt-link :to="{ name: 'snippet-title', params: { title: 'resume' } }">RESUME</nuxt-link></li>
      </ul>
      <ul :class="navbarOpened ? ['right', 'mobile-visible'] : ['right']">
        <li class="icon"><a target="_blank" href="https://twitter.com/HelloDHLyn"><ion-icon name="logo-twitter" /></a></li>
        <li class="icon"><a target="_blank" href="https://github.com/HelloDHLyn"><ion-icon name="logo-github" /></a></li>
        <li class="icon"><a target="_blank" href="https://www.linkedin.com/in/hoerin-do-13b065105/"><ion-icon name="logo-linkedin" /></a></li>
      </ul>
    </div>

    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarOpened: false,
    };
  },
  watch: {
    $route() {
      this.navbarOpened = false;
    },
  },
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400,700&subset=korean');

body {
  margin: 0;
}

#app {
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  padding-bottom: 5vh;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #212121;

  button {
    background-color: #212121;
    color: #ffffff;
    border: none;
    padding: 12px 16px;
    display: inline-block;
    cursor: default;

    &:disabled { background-color: #e0e0e0; }
    &:not(:disabled):hover { background-color: #424242; }
  }

  #navbar {
    height: 80px;
    width: calc(100% - 60px);
    padding: 0 30px;
    background: #212121;
    color: #ffffff;
    z-index: 100;

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
        height: 40px;
        padding: 20px 10px;
        font-size: 18px;
        line-height: 40px;
        letter-spacing: 1.5px;
        font-weight: 400;

        &.primary { font-weight: 700; }
        &.icon { font-size: 24px; }

        &#menu-btn {
          margin: 0 10px;
          font-size: 20px;
        }
      }

      a {
        height: 40px;
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
    word-break: break-word;

    h1, h2, h3, h4, h5, h6 {
      font-weight: 400;
      margin-bottom: 0;
    }

    h2 {
      border-bottom: #eeeeee solid 1px;
    }

    a { color: #03A9F4; }

    img {
      display: block;
      max-height: 50vh;
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

@media only screen and (max-width: 480px) {
  #app {
    font-size: 90%;
    padding-top: 60px;

    #navbar {
      width: 100%;
      position: fixed;
      top: 0;
      height: 60px;
      padding: 0;

      ul {
        &.left, &.right {
          width: 100%;
          &.mobile-visible { background: #212121; }
          &:not(.mobile-visible) { display: none; }
        }

        &.title {
          li#menu-btn {
            margin-left: 5px;
            margin-right: 5px;
            padding-top: 12px;
          }
          li:not(#menu-btn) { float: none; }
        }

        &.left {
          li {
            float: none;
            margin-left: 40px;
          }
        }

        &.right {
          right: 0;
          li:first-child { margin-left: 40px; }
        }

        li {
          padding: 10px 10px;
          font-size: 16px;
        }
      }
    }

    .container {
      padding: 0 15px;
      max-width: calc(100% - 30px);
    }

    .markdown-body {
      font-size: 14px;

      img { max-width: 100%; }
    }
  }
}

@media only screen and (min-width: 481px) {
  #app {
    #navbar {
      ul {
        li {
          &#menu-btn { display: none; }
        }
      }
    }
  }
}
</style>
