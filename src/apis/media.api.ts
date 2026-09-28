import { axiosInstance } from "@/configs/axios.configs";

export const uploadMedia = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("files", file);

  const response = await axiosInstance.post<{ success: boolean; data: string[] }>("/media", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (response.data.success && response.data.data.length > 0) {
    return response.data.data[0];
  }
  
  throw new Error("Failed to upload media");
};

export const deleteMedia = async (url: string): Promise<void> => {
  await axiosInstance.delete("/media", {
    data: { urls: [url] }
  });
};
