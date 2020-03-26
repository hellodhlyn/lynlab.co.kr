<template>
  <div id="wiki-modify-title" class="container max-w-4xl mx-auto p-4 md:p-8">
    <p class="text-4xl text-gray-800 font-bold">{{ title }} 문서 {{ documentExists ? '편집' : '생성' }}</p>
    <form @submit.prevent="onSubmit()">
      <div class="py-2">
        <p class="pb-2">요약</p>
        <textarea v-model="editorDescription" class="w-full p-2 text-sm border border-gray-300 rounded" rows="3" />
      </div>

      <div class="py-2">
        <p class="pb-2">본문</p>
        <textarea v-model="editorBody" class="w-full p-2 text-sm border border-gray-300 rounded" rows="10" />
      </div>

      <div class="py-2">
        <p class="pb-2">코멘트</p>
        <input v-model="editorChangelog" type="text" class="w-full p-2 text-sm border border-gray-300 rounded">
      </div>

      <div class="text-center py-4">
        <button type="submit" class="px-8 py-2 bg-blue-500 hover:bg-blue-600 text-gray-000 font-bold rounded">
          <icon-text icon="save" text="저장" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { queryWiki, mutateWiki } from '../../../components/lynlab-api';

export default {
  async asyncData({ params, error }) {
    const queryString = `document(title: """${params.title}""") {
      lastRevision { description body }
    }`;

    try {
      const { document } = await queryWiki(queryString);
      return {
        title: params.title,
        documentExists: !!document,
        editorDescription: document ? document.lastRevision.description : '',
        editorBody: document ? document.lastRevision.body : '',
        editorChangelog: '',
      };
    } catch {
      return error({ stautsCode: 400, message: 'Failed to fetch the document' });
    }
  },
  methods: {
    async onSubmit() {
      if (!this.editorBody) {
        return;
      }

      const mutation = this.documentExists ? 'createRevision' : 'createDocument';
      await mutateWiki(`${mutation}(input: {
        title: """${this.title}"""
        description: ${this.editorDescription ? `"""${this.editorDescription}"""` : null}
        body: """${this.editorBody}"""
        changelog: ${this.editorChangelog ? `"""${this.editorChangelog}"""` : null}
      }) { createdAt }`);

      this.$router.push({ name: 'wiki-title', params: { title: this.title } });
    },
  },
};
</script>
