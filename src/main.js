import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import store from './store/store'

import AccountList from './components/accounts/AccountList.vue'
import CreateAccount from './components/accounts/CreateAccount.vue';
import EditabsolutLimit from './components/accounts/EditabsolutLimit.vue';
import AccountTransactions from './components/transactions/AccountTransactions.vue';
import Login from "./components/Login.vue";
import Register from "./components/RegisterPage.vue";
import UserPage from "./components/users/UserPage.vue";
import UserList from "./components/users/UsersList.vue";
import EditUserDetails from "./components/users/EditUserDetails.vue";
import CreateTransaction from "./components/transactions/CreateTransaction.vue"
import AllTransaction from "./components/transactions/AllTransactionList.vue"


const routes = [
    { path: '/', component: UserPage },
    { path: '/accountlist', component: AccountList },
    { path: '/createaccount/:id', component: CreateAccount, props: true},
    { path: '/editabsolutLimit/:iban', component: EditabsolutLimit , props: true},
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/profile", component: UserPage },
    { path: "/users", component: UserList },
    { path: "/accounttransaction/:iban", component: AccountTransactions, props: true },
    { path: '/edituser/:id', component: EditUserDetails, props: true  },
    { path: '/createtransaction/:iban', component: CreateTransaction , props: true},
    { path: '/AllTransaction', component: AllTransaction },
];

const router = createRouter({
    "history": createWebHistory(),
    routes
})

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');