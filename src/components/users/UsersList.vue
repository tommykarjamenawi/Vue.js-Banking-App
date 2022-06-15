<template>
  <div
    v-if="this.$store.getters.isAdmin && this.$store.getters.isAuthenticated"
    class="container"
  >
    <!-- toggle that changes withoutAccount-->
    <!-- Default unchecked -->
    <div class="custom-control custom-switch">
      <input
        type="checkbox"
        class="custom-control-input"
        id="customSwitch1"
        @click="changeWithoutAccount"
      />
      <label class="custom-control-label" for="customSwitch1"
        >Without Account</label
      >
    </div>

    <!-- table with all objects in users -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th># id</th>
          <th>Fullname</th>
          <th>Role</th>
          <th>Day Limit</th>
          <th>Transaction Limit</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.userId }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.roles }}</td>
          <td>{{ user.dayLimit }}</td>
          <td>{{ user.transactionLimit }}</td>
          <td>
            <button class="btn btn-info" @click="editUser(user.userId)">
              Edit
            </button>
            <!-- create account button if withoutaccount is 1 -->
            <button
              v-if="this.withoutAccount == 1"
              class="btn btn-success"
              @click="createAccount(user.userId)"
            >
              Create Account
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pagination -->
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" @click="toPreviousPage()">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="changePage(0)">1</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="changePage(1)">2</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="changePage(2)">3</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="changePage(3)">4</a>
        </li>
        <li class="page-item">
          <a class="page-link" @click="changePage(4)">5</a>
        </li>
        <li class="page-item" @click="toNextPage()">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
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
  name: "UsersList",
  data() {
    return {
      id: 0,
      users: [],
      page: 0,
      withoutAccount: 0,
    };
  },
  methods: {
    toNextPage() {
      this.page++;
      this.getUsers();
    },
    toPreviousPage() {
      if (this.page > 0) {
        this.page--;
        this.getUsers();
      }
    },
    changeWithoutAccount() {
      // if checkbox is checked, set withoutAccount to 1
      if (document.getElementById("customSwitch1").checked) {
        this.withoutAccount = 1;
        this.getUsers();
        //
      } else {
        // if checkbox is unchecked, set withoutAccount to 0
        this.withoutAccount = 0;
        this.getUsers();
      }
    },
    changePage(page) {
      this.page = page;
      this.getUsers();
    },
    editUser(id) {
      this.$router.push("/edituser/" + id);
    },
    deleteUser(id) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete("/users/" + id)
        .then((response) => {
          console.log(response);
          this.getUsers();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUsers() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(
          "/users" +
            "?skip=" +
            this.page * 10 +
            "&limit=10" +
            "&withOutAccount=" +
            this.withoutAccount
        )
        .then((response) => {
          console.log(response.data);
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createAccount(id) {
      // redirect to create account page
      this.$router.push("/createaccount/" + id);
    },
  },
  created() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get(
        "/users" +
          "?skip=" +
          this.page * 10 +
          "&limit=10" +
          "&withOutAccount=" +
          this.withoutAccount
      )
      .then((response) => {
        console.log(response.data);
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
button {
  margin-left: 5px;
}
</style>