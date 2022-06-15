<template>
  <div class="container" v-if="this.$store.getters.isAuthenticated">
    <button v-if="!this.$store.getters.isAdmin" type="button" class="btn btn-success" @click="createtransaction(account.IBAN)">
        Create transaction
      </button>
      
     <br> <br>
    <ol class="list-group list-group-numbered">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">{{ account.accountType }}</div>
          {{  account.IBAN }}
        </div>
        <span class="badge bg-primary fs-5 w-auto p-3" style="width: 7rem">{{
          account.currentBalance
        }}</span>
      </li>
    </ol>
    <br />
    <h1>Filter Transactions</h1>
    <form action="">
      <label>Start date: </label>
      <div class="divider" />
      <input type="date" v-model="startdate" />
      <div class="divider" />
      <div class="divider" />
      <label>Start date: </label>
      <div class="divider" />
      <input type="date" v-model="enddate"/>
      <div class="divider" />
      <div class="divider" />
      <input type="text" v-model="skip" placeholder="skip"/>
      <div class="divider" />
      <div class="divider" />
      <input type="text" v-model="limit" placeholder="limit"/>
      <div class="divider" />
      <div class="divider" />
      <button type="button" class="btn btn-success" @click="filtterByDate()">
        Search
      </button>
    </form>
    <br />
   
      <label>Amount: </label>
      <div class="divider" />
      <input type="text"  v-model="amount" />
      <div class="divider" />
      <div class="divider" />
      <label>based on: </label>
      <div class="divider" />
       <div class="divider" />
      <select v-model="oprator">
        <option v-for="op in operators" :key="op">{{ op }}</option>
      </select>
      <div class="divider" />
      <div class="divider" />
      <input type="text" v-model="skip" placeholder="skip"/>
      <div class="divider" />
      <div class="divider" />
      <input type="text" v-model="limit" placeholder="limit"/>
      <div class="divider" />
      <div class="divider" />
      <button type="button" class="btn btn-success" @click="filtterByAmount()">
        Search
      </button>
   <br />
   <br>
   <form action="">
      <label>IBAN: </label>
      <div class="divider" />
      <input type="text" v-model="ibanToFilter" />
      <div class="divider" />
      <div class="divider" />
      <label>from/to: </label>
      <div class="divider" />
      <select v-model="directionOfTransaction">
        <option v-for="dir in directions" :key="dir">{{ dir }}</option>
      </select>
      <div class="divider" />
      <div class="divider" />
      <input type="text" v-model="skip" placeholder="skip"/>
      <div class="divider" />
      <div class="divider" />
      <input type="text" v-model="limit" placeholder="limit"/>
      <div class="divider" />
      <div class="divider" />
      <button type="button" class="btn btn-success" @click="filtterByIban()">
        Search
      </button>
    </form>
    <br>
    <label>{{ errorMessage }}</label>
    <br />
    
 <transaction-list-table  :transactions="transactions"  />

    <div class="divider" />
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
 import transactionListTable from "./TransactionListTable.vue"; 
export default {
  name: "Transactions",
    props: {
    iban: String,
  },
   components:{
    transactionListTable
  },
  data() {
    return {
      transactions: [],
      account: [],
      errorMessage: null,
      enddate: Date.now.toString("yyyy-MM-dd"),
      startdate: Date.now.toString(),
      amount:0,
      operators: ['<','=','>'],
      oprator:"",
      directions:['from','to','all'],
      directionOfTransaction:null,
      ibanToFilter:null,
      skip:null,
      limit:null,

    };
  },
  

  methods: {
    filtterByDate() {
       axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get("accounts/"+this.account.IBAN+"/transactions?startDate=" + this.startdate.toString() + "&endDate="+this.enddate.toString()+"&skip=3&limit=3")
      .then((res) => {
        this.account = res.data;
      })
      .catch((error) => console.log(error));
    },

    filtterByAmount() {
     
    axios
      .get("/accounts/"+this.account.IBAN+"/transactions/byamount?amount="+this.amount+"&operator="+this.oprator+"&skip="+this.skip+"&limit="+this.limit+"")
      .then((res) => {
        this.transactions = res.data;
        console.log(res.data)
      })
      .catch((error) => console.log(error));
    },

    createtransaction(iban){
    this.$router.push('/createTransaction/'+iban)
    },

   filtterByIban(){
      axios
      
      .get("/accounts/"+this.ibanToFilter+"/transactions/filterByAccount?operator="+this.directionOfTransaction+"&skip="+this.skip+"&limit="+this.limit+"")
      .then((res) => {
        this.transactions = res.data;
        console.log(res.data)
      })
      .catch((error) => console.log(error));
   },
  },

  mounted() {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + localStorage.getItem("token");
    axios
      .get("/accounts/"+this.iban)
      .then((res) => {
        this.account = res.data;
      axios
      .get("/accounts/"+this.account.IBAN+"/transactions?startDate=2022-04-03&endDate=2025-04-03&skip=0&limit=20")
      .then((res) => {
        this.transactions = res.data;
      })
      .catch((error) => {
        this.errorMessage = error;
        console.log(error);
      })

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