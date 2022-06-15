<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6 center">
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
          </div>
          <form>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username</label>
              <input
                id="inputUsername"
                type="text"
                class="form-control"
                v-model="username"
              />
            </div>
            <div class="mb-3">
              <label for="inputPassword" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="inputPassword"
                v-model="password"
              />
            </div>
            <div class="">
              <button
                type="button"
                @click="login()"
                class="btn btn-outline-primary mr-1"
              >
                Login
              </button>
              <button
                type="button"
                @click="register()"
                class="btn btn-outline-secondary"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    showLog() {
      console.log(this.username);
    },
    login() {
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$store.dispatch("setLogin");
          this.$router.push("/profile");
        })
        .catch((error) => {
          this.errorMessage = "invalid username or password";
          console.log(error);
        });
    },
    register() {
      this.$router.push("/register");
    },
  },
  mounted() {
    
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
</style>