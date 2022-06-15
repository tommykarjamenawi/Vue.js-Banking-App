<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0" >
        <li class="nav-item">
          <router-link v-if="this.$store.getters.isAuthenticated" to="/accountlist" class="nav-link" active-class="active"
            >Accounts</router-link>
        </li>      
        <li class="nav-item" v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin">
          <router-link  to="/AllTransaction" class="nav-link" active-class="active"
            >Transactions</router-link
          >
        </li>
        <li class="nav-item">
            <router-link v-if="this.$store.getters.isAuthenticated" to="/profile" class="nav-link" active-class="active"
              >Profile</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin" to="/users" class="nav-link" active-class="active"
              >Users</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="this.$store.getters.isAuthenticated && this.$store.getters.isAdmin" to="/register" class="nav-link" active-class="active"
              >Create Users</router-link
            >
          </li>
          <li class="nav-item">
            <router-link v-if="!this.$store.getters.isAuthenticated" to="/login" class="nav-link" active-class="active"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="this.$store.getters.isAuthenticated">
            <button class="btn btn-info" @click="this.$store.dispatch('logout')">Logout</button>
          </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
   data() {
    return {
     

      
    };
  },
};
</script>

<style>
</style>