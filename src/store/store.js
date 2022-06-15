import { createStore } from "vuex";
import axios from "../axios-auth";

const store = createStore({
  state() {
    return {
      token: null,
      loggedInUser: {
        userId: 0,
        username: "",
        fullname: "",
        roles: [],
        dayLimit: 0.0,
        transactionLimit: 0.0,
        remainingDayLimit: 0.0,
      },
      errorMessage: "",
    };
  },
  getters: {
    isAuthenticated(state) {
      return state.token != null;
    },
    isAdmin(state) {
      return state.loggedInUser.roles.includes("ROLE_ADMIN") == true;
    }
  },
  mutations: {
    removeToken(state) {
      state.token = null;
    },
    setToken(state, parameters) {
      state.token = parameters.token;
    },
    setLoggedInUser(state, parameters) {
      state.loggedInUser.userId = parameters.userId;
      state.loggedInUser.username = parameters.username;
      state.loggedInUser.fullname = parameters.fullname;
      state.loggedInUser.roles = parameters.roles;
      state.loggedInUser.dayLimit = parameters.dayLimit;
      state.loggedInUser.transactionLimit = parameters.transactionLimit;
      state.loggedInUser.remainingDayLimit = parameters.remainingDayLimit;
    },
    logout(state) {
      state.jwt = null;
      state.token = null;
      state.username = null;
      axios.defaults.headers.common["Authorization"] = "";
      state.loggedInUser.roles = [];
      localStorage.clear();
    },
    setErrorMessage(state, parameters) {
      state.errorMessage = parameters.errorMessage;
    }
  },
  actions: {
    setLogin({ commit }) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get("/users/loggedInUser")
        .then((response) => {
          commit("setLoggedInUser", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // autoLogin({ commit }) {
    //   // if (localStorage.getItem("token")) {
    //   //   axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    //   //   commit("setToken", {
    //   //     token: localStorage.getItem("token"),
    //   //   });
    //   // } else {
    //   //   // if not logged in go to login page
    //   //   this.router.push("/login");
    //   //}
    // },
    logout({ commit }) {
      // set token in store to null
      commit("removeToken");
      axios.defaults.headers.common["Authorization"] = "";
      localStorage.clear();
      commit("logout");
    },
    login({ commit }, parameters) {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/login", {
            username: parameters.username,
            password: parameters.password,
          })
          .then((result) => {
            axios.defaults.headers.common["Authorization"] =
              "Bearer" + result.data.token;

            localStorage.setItem("token", result.data.token);
            console.log("token from api: " + result.data.token);
            commit("setToken", {
              token: result.data.token,
            });
            resolve();
          })
          .catch((error) => reject(error));
      });
    },
    register({ commit }, parameters) {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/register", {
            username: parameters.username,
            fullname: parameters.fullname,
            password: parameters.password,
            createEmployee: parameters.createEmployee,
          })
          .then((result) => {
            console.log(result);
            commit("setErrorMessage", {
              errorMessage: "",
            });
            resolve();
          }
          )
          .catch((error) => reject(error));
      });
    }


  },
});

export default store;
