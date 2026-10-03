import { useState } from "react";
import { ChevronLeft, ChevronRight, Inbox, Loader2 } from "lucide-react";
import { ClubCard } from "@/features/clubs/components/ClubCard";
import { ClubDetailsModal } from "@/features/clubs/components/ClubDetailsModal";
import { useClubsQuery } from "@/apis/clubs.api";
import type { Club } from "@/features/clubs/types";

type TabType = "active" | "in-active";

export default function ClubsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useClubsQuery({
    page,
    limit: 10,
    isActive: activeTab === "active",
  });

  const clubs = response?.data || [];
  const meta = response?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-end space-x-2 pt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-8 w-8 flex items-center justify-center rounded font-medium ${
              page === p
                ? "bg-black text-white"
                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Club List</h2>
        <p className="text-muted-foreground">
          View the all ongoing, complete club list
        </p>
      </div>

      <div className="flex items-center space-x-8 border-b border-gray-200">
        <button
          onClick={() => handleTabChange("active")}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === "active"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Active
          {activeTab === "active" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => handleTabChange("in-active")}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === "in-active"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          In-Active
          {activeTab === "in-active" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-full" />
          )}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : clubs.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onClick={(c) => setSelectedClub(c)}
              />
            ))}
          </div>
          {renderPagination()}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Inbox className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xl font-semibold text-foreground">No data found</p>
          <p className="text-muted-foreground mt-2">
            There are currently no clubs in this category.
          </p>
        </div>
      )}

      <ClubDetailsModal
        isOpen={!!selectedClub}
        onClose={() => setSelectedClub(null)}
        club={selectedClub}
      />
    </div>
  );
}
