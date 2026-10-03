import { UsersTable } from "@/features/accounts/components/UsersTable";
import { useTranslation } from "react-i18next";

export default function UsersPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">{t("accounts.usersOverview")}</h1>
        <p className="text-muted-foreground">
          {t("accounts.usersOverviewDesc")}
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
