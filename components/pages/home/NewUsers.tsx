"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getUsersAction } from "@/app/actions/getUsersAction";
import { getImageUrl } from "@/lib/GetImageUrl";
import { Loader2 } from "lucide-react";

export default function UsersHomePage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsersAction({
          page: 1,
          limit: 6,
        });
        if (res.success) {
          setUsers(res.data || []);
        }
      } catch (error) {
        console.error("Fetch latest users error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100/50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">New Users</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#E40004]" />
            <span className="text-sm font-medium">200</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F97316]" />
            <span className="text-sm font-medium">50</span>
          </div>
          <Link
            href="/users"
            className="text-[#008F37] text-sm font-semibold hover:underline"
          >
            See More
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[350px]">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-[350px] space-y-2">
            <Loader2 className="h-8 w-8 animate-spin text-[#E40004]" />
            <p className="text-gray-500 font-medium">Loading new users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex items-center justify-center h-[350px] text-gray-500 font-medium">
            No new users found.
          </div>
        ) : (
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-3 font-semibold text-gray-400">Serial</th>
                <th className="py-3 font-semibold text-gray-400">User Name</th>
                <th className="py-3 font-semibold text-gray-400">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full bg-red-50 text-[#E40004] text-[10px] font-bold uppercase tracking-wider `}
                    >
                      {idx + 1}
                    </span>
                  </td>
                  <td className="py-3 font-medium text-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 shrink-0 overflow-hidden rounded-full border border-gray-100 shadow-sm">
                        <Image
                          src={getImageUrl(user.image)}
                          alt={user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="truncate max-w-[150px]">
                        {user.name || "Unknown"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-400 truncate max-w-[150px]">
                    {user.email || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
