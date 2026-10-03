import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";

export interface TBooking {
  id: string;
  name: string;
  status: string;
  amount: string;
  date: string;
}

export interface TClubOrEvent {
  id: string;
  name: string;
  location: string;
  rating?: string;
  price: number;
  currency: string;
}

export interface TUser {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  accountStatus: "ACTIVE" | "SUSPENDED" | "DELETED" | string;
  accountRole: "USER" | "CLUB_OWNER" | "ADMIN" | string;
  createdAt: string;
  country?: string;
  profile?: any;
  totalBookings?: number;
  clubBookingsCount?: number;
  eventBookingsCount?: number;
  clubHostedCount?: number;
  eventHostedCount?: number;
  recentBookings?: TBooking[];
  recentClubs?: TClubOrEvent[];
  recentEvents?: TClubOrEvent[];
}

export interface TUsersResponse {
  success: boolean;
  message: string;
  data: TUser[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}

export interface TUsersParams {
  page?: number;
  limit?: number;
  role?: "USER" | "CLUB_OWNER" | "";
  search?: string;
}

export const getUsers = async (params: TUsersParams): Promise<TUsersResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.role) query.append("role", params.role);
  if (params.search) query.append("search", params.search);

  const response = await axiosInstance.get<TUsersResponse>(`/admin/users?${query.toString()}`);
  return response.data;
};

export const useUsersQuery = (params: TUsersParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};

export const useSuspendUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axiosInstance.patch(`/admin/users/${userId}/suspend`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      const response = await axiosInstance.patch(`/admin/users/${userId}/delete`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
