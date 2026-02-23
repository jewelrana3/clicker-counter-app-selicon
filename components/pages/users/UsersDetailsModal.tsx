"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/GetImageUrl";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function UsersDetailsModal({
  trigger,
  userData,
}: {
  trigger: React.ReactNode;
  userData: any;
}) {
  const [activeTab, setActiveTab] = useState("user");

  if (!userData) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl max-w-xl w-full p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>User Details - {userData.name}</DialogTitle>
          <DialogDescription>
            Detailed information about {userData.name}, including personal and
            business info.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between mb-4">
          <Badge
            className={`capitalize ${
              userData.status === "active"
                ? "bg-green-100 text-green-700 hover:bg-green-100"
                : userData.status === "inactive"
                  ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                  : "bg-red-100 text-red-700 hover:bg-red-100"
            }`}
          >
            {userData.status}
          </Badge>
          <span className="text-gray-400 text-sm">
            ID: {userData._id.slice(-8)}
          </span>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "user"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("user")}
          >
            User Info
          </button>
          <button
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "business"
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("business")}
          >
            Business Info
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-orange-100">
              <Image
                src={getImageUrl(userData.image)}
                fill
                alt={userData.name}
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-gray-500">{userData.email}</p>
              <Badge
                variant="outline"
                className="mt-1 capitalize text-orange-600 border-orange-200"
              >
                {userData.role}
              </Badge>
            </div>
          </div>

          <hr className="border-gray-100" />

          {activeTab === "user" ? (
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">
                  Date of Birth
                </p>
                <p className="text-gray-700 font-medium">
                  {userData.dob
                    ? new Date(userData.dob).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Gender</p>
                <p className="text-gray-700 font-medium capitalize">
                  {userData.gender || "Not specified"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-400 font-medium mb-1">
                  Address
                </p>
                <p className="text-gray-700 font-medium">
                  {userData.address || "No address provided"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">
                  Registered At
                </p>
                <p className="text-gray-700 font-medium">
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 font-medium mb-1">Bio</p>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  {userData.bio || "No biography provided."}
                </p>
              </div>
              <hr className="border-gray-100" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">
                    Phone
                  </p>
                  <p className="text-gray-700 font-medium">
                    {userData.contact || "Not available"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium mb-1">
                    Privacy Level
                  </p>
                  <p className="text-gray-700 font-medium capitalize">
                    {userData.privacy || "Public"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
