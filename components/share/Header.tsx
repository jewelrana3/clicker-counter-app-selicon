"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import Title from "./Title";
import { usePathname } from "next/navigation";

const pathnames = [
  { id: 1, label: "Analytics", path: "/" },
  { id: 2, label: "Users", path: "#" },
  {
    id: 3,
    label: "User Activity",

    path: "/user-activity",
  },
  { id: 4, label: "Ads Management", path: "/ads-management" },
  { id: 14, label: "Group Chat", path: "/group-chat" },

  { id: 5, label: "Privacy Policy", path: "/privacy-policy" },
  {
    id: 6,
    label: "Terms & Condition",

    path: "/terms-condition",
  },
  { id: 7, label: "Change Password", path: "/change-password" },

  { id: 8, label: "Nearby", path: "/my-profile" },
];

export default function Header() {
  const pathname = usePathname();

  const currentPath = pathnames.find((item) => item.path === pathname);
  return (
    <div className="flex items-center justify-between h-20">
      <div>
        <Title className="!text-lg !mb-0">{currentPath?.label}</Title>
      </div>
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-white hover:bg-gray-300 cursor-pointer relative">
          <Bell size={28} />
          <p className="absolute top-0 right-0 bg-yellow-500 w-6 h-6 rounded-full text-center text-[#5C5C5C]">
            2
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/profile.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-[#333333]">Admin Humphrey</p>
        </div>
      </div>
    </div>
  );
}
