"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lock, Unlock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function GroupChatTable() {
  const [status, setStatus] = useState<boolean>(true);
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
          <TableCell>01</TableCell>
          <TableCell>
            <Image
              src="/group-chat/image.png"
              alt="Logo"
              width={10}
              height={10}
              className="w-10 h-10 rounded-full"
            />
          </TableCell>
          <TableCell>John Doe</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell>12</TableCell>
          <TableCell>2025-11-13</TableCell>
          <TableCell>
            <Badge className="text-md bg-green-600">Active</Badge>
          </TableCell>
          <TableCell className="pl-4">
            {status ? (
              <Lock
                className="text-red-400 cursor-pointer"
                onClick={() => setStatus((prev) => !prev)}
              />
            ) : (
              <Unlock
                className="cursor-pointer"
                onClick={() => setStatus((prev) => !prev)}
              />
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
