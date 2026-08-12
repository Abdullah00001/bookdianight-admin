import { useMutation } from "@tanstack/react-query";
import { type TLoginRequest } from "@/features/login/types/login.types";

const loginUser = async (data: TLoginRequest) => {
  // Mock login: Simulate API call for now so we can access the dashboard
  console.log("Mock login for:", data.email);
  return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
