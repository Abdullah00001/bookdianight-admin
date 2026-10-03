import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";
import type { Club } from "@/features/clubs/types";

export interface TClubsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    totalPages: number;
    links?: any;
  };
  data: Club[];
}

export interface TClubsParams {
  page?: number;
  limit?: number;
  isActive?: boolean;
}

export const getClubs = async (params: TClubsParams): Promise<TClubsResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.isActive !== undefined) query.append("isActive", params.isActive.toString());

  const response = await axiosInstance.get<TClubsResponse>(`/admin/club?${query.toString()}`);
  return response.data;
};

export const useClubsQuery = (params: TClubsParams) => {
  return useQuery({
    queryKey: ["clubs", params],
    queryFn: () => getClubs(params),
  });
};
