import { useState } from "react";
import { MetricCards } from "@/features/dashboard/components/MetricCards";
import { UserManagementChart } from "@/features/dashboard/components/UserManagementChart";
import { RecentUsersTable } from "@/features/dashboard/components/RecentUsersTable";
import { useDashboardQuery } from "@/apis/dashboard.api";
import { useTranslation } from "react-i18next";

export default function DashboardPage() {
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState<string>(currentYear);
  const [role, setRole] = useState<"USER" | "CLUB_OWNER" | "">("");
  const { t } = useTranslation();

  const { data, isLoading } = useDashboardQuery({ year, role });

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">{t("dashboard.title")}</h1>
        <p className="text-muted-foreground">
          {t("dashboard.subtitle")}
        </p>
      </div>

      <MetricCards data={data?.data} isLoading={isLoading} />
      <UserManagementChart 
        data={data?.data} 
        isLoading={isLoading} 
        year={year} 
        setYear={setYear} 
        role={role} 
        setRole={setRole} 
      />
      <RecentUsersTable />
    </div>
  );
}
