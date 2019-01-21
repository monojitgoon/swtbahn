<template>
  <div id="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <div class="admin-container" v-else>
      <Sidebar :navItems="nav"/>
      <div id="right-panel" class="right-panel">
        <Header/>
        <div class="content pb-0">
          <transition enter-active-class="animated fadeIn">
            <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nav from "./nav";
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      nav: nav.items
    };
  },
  components: {
    AuthLayout,
    Header,
    Sidebar
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    },
    isAuth() {
      return this.$route.path.match("auth");
    },
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    })
  },
  watch: {
    $route(to, from) {
      // clear alert on location change
      this.clearAlert();
    }
  }
};
</script>

<style lang="scss">
@import url("./assets/css/font-awesome.min.css");
@import url("./assets/css/themify-icons.css");
@import "./assets/scss/style";

button {
  cursor: pointer;
}
</style>
