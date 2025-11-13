"use client";

import {
  LayoutGrid,
  User,
  List,
  Shield,
  LogOut,
  UserPen,
  FileTerminal,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const sidebarMenu = [
  { id: 1, label: "Analytics", icon: LayoutGrid, path: "/" },
  { id: 2, label: "Users", icon: User, path: "#" },
  {
    id: 3,
    label: "User Activity",
    icon: Users,
    path: "/user-activity",
  },
  { id: 4, label: "Ads Management", icon: List, path: "/ads-management" },
  { id: 14, label: "Group Chat", icon: List, path: "/group-chat" },

  { id: 5, label: "Privacy Policy", icon: Shield, path: "/privacy-policy" },
  {
    id: 6,
    label: "Terms & Condition",
    icon: FileTerminal,
    path: "/terms-condition",
  },
  { id: 7, label: "Change Password", icon: UserPen, path: "/change-password" },

  { id: 8, label: "Nearby", icon: UserPen, path: "/my-profile" },
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
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
        ("/login");
        Swal.fire({
          title: "Logged Out",
          text: "Your have been Log Out.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="ml-16 py-2">
        {/* <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Zasulehry"
            width={24}
            height={24}
            className="w-24"
            sizes="100vh"
          />
          
        </Link> */}
        Logo here
      </div>
      <div
        className="overflow-y-auto scroll-smooth py-4 space-y-2 hide-scrollbar"
        style={{ height: "calc(100vh - 56px)" }}
      >
        <div className="px-4 space-y-1 text-sm overflow-y-auto ">
          {sidebarMenu.map((item) => {
            const isActive = pathname === item.path;

            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 my-2 py-1.5 cursor-pointer font-medium text-[12px] 2xl:text-[15px] ${
                    item?.label === "Log Out"
                      ? "text-red-600"
                      : isActive
                      ? "bg-[#E40004] text-white rounded-lg"
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
          className={`flex items-center gap-3 px-4 cursor-pointer font-medium text-[12px] 2xl:text-[15px] text-red-600 ml-4`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          <span className="truncate">Log Out</span>
        </div>
      </div>
    </div>
  );
}
