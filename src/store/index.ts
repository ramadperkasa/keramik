import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: "",
    icon: "mdi-id-card",
    pagination: [5, 10, 25, 50],
    loading: {
      submit: false,
      table: false
    },
    alert: {
      model: false,
      color: "",
      text: "lorem ipsum"
    },
    galeri: {
      model: false,
      id: "",
      loading: false
    }
  },
  mutations: {
    setAlertModel(model, state) {
      state.alert.model = model;
    },
    setAlertColor(model, state) {
      state.alert.color = model;
    },
    setSearch(state, data) {
      state.search = data;
    },
    setGaleriModel(state, data) {
      state.galeri.model = data;
    }
  },
  getters: {
    getAlert(state) {
      return state.alert;
    },
    getSearch(state) {
      return state.search;
    },
    getFormIcon(state) {
      return state.icon;
    },
    getPagination(state) {
      return state.pagination;
    },
    getGaleri(state) {
      return state.galeri;
    }
  },
  actions: {},
  modules: {}
});
