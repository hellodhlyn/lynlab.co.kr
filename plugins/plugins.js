import Vue from 'vue';

import AddThis from 'vue-simple-addthis-share';
import VueDisqus from 'vue-disqus';
import VueMoment from 'vue-moment';
import marked from 'marked';

import IconText from '../components/icon-text.vue';
import AuthenticatedVue from '../components/authenticated.vue';
import Navbar from '../components/navbar.vue';


Vue.component('AddThis', AddThis);
Vue.component('icon-text', IconText);
Vue.component('authenticated', AuthenticatedVue);
Vue.component('navbar', Navbar);
Vue.use(VueDisqus);
Vue.use(VueMoment);

Vue.filter('marked', input => marked(input));

Vue.config.ignoredElements = [
  'ion-icon',
  'ion-item',
];
