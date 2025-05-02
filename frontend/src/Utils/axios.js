import axios from "axios"; 
const prod = 'https://e-recruitment.onrender.com/api/v1/'
const local = 'http://localhost:8000/api/'

const instance = axios.create({
  baseURL : local,
});

export default instance;