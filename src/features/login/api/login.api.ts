import { useMutation } from "@tanstack/react-query";
import { type TLoginRequest } from "@/features/login/types/login.types";
import { axiosInstance } from "@/configs/axios.configs";
import { useAuthStore } from "@/stores/auth.store";

export interface TLoginResponse {
  success: boolean;
  message: string;
  data: any;
  csrfToken: string;
  traceId?: string;
}

const loginUser = async (data: TLoginRequest): Promise<TLoginResponse> => {
  const response = await axiosInstance.post<TLoginResponse>("/admin/auth/login", data);
  
  if (response.data.success) {
    const { data: adminData, csrfToken } = response.data;
    useAuthStore.getState().setAuth(adminData, csrfToken);
  }
  
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
