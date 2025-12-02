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
import { Info, Trash2 } from "lucide-react";
import AdsDetailsModal from "./AdsDetailsModal";
import Image from "next/image";
import DeleteModal from "./DeleteModal";

const data = [
  {
    name: "Dulce Rohman",
    description: "This page helps to find beat so...",
    link: "Webxila.com/ics...",
    price: "$100",
    startDate: "12/21/2023",
    endDate: "12/06/2026",
    reach: "10,000",
    click: "8,000",
    status: "Active",
  },
];

export default function AdsManagement() {
  return (
    <Table className="mt-7">
      <TableHeader>
        <TableRow>
          <TableHead>S.No</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead>Reach</TableHead>
          <TableHead>Click</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>01</TableCell>
            <TableCell className="flex items-center gap-2">
              <Image
                src="/ads/profile.png"
                alt="Logo"
                width={10}
                height={10}
                className="w-10 h-10 rounded-full"
              />
              {item.name}
            </TableCell>

            <TableCell>{item.description}</TableCell>
            <TableCell>{item.link}</TableCell>
            <TableCell>{item.price}</TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.endDate}</TableCell>
            <TableCell>{item.reach}</TableCell>
            <TableCell>{item.click}</TableCell>
            <TableCell>
              <Badge className="text-md text-[#008F37] bg-[#00FF6226] border border-[#008F37]">
                Active
              </Badge>
            </TableCell>
            <TableCell className="">
              <div className="flex items-center space-x-3">
                <AdsDetailsModal
                  trigger={
                    <div className="text-red-400 cursor-pointer">
                      <Info />
                    </div>
                  }
                />

                <DeleteModal
                  trigger={
                    <div className=" cursor-pointer">
                      <Trash2 />
                    </div>
                  }
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
