"use client";

import {
  LayoutGrid,
  User,
  Shield,
  LogOut,
  UserPen,
  FileTerminal,
  Users,
  Megaphone,
  MessagesSquare,
  MapPinned,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { logoutAction } from "@/app/actions/logoutAction";

export const sidebarMenu = [
  { id: 1, label: "Analytics", icon: LayoutGrid, path: "/" },
  { id: 2, label: "Users", icon: User, path: "/users" },
  {
    id: 3,
    label: "User Activity",
    icon: Users,
    path: "/user-activity",
  },
  { id: 4, label: "Ads Management", icon: Megaphone, path: "/ads-management" },
  { id: 14, label: "Group Chat", icon: MessagesSquare, path: "/group-chat" },

  { id: 5, label: "Privacy Policy", icon: Shield, path: "/privacy-policy" },
  {
    id: 6,
    label: "Terms & Condition",
    icon: FileTerminal,
    path: "/terms-condition",
  },
  { id: 7, label: "Change Password", icon: UserPen, path: "/change-password" },

  { id: 8, label: "Nearby Setting", icon: MapPinned, path: "/near-by" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Log Out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "swal-btn",
        cancelButton: "swal-btn",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await logoutAction();
        router.push("/login");

        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl h-screen">
      <div className="ml-16 py-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/auth/logo.png"
            alt="Zasulehry"
            width={24}
            height={24}
            className="w-24"
            sizes="100vh"
          />
        </Link>
      </div>
      <div className="">
        <div className="px-4 text-sm ">
          {sidebarMenu.map((item) => {
            const isActive = pathname === item.path;

            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 my-2 py-1.5 cursor-pointer font-medium text-[12px] 2xl:text-[15px] space-y-1 ${
                    item?.label === "Log Out"
                      ? "text-red-600"
                      : isActive
                        ? "bg-[#E40004] text-white rounded-2xl"
                        : "text-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
        <div
          onClick={handleDelete}
          className={`flex items-center gap-3 px-4 cursor-pointer font-medium text-[12px] 2xl:text-[15px] text-red-600 ml-4 mt-[40%]`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate">Log Out</span>
        </div>
      </div>
    </div>
  );
}
