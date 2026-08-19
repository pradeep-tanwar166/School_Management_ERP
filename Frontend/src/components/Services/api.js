import axios from "axios";

const api = axios.create({
  baseURL: "https://school-management-erp-paye.onrender.com",
  headers: { "Content-Type":"Application/json"},
});

export default api;