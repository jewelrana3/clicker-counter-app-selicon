"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, ClockAlert, Info, Lock, Search, Unlock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import UserActivityDetailsModal from "./UserActivityDetailsModal";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { SelectItems } from "@/components/share/SelectItem";
import { getPostsAction } from "@/app/actions/getPostsAction";
import { togglePostStatusAction } from "@/app/actions/togglePostStatusAction";
import { useDebounce } from "use-debounce";
import toast from "react-hot-toast";
import { getImageUrl } from "@/lib/GetImageUrl";

const allPostOptions = ["All Post", "Active Post", "Blocked Post"];
const vibesArray = [
  "All",
  "Great Vibes",
  "Off Vibes",
  "Charming Gentlemen",
  "Lovely Leady",
];

export default function UserActivity() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [clickerType, setClickerType] = useState("All");
  const [status, setStatus] = useState("All Post");
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPage: 1,
  });

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPostsAction({
        searchTerm: debouncedSearch,
        clickerType: clickerType === "All" ? undefined : clickerType,
        status: status === "All Post" ? undefined : status,
        page: pagination.page,
        limit: pagination.limit,
      });

      if (res.success) {
        setPosts(res.data || []);
        if (res.pagination) {
          setPagination((prev) => ({
            ...prev,
            total: res.pagination.total,
            totalPage: res.pagination.totalPage,
          }));
        }
      } else {
        toast.error(res.message || "Failed to fetch posts");
      }
    } catch (error) {
      console.error("Fetch posts error:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, clickerType, status, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <div className="flex justify-end ">
        <div className="flex gap-5 w-[50%]">
          <div className="w-full relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search />
            </span>

            <Input
              className="pl-10"
              placeholder="Search by location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <SelectItems
            select={vibesArray}
            placeholder="Clicker Type"
            value={clickerType}
            onChange={(val: string) => {
              setClickerType(val);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          />
          <SelectItems
            select={allPostOptions}
            placeholder="Status"
            value={status}
            onChange={(val: string) => {
              setStatus(val);
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          />
        </div>
      </div>
      <Table className="mt-7">
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Privacy</TableHead>
            <TableHead>Clicker </TableHead>
            <TableHead>Description </TableHead>
            <TableHead className="pl-7">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                Loading...
              </TableCell>
            </TableRow>
          ) : posts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                No posts found
              </TableCell>
            </TableRow>
          ) : (
            posts.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell>
                  #{(pagination.page - 1) * pagination.limit + index + 1}
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={getImageUrl(item?.user?.image)}
                    alt="User"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {item?.user?.name || "Unknown"}
                </TableCell>

                <TableCell>{item?.user?.email || "N/A"}</TableCell>
                <TableCell
                  className="max-w-[150px] truncate cursor-help"
                  title={item?.address || "N/A"}
                >
                  {item?.address || "N/A"}
                </TableCell>
                <TableCell className="capitalize">{item?.privacy}</TableCell>
                <TableCell>{item?.clickerType}</TableCell>
                <TableCell>{item?.description?.slice(0, 20)}...</TableCell>

                <TableCell className="">
                  <div className="flex items-center  space-x-4">
                    <div className="mt-1">
                      {item?.status === "active" ? (
                        <Check className="text-green-600" />
                      ) : (
                        <ClockAlert className="text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <UserActivityDetailsModal
                        post={item}
                        onSuccess={fetchPosts}
                        trigger={
                          <div className="text-red-400 cursor-pointer mt-2">
                            <Info />
                          </div>
                        }
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {pagination.totalPage > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: Math.max(1, prev.page - 1),
              }))
            }
            disabled={pagination.page === 1}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {pagination.page} of {pagination.totalPage}
          </span>
          <button
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: Math.min(prev.totalPage, prev.page + 1),
              }))
            }
            disabled={pagination.page === pagination.totalPage}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
