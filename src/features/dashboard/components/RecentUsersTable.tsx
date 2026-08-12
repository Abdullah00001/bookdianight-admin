import { useState } from "react";
import { Search, Eye } from "lucide-react";
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

const recentUsers = [
  {
    id: 1,
    name: "Ahmad Zain",
    phone: "+974 4467 1557",
    email: "mahammad1@gmai.com",
    type: "User",
    country: "UK",
    joinDate: "25 July, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Yusuf Karim",
    phone: "+974 4467 1557",
    email: "mahammad2@gmai.com",
    type: "Club Owner",
    country: "UK",
    joinDate: "25 July, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Omar Farid",
    phone: "+974 4467 1557",
    email: "mahammad3@gmai.com",
    type: "Club Owner",
    country: "USA",
    joinDate: "25 July, 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Ibrahim Nabil",
    phone: "+974 4467 1557",
    email: "mahammad4@gmai.com",
    type: "User",
    country: "USA",
    joinDate: "25 July, 2026",
    status: "Active",
  },
  {
    id: 5,
    name: "Ibrahim Nabil",
    phone: "+974 4467 1557",
    email: "mahammad4@gmai.com",
    type: "User",
    country: "Italy",
    joinDate: "25 July, 2026",
    status: "Active",
  },
  {
    id: 6,
    name: "Sami Khalid",
    phone: "+974 4467 1557",
    email: "mahammad5@gmai.com",
    type: "Club Owner",
    country: "Italy",
    joinDate: "25 July, 2026",
    status: "Active",
  },
];

export function RecentUsersTable() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-foreground">
            Recently Register Users
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 bg-muted/50 border-none rounded-lg h-10"
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
              {recentUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.name}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.phone}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.email}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.type}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.country}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.joinDate}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <Eye className="h-5 w-5 mx-auto" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
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
