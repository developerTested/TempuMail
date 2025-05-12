import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_API || "http://localhost:3001/api",
});

// Add a request interceptor
API.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const errorResponse = error?.response?.data;

    if (errorResponse) {
      return Promise.reject(errorResponse);
    }
    return Promise.reject(error);
  }
);
