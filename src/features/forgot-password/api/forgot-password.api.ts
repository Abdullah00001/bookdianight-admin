import { useMutation } from "@tanstack/react-query";
import type {
  TRequestRequest,
  TVerifyRequest,
  TResetRequest,
} from "../types/forgot-password.types";

export const useRequestCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: TRequestRequest) => {
      console.log("Mock request password code for:", data.email);
      // Stub: Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
};

export const useVerifyCodeMutation = () => {
  return useMutation({
    mutationFn: async (data: TVerifyRequest) => {
      console.log("Mock verify password code:", data.code);
      // Stub: Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async (data: TResetRequest) => {
      console.log("Mock reset password for:", data.password);
      // Stub: Simulate API call
      return new Promise((resolve) => setTimeout(resolve, 1000));
    },
  });
};
