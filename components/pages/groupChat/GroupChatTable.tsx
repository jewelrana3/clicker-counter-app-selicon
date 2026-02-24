import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Lock, Unlock, Loader2 } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";
import UserModal from "./UserModal";
import { toggleGroupChatStatusAction } from "@/app/actions/toggleGroupChatStatusAction";
import toast from "react-hot-toast";

export default function GroupChatTable({
  data,
  loading,
  page,
  totalPage,
  setPage,
  refreshData,
}: {
  data: any[];
  loading: boolean;
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
  refreshData: () => void;
}) {
  const handleLock = (id: string, currentStatus: string) => {
    const isActive = currentStatus === "active";
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${isActive ? "inactive" : "active"} this group chat!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Proceed",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "rounded-full px-6 py-2",
        cancelButton: "rounded-full px-6 py-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await toggleGroupChatStatusAction(id);
          if (res.success) {
            Swal.fire({
              title: "Success!",
              text: res.message,
              icon: "success",
              confirmButtonColor: "#EF4444",
              customClass: {
                confirmButton: "rounded-full px-6 py-2",
              },
            });
            refreshData();
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          toast.error("An error occurred. Please try again.");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>Logo</TableHead>
              <TableHead>Group Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Members</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-red-500" />
                    <p className="text-gray-500 font-medium">
                      Loading groups...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-64 text-center text-gray-500 font-medium"
                >
                  No group chats found.
                </TableCell>
              </TableRow>
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-500">
                    {((page - 1) * 10 + index + 1).toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell>
                    <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-100">
                      <Image
                        src={item.avatarUrl || "/group-chat/image.png"}
                        alt={item.chatName}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-700">
                    {item.chatName}
                  </TableCell>
                  <TableCell className="text-gray-500 truncate max-w-[200px]">
                    {item.description || "No description"}
                  </TableCell>
                  <TableCell className="text-center">
                    <UserModal
                      participants={item.participants}
                      trigger={
                        <div className="inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors">
                          {item.participants?.length || 0}
                        </div>
                      }
                    />
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`capitalize shadow-none ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      {item.status === "active" ? (
                        <div
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors cursor-pointer"
                          onClick={() => handleLock(item._id, item.status)}
                        >
                          <Unlock size={20} />
                        </div>
                      ) : (
                        <div
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                          onClick={() => handleLock(item._id, item.status)}
                        >
                          <Lock size={20} />
                        </div>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPage > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            disabled={page === 1 || loading}
            onClick={() => setPage(page - 1)}
            className="px-6 py-2 rounded-full border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-all font-medium text-gray-600 shadow-sm"
          >
            Previous
          </button>
          <span className="flex items-center px-4 font-semibold text-gray-700">
            Page {page} of {totalPage}
          </span>
          <button
            disabled={page === totalPage || loading}
            onClick={() => setPage(page + 1)}
            className="px-6 py-2 rounded-full border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-all font-medium text-gray-600 shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
