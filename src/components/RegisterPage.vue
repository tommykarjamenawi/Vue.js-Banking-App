<template>
  <!-- fancy register form -->
  <section class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <h1>Register</h1>
        <!-- error card show if errormessage size is 1 or more -->
        <div
          v-if="errorMessage.length > 0"
          class="alert alert-danger"
          role="alert"
        >
          <!-- show each string in errorMessage -->
          <ul>
            <li v-for="error in errorMessage" :key="error">
              {{ error }}
            </li>
          </ul>
        </div>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="this.registerAttempt.username"
            />
          </div>
          <!-- fullname -->
          <div class="form-group">
            <label for="fullname">Fullname</label>
            <input
              type="text"
              class="form-control"
              id="fullname"
              v-model="this.registerAttempt.fullname"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="this.registerAttempt.password"
            />
          </div>
          <div class="form-group">
            <label for="passwordConfirm">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="passwordConfirm"
              v-model="this.passwordConfirm"
            />
          </div>
          <!-- select customer or employee -->
          <div v-if="this.$store.getters.isAdmin" class="form-group">
            <label for="userType">User Type</label>
            <select class="form-control" id="userType" v-model="this.userType">
              <option value="customer">customer</option>
              <option value="employee">employee</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "RegisterPage",
  data() {
    return {
      passwordConfirm: "",
      userType: "",
      registerAttempt: {
        username: "",
        fullname: "",
        password: "",
        createEmployee: 0,
      },
      errorMessage: [],
    };
  },
  methods: {
    inputValidation() {
      // clear errorMessage
      this.errorMessage = [];
      //   counter
      let counter = 0;
      if (this.registerAttempt.password != this.passwordConfirm) {
        // add error message to errorMessage using spread
        this.errorMessage = [...this.errorMessage, "passwords do not match"];
        counter++;
      }
      if (this.registerAttempt.username == "") {
        this.errorMessage = [...this.errorMessage, "username is required"];
        counter++;
      }
      if (this.registerAttempt.password == "" || this.passwordConfirm === "") {
        this.errorMessage = [...this.errorMessage, "password is required"];
        counter++;
      }
      if (this.registerAttempt.fullname == "") {
        this.errorMessage = [...this.errorMessage, "fullname is required"];
        counter++;
      }
      // if (this.userType != "customer"  this.userType != "employee") {
      //   this.errorMessage = [...this.errorMessage, "user type is required"];
      //   counter++;
      // }
      if (counter > 0) {
        return false;
      } else {
        this.registerAttempt.createEmployee =
          this.userType === "employee" ? 1 : 0;
        return true;
      }
    },
    register() {
      if (this.inputValidation()) {
        // send registerAttempt to server
        this.$store
          .dispatch("register", this.registerAttempt)
          .then(() => {
            // clear registerAttempt
            this.registerAttempt = {
              username: "",
              fullname: "",
              password: "",
              createEmployee: 0,
            };
            // clear passwordConfirm
            this.passwordConfirm = "";
            // clear userType
            this.userType = "";
            // redirect to users
            this.$router.push("/users");
          })
          .catch((error) => {
            // add error message to errorMessage using spread
            if (error.response.status === 403) {
              this.errorMessage = [...this.errorMessage, "User already exists"];
            } else {
              this.errorMessage = [
                ...this.errorMessage,
                "Failed to create user, please try again",
              ];
            }
          });
      }
    },
  },
  created() {},
};
</script>

<style scoped>
/* button spacing top */
button {
  margin-top: 1rem;
}
</style>