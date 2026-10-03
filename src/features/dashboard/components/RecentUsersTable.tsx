import { useState } from "react";
import { Search, Eye, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDetailsModal } from "./UserDetailsModal";
import { useUsersQuery } from "@/apis/users.api";
import type { TUser } from "@/apis/users.api";
import { format } from "date-fns";

export function RecentUsersTable() {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [search, setSearch] = useState("");
  
  const { data, isLoading } = useUsersQuery({
    limit: 5,
    search: search || undefined,
  });

  const users = data?.data || [];

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-foreground">
              Recently Register Users
            </h3>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 bg-muted/50 border-none rounded-lg h-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-none hover:bg-muted/50">
                <TableHead className="rounded-l-lg py-4 font-medium text-muted-foreground">
                  Name
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Phone Number
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Account Type
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Country
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Join Date
                </TableHead>
                <TableHead className="rounded-r-lg py-4 font-medium text-muted-foreground text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.name}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.phoneNumber || "-"}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.accountRole === "CLUB_OWNER" ? "Club Owner" : "User"}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.country || "-"}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.createdAt ? format(new Date(user.createdAt), "dd MMM, yyyy") : "-"}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Eye className="h-5 w-5 mx-auto opacity-70 hover:opacity-100" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {!isLoading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No recent users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <UserDetailsModal 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        user={selectedUser} 
      />
    </>
  );
}
