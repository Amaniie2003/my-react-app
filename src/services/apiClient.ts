import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://reqres.in/api",
});

// Biarkan request interceptor melepaskan config tanpa menyuntik header Authorization ke ReqRes
apiClient.interceptors.request.use((config) => {
  return config;
});

export default apiClient;