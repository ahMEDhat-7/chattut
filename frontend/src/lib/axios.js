import axios from "axios";

const SERVER_URL="http://localhost:5001/api";

export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  withCredentials:true  
})