import axios from 'axios';

const instance = axios.create( {
    baseURL: 'http://bank-rest-api-gr5.herokuapp.com/bankAPI'
});
export default instance;