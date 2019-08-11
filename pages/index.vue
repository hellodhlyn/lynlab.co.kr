<template>
  <div id="index">
    <div id="content">
      <div id="header">
        <h1 id="title">
          Do Hoerin
        </h1>
        <h2>Software Developer, since 2007</h2>
        <div class="actions">
          <nuxt-link :to="{ name: 'blog' }">
            <div class="action">
              BLOG
            </div>
          </nuxt-link>
          <a href="mailto:lyn@lynlab.co.kr"><div class="action">CONTACT</div></a>
        </div>
      </div>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="markdown-body" v-html="$options.filters.marked(profile)" />

      <div id="footer">
        <p>© {{ 1900 + new Date().getYear() }} Do Hoerin, LYnLab</p>
      </div>
    </div>
  </div>
</template>

<script>
import { query } from '../components/lynlab-api';

export default {
  async asyncData() {
    const data = await query('snippet(title: "resume:profile") { body }');
    let profile = '';
    if (data.snippet) {
      profile = data.snippet.body;
    }

    profile.match(/{{\w+\|icon}}/g).forEach((icon) => {
      const tag = icon.replace('{{', '').replace('|icon}}', '');
      profile = profile.replace(icon, `<div class="icon ${tag}"><img src="/icons/${tag}.svg"></div>`);
    });
    profile.match(/{{\w+\|texticon}}/g).forEach((icon) => {
      const tag = icon.replace('{{', '').replace('|texticon}}', '');
      profile = profile.replace(icon, `<div class="icon ${tag}"><p>${tag}</p></div>`);
    });

    return { profile };
  },
};
</script>

<style lang="scss">
#index {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to right top, #7e57c2, #0083e5, #00a0d2, #00b29e, #66bb6a);
  background-repeat: no-repeat;
  background-attachment: fixed;
  color: #ffffff;
  overflow-y: scroll;

  #header {
    margin: 15vh 0 25vh 0;
  }

  #footer {
    margin-top: 100px;
  }

  #content {
    padding: 80px;

    h1 {
      margin: 0;
      font-size: 500%;
      font-weight: 900;
    }

    h2 {
      font-size: 200%;
      font-weight: 100;
    }

    h3 {
      margin-top: 120px;
      margin-bottom: 20px;
      font-size: 250%;
      font-weight: 900;
    }

    h4 {
      margin-top: 40px;
      margin-bottom: 0;
      font-size: 150%;
      font-weight: 900;
    }

    p {
      margin: 15px 0;
      font-size: 16px;
      font-weight: 300;
      line-height: 1.8;
    }

    a {
      color: #ffffff !important;
    }

    strong {
      font-weight: 900;
    }

    .actions {
      margin: 40px 0;
      display: flex;
      width: 100%;

      a { text-decoration: none; }

      .action {
        width: 80px;
        height: 45px;
        line-height: 45px;
        margin: 0 5px;
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 45px;
        background: #ffffff;
        text-align: center;
        color: #212121;
        font-weight: 900;

        &:hover { background-color: #eeeeee; }
      }
    }

    .icon {
      margin-right: 5px;
      height: 50px;
      width: 50px;
      border-radius: 25px;
      display: inline-block;
      vertical-align: middle;

      img {
        margin: 0;
        padding: 10px;
        width: 30px;
        height: 30px;
      }

      p {
        margin: 0;
        padding: 0;
        width: 50px;
        height: 50px;
        font-size: 12px;
        line-height: 50px;
        text-align: center;
        font-weight: 900;
      }

      background-color: #212121;
      &.aws { background-color: #232f3e; }
      &.django { background-color: #092e20; }
      &.gcp { background-color: #4285f4; }
      &.github { background-color: #181717; }
      &.gmail { background-color: #d14836; }
      &.go { background-color: #76e1fe; }
      &.graphql { background-color: #e10098; }
      &.instagram { background-color: #e4405f; }
      &.kubernetes { background-color: #326ce5; }
      &.nodejs { background-color: #339933; }
      &.nuxtjs { background-color: #00c58e; }
      &.python { background-color: #3776ab; }
      &.ruby { background-color: #cc342d; }
      &.twitter { background-color: #1da1f2; }

      &:hover { filter: brightness(0.9); }
    }
  }
}
</style>
