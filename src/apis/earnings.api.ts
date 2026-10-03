import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";
import type { EarningTransaction } from "@/features/earnings/types";

export interface TEarningsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    totalPages: number;
    totalEarning: number;
    todayEarning: number;
    links?: any;
  };
  data: EarningTransaction[];
}

export interface TEarningsParams {
  page?: number;
  limit?: number;
  serviceType?: "CLUB" | "EVENT";
}

export const getEarnings = async (params: TEarningsParams): Promise<TEarningsResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.serviceType) query.append("serviceType", params.serviceType);

  const response = await axiosInstance.get<TEarningsResponse>(`/admin/earnings?${query.toString()}`);
  return response.data;
};

export const useEarningsQuery = (params: TEarningsParams) => {
  return useQuery({
    queryKey: ["earnings", params],
    queryFn: () => getEarnings(params),
  });
};
