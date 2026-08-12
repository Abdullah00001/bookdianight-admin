import { useQuery } from "@tanstack/react-query";

// Mock API functions for the dashboard

export const useGetDashboardMetrics = () => {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: async () => {
      // Mock data
      return {
        totalEarning: "€ 15,000",
        totalUsers: "3,285",
        totalClubOwner: "250",
      };
    },
  });
};
