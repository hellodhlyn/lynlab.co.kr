<template>
  <div id="navbar">
    <ul class="title">
      <li id="menu-btn" @click="navbarOpened = !navbarOpened;">
        <ion-icon name="menu" />
      </li>
      <li class="primary">
        LYNLAB
      </li>
    </ul>
    <ul :class="navbarOpened ? ['left', 'mobile-visible'] : ['left']">
      <li>
        <nuxt-link :to="{ name: 'index' }">
          ABOUT
        </nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{ name: 'blog' }">
          BLOG
        </nuxt-link>
      </li>
      <li v-if="isAdmin()">
        <nuxt-link :to="{ name: 'admin' }">
          ADMIN
        </nuxt-link>
      </li>
    </ul>
    <ul :class="navbarOpened ? ['right', 'mobile-visible'] : ['right']">
      <li class="icon">
        <a target="_blank" href="https://twitter.com/HelloDHLyn"><ion-icon name="logo-twitter" /></a>
      </li>
      <li class="icon">
        <a target="_blank" href="https://github.com/HelloDHLyn"><ion-icon name="logo-github" /></a>
      </li>
      <li class="icon">
        <a target="_blank" href="https://www.linkedin.com/in/hoerin-do-13b065105/"><ion-icon name="logo-linkedin" /></a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    isAdmin() {
      return this.$storage.getLocalStorage('auth.accessToken')
        && parseInt(this.$storage.getLocalStorage('auth.expireAt'), 10) > (new Date()).getTime();
    },
  },
};
</script>


<style scoped lang="scss">
#navbar {
  position: relative;
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

      &.primary { font-weight: 900; }
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

@media only screen and (max-width: 480px) {
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

@media only screen and (min-width: 481px) {
  #navbar {
    ul {
      li#menu-btn { display: none; }
    }
  }
}
</style>
