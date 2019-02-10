import Vue from 'vue';
import AddThis from 'vue-simple-addthis-share';
import { ListLoader } from 'vue-content-loader';
import VueDisqus from 'vue-disqus';
import VueMoment from 'vue-moment';
import marked from 'marked';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.component('AddThis', AddThis);
Vue.component('ListLoader', ListLoader);
Vue.use(VueDisqus);
Vue.use(VueMoment);
Vue.filter('marked', input => marked(input));

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
