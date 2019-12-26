import Vue from "vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

// component
import App from "./App.vue";

import Main from "./layout/Main.vue";
Vue.component("app", Main);

import Galeri from "./components/Galeri.vue";
Vue.component("c-galeri", Galeri);

window.axios = require("axios");
window.axios.defaults.baseURL = "http://dev.dipointer.com:8007/api-backend/";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
