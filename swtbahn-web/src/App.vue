<template>
  <div id="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <div class="admin-container" v-else>
      <Sidebar :navItems="nav"/>
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
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  components: {
    AuthLayout,
    Header,
    Sidebar
  },

  created() {
    this.getUserWiseNav(this.account.user);
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
      alert: state => state.alert,
      nav: state => state.system.navigationItems
    })
  },
  methods: {
    ...mapActions({
      clearAlert: "alert/clear"
    }),
    ...mapActions("system", {
      getUserWiseNav: "loadNavForUserType"
    }),

    spliceNavItems: function(start, deleteCount) {
      this.nav = nav.items;
      this.nav.splice(start, deleteCount);
    }
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
