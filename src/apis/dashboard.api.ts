import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";

export interface TUserManagementChartData {
  name: string;
  users: number;
}

export interface TDashboardData {
  availableYears: number[];
  totalEarning: number;
  totalUsers: number;
  totalClubOwners: number;
  userManagementChart: TUserManagementChartData[];
}

export interface TDashboardResponse {
  success: boolean;
  message: string;
  data: TDashboardData;
  traceId: string;
}

export interface TDashboardParams {
  year?: string;
  role?: "USER" | "CLUB_OWNER" | "";
}

const getDashboardData = async (params: TDashboardParams): Promise<TDashboardResponse> => {
  const queryParams = new URLSearchParams();
  if (params.year) queryParams.append("year", params.year);
  if (params.role) queryParams.append("role", params.role);
  
  const response = await axiosInstance.get<TDashboardResponse>(`/admin/dashboard?${queryParams.toString()}`);
  return response.data;
};

export const useDashboardQuery = (params: TDashboardParams) => {
  return useQuery({
    queryKey: ["dashboard", params],
    queryFn: () => getDashboardData(params),
  });
};
