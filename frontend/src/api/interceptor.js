import axios from "axios";
import api from "./api";

api.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");

      if (refresh) {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/v1/auth/token/refresh/",
          { refresh }
        );

        const newAccess = res.data.access;
        api.defaults.headers.common["Authorization"] = "Bearer " + newAccess;
        originalRequest.headers["Authorization"] = "Bearer " + newAccess;

        return api(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
