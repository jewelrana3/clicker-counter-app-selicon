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
import { Info, Search } from "lucide-react";
import AdsDetailsModal from "./AdsDetailsModal";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItems } from "@/components/share/SelectItem";
import { Input } from "@/components/ui/input";
import AdsControlModal from "./AdsControlModal";
import Link from "next/link";

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
  {
    name: " Rohman",
    description: "This page helps to find beat so...",
    link: "Webxila.com/ics...",
    price: "$100",
    startDate: "12/21/2023",
    endDate: "12/06/2026",
    reach: "10,000",
    click: "8,000",
    status: "Pending",
  },
  {
    name: "Alex",
    description: "This page helps to find beat so...",
    link: "Webxila.com/ics...",
    price: "$100",
    startDate: "12/21/2023",
    endDate: "12/06/2026",
    reach: "10,000",
    click: "8,000",
    status: "Inactive",
  },
];

const all = ["All", "Active", "Inactive", "Pending"];

export default function AdsManagement() {
  const statusColor = {
    Active: "text-[#008F37] bg-[#00FF6226] border border-[#008F37]",
    Inactive: "bg-[#FFD9D9] border border-[#E40004] text-[#E40004]",
    Pending: "bg-[#FFECD7] border border-[#F48201] text-[#F48201]",
  };

  return (
    <>
      <div className="flex justify-end space-x-4">
        <div>
          {/* <AdsControlModal
            trigger={
              <button className="bg-[#E40004] text-white p-3 rounded-full cursor-pointer">
                Ads Plan
              </button>
            }
          /> */}
          <Link href="/ads-plan">
            <button className="bg-[#E40004] text-white p-3 rounded-full cursor-pointer">
              Ads Plan
            </button>
          </Link>
        </div>
        <div className="flex gap-5 w-[50%]">
          <div className="w-full relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search />
            </span>

            <Input className="pl-10" placeholder="Search here" />
          </div>

          <SelectItems select={all} placeholder="All" />
          {/* <SelectItems select={allUsers} placeholder="All Users" /> */}
        </div>
      </div>
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
            <TableHead className="pl-9">Action</TableHead>
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
                <Badge
                  className={`text-md  w-20 ${
                    statusColor[item.status as keyof typeof statusColor]
                  }`}
                >
                  {item.status}
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

                  {/* <DeleteModal
                    trigger={
                      <div className=" cursor-pointer">
                        <Trash2 />
                      </div>
                    }
                  /> */}
                  <Select>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Suspense" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Suspense</SelectItem>
                        <SelectItem value="banana">Active</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
