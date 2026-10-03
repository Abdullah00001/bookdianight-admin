import { ClubOwnersTable } from "@/features/accounts/components/ClubOwnersTable";
import { useTranslation } from "react-i18next";

export default function ClubOwnersPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">{t("accounts.clubOwnerOverview")}</h1>
        <p className="text-muted-foreground">
          {t("accounts.clubOwnerOverviewDesc")}
        </p>
      </div>

      <ClubOwnersTable />
    </div>
  );
}
