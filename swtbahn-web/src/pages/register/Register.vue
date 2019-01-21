<template>
  <div class="register">
    <card header-text="Create User">
      <form @submit.prevent="handleSubmit">
        <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-user"></i>
            </div>
            <input
              type="text"
              v-model="user.username"
              v-validate="'required'"
              name="username"
              placeholder="username"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('username') }"
            >
            <div
              v-if="submitted && errors.has('username')"
              class="invalid-feedback"
            >{{ errors.first('username') }}</div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-key"></i>
            </div>
            <input
              type="password"
              v-model="user.password"
              v-validate="{ required: true, min: 6 }"
              name="password"
              placeholder="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && errors.has('password') }"
            >
            <div
              v-if="submitted && errors.has('password')"
              class="invalid-feedback"
            >{{ errors.first('password') }}</div>
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">
              <i class="fa fa-user-circle"></i>
            </div>
            <select
              name="userType"
              class="form-control"
              v-model="user.userType"
              v-validate="'required'"
              :class="{ 'is-invalid': submitted && errors.has('userType') }"
            >
              <option value>Select a user type</option>
              <option
                v-for="userrole in userTypeArray"
                v-bind:value="userrole"
                v-bind:key="userrole"
              >{{userrole}}</option>
            </select>
            <div
              v-if="submitted && errors.has('userType')"
              class="invalid-feedback"
            >{{ errors.first('userType') }}</div>
          </div>
        </div>
        <div class="form-actions form-group">
          <button
            class="btn btn-success btn-md"
            type="submit"
            :disabled="status.registering"
          >Sign Up</button>
          <img
            v-show="status.registering"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          >
          <button type="submit" class="btn btn-primary btn-md float-right">
            <router-link class="link text-light float-right" :to="{name: 'login'}">Already joined?</router-link>
          </button>
        </div>
      </form>
    </card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Register",
  data() {
    return {
      user: {
        username: "",
        password: "",
        userType: ""
      },
      submitted: false,
      userTypeArray: ["Driver", "Monitor", "Stellwerk"]
    };
  },
  computed: {
    ...mapState("account", ["status"]),
    ...mapState({
      alert: state => state.alert
    })
  },
  methods: {
    ...mapActions("account", ["register"]),
    handleSubmit(e) {
      this.submitted = true;
      this.$validator.validate().then(valid => {
        if (valid) {
          this.register(this.user);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.register {
  h2 {
    text-align: center;
  }
  width: 21.375rem;

  .down-container {
    margin-top: 2.6875rem;
  }
}
</style>
