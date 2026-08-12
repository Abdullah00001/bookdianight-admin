import axios from "axios";
import { env } from "@/configs/env.configs";

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  // IMPORTANT: This tells Axios to send HTTP-Only cookies with every request
  // (e.g., your session cookies or HttpOnly JWTs)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: You can add interceptors here to globally handle errors (like 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login or clear zustand store)
      console.error("Unauthorized! Logging out...");
    }
    return Promise.reject(error);
  }
);
