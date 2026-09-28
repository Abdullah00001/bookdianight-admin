import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/configs/axios.configs";

export interface TLegalContentResponse {
  success: boolean;
  message: string;
  data: {
    legalContent: {
      id: string;
      legalContentType: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

export interface TUpdateLegalContentRequest {
  content: string;
}

export interface TUpdateLegalContentResponse {
  success: boolean;
  message: string;
}

export type TLegalType = "terms" | "privacy" | "about";

const getEndpoint = (type: TLegalType) => type === "about" ? "/admin/about-us" : `/admin/${type}`;

const getLegalContent = async (type: TLegalType): Promise<TLegalContentResponse> => {
  const response = await axiosInstance.get<TLegalContentResponse>(getEndpoint(type));
  return response.data;
};

const updateLegalContent = async ({ type, data }: { type: TLegalType, data: TUpdateLegalContentRequest }): Promise<TUpdateLegalContentResponse> => {
  const response = await axiosInstance.patch<TUpdateLegalContentResponse>(getEndpoint(type), data);
  return response.data;
};

export const useLegalContentQuery = (type: TLegalType) => {
  return useQuery({
    queryKey: ["legal", type],
    queryFn: () => getLegalContent(type),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUpdateLegalContentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateLegalContent,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["legal", variables.type] });
    },
  });
};
