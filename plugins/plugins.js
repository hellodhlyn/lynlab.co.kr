import Vue from 'vue';

import AddThis from 'vue-simple-addthis-share';
import VueDisqus from 'vue-disqus';
import VueMoment from 'vue-moment';
import marked from 'marked';


Vue.component('AddThis', AddThis);
Vue.use(VueDisqus);
Vue.use(VueMoment);

Vue.filter('marked', input => marked(input));
