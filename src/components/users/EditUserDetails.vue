<template>
  <section>
    <div v-if="this.$store.getters.isAuthenticated" class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Edit a user</h2>

        <div v-if="!this.$store.getters.isAdmin || this.$store.state.loggedInUser.userId == this.id" class="input-group mb-3">
          <span class="input-group-text">Fullname</span>
          <input
            type="text"
            class="form-control"
            v-model="changedUser.fullname"
          />
        </div>

        <div v-if="!this.$store.getters.isAdmin || this.$store.state.loggedInUser.userId == this.id" class="input-group mb-3">
          <span class="input-group-text">Password</span>
          <input
            type="password"
            class="form-control"
            v-model="changedUser.password"
          />
        </div>

        <div v-if="this.$store.getters.isAdmin" class="input-group mb-3">
          <span class="input-group-text">role</span>
          <select id="selectedRole" class="form-control">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        <div v-if="this.$store.getters.isAdmin" class="input-group mb-3">
          <span class="input-group-text">Day Limit</span>
          <input
            type="text"
            class="form-control"
            v-model="changedUser.dayLimit"
          />
        </div>

        <div v-if="this.$store.getters.isAdmin" class="input-group mb-3">
          <span class="input-group-text">Transaction Limit</span>
          <input
            type="text"
            class="form-control"
            v-model="changedUser.transactionLimit"
          />
        </div>

        <div class="input-group mt-4">
          <button type="button" class="btn btn-primary" @click="editUser">
            Save changes
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            @click="this.$router.push('/profile')"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
    <div v-else class="container">
    <div class="alert alert-info">
      <h4>You are not logged in</h4>
        <p>Please click the button to login. </p>
        <router-link to="/login">
          <button type="button" class="btn btn-primary">Login here</button>
        </router-link>
    </div>
  </div>
  <!-- button  -->

  </section>
</template>

<script>
import axios from "../../axios-auth";
export default {
  name: "EditUserDetails",
  data() {
    return {
      id: "",
      changedUser: {
        userId: 0,
        fullname: "",
        password: "",
        createEmployee: 0,
        dayLimit: 0.0,
        transactionLimit: 0.0,
        remainingDayLimit: 0.0,
      },
    };
  },
  methods: {
    editUser() {
      // if selectedRole selected value is user, set createEmployee to 1 else 0
      // check if is authenticated and if user is admin
      if (
        this.$store.getters.isAuthenticated &&
        this.$store.getters.isAdmin
      ) {
        if (document.getElementById("selectedRole").value == "user") {
          this.changedUser.createEmployee = 0;
        } else {
          this.changedUser.createEmployee = 1;
        }
      }

      this.changedUser.userId = this.id;
      axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
      axios
        .put("/users/" + this.id, this.changedUser)
        .then((response) => {
          console.log(response);
          if (this.$store.getters.isAdmin){
            this.$router.push("/users");
          } else {
            this.$store.dispatch("setLogin", this.$store.state.loggedInUser.userId);
            this.$router.push("/profile");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.id = this.$route.params.id;
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get("/users/" + this.id)
      .then((response) => {
        //console.log(response.data);
        this.changedUser.userId = response.data.userId;
        this.changedUser.fullname = response.data.fullname;
        this.changedUser.dayLimit = response.data.dayLimit;
        this.changedUser.transactionLimit = response.data.transactionLimit;
        this.changedUser.remainingDayLimit = response.data.remainingDayLimit;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>