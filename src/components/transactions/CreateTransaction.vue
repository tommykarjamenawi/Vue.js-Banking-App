<template>
  <section v-if="this.$store.getters.isAuthenticated">
    <div class="container">
      <form ref="form">
        <h2 class="mt-3 mt-lg-5">Create a transaction</h2>
        <div v-if="!this.$store.getters.isAdmin">
        <br />
        <label>Choose transaction type to autofill your IBAN</label>
        <br />
        <button type="button" class="btn btn-primary" @click="fillibandeposit()">
          Deposit
        </button>
        <div class="divider" />
        <div class="divider" />
        <button
          type="button"
          class="btn btn-primary"
          @click="fillibanwithdraw()"
        
        >
          withdraw
        </button>
        <div class="divider" />
        <div class="divider" />
        <button
          type="button"
          class="btn btn-primary"
          @click="fillibantransafer()"
        >
          Transfer
        </button>
        </div>
        <br /><br />

        <div class="input-group mb-3">
          <span class="input-group-text">From account</span>
          <input type="text" class="form-control" v-model="fromAccount" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">To account</span>
          <input type="text" class="form-control" v-model="toAccount" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Transaction Type:</span>
          <select v-model="selectTransactionType">
            <option v-for="type in transactionTypes" :key="type">
              {{ type }}
            </option>
          </select>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">Amount in €:</span>
          <input type="text" class="form-control" v-model="amount" />
        </div>

        <input
          type="button"
          class="btn btn-primary"
          value="TransferFunds"
          @click="createTransaction()"
        />
        <input
          type="button"
          class="btn btn-danger"
          value="Cancel"
          @click="cancelTransaction()"
        />
      </form>
      <br /><br />
      <div>
        <h5>{{ message }}</h5>
        <label> From Account: </label>
        <div class="divider" />
        <label>{{ transaction.fromAccount }}</label>
        <br />
        <label> To Account: </label>
        <div class="divider" />
        <label>{{ transaction.toAccount }}</label>
        <br />
        <label> User performing ID: </label>
        <div class="divider" />
        <label>{{ transaction.userPerformingId }}</label>
        <br />
        <label> Transaction Type: </label>
        <div class="divider" />
        <label>{{ transaction.transactionType }}</label>
        <br />
        <label> Amount: </label>
        <div class="divider" />
        <label>{{ transaction.amount }}</label>
        <br />
        <label> Time: </label>
        <div class="divider" />
        <label>{{ transaction.timestamp }}</label>
      </div>
    </div>
  </section>
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
  name: "AddTransactions",
  props: {
    iban: String,
  },
  data() {
    return {
      fromAccount: "",
      toAccount: "",
      transactionTypes: ["withdraw", "deposit", "transfer"],
      amount: "",
      selectTransactionType: null,
      transaction: [],
      message: "Result....",
    };
  },
  methods: {
    fillibandeposit() {
      this.toAccount = this.iban;
      this.selectTransactionType = "deposit"
      this.fromAccount =""
    },
    fillibanwithdraw() {
      this.fromAccount = this.iban;
      this.selectTransactionType = "withdraw"
      this.toAccount = ""
    },
    fillibantransafer() {
      this.fromAccount = this.iban;
      this.selectTransactionType = "transfer"
      this.toAccount = ""
    },
    createTransaction() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      axios
        .post("/transactions", {
          fromAccount: this.fromAccount,
          toAccount: this.toAccount,
          amount: this.amount,
          transactionType: this.selectTransactionType,
        })
        .then((res) => {
          this.transaction = res.data;
          this.message = "Successfull Transaction";
          console.log(res.data);
        })
        .catch((error) => (this.message=error.response.data.message));
    },
    cancelTransaction() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      (this.fromAccount = ""),
        (this.toAccount = ""),
        (this.amount = ""),
        (this.message = ""),
        (this.date = "");
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