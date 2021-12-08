import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from "./router/router";
import axios from "axios";
import VueAxios from "vue-axios";
import i18n from './plugins/i18n'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

new Vue({
  i18n,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
