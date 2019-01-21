<template>
  <header id="basix-header" class="header">
    <div class="header-menu">
      <div class="row">
        <div class="col-sm-12">
          <div class="user-area dropdown float-right">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              :class="{'show': isActive, '': !isActive }"
              @click="handleClick"
            >
              <strong>Hi {{account.user.username}} &nbsp;</strong>
              <img class="user-avatar rounded-circle" src="../images/user.jpg" alt="User Avatar">
            </a>

            <div
              class="user-menu dropdown-menu"
              :class="{'show': isActive, '': !isActive }"
              @click="handleClick"
            >
              <a class="nav-link" href="#">
                <router-link to="auth/login">
                  <i class="fa fa-power-off"></i>Logout
                </router-link>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- /header -->
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "basix-header",
  computed: {
    ...mapState({
      account: state => state.account
    })
  },
  data() {
    return {
      isActive: false,
      isOpen: false
    };
  },
  methods: {
    toggle(e) {
      //this.isOpen = !this.isOpen
      e.target.parentElement.classList.toggle("close");
    },
    handleClick(e) {
      this.isActive = !this.isActive;
      // if(e.target.className == "noclass"){
      //     e.target.className = "link active";
      // } else{
      //     e.target.className = "noclass";
      // }
    }
  }
};
</script>

<style>
header .form-inline .search-form button {
  cursor: pointer;
}
</style>