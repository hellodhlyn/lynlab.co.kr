<template>
  <div id="navbar" class="flex flex-col md:flex-row px-6 bg-gray-900 text-gray-100 tracking-wider align-middle">
    <div class="flex flex-row font-bold py-4 md:py-6">
      <nuxt-link class="px-1 md:px-2" :to="{ name: 'index' }">
        LYNLAB
      </nuxt-link>
      <div class="flex-grow md:hidden" />
      <div class="text-xl md:hidden cursor-pointer" @click="navbarOpened = !navbarOpened">
        <ion-icon name="menu" />
      </div>
    </div>
    <div :class="navbarOpened ? ['flex', 'flex-col'] : ['hidden', 'md:flex']">
      <nuxt-link class="px-1 md:px-2 py-3 md:py-6" :to="{ name: 'blog' }">Blog</nuxt-link>
      <nuxt-link class="px-1 md:px-2 py-3 md:py-6" :to="{ name: 'profile' }">Profile</nuxt-link>
      <nuxt-link class="px-1 md:px-2 py-3 md:py-6" :to="{ name: 'projects' }">Projects</nuxt-link>
    </div>
    <div class="flex-grow" />
    <div :class="navbarOpened ? ['flex'] : ['hidden', 'md:flex']">
      <a class="px-1 py-3 md:py-5 mr-1 text-xl" alt="github" target="_blank" href="https://github.com/hellodhlyn"><ion-icon name="logo-github" /></a>
      <a class="px-1 py-3 md:py-5 mr-1 text-xl" target="_blank" href="https://twitter.com/hellodhlyn"><ion-icon name="logo-twitter" /></a>
      <a class="px-1 py-3 md:py-5 mr-1 text-xl" target="_blank" href="https://instagram.com/hellodhlyn"><ion-icon name="logo-instagram" /></a>
      <a class="px-1 py-3 md:py-5 text-xl" href="mailto:hellodhlyn@gmail.com"><ion-icon name="mail" /></a>
    </div>
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
  methods: {
    isAdmin() {
      return this.$storage.getLocalStorage('auth.accessToken')
        && parseInt(this.$storage.getLocalStorage('auth.expireAt'), 10) > (new Date()).getTime();
    },
  },
};
</script>
