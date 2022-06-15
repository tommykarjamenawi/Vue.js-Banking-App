<template>
  <div class="container" v-if="this.$store.getters.isAuthenticated">
    <div class="position-relative">
      <button
        type="button"
        class="btn btn-primary"
        @click="addAccount(null)"
      v-if="this.$store.getters.isAdmin">
        Create Account
      </button>
      <div>
        <label v-if="!this.$store.getters.isAdmin" >Total balance:</label>
        <div class="divider" />
        <label>{{ totalBalance }}</label>
      </div>
    </div>
    <br />
    <ol class="list-group list-group-numbered" v-if="!this.$store.getters.isAdmin">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        v-for="account in accounts"
        :key="account.accountType"
      >
        <div class="ms-2 me-auto" @click="showTransaction(account.IBAN)">
          <div class="fw-bold">
            {{ account.accountType }}
          </div>
          {{ account.IBAN }}
        </div>
        <span class="badge bg-primary fs-5 w-auto p-3" style="width: 7rem"
          >{{ account.currency }} {{ account.currentBalance }}</span
        >
      
      </li>
    </ol>
    <table v-if="this.$store.getters.isAdmin" class="table">
      <tr>
        <th>IBAN</th>
        <th>User ID</th>
        <th>Type</th>
        <th>Absolute Limit</th>
        <th>edit</th>
      </tr>
      <tr v-for="account in accounts" :key="account.accountId">
        <td @click="showTransaction(account.IBAN)">{{ account.IBAN }}</td>
        <td>{{ account.userId }}</td>
        <td>{{ account.accountType }}</td>
        <td>{{ account.absoluteLimit }}</td>
       <td> 
         <button  @click="editAbsolutLimit(account.IBAN)">
              Edit
            </button>
             <div class="divider" />
            <button  @click="deleteAccount(account.IBAN)">
              Delete
            </button>
      </td>
        </tr>
    </table>
    <br>
     <button type="button" class="btn btn-success" @click="showMore()">
        Show more
      </button>
  </div>
  <!-- v-else -->
  <div v-else class="container">
    <div class="alert alert-info">
      <h4>You are not logged in</h4>
        <p>Please click the button to login. </p>
        <router-link to="/login">
          <button type="button" class="btn btn-primary">Login here</button>
        </router-link>
    </div>
  </div>
</template>

<script>
import axios from "../../axios-auth";
export default {
  name: "AccountList",

  props: {
    iban: String,
    id: Number
  },
  data() {
    return {
      accounts: [],
      skip: 0,
      limit: 10,
     
      totalBalance: null,
      
    };
  },

  methods: {
  
    showMore(){
      this.limit=this.limit+1
       axios
      .get("/accounts?skip="+this.skip+"&limit="+this.limit)
      .then((res) => {
      this.accounts = res.data;
        // this.accounts.accountId = res.data.accountId;
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    },
    showTransaction(iban) {
      this.$router.push("/accounttransaction/" + iban);
    },
     addAccount(id) {
     this.$router.push('/createaccount/' + id);
    },
     editAbsolutLimit(iban) {
     this.$router.push('/editabsolutLimit/' + iban);
    },
     deleteAccount(iban) {
       axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
       axios
      .delete("/accounts/"+iban)
      .then((res) => {
        this.$router.push('/accountlist');
        console.log(res.data);
      })
      .catch((error) => console.log(error));
    },
  
  },
  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
   if (!this.$store.getters.isAdmin) {
     axios
      .get("/users/" + this.$store.state.loggedInUser.userId + "/accounts")
      .then((res) => {
        this.accounts = res.data;
        // this.accounts.accountId = res.data.accountId;
        console.log(res.data);
      })
      .catch((error) => console.log(error));

    axios
      .get("/users/" + this.$store.state.loggedInUser.userId + "/totalBalance")
      .then((res) => {
        this.totalBalance = res.data.totalBalance;
        console.log(res.data);
      })
      .catch((error) => console.log(error));
   }
   else{
      axios
      .get("/accounts?skip="+this.skip+"&limit="+this.limit)
      .then((res) => {
        this.accounts = res.data;
        // this.accounts.accountId = res.data.accountId;
        console.log(res.data);
      })
      .catch((error) => console.log(error));
   }

    
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