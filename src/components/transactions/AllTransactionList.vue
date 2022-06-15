<template>
  <div class="container" v-if="this.$store.getters.isAuthenticated">
    <button type="button" class="btn btn-success" @click="this.$router.push('/createTransaction/'+ null)">
        Create transaction
      </button>
     <br> <br>
     <h4>All Transaction</h4>
     <br> <br>
    <table>
      <tr>
        <th>id</th>
        <th>Datetime</th>
        <th>From Account</th>
        <th>Transfered To</th>
        <th>Amount</th>
        <th>Transaction Type</th>
      </tr>
      <br>
      <tr v-for="transaction in transactions" :key="transaction.transactionId">

        <td>{{ transaction.transactionId }}</td>
        <td>{{ transaction.timestamp }}</td>
        <td>{{ transaction.fromAccount }}</td>
        <td>{{ transaction.toAccount }}</td>
        <td>{{ transaction.amount }}</td>
         <td>{{ transaction.transactionType }}</td>
        </tr>
    </table>
    <br>
      <button class="btn btn-info" @click="showMore()">
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
  name: "Transactions",

  data() {
    return {
      transactions: [],
      errorMessage: null,
      skip:0,
      limit:5,

    };
  },
  

  methods: {
    

   showMore(){
     this.limit=this.limit+5
     axios
      .get("/transactions?startDate=2022-04-03&endDate=2025-04-03&skip="+this.skip+"&limit="+this.limit)
      .then((res) => {
        this.transactions = res.data;
      })
      .catch((error) => console.log(error));    
  
   }
  },

  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get("/transactions?startDate=2022-04-03&endDate=2025-04-03&skip="+this.skip+"&limit="+this.limit)
      .then((res) => {
        this.transactions = res.data;
      })
      .catch((error) => console.log(error));    
  },
};
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}

.divider {
  width: 8px;
  height: auto;
  display: inline-block;
}
</style>