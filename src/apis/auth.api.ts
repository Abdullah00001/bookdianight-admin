import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";
import { z } from "zod";

export interface TCheckAuthResponse {
  success: boolean;
  message: string;
  data: any;
  csrfToken: string;
  traceId?: string;
}

export interface TLogoutResponse {
  success: boolean;
  message: string;
  traceId?: string;
}

const checkAuth = async (): Promise<TCheckAuthResponse> => {
  const response = await axiosInstance.post<TCheckAuthResponse>("/admin/auth/check");
  return response.data;
};

const logoutUser = async (): Promise<TLogoutResponse> => {
  const response = await axiosInstance.post<TLogoutResponse>("/admin/auth/logout");
  return response.data;
};

export const useCheckAuthQuery = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["auth", "check"],
    queryFn: checkAuth,
    retry: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

export const changeAdminPasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(18, "Password must be at most 18 characters"),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export type TChangeAdminPasswordRequest = z.infer<typeof changeAdminPasswordSchema>;

const changePassword = async (data: TChangeAdminPasswordRequest): Promise<{ success: boolean; message: string }> => {
  const response = await axiosInstance.patch("/admin/change-password", data);
  return response.data;
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};

export const updateAdminProfileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  profileAvatar: z.string().nullable().optional(),
});

export type TUpdateAdminProfileRequest = z.infer<typeof updateAdminProfileSchema>;

export interface TUpdateProfileResponse {
  success: boolean;
  message: string;
  data: any;
  traceId?: string;
}

const updateAdminProfile = async (data: TUpdateAdminProfileRequest): Promise<TUpdateProfileResponse> => {
  const response = await axiosInstance.patch<TUpdateProfileResponse>("/admin/profile", data);
  return response.data;
};

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: updateAdminProfile,
  });
};
