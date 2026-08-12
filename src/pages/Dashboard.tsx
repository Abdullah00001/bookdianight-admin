import { MetricCards } from "@/features/dashboard/components/MetricCards";
import { UserManagementChart } from "@/features/dashboard/components/UserManagementChart";
import { RecentUsersTable } from "@/features/dashboard/components/RecentUsersTable";

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <MetricCards />
      <UserManagementChart />
      <RecentUsersTable />
    </div>
  );
}
