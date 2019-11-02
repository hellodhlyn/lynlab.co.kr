<template>
  <div id="projects" class="py-16 text-gray-900 bg-gray-100">
    <div class="container mx-auto px-4">
      <p class="pb-4 text-4xl">
        Projects
      </p>
      <div v-for="project in projects" :key="project.name" class="flex flex-col md:flex-row w-full my-6 bg-white shadow-lg">
        <img class="h-56 md:h-auto w-full md:w-56 border max-w-4xl object-cover rounded-t md:rounded-tr-none md:rounded-l" :src="project.thumbnail || '/images/header.jpg'">
        <div class="w-full md:w-3/4 flex-grow border-l border-b border-r md:border-l-0 md:border-t rounded-b md:rounded-bl-none md:rounded-r p-4">
          <p class="text-2xl font-medium">
            {{ project.name }}
          </p>
          <div class="flex flex-col lg:flex-row text-blue-600">
            <p><a v-if="project.url" class="mr-2" :href="`https://${project.url}`" target="_blank"><icon-text icon="link" :text="project.url" /></a></p>
            <p><a v-if="project.github" class="mr-2" :href="`https://github.com/${project.github}`" target="_blank"><icon-text icon="logo-github" :text="project.github" /></a></p>
          </div>
          <p class="py-2">
            {{ project.description }}
          </p>
          <p>
            <span v-for="skill in project.skills" :key="skill" class="mr-1 text-sm text-gray-700">#{{ skill }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import projects from '../assets/data/projects';

export default {
  asyncData() {
    return { projects };
  },
};
</script>
