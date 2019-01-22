<template>
  <div id="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <div class="admin-container" v-else>
      <Sidebar :navItems="computedfilteredNavs"/>
      <div id="right-panel" class="right-panel">
        <Header/>
        <div class="content pb-0">
          <transition enter-active-class="animated fadeIn">
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
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      navs: nav.items
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
      account: state => state.account,
      alert: state => state.alert
    }),
    computedfilteredNavs() {
      if (this.account.user.userType === "Driver") {
        let filteredNavs = this.navs.filter(n => {
          return (
            n.name === "Trackboard" ||
            n.name === "Driver" ||
            n.name === "User Options"
          );
        });
        return filteredNavs;
      } else if (this.account.user.userType === "Monitor") {
        let filteredNavs = this.navs.filter(n => {
          return (
            n.name === "Trackboard" ||
            n.name === "Monitor" ||
            n.name === "User Options"
          );
        });
        return filteredNavs;
      } else if (this.account.user.userType === "Stellwerk") {
        let filteredNavs = this.navs.filter(n => {
          return (
            n.name === "Trackboard" ||
            n.name === "Stellwerk" ||
            n.name === "User Options"
          );
        });
        return filteredNavs;
      } else return this.navs;
    }
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
