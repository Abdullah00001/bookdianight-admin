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
      const response = await axiosInstance.post("/recover/find", data);
      return response.data;
    },
  });
};

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: TVerifyRequest) => {
      const response = await axiosInstance.post("/recover/verify", { otp: data.code });
      return response.data;
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: TResetRequest) => {
      const response = await axiosInstance.post("/recover/reset", { password: data.password });
      return response.data;
    },
  });
};

export const useResendCodeMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/recover/resend", {});
      return response.data;
    },
  });
};
