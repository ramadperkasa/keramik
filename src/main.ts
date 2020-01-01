import Vue from "vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import * as firebase from "firebase/app";
import "@firebase/messaging";
// const Auth = require('./auth');
const config = {
  apiKey: "AIzaSyDhJmb-IMq9MYoo0W3YNAxEVO2Gg6KSkN8",
  authDomain: "kadin-18aa3.firebaseapp.com",
  databaseURL: "https://kadin-18aa3.firebaseio.com",
  projectId: "kadin-18aa3",
  storageBucket: "kadin-18aa3.appspot.com",
  messagingSenderId: "833165555030",
  appId: "1:833165555030:web:28fff15f024ccd7e15d2f7",
  measurementId: "G-FKFK7QNX68"
};
// 4. Get Firebase Configuration
firebase.initializeApp(config);

// component
import App from "./App.vue";

import Main from "./layout/Main.vue";
Vue.component("app", Main);

import Galeri from "./components/Galeri.vue";
Vue.component("c-galeri", Galeri);

import axios from "axios";
import VueAxios from "vue-axios";
import "./registerServiceWorker";

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// Vue.axios.defaults.headers.common["Authorization"] = "Bearer " + Auth.getToken();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
