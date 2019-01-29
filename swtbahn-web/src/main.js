import Vue from "vue";
import VeeValidate from "vee-validate";

import App from "./App.vue";
import { store } from "./_store";
import VueRouter from "vue-router";
import { routes } from "./router/routes";
import { index } from "./components/index";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import SVG from "svg.js";

Vue.use(Vuetify);
Vue.use(VeeValidate);
// setup fake backend
import { configureFakeBackend } from "./_helpers";
configureFakeBackend();
// Router
Vue.use(VueRouter);
export const router = new VueRouter({
  mode: "hash",
  routes,
  index,
  SVG,
  linkActiveClass: "open active",
  scrollBehavior: () => ({ y: 0 })
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/auth/login", "/auth/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    return next("/auth/login");
  }
  next();
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App),
  components: { App }
});
