/*
 *
 * Copyright (C) 2019 University of Bamberg, Software Technologies Research Group
 * <https://www.uni-bamberg.de/>, <http://www.swt-bamberg.de/>
 *
 * This file is part of the SWTbahn Web interface (swtbahn-web), which is
 * a client-side application to interactively control a server side CLI application through a BiDiB model railway.
 *
 * swtbahn-web is licensed under the GNU GENERAL PUBLIC LICENSE (Version 3), see
 * the LICENSE file at the project's top-level directory for details or consult
 * <http://www.gnu.org/licenses/>.
 *
 * swtbahn-web is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or any later version.
 *
 * swtbahn-web is a RESEARCH PROTOTYPE and distributed WITHOUT ANY WARRANTY, without
 * even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 * PURPOSE. See the GNU General Public License for more details.
 *
 * The following people contributed to the conception and realization of the
 * present swtbahn-web (in alphabetic order by surname):
 *
 * - Monojit Goon
 * - Lucky Sutradhar
 */
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

Vue.use(Vuetify, { iconfont: "fa4" });
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
