import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "/api",
    withCredentials: true
});

const refreshClient = axios.create({
    baseURL: "/api",
    withCredentials: true
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshClient.post("/refresh");

        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);