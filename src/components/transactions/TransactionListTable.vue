<template>
<table>
      <tr>
        <th>Datetime</th>
        <th>From Account</th>
        <th>Transfered To</th>
        <th>Amount</th>
        <th>Transaction Type</th>
      </tr>
      <br>
      <tr v-for="transaction in transactions" :key="transaction.timestamp">
        <td>{{ transaction.timestamp }}</td>
        <td>{{ transaction.fromAccount }}</td>
        <td>{{ transaction.toAccount }}</td>
        <td>{{ transaction.amount }}</td>
         <td>{{ transaction.transactionType }}</td>
        </tr>
    </table>
       
     
</template>

<script>

export default {
    name: "transactionListTable",
props:{
    transactions: Object
}
}
</script>

<style>

</style>