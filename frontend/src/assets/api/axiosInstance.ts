import axios from "axios";
import { getCsrfToken } from "./csrfStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getCsrfToken();

  if (token) {
    config.headers["X-CSRF-TOKEN"] = token;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status == 401) {
      await axiosInstance.post("/refresh");
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
