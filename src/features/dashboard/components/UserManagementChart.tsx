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

const data = [
  { name: "Jan", users: 900 },
  { name: "Feb", users: 500 },
  { name: "Mar", users: 1100 },
  { name: "Arp", users: 900 },
  { name: "May", users: 1100 },
  { name: "Jun", users: 600 },
  { name: "Jul", users: 1100 },
  { name: "Aug", users: 500 },
  { name: "Sep", users: 1100 },
  { name: "Oct", users: 600 },
  { name: "Nov", users: 1100 },
  { name: "Dec", users: 600 },
];

export function UserManagementChart() {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-foreground">User Management</h3>
        <div className="flex items-center gap-4">
          <Select defaultValue="account_type">
            <SelectTrigger className="w-[140px] rounded-lg">
              <SelectValue placeholder="Account Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="account_type">Account Type</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="club_owner">Club Owner</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="2026">
            <SelectTrigger className="w-[100px] rounded-lg">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              ticks={[0, 500, 1000, 1500]}
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
      </div>
    </div>
  );
}
