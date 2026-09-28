import axios from "axios";
import { env } from "@/configs/env.configs";
import { useAuthStore } from "@/stores/auth.store";

export const axiosInstance = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const csrfToken = useAuthStore.getState().csrfToken;
  if (csrfToken) {
    config.headers["x-csrf-token"] = csrfToken;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: { resolve: (token: string | null) => void; reject: (error: any) => void }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If it's a 401, not a retry yet, and not hitting the refresh endpoint itself
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/admin/auth/refresh" &&
      originalRequest.url !== "/admin/auth/login"
    ) {
      if (isRefreshing) {
        // If already refreshing, queue this request until refresh is done
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers["x-csrf-token"] = token;
            }
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosInstance.post("/admin/auth/refresh");
        
        const newCsrfToken = data.csrfToken;
        if (newCsrfToken) {
          useAuthStore.getState().setAuth(useAuthStore.getState().adminData, newCsrfToken);
          originalRequest.headers["x-csrf-token"] = newCsrfToken;
        }

        processQueue(null, newCsrfToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        console.error("Session expired! Logging out...");
        useAuthStore.getState().clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
