import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL,
  //create an instance for the backend url and the variable api will be used everywhere

});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // get JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default api;
