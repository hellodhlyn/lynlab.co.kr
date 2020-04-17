<template>
  <div id="resume" class="bg-gray-000 =">
    <div class="mx-auto container px-4 sm:px-8 pt-8">
      <p class="text-4xl text-gray-800 font-bold pb-8">Resume</p>
    </div>

    <div class="container mx-auto px-4 sm:px-8 pb-16 leading-loose">
      <p class="text-3xl text-gray-800 font-bold pb-4">도회린 (Do Hoerin)</p>
      <p class="mb-4">
        {{ new Date().getFullYear() - 2007 }}년 째 소프트웨어를 만들고 있는 개발 중독자입니다. 백엔드 개발, 클라우드, 데브옵스 등을 공부하고 있습니다.<br>
        핀테크 업체 <a href="https://dunamu.com" target="_blank" class="text-blue-600 hover:text-blue-900">두나무</a>에서 암호화폐 거래소 업비트의 메인 백엔드 시스템을 개발, 운영하고 있습니다.
      </p>

      <p>Contact me by:</p>
      <ul class="list-disc list-inside ml-4">
        <li><a href="mailto:hellodhlyn@gmail.com" class="text-blue-600 hover:text-blue-900">hellodhlyn@gmail.com</a></li>
        <li>@hellodhlyn on <a href="https://twitter.com/hellodhlyn" target="_blank" class="text-blue-600 hover:text-blue-900">twitter</a>, <a href="https://instagram.com/hellodhlyn" target="_blank" class="text-blue-600 hover:text-blue-900">instagram</a>, etc...</li>
      </ul>
    </div>

    <div v-for="sub in resume" :key="sub.subject" class="container mx-auto px-4 sm:px-8 pb-16 leading-loose">
      <p class="text-3xl text-gray-800 font-bold">{{ sub.subject }}</p>
      <div v-for="item in sub.items" :key="item.title" :class="item.projects ? 'py-2' : 'pt-2'">
        <p class="text-xl font-medium text-gray-800">
          {{ item.title }}
          <span class="text-base font-normal">{{ item.subtitle }}</span>
        </p>
        <p v-if="item.description">{{ item.description }}</p>
        <div class="flex flex-wrap py-2">
          <div v-for="prj in item.projects" :key="prj.title" class="flex-none w-full xl:w-1/2 p-1 leading-normal">
            <div class="md:h-40 flex flex-col md:flex-row shadow-lg rounded">
              <img class="w-full h-40 md:h-full md:w-1/4 object-cover rounded-t md:rounded-none md:rounded-l" :src="prj.thumbnail || '/images/header.jpg'">
              <div class="w-full md:w-3/4 p-3 bg-white rounded-b md:rounded-none md:rounded-r">
                <p class="text-lg font-bold">{{ prj.title }}</p>
                <p class="font-normal text-xs pb-1 text-blue-600">
                  <a v-if="prj.url" class="mr-1 hover:text-blue-900" :href="prj.url" target="_blank">
                    <icon-text icon="link" :text="prj.url.replace('https://', '')" />
                  </a>
                  <a v-if="prj.github" class="mr-2 hover:text-blue-900" :href="`https://github.com/${prj.github}`" target="_blank">
                    <icon-text icon="logo-github" :text="prj.github" />
                  </a>
                </p>
                <p class="text-sm">{{ prj.description }}</p>
                <div class="flex flex-wrap pt-2">
                  <span v-for="skill in prj.skills" :key="skill" class="px-1 mr-1 mb-1 text-sm bg-gray-700 text-gray-100 font-medium rounded">{{ skill }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resume from '../assets/data/resume';

export default {
  data() {
    return { resume };
  },
  head() {
    return { title: 'Resume | LYnLab' };
  },
};
</script>
