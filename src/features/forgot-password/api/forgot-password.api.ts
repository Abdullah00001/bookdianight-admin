import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";
import type {
  TRequestRequest,
  TVerifyRequest,
  TResetRequest,
} from "../types/forgot-password.types";

export const useRequestCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: TRequestRequest) => {
      // return await axiosInstance.post("/auth/forgot-password", data);
      
      // Stub: Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
};

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: TVerifyRequest) => {
      // return await axiosInstance.post("/auth/verify-code", data);
      
      // Stub: Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: TResetRequest) => {
      // return await axiosInstance.post("/auth/reset-password", data);
      
      // Stub: Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
};
