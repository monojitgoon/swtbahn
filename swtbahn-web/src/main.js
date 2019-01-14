import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import { routes } from "./router/routes";
import { index } from "./components/index";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

// Router
Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 }),
  mode: "hash"
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  components: { App }
});
