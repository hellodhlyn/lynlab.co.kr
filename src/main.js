import Vue from 'vue';

import AddThis from 'vue-simple-addthis-share';
import { ListLoader } from 'vue-content-loader';
import VueDisqus from 'vue-disqus';
import VueLocalStorage from 'vue-localstorage';
import VueMoment from 'vue-moment';
import markdownEditor from 'vue-simplemde/src/markdown-editor.vue';
import marked from 'marked';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icon'];

Vue.component('AddThis', AddThis);
Vue.component('ListLoader', ListLoader);
Vue.component('markdown-editor', markdownEditor);

Vue.use(VueDisqus);
Vue.use(VueLocalStorage);
Vue.use(VueMoment);

Vue.filter('marked', input => marked(input));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
