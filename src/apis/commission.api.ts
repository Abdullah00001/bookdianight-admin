import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";

export interface TCommissionConfiguration {
  id: string;
  serviceType: "EVENT" | "CLUB";
  chargePercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface TGetCommissionResponse {
  success: boolean;
  message: string;
  data: {
    EVENT: TCommissionConfiguration;
    CLUB: TCommissionConfiguration;
  };
}

export interface TUpdateCommissionRequest {
  serviceType: "EVENT" | "CLUB";
  chargePercentage: number;
}

export interface TUpdateCommissionResponse {
  success: boolean;
  message: string;
}

const getCommission = async (): Promise<TGetCommissionResponse> => {
  const response = await axiosInstance.get<TGetCommissionResponse>("/admin/commission");
  return response.data;
};

const updateCommission = async (data: TUpdateCommissionRequest): Promise<TUpdateCommissionResponse> => {
  const response = await axiosInstance.patch<TUpdateCommissionResponse>("/admin/commission", data);
  return response.data;
};

export const useCommissionQuery = () => {
  return useQuery({
    queryKey: ["commission"],
    queryFn: getCommission,
  });
};

export const useUpdateCommissionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCommission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commission"] });
    },
  });
};

// --- Service Charge API ---

export interface TGetServiceChargeResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface TUpdateServiceChargeRequest {
  amount: number;
}

export interface TUpdateServiceChargeResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    amount: number;
  };
}

const getServiceCharge = async (): Promise<TGetServiceChargeResponse> => {
  const response = await axiosInstance.get<TGetServiceChargeResponse>("/admin/service-charge");
  return response.data;
};

const updateServiceCharge = async (data: TUpdateServiceChargeRequest): Promise<TUpdateServiceChargeResponse> => {
  const response = await axiosInstance.patch<TUpdateServiceChargeResponse>("/admin/service-charge", data);
  return response.data;
};

export const useServiceChargeQuery = () => {
  return useQuery({
    queryKey: ["serviceCharge"],
    queryFn: getServiceCharge,
  });
};

export const useUpdateServiceChargeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateServiceCharge,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["serviceCharge"] });
    },
  });
};
