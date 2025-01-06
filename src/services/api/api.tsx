import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}");

    if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log("Logging the error", error);

    // toast

    return Promise.reject(error);
  }
);
