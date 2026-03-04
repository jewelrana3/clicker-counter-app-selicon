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

        <div className="flex items-center justify-between mb-4 mt-2">
          <div className="flex gap-2 items-center">
            <Badge
              className={`capitalize px-3 py-1 ${
                userData.status === "active"
                  ? "bg-green-100 text-green-700 hover:bg-green-100"
                  : userData.status === "inactive"
                    ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    : "bg-red-100 text-red-700 hover:bg-red-100"
              }`}
            >
              {userData.status}
            </Badge>
            {userData.isVerified && (
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 px-3 py-1 border-none shadow-none">
                Verified
              </Badge>
            )}
          </div>
          <span className="text-gray-400 text-sm font-medium bg-gray-50 px-3 py-1 rounded-md border">
            ID: {userData._id ? userData._id.slice(-8) : "N/A"}
          </span>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "user"
                ? "bg-[#E40004] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("user")}
          >
            User Info
          </button>
          <button
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-colors ${
              activeTab === "business"
                ? "bg-[#E40004] text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("business")}
          >
            Business Info
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <Image
                src={getImageUrl(userData.image || userData.advertiser?.logo)}
                fill
                alt={userData.name || "User"}
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                {userData.name || "Unknown User"}
                <span
                  title={userData.isOnline ? "Online" : "Offline"}
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 inline-block ${
                    userData.isOnline ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              </h2>
              <p className="text-gray-500 text-sm">{userData.email}</p>
              <div className="flex gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="capitalize text-gray-600 border-gray-300 shadow-none font-medium"
                >
                  {userData.role || "User"}
                </Badge>
                {userData.privacy && (
                  <Badge
                    variant="outline"
                    className="capitalize text-gray-500 border-gray-200 shadow-none font-normal"
                  >
                    Privacy: {userData.privacy}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {activeTab === "user" ? (
            <div className="grid grid-cols-2 gap-y-5 gap-x-8 p-1">
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                  Date of Birth
                </p>
                <p className="text-gray-800 font-medium">
                  {userData.dob
                    ? new Date(userData.dob).toLocaleDateString()
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                  Gender
                </p>
                <p className="text-gray-800 font-medium capitalize">
                  {userData.gender || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                  Registered At
                </p>
                <p className="text-gray-800 font-medium">
                  {userData.createdAt
                    ? new Date(userData.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                  Account Status
                </p>
                <p className="text-gray-800 font-medium">
                  {userData.isDeleted ? "Deleted" : "Active"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                  Address
                </p>
                <p className="text-gray-800 font-medium leading-relaxed">
                  {userData.address || "No address provided"}
                </p>
              </div>
              {userData.bio && (
                <div className="col-span-2 pt-2 border-t mt-2">
                  <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                    Bio
                  </p>
                  <p className="text-gray-600 leading-relaxed italic">
                    "{userData.bio}"
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 p-1 min-h-[160px]">
              {userData.role === "advertiser" && userData.advertiser ? (
                <div className="grid grid-cols-2 gap-y-5 gap-x-8">
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                      Business Name
                    </p>
                    <p className="text-gray-800 font-medium">
                      {userData.advertiser.businessName || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                      Business Type
                    </p>
                    <p className="text-gray-800 font-medium capitalize">
                      {userData.advertiser.businessType || "Not provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                      Phone Number
                    </p>
                    <p className="text-gray-800 font-medium">
                      {userData.advertiser.phone || "Not available"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                      License Number
                    </p>
                    <p className="text-gray-800 font-medium">
                      {userData.advertiser.licenseNumber || "Not available"}
                    </p>
                  </div>
                  <div className="col-span-2 pt-2 border-t mt-2">
                    <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider mb-1.5">
                      Business Bio
                    </p>
                    <p className="text-gray-600 leading-relaxed italic">
                      {userData.advertiser.bio ||
                        "No business biography provided."}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">
                    No business information available.
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    This detailed segment is reserved for advertisers.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
