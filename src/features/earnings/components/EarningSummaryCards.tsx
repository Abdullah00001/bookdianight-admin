import { Euro } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EarningSummaryCardsProps {
  totalEarning?: number;
  todayEarning?: number;
}

export function EarningSummaryCards({ totalEarning = 0, todayEarning = 0 }: EarningSummaryCardsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Total Earning */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-muted-foreground mb-4">{t("earnings.totalEarning")}</span>
          <div className="h-10 w-10 rounded-full border border-[#E5B869] bg-[#E5B869]/10 flex items-center justify-center">
            <Euro className="h-5 w-5 text-[#E5B869]" />
          </div>
        </div>
        <span className="text-4xl font-bold text-foreground">€ {totalEarning.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>

      {/* Today Earning */}
      <div className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between shadow-sm">
        <div className="flex justify-between items-start">
          <span className="text-sm font-medium text-muted-foreground mb-4">{t("earnings.todayEarning")}</span>
          <div className="h-10 w-10 rounded-full border border-[#E5B869] bg-[#E5B869]/10 flex items-center justify-center">
            <Euro className="h-5 w-5 text-[#E5B869]" />
          </div>
        </div>
        <span className="text-4xl font-bold text-foreground">€ {todayEarning.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </div>
    </div>
  );
}
