<template>
  <div id="index">
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
        <a href="mailto:hellodhlyn@gmail.com"><div class="action">CONTACT</div></a>
      </div>
    </div>

    <div id="content">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="markdown-body" v-html="$options.filters.marked(profile)" />
    </div>

    <div id="footer">
      <p>© {{ 1900 + new Date().getYear() }} Do Hoerin, LYnLab</p>
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
  h1 {
    margin: 0;
    font-size: 500%;
    font-weight: 900;
  }

  h2 {
    font-size: 200%;
    font-weight: 300;
  }

  h3 {
    margin-top: 120px;
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
    font-weight: 400;
    line-height: 2.0;
  }

  a {
    color: #03A9F4 !important;
  }

  strong {
    font-weight: 700;
  }

  .icon {
    margin: 0 5px 20px 0;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: inline-block;
    vertical-align: middle;
    color: #ffffff;

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

    background-color: #292f38;
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

  #header {
    padding: 20vh 80px;
    width: calc(100% - 160px);
    background-color: #21d4fd;
    background-image: linear-gradient(19deg, #21d4fd 0%, #b721ff 100%);
    color: #ffffff;

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
        padding: 0 30px;
        border-radius: 45px;
        background: #ffffff;
        text-align: center;
        color: #292f38;

        &:hover { background-color: #eeeeee; }
      }
    }
  }

  #content {
    padding: 0 80px;
  }

  #footer {
    padding: 20px 80px;
  }
}

@media only screen and (max-width: 480px) {
  #index {
    h1 { font-size: 250%; }
    h2 { font-size: 120%; }
    h3 { font-size: 150%; }
    h4 {
      margin-top: 20px;
      font-size: 100%;
    }

    p { font-size: 14px; }

    #header {
      padding: 10vh 20px;
      width: calc(100% - 40px);

      .actions .action {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding: 0 15px;
      }
    }

    #content {
      padding: 0 20px;
    }

    #footer {
      padding: 20px;
    }
  }
}
</style>
