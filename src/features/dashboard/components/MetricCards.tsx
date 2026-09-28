import { Euro, Users } from "lucide-react";
import type { TDashboardData } from "@/apis/dashboard.api";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardsProps {
  data?: TDashboardData;
  isLoading: boolean;
}

export function MetricCards({ data, isLoading }: MetricCardsProps) {
  const metrics = [
    {
      title: "Total Earning",
      value: `€ ${data?.totalEarning?.toLocaleString() ?? "0"}`,
      icon: Euro,
    },
    {
      title: "Total Users",
      value: data?.totalUsers?.toLocaleString() ?? "0",
      icon: Users,
    },
    {
      title: "Total Club Owner",
      value: data?.totalClubOwners?.toLocaleString() ?? "0",
      icon: Users,
    },
  ];

  if (isLoading && !data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[106px] w-full rounded-2xl bg-muted/50" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {metrics.map((metric) => (
        <div
          key={metric.title}
          className="bg-card border border-border rounded-2xl p-6 flex items-center justify-between shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </span>
            <span className="text-3xl font-bold text-foreground">
              {metric.value}
            </span>
          </div>
          <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary flex items-center justify-center">
            <metric.icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      ))}
    </div>
  );
}
