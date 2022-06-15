<template>
  <div class="container" v-if="this.$store.getters.isAuthenticated">

      <div class="container px-3">
        <h3>Update Absolute Limit</h3>

        <label for="userid">Absolute Limit for Account: </label>
       <br>
        <label>{{iban}}</label>
        <br>
        <br>
        <input class="userid" type="text" v-model="absoluteLimit" />
        <br>
        <br>
         <button
          type="button"
          margin-right="10px"
          class="btn btn-success"
          @click="updateAbsoluteLimit()"
        >
          Update
        </button>
        <button
          type="button"
          margin-right="10px"
          class="btn btn-success"
          @click="cancel()"
        >
         Cancel
        </button>
</div>
</div>
<label > Result {{message}}</label>
</template>

<script>
import axios from "../../axios-auth";
export default {
    props: {
    iban: String
  },

  data() {
    return {
      absoluteLimit: null,
      message: null,
    };
  },
   methods: {
    updateAbsoluteLimit() {
      this.message = null;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .put("/acccounts/"+ this.iban, {
         absoluteLimit: this.absoluteLimit
        })
        .then((res) => {
            this.message="sucess"
            console.log(res);
         //this.$router.push('/accountlist');
        })
        .catch((error) => (this.message = error.response.data.message));
    },
  },

}
</script>

<style>

</style>