import { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, MoreHorizontal, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserDetailsModal } from "@/features/dashboard/components/UserDetailsModal";
import { useUsersQuery } from "@/apis/users.api";
import type { TUser } from "@/apis/users.api";
import { format } from "date-fns";

export function UsersTable() {
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useUsersQuery({
    page,
    limit,
    role: "USER",
    search: search || undefined,
  });

  const users = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPage || 1;

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-foreground">
              Users Management
            </h3>
            {isLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 bg-muted/50 border-none rounded-lg h-10"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1); // Reset page on search
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto flex-1">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 border-none hover:bg-muted/50">
                <TableHead className="rounded-l-lg py-4 font-medium text-muted-foreground w-20">
                  Serial No.
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Name
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Phone Number
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Country
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Join Date
                </TableHead>
                <TableHead className="py-4 font-medium text-muted-foreground">
                  Booking
                </TableHead>
                <TableHead className="rounded-r-lg py-4 font-medium text-muted-foreground text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="py-4 text-sm text-foreground">
                    {((page - 1) * limit + index + 1).toString().padStart(2, '0')}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground font-medium">
                    {user.name}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.phoneNumber || "-"}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.country || "-"}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.createdAt ? format(new Date(user.createdAt), "dd MMM, yyyy") : "-"}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.totalBookings ?? "-"}
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
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-end gap-2 mt-6">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <UserDetailsModal 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        user={selectedUser} 
      />
    </>
  );
}
