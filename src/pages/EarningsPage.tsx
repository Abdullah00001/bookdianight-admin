import { useState } from "react";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EarningSummaryCards } from "@/features/earnings/components/EarningSummaryCards";
import { EarningsTable } from "@/features/earnings/components/EarningsTable";
import { useEarningsQuery } from "@/apis/earnings.api";

type TabType = "all" | "clubs" | "events";

const getServiceTypeParam = (tab: TabType) => {
  switch (tab) {
    case "clubs": return "CLUB";
    case "events": return "EVENT";
    case "all": 
    default: return undefined;
  }
};

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useEarningsQuery({
    page,
    limit: 10,
    serviceType: getServiceTypeParam(activeTab),
  });

  const earnings = response?.data || [];
  const meta = response?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleTabChange = (val: string) => {
    setActiveTab(val as TabType);
    setPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="mt-6 flex items-center justify-end gap-2 overflow-x-auto">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted text-muted-foreground shrink-0 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium shrink-0 ${
              page === p
                ? "bg-foreground text-background border-foreground"
                : "border-border bg-background hover:bg-muted text-muted-foreground"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted text-muted-foreground shrink-0 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Earnings</h1>
        <p className="text-muted-foreground">
          Track transactions, payouts, and commission settings
        </p>
      </div>

      <EarningSummaryCards 
        totalEarning={meta?.totalEarning} 
        todayEarning={meta?.todayEarning} 
      />

      <div className="mb-6 border-b border-border overflow-x-auto">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full min-w-max">
          <TabsList className="bg-transparent h-auto p-0 flex gap-8 justify-start">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-muted-foreground transition-all"
            >
              All Earnings
            </TabsTrigger>
            <TabsTrigger
              value="clubs"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-muted-foreground transition-all"
            >
              Clubs Earning
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none border-b-2 border-transparent px-0 py-3 text-base font-medium text-muted-foreground transition-all"
            >
              Events Earning
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold text-foreground">Earning Overview</h2>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 bg-muted/30 border-border rounded-lg h-10"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : earnings.length > 0 ? (
          <>
            <EarningsTable data={earnings} />
            {renderPagination()}
          </>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-muted/50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-muted-foreground opacity-50">!</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">No data found</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              There are no earning records for this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
