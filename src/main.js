import Vue from 'vue'
import App from './App.vue'

import media from "./mixins/media";
import refs from "./mixins/refs";

Vue.config.productionTip = false;

Vue.mixin(media);
Vue.mixin(refs);

new Vue({
  render: h => h(App),
}).$mount('#app');
