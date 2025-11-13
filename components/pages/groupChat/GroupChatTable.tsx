import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function GroupChatTable() {
  return (
    <Table className="mt-7">
      <TableHeader>
        <TableRow>
          <TableHead>S.No</TableHead>
          <TableHead>Logo</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Create Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>
            <Image
              src="/path/to/logo.png"
              alt="Logo"
              width={10}
              height={10}
              className="w-8 h-8 rounded-full"
            />
          </TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>12</TableCell>
          <TableCell>2025-11-13</TableCell>
          <TableCell>
            <Badge className="text-md bg-green-600">Active</Badge>
          </TableCell>
          <TableCell>
            <button className="text-blue-500 hover:underline">Edit</button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
