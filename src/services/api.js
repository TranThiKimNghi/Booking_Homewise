import axios from "axios";

const api = axios.create({
  baseURL: 'http://34.177.103.163:8000/common/api',
  headers: { "Content-Type": "application/json" }
});

export default api;
