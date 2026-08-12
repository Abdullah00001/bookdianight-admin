import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";
import { type TLoginRequest } from "@/features/login/types/login.types";

const loginUser = async (data: TLoginRequest) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
