import axios from "axios"; 
const prod = 'https://rick-and-morty-full-stack-app.vercel.app/api/'
const local = 'http://localhost:8000/api/'

const instance = axios.create({
  baseURL : prod,
});

export default instance;