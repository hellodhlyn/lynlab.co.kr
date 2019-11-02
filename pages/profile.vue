<template>
  <div id="profile" class="py-8">
    <div id="profile-exp" class="py-8 text-gray-900">
      <div class="container mx-auto px-4">
        <p class="pb-4 text-4xl">
          Profile
        </p>
        <div v-for="exp in experiences" :key="exp.title" class="pb-8 leading-loose">
          <p class="text-2xl">
            {{ exp.title }}
          </p>
          <div v-for="item in exp.items" :key="item.title">
            <p class="font-medium">
              {{ item.title }}
              <span class="text-sm text-gray-700 font-normal">{{ item.description }}</span>
            </p>
            <ul class="list-disc list-inside mb-4 md:pl-4 text-sm md:text-base">
              <li v-for="detail in item.details" :key="detail">
                {{ detail }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="profile-articles" class="py-8 text-gray-100 bg-gray-900">
      <div class="container mx-auto px-4">
        <p class="pb-4 text-4xl">
          Articles
        </p>
        <div class="flex flex-row flex-no-wrap container mt-4 overflow-x-auto px-2 pb-4 no-scrollbar">
          <div v-for="article in articles" :key="article.title" class="flex-none w-64 mr-2 rounded shadow-lg bg-gray-800 hover:bg-gray-700 leading-relaxed">
            <a :href="article.url" target="_blank">
              <img class="h-32 md:h-40 w-full object-cover" :src="article.thumbnail || '/images/header.jpg'">
              <div class="px-4 py-2">
                <p class="font-bold">{{ article.title }}</p>
                <p class="text-xs text-gray-300">{{ article.writer }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import articles from '../assets/data/articles';
import experiences from '../assets/data/experiences';

export default {
  asyncData() {
    return { articles, experiences };
  },
};
</script>

<style lang="scss" scoped>
.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
    display: none;
}
</style>
