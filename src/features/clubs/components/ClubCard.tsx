import type { Club } from "../types";
import { useTranslation } from "react-i18next";

interface ClubCardProps {
  club: Club;
  onClick: (club: Club) => void;
}

export function ClubCard({ club, onClick }: ClubCardProps) {
  const { t } = useTranslation();

  return (
    <div
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => onClick(club)}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <img
          src={club.thumbnail || ""}
          alt={club.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t("commonCards.name")}</span>
          <span className="text-sm font-medium text-foreground text-right">
            {club.name}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t("commonCards.dateAndTime")}</span>
          <span className="text-sm font-medium text-foreground text-right">
            {club.dateAndTime}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t("commonCards.table")}</span>
          <span className="text-sm font-medium text-foreground text-right">
            {club.table}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{t("commonCards.country")}</span>
          <span className="text-sm font-medium text-foreground text-right">
            {club.country}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-muted-foreground">{t("commonCards.price")}</span>
          <span className="text-sm font-semibold text-foreground text-right">
            {club.price} {club.currency}
          </span>
        </div>
      </div>
    </div>
  );
}
