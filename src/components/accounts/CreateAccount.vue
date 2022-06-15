<template>
  <div class="container" v-if="this.$store.getters.isAuthenticated">
    <form action="">
      <div class="container px-3">
        <h3>Create new account</h3>

        <label for="userid">User-Id </label>
        <div class="divider" />
        <input class="userid" type="text" v-model="userid" />

        <br /><br />

        <label for="dropdown">Type of account </label>

        <div class="divider" />
        <select v-model="selectedType">
          <option v-for="type in accountType" :key="type">{{ type }}</option>
        </select>

        <br /><br />

        <button
          type="button"
          margin-right="10px"
          class="btn btn-success"
          @click="createAccount()"
        >
          Create
        </button>
        <div class="divider" />
        <button
          type="button"
          class="btn btn-danger"
          @click="this.$router.go(-1)"
        >
          Cancel
        </button>
      </div>
    </form>
    <br>
    <label>{{ message }}</label>
    <br />
    <label> Account ID: </label>
    <div class="divider" />
    <label>{{ account.accountId }}</label>
    <br>
    <label> IBAN: </label>
    <div class="divider" />
    <label>{{ account.IBAN }}</label>
    <br />
    <label> User ID: </label>
    <div class="divider" />
    <label>{{ account.userId }}</label>
    <br />
    <label> Account Type: </label>
    <div class="divider" />
    <label>{{ account.accountType }}</label>
    <br />
    <label> Absolute Limit: </label>
    <div class="divider" />
    <label>{{ account.absoluteLimit }}</label>
    <br />
    <label> Current Balance: </label>
    <div class="divider" />
    <label>{{ account.currentBalance }}</label>
    <br />
  </div>
  <!-- v-else -->
  <div v-else class="container">
    <div class="alert alert-info">
      <h4>You are not logged in</h4>
      <p>Please click the button to login.</p>
      <router-link to="/login">
        <button type="button" class="btn btn-primary">Login here</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
export default {
   props: {
    id: Number,
  },
  data() {
    return {
      accountType: ["current", "saving"],
      selectedType: null,
      userid: this.id,
      message: "Result...",
      account: [],
    };
  },

  methods: {
    createAccount() {
      this.message = null;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .post("/accounts", {
          accountType: this.selectedType,
          userId: this.userid,
        })
        .then((res) => {
          this.account = res.data;
          this.message = "Account created successfully";
          console.log(res.data);
        })
        .catch((error) => (this.message = error.response.data.message));
    },
  },
};
</script>

<style>
.divider {
  width: 8px;
  height: auto;
  display: inline-block;
}
</style>