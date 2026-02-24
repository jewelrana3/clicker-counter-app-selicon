"use client";

import { useEffect, useState, useCallback } from "react";
import { getNotificationsAction } from "@/app/actions/getNotificationsAction";
import { readNotificationAction } from "@/app/actions/readNotificationAction";
import { Loader2, BellOff, ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Notification = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalPage: 1,
  });

  const handleNotificationClick = async (item: any) => {
    try {
      if (!item.isRead) {
        await readNotificationAction(item._id);
        setNotifications((prev) =>
          prev.map((n) => (n._id === item._id ? { ...n, isRead: true } : n)),
        );
      }
      router.push("/user-activity");
    } catch (error) {
      console.error("Error handling notification click:", error);
      router.push("/user-activity");
    }
  };

  const fetchNotifications = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const res = await getNotificationsAction(page, pagination.limit);
        if (res.success) {
          setNotifications(res.data?.data || []);
          if (res.pagination) {
            setPagination((prev) => ({
              ...prev,
              page: res.pagination.page,
              totalPage: res.pagination.totalPage,
            }));
          }
        } else {
          toast.error(res.message || "Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Fetch notifications error:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [pagination.limit],
  );

  useEffect(() => {
    fetchNotifications(pagination.page);
  }, [fetchNotifications, pagination.page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPage) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {notifications.length > 0 && (
          <span className="px-3 py-1 bg-[#E40004]/10 text-[#E40004] text-xs font-bold rounded-full uppercase tracking-wider">
            Latest Updates
          </span>
        )}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 rounded-2xl border border-gray-100/50">
            <Loader2 className="h-10 w-10 animate-spin text-[#E40004] mb-3" />
            <p className="text-gray-500 font-medium animate-pulse">
              Checking for updates...
            </p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100/50 shadow-sm">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <BellOff className="h-8 w-8 text-gray-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              No Notifications Yet
            </h3>
            <p className="text-gray-400 text-sm">
              We'll alert you when something important happens.
            </p>
          </div>
        ) : (
          <>
            {notifications.map((item) => (
              <div
                key={item._id}
                onClick={() => handleNotificationClick(item)}
                className={`group bg-white p-5 rounded-xl border border-gray-100/50 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  !item.isRead ? "border-l-4 border-l-[#E40004]" : ""
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3
                      className={`text-base font-bold mb-1 group-hover:text-[#E40004] transition-colors ${
                        !item.isRead ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                      {item.message}
                    </p>
                  </div>
                  <div className="shrink-0 flex flex-col items-end gap-1">
                    <span className="text-[11px] font-medium text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                      {new Date(item.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {!item.isRead && (
                      <span className="w-2 h-2 rounded-full bg-[#E40004] animate-pulse mt-1" />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {pagination.totalPage > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: pagination.totalPage },
                    (_, i) => i + 1,
                  ).map((p) => (
                    <button
                      key={p}
                      onClick={() => handlePageChange(p)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                        pagination.page === p
                          ? "bg-[#E40004] text-white shadow-lg shadow-[#E40004]/20"
                          : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPage}
                  className="p-2 bg-white rounded-lg border border-gray-100 shadow-sm disabled:opacity-50 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Notification;
