import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EarningTransaction } from "../types";

interface EarningsTableProps {
  data: EarningTransaction[];
}

export function EarningsTable({ data }: EarningsTableProps) {
  return (
    <div className="overflow-hidden border border-border rounded-xl">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="py-4">Name</TableHead>
              <TableHead className="py-4">Created By</TableHead>
              <TableHead className="py-4">Date & Time</TableHead>
              <TableHead className="py-4">Location</TableHead>
              <TableHead className="py-4">Price</TableHead>
              <TableHead className="py-4">Commission</TableHead>
              <TableHead className="py-4">Earning</TableHead>
              <TableHead className="py-4">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="py-4 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <img src={row.image} alt={row.name} className="h-8 w-12 object-cover rounded-md" />
                    <span className="font-medium text-foreground">{row.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4 whitespace-nowrap">{row.createdBy}</TableCell>
                <TableCell className="py-4 whitespace-nowrap">{`${row.date}, ${row.time}`}</TableCell>
                <TableCell className="py-4">{row.location}</TableCell>
                <TableCell className="py-4 font-medium">{row.price}</TableCell>
                <TableCell className="py-4">{row.commission}</TableCell>
                <TableCell className="py-4 font-medium">{row.earning}</TableCell>
                <TableCell className="py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${
                      row.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
