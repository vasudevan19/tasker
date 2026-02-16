import axios from "axios";

let refreshPromise: Promise<string> | null = null;

const getRefreshedToken = () => {
  const token = localStorage.getItem("access_token");
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        "http://localhost:8000/api/refresh",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        localStorage.setItem("access_token", res.data.refresh_token);
        refreshPromise = null;
        return res.data.refresh_token;
      }).catch((err) => {
        refreshPromise = null;
        throw err;
      });
  }
  return refreshPromise;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    let accessToken = localStorage.getItem("access_token") ?? null;
    console.log(accessToken);
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem("access_token", accessToken);
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error.response);

    if (error.response?.status == 401) {
      const token = await getRefreshedToken();
      console.log(token);

      error.config.headers.Authorization = `Bearer ${token}`;
      return axiosInstance(error.config);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
