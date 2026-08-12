import { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
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

const clubOwnersData = [
  {
    id: 1,
    serial: "01",
    name: "Ahmad Zain",
    phone: "+974 4467 1557",
    email: "mahammad1@gmai.com",
    country: "UK",
    joinDate: "25 May, 2026",
    type: "Club Owner", // for modal
  },
  {
    id: 2,
    serial: "02",
    name: "Yusuf Karim",
    phone: "+974 4467 1557",
    email: "mahammad2@gmai.com",
    country: "Italy",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
  {
    id: 3,
    serial: "03",
    name: "Yusuf Karim",
    phone: "+974 4467 1557",
    email: "mahammad2@gmai.com",
    country: "USA",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
  {
    id: 4,
    serial: "04",
    name: "Yusuf Karim",
    phone: "+974 4467 1557",
    email: "mahammad2@gmai.com",
    country: "UK",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
  {
    id: 5,
    serial: "05",
    name: "Yusuf Karim",
    phone: "+974 4467 1557",
    email: "mahammad2@gmai.com",
    country: "Italy",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
  {
    id: 6,
    serial: "06",
    name: "Yusuf Karim",
    phone: "+974 4467 1557",
    email: "mahammad2@gmai.com",
    country: "Italy",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
  {
    id: 7,
    serial: "07",
    name: "Omar Farid",
    phone: "+974 4467 1557",
    email: "mahammad3@gmai.com",
    country: "Italy",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
  {
    id: 8,
    serial: "08",
    name: "Ibrahim Nabil",
    phone: "+974 4467 1557",
    email: "mahammad4@gmai.com",
    country: "Italy",
    joinDate: "25 May, 2026",
    type: "Club Owner",
  },
];

export function ClubOwnersTable() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <>
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-foreground">
            Club Owner Management
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-9 bg-muted/50 border-none rounded-lg h-10"
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
                <TableHead className="rounded-r-lg py-4 font-medium text-muted-foreground text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clubOwnersData.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-border hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.serial}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground font-medium">
                    {user.name}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.phone}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-foreground">
                    {user.email}
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
                      <Eye className="h-5 w-5 mx-auto opacity-70 hover:opacity-100" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 mt-6">
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-muted font-medium text-foreground">
            1
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted font-medium text-muted-foreground transition-colors">
            2
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted font-medium text-muted-foreground transition-colors">
            3
          </button>
          <span className="flex items-center justify-center h-8 px-2 text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" />
          </span>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted font-medium text-muted-foreground transition-colors">
            13
          </button>
          <button className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
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
