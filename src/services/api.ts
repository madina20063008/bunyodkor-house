import axios from "axios";

const lang = localStorage.getItem('lang')

const API = axios.create({
  baseURL: "https://api.fayzlixonadonlar.uz/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    'Accept-Language': lang || 'uz',
  },
});

API.interceptors.request.use(
  (config) => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : null;

    if (token?.access) {
      config.headers.Authorization = `Bearer ${token.access}`;
    }

    if (config.method?.toLowerCase() === "get") {
      config.params = {
        ...config.params,
        timestamp: Date.now(),
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
