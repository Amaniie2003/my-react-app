import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
});

apiClient.interceptors.request.use((config) => {
  return config;
});

export default apiClient;