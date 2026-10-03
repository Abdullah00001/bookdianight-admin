import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";
import type { Event } from "@/features/events/types";

export interface TEventsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    totalPages: number;
    links?: any;
  };
  data: Event[];
}

export interface TEventsParams {
  page?: number;
  limit?: number;
  eventStatus?: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELED";
}

export const getEvents = async (params: TEventsParams): Promise<TEventsResponse> => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.eventStatus) query.append("eventStatus", params.eventStatus);

  const response = await axiosInstance.get<TEventsResponse>(`/admin/event?${query.toString()}`);
  return response.data;
};

export const useEventsQuery = (params: TEventsParams) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => getEvents(params),
  });
};
