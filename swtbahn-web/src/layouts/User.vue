<template>
  <div class="row">
    <div class="col-xs-12 col-md-12">
      <card header-text="Existing Users">
        <em v-if="users.loading">Loading users...</em>
        <span v-if="users.error" class="text-danger">ERROR: {{users.error}}</span>
        <div class="table-responsive">
          <table class="table table-striped first-td-padding">
            <thead>
              <tr>
                <td>Username</td>
                <td>UserType</td>
                <td>Delete</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.items" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.userType }}</td>
                <td>
                  <span v-if="user.deleting">
                    <em>- Deleting...</em>
                  </span>
                  <span
                    v-else-if="user.deleteError"
                    class="text-danger"
                  >- ERROR: {{user.deleteError}}</span>
                  <span v-else>
                    <a
                      @click="deleteUser(user.id)"
                      class="text-danger"
                      v-if="user.userType != 'Admin'"
                    >- Delete</a>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "users",
  computed: {
    ...mapState({
      account: state => state.account,
      users: state => state.users.all
    })
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete"
    })
  }
};
</script>