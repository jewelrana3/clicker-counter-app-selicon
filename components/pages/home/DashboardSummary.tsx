"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDashboardOverviewAction } from "@/app/actions/getDashboardOverviewAction";
import toast from "react-hot-toast";

export default function DashboardSummary() {
  const [data, setData] = useState<{
    totalUsers: number;
    totalAdvertisers: number;
    totalEarnings: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getDashboardOverviewAction();
        if (res.success) {
          setData(res.data);
        } else {
          toast.error(res.message || "Failed to fetch dashboard overview");
        }
      } catch (error) {
        console.error("Fetch dashboard overview error:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const currentDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());

  const stats = [
    {
      title: "Total User",
      total: loading ? "..." : data?.totalUsers.toLocaleString() || "0",
      icon: "/home/person.png",
    },
    {
      title: "Total Business User",
      total: loading ? "..." : data?.totalAdvertisers.toLocaleString() || "0",
      icon: "/home/person.png",
    },
    {
      title: "Total Earning",
      total: loading
        ? "..."
        : `$${data?.totalEarnings.toLocaleString() || "0"}`,
      icon: "/home/network.png",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl p-6 flex items-center shadow-sm border border-gray-100/50"
        >
          {/* Icon Container */}
          <div className="shrink-0 mr-5">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center p-3">
              <Image
                src={stat.icon}
                alt={stat.title}
                width={40}
                height={40}
                className="w-10 h-10 object-contain invert-27 sepia-92 saturate-4131 hue-rotate-346 brightness-101 contrast-106"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="grow flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-500 text-sm font-normal mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-semibold text-[#202224]">
                  {stat.total}
                </p>
              </div>
              <p className="text-xs text-gray-400 self-end mb-1 whitespace-nowrap">
                {currentDate}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
