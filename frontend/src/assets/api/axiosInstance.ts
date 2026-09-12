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

let refreshPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Never intercept the refresh call itself, avoids infinite recursion.
    if (originalRequest?.url === "/refresh") {
      refreshPromise = null;
      return Promise.reject(error);
    }

    if (error.response?.status == 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Share a single in-flight refresh across concurrent 401s to avoid
      // racing the JWT blacklist with multiple refresh calls for the same token.
      if (!refreshPromise) {
        refreshPromise = axiosInstance.post("/refresh").finally(() => {
          refreshPromise = null;
        });
      }

      try {
        await refreshPromise;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
