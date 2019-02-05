<template>
  <div class="login">
    <card header-text="Welcome !">
      <div class="card-body card-block">
        <form @submit.prevent="handleSubmit">
          <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-user"></i>
              </div>
              <input
                type="text"
                v-model="username"
                name="username"
                placeholder="username"
                class="form-control"
                :class="{ 'is-invalid': submitted && !username }"
              >
              <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-key"></i>
              </div>
              <input
                type="password"
                v-model="password"
                name="password"
                placeholder="password"
                class="form-control"
                :class="{ 'is-invalid': submitted && !password }"
              >
              <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
          </div>
          <div class="form-actions form-group">
            <button type="submit" class="btn btn-success btn-md" :disabled="status.loggingIn">Log In</button>
            <img
              v-show="status.loggingIn"
              src="../../images/loading.gif"
              style="height:20px;width:20px"
            >
            <button type="submit" class="btn btn-primary btn-md float-right">
              <router-link
                class="link text-light float-right"
                :to="{name: 'Register'}"
              >Create Account</router-link>
            </button>
          </div>
        </form>
      </div>
    </card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapState({
      alert: state => state.alert
    })
  },
  created() {
    // reset login status
    this.logout();
  },
  mounted() {},
  methods: {
    ...mapActions("account", ["login", "logout"]),
    handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;
      if (username && password) {
        this.login({ username, password });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card-title {
  padding-left: 20px;
}
</style>