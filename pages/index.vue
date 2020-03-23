<template>
  <div id="index" class="w-screen h-screen">
    <div class="absolute inset-0 z-0">
      <img class="w-full h-full object-cover" src="https://storage.lynlab.co.kr/20191103-bg-q50.jpg">
    </div>
    <div class="absolute inset-0 opacity-75 bg-black z-10" />
    <div class="absolute inset-0 flex flex-wrap w-full h-full content-center justify-center text-center text-gray-300 leading-relaxed z-20">
      <div>
        <p class="text-4xl">
          도회린 (Do Hoerin)
        </p>
        <p class="w-8 mx-auto my-6 border-t-2 border-gray-300" />
        <p>
          Backend Developer @ Dunamu<br>
          Dept. of Computer Science, Yonsei University
        </p>
        <div class="flex justify-center my-4 text-lg">
          <a class="mr-2" target="_blank" href="https://github.com/hellodhlyn"><ion-icon name="logo-github" /></a>
          <a class="mr-2" target="_blank" href="https://twitter.com/hellodhlyn"><ion-icon name="logo-twitter" /></a>
          <a class="mr-2" target="_blank" href="https://instagram.com/hellodhlyn"><ion-icon name="logo-instagram" /></a>
          <a href="mailto:hellodhlyn@gmail.com"><ion-icon name="mail" /></a>
        </div>
      </div>
    </div>
    <div class="absolute w-full z-20 md:tracking-widest">
      <div class="flex py-8 justify-center text-gray-300">
        <p class="mr-4 hover:underline">
          <nuxt-link :to="{name: 'blog'}">BLOG</nuxt-link>
        </p>
        <p class="mr-4 hover:underline">
          <nuxt-link :to="{name: 'wiki'}">WIKI</nuxt-link>
        </p>
        <p class="mr-4 hover:underline">
          <nuxt-link :to="{name: 'profile'}">PROFILE</nuxt-link>
        </p>
        <p class="hover:underline">
          <nuxt-link :to="{name: 'projects'}">PROJECTS</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>
