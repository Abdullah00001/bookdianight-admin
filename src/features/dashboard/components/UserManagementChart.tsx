import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TDashboardData } from "@/apis/dashboard.api";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface UserManagementChartProps {
  data?: TDashboardData;
  isLoading: boolean;
  year: string;
  setYear: (val: string) => void;
  role: "USER" | "CLUB_OWNER" | "";
  setRole: (val: "USER" | "CLUB_OWNER" | "") => void;
}

export function UserManagementChart({ data, isLoading, year, setYear, role, setRole }: UserManagementChartProps) {
  const chartData = data?.userManagementChart || [];
  const currentYear = new Date().getFullYear().toString();
  const availableYears = data?.availableYears?.length 
    ? data.availableYears.map(String) 
    : [currentYear];

  if (!availableYears.includes(year) && year !== "") {
    availableYears.push(year);
  }
  availableYears.sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">User Management</h3>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={role === "" ? "all" : role} onValueChange={(val) => setRole(val === "all" ? "" : val as any)}>
            <SelectTrigger className="w-[140px] rounded-lg">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Account Type</SelectItem>
              <SelectItem value="USER">User</SelectItem>
              <SelectItem value="CLUB_OWNER">Club Owner</SelectItem>
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px] rounded-lg">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((yr) => (
                <SelectItem key={yr} value={yr}>{yr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px] w-full relative">
        {isLoading && !data ? (
          <Skeleton className="w-full h-full rounded-xl bg-muted/50" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              barSize={32}
            >
              <CartesianGrid
                strokeDasharray="5 5"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar
                dataKey="users"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0] as any}
                background={{ fill: "hsl(var(--muted))", radius: [4, 4, 0, 0] as any }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
