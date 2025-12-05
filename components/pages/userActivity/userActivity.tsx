"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, ClockAlert, Info, Lock, Search, Unlock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import UserActivityDetailsModal from "./UserActivityDetailsModal";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { SelectItems } from "@/components/share/SelectItem";

const allPost = ["All Post", "Active Post", "Block Post"];
const vibesArray = [
  "Great Vibes",
  "Off Vibes",
  "Charming Gentlemen",
  "Lovely Leady",
];

const data = [
  {
    id: 1,
    name: "Mohammad",
    contact: "+1234567890",
    email: "user@email.com",
    privacy: "Public",
    clicker: "Great Vibes ",
    description: "It was very nice Momen..",
  },
  {
    id: 2,
    name: "Mohammad",
    contact: "+1234567890",
    email: "user@email.com",
    privacy: "Public",
    clicker: "Great Vibes ",
    description: "It was very nice Momen..",
  },
];

export default function UserActivity() {
  const [status, setStatus] = useState([1, 2]);

  const hanldeLock = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to block this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "swal-btn",
        cancelButton: "swal-btn",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const isActive = status.includes(id);
        if (isActive) {
          setStatus(status.filter((item) => item !== id));
        } else {
          setStatus([...status, id]);
        }
        Swal.fire({
          title: "Blocked!",
          text: "Your file has been blocked.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="flex justify-end ">
        <div className="flex gap-5 w-[50%]">
          <div className="w-full relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search />
            </span>

            <Input className="pl-10" placeholder="Search here" />
          </div>

          <SelectItems select={vibesArray} placeholder="Great Vibes" />
          <SelectItems select={allPost} placeholder="All Post" />
        </div>
      </div>
      <Table className="mt-7">
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Privacy</TableHead>
            <TableHead>Clicker </TableHead>
            <TableHead>Description </TableHead>
            <TableHead className="pl-7">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>#202258{index + 1}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Image
                  src="/user-activity/user-activity.png"
                  alt="Logo"
                  width={10}
                  height={10}
                  className="w-10 h-10 rounded-full"
                />
                {item.name}
              </TableCell>

              <TableCell>{item.contact}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.privacy}</TableCell>
              <TableCell>{item.clicker}</TableCell>
              <TableCell>{item.description.slice(0, 20)}...</TableCell>

              <TableCell className="">
                <div className="flex items-center  space-x-4">
                  <div className="mt-1">
                    {index % 2 === 0 ? (
                      <ClockAlert />
                    ) : (
                      <Check className="text-green-600" />
                    )}
                  </div>
                  <div>
                    <UserActivityDetailsModal
                      index={index}
                      trigger={
                        <div className="text-red-400 cursor-pointer mt-2">
                          <Info />
                        </div>
                      }
                    />
                  </div>

                  <div>
                    {status.includes(item.id) ? (
                      <Lock
                        className="text-red-400 cursor-pointer"
                        onClick={() => hanldeLock(item.id)}
                      />
                    ) : (
                      <Unlock
                        className="cursor-pointer"
                        onClick={() => hanldeLock(item.id)}
                      />
                    )}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
