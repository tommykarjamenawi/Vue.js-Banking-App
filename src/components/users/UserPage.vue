<template>
  <!-- make a card with user object information -->
  <div v-if="this.$store.getters.isAuthenticated" class="container">
    <!-- User Details Card -->
    <div class="card-wrapper">
      <!-- BG -->
      <div class="card-wrapper__bg">
        <div class="card-wrapper__cover-bg"></div>
        <div class="card-wrapper__profile-pic">
          <img
            src="https://i.pinimg.com/originals/d8/a0/1e/d8a01e34926bdb7eb9e1fb506d0aea1b.jpg"
          />
        </div>
      </div>
      <!-- card details -->
      <div class="card-wrapper__details">
        <!-- First Fold -->
        <div class="card-wrapper__user-details">
          <div class="text-center card-wrapper__user-name">
            {{ this.$store.state.loggedInUser.fullname }}
          </div>
          <div
            class="
              text-center
              card-wrapper__designation card-wrapper__user-detail
            "
            v-for="role in this.$store.state.loggedInUser.roles"
            :key="role"
          >
            {{ role }}
          </div>
        </div>
        <!-- Second Fold -->
        <div class="card-wrapper__user-contact-info-wrapper text-center">
          <!-- email details -->
          <div
            class="
              card-wrapper__user-contact-info
              card-wrapper__user-contact-info--email
            "
          >
            <div class="card-wrapper__user-contact-info-label">Username</div>
            <div class="card-wrapper__user-contact-info-value">
              {{ this.$store.state.loggedInUser.username }}
            </div>
          </div>
          <!-- phone details -->
          <div
            class="
              card-wrapper__user-contact-info
              card-wrapper__user-contact-info--email
            "
          >
            <div class="card-wrapper__user-contact-info-label">Day Limit</div>
            <div class="card-wrapper__user-contact-info-value">
              {{ this.$store.state.loggedInUser.dayLimit }}
            </div>
          </div>
          <div
            class="
              card-wrapper__user-contact-info
              card-wrapper__user-contact-info--email
            "
          >
            <div class="card-wrapper__user-contact-info-label">
              Transaction Limit
            </div>
            <div class="card-wrapper__user-contact-info-value">
              {{ this.$store.state.loggedInUser.transactionLimit }}
            </div>
          </div>
          <div
            class="
              card-wrapper__user-contact-info
              card-wrapper__user-contact-info--email
            "
          >
            <div class="card-wrapper__user-contact-info-label">
              Remaining Day Limit
            </div>
            <div class="card-wrapper__user-contact-info-value">
              {{ this.$store.state.loggedInUser.remainingDayLimit }}
            </div>
          </div>
        </div>
      </div>
      <!-- create edit button -->
      <button
        type="button"
        class="btn btn-primary position-absolute start-50 translate-middle my-1"
        @click="editUser(this.$store.state.loggedInUser.userId)"
      >
        Edit
      </button>
    </div>
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
export default {
  name: "UserPage",
  data() {
    return {
    };
  },
  methods: {
    editUser(id) {
      this.$router.push("/edituser/" + id);
    },
  },
  created() {
    // go to /login if not logged in
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/login");
    }
    this.$store.dispatch("setLogin", this.$store.state.loggedInUser.userId);
  },
  mounted() {
    // go to /login if not logged in
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/login");
    }
    this.$store.dispatch("setLogin", this.$store.state.loggedInUser.userId);
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 80%;
}
h1 {
  text-align: center;
}
button {
  margin: 0 auto;
}
</style>