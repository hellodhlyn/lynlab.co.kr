<template>
  <div id="navbar" class="flex flex-col">
    <div class="flex flex-col md:flex-row w-full px-6 border-b border-gray-300 text-gray-800 tracking-wider align-middle">
      <div class="flex flex-row font-bold py-4 md:py-6">
        <nuxt-link class="px-1 md:px-2" :to="{ name: 'index' }">
          LYNLAB
        </nuxt-link>
        <div class="flex-grow md:hidden" />
        <div class="text-xl md:hidden cursor-pointer" @click="toggleNavbar()">
          <ion-icon name="menu" />
        </div>
      </div>
      <div :class="navbarOpened ? ['flex', 'flex-col'] : ['hidden', 'md:flex']">
        <nuxt-link class="px-1 md:px-2 py-3 md:py-6 hover:text-gray-500" :to="{ name: 'blog' }">Blog</nuxt-link>
        <nuxt-link class="px-1 md:px-2 py-3 md:py-6 hover:text-gray-500" :to="{ name: 'wiki' }">Wiki</nuxt-link>
        <nuxt-link class="px-1 md:px-2 py-3 md:py-6 hover:text-gray-500" :to="{ name: 'profile' }">Resume</nuxt-link>
        <nuxt-link class="px-1 md:px-2 py-3 md:py-6 hover:text-gray-500" :to="{ name: 'projects' }">Projects</nuxt-link>
        <div class="relative px-1 md:px-2 py-3 md:py-6 hover:text-gray-500 cursor-pointer" @click="subnavOpened.apps = !subnavOpened.apps">
          <icon-text v-if="!subnavOpened.apps" icon="arrow-dropdown" text="Apps" position="right" />
          <icon-text v-else icon="arrow-dropup" text="Apps" position="right" />
        </div>
      </div>
      <div class="flex-grow" />
      <div :class="navbarOpened ? ['flex'] : ['hidden', 'md:flex']">
        <a class="px-1 py-3 md:py-5 mr-1 text-xl" alt="github" target="_blank" href="https://github.com/hellodhlyn"><ion-icon name="logo-github" /></a>
        <a class="px-1 py-3 md:py-5 mr-1 text-xl" target="_blank" href="https://twitter.com/hellodhlyn"><ion-icon name="logo-twitter" /></a>
        <a class="px-1 py-3 md:py-5 mr-1 text-xl" target="_blank" href="https://instagram.com/hellodhlyn"><ion-icon name="logo-instagram" /></a>
        <a class="px-1 py-3 md:py-5 text-xl" href="mailto:hellodhlyn@gmail.com"><ion-icon name="mail" /></a>
      </div>
    </div>

    <div v-if="subnavOpened.apps" class="flex flex-row px-6 bg-gray-100">
      <p class="px-1 md:px-2 py-3 font-bold">Apps</p>
      <nuxt-link class="px-1 md:px-2 py-3 hover:text-gray-500" :to="{ name: 'apps-crypto' }">CryptoCalc</nuxt-link>
      <a class="px-1 md:px-2 py-3 hover:text-gray-500" href="https://twitdeck.lynlab.co.kr" target="_blank">TwitDeck</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navbarOpened: false,
      subnavOpened: {
        apps: false,
      },
    };
  },
  watch: {
    $route() {
      this.navbarOpened = false;
      this.subnavOpened.apps = false;
    },
  },
  methods: {
    toggleNavbar() {
      if (!this.navbarOpened) {
        this.navbarOpened = true;
      } else {
        this.navbarOpened = false;
        this.subnavOpened.apps = false;
      }
    },
  },
};
</script>
