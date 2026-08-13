import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EarningSummaryCards } from "@/features/earnings/components/EarningSummaryCards";
import { EarningsTable } from "@/features/earnings/components/EarningsTable";
import { mockEarnings } from "@/features/earnings/api/mock";

export default function EarningsPage() {
  const [activeTab, setActiveTab] = useState("clubs");

  const filteredData = mockEarnings.filter((item) => item.type === activeTab);

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Earnings</h1>
        <p className="text-muted-foreground">
          Track transactions, payouts, and commission settings
        </p>
      </div>

      <EarningSummaryCards />

      <div className="mb-6 border-b border-border overflow-x-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full min-w-max">
          <TabsList className="bg-transparent h-auto p-0 flex gap-8 justify-start">
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

        {filteredData.length > 0 ? (
          <>
            <EarningsTable data={filteredData} />
            <div className="mt-6 flex items-center justify-end gap-2 overflow-x-auto">
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted text-muted-foreground shrink-0">
                &lt;
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md bg-foreground text-sm font-medium text-background shrink-0">
                1
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted shrink-0">
                2
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted shrink-0">
                3
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted shrink-0">
                4
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted shrink-0">
                5
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-sm font-medium hover:bg-muted text-muted-foreground shrink-0">
                &gt;
              </button>
            </div>
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
