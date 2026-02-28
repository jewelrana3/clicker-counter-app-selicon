"use client";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Info, Lock, Search, Unlock, Loader2 } from "lucide-react";
import Image from "next/image";
import UsersDetailsModal from "./UsersDetailsModal";
import { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { SelectItems } from "./../../share/SelectItem";
import { Input } from "@/components/ui/input";
import { getUsersAction } from "@/app/actions/getUsersAction";
import { toggleUserStatusAction } from "@/app/actions/toggleUserStatusAction";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";
import { getImageUrl } from "@/lib/GetImageUrl";

const roleOptions = ["All Users", "User", "Advertiser"];
const statusOptions = ["All", "Active", "Inactive", "Blocked"];

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [role, setRole] = useState("All Users");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getUsersAction({
        searchTerm: debouncedSearchTerm,
        role: role === "All Users" ? undefined : role,
        status: status === "All" ? undefined : status,
        page,
        limit: 10,
      });

      console.log("result ==========>>>", result);

      if (result.success) {
        setUsers(result.data || []);
        setTotalPage(result.pagination?.totalPage || 1);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, role, status, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleLock = (id: string, currentStatus: string) => {
    const isBlocked = currentStatus === "blocked";
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${isBlocked ? "unblock" : "block"} this user!`,
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
          const res = await toggleUserStatusAction(id);
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
            fetchUsers();
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
    <>
      <div className="flex justify-end mb-6">
        <div className="flex gap-5 w-[60%] lg:w-[50%]">
          <div className="w-full relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </span>
            <Input
              className="pl-10 h-12 rounded-full shadow-sm"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-1/3">
            <SelectItems
              select={statusOptions}
              placeholder="Status"
              value={status}
              onChange={(val: string) => {
                setStatus(val);
                setPage(1);
              }}
            />
          </div>
          <div className="w-1/3">
            <SelectItems
              select={roleOptions}
              placeholder="Role"
              value={role}
              onChange={(val: string) => {
                setRole(val);
                setPage(1);
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-16">S.No</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Reg. Date</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={9} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                    <p className="text-gray-500 font-medium">
                      Loading users...
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-64 text-center text-gray-500 font-medium"
                >
                  No users found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              users.map((item, index) => (
                <TableRow
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">
                    {((page - 1) * 10 + index + 1).toString().padStart(2, "0")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-200">
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <span className="font-semibold text-gray-700">
                        {item.name}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-600">
                    {item.contact || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600">{item.email}</TableCell>
                  <TableCell className="text-gray-600">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600 capitalize">
                    {item.gender || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-600 truncate max-w-[150px]">
                    {item.address || "N/A"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`text-xs h-6 px-3 rounded-full capitalize ${
                        item.status === "active"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : item.status === "inactive"
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center space-x-1">
                      <UsersDetailsModal
                        userData={item}
                        trigger={
                          <div className="text-blue-500 hover:bg-blue-50 rounded-full p-2 transition-colors cursor-pointer">
                            <Info size={19} />
                          </div>
                        }
                      />

                      <div
                        className="p-2 transition-colors group cursor-pointer"
                        onClick={() => handleLock(item._id, item.status)}
                      >
                        {item.status === "inactive" ? (
                          <div className="text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full p-1 transition-colors">
                            <Unlock size={19} />
                          </div>
                        ) : (
                          <div className="text-red-500 hover:bg-red-50 rounded-full p-1 transition-colors">
                            <Lock size={19} />
                          </div>
                        )}
                      </div>
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
            className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="flex items-center px-4 font-medium text-gray-700">
            Page {page} of {totalPage}
          </span>
          <button
            disabled={page === totalPage || loading}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
