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
import { Info, Search, Loader2 } from "lucide-react";
import AdsDetailsModal from "./AdsDetailsModal";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItems } from "@/components/share/SelectItem";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { getAdsAction } from "@/app/actions/getAdsAction";
import { updateAdStatusAction } from "@/app/actions/updateAdStatusAction";
import { getImageUrl } from "@/lib/GetImageUrl";
import toast from "react-hot-toast";

const statusOptions = ["All", "Active", "Inactive", "Pending"];

export default function AdsManagement() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const statusColor: Record<string, string> = {
    active: "text-[#008F37] bg-[#00FF6226] border border-[#008F37]",
    inactive: "bg-[#FFD9D9] border border-[#E40004] text-[#E40004]",
    pending: "bg-[#FFECD7] border border-[#F48201] text-[#F48201]",
    approved: "text-[#008F37] bg-[#00FF6226] border border-[#008F37]",
    rejected: "bg-[#FFD9D9] border border-[#E40004] text-[#E40004]",
  };

  const fetchAds = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getAdsAction({
        search: debouncedSearchTerm,
        status: status,
        page,
        limit: 10,
      });

      if (result.success) {
        setAds(result.data || []);
        setTotalPage(result.pagination?.totalPage || 1);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch ads.");
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, status, page]);

  useEffect(() => {
    fetchAds();
  }, [fetchAds]);

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleStatusUpdate = async (adId: string, newStatus: string) => {
    try {
      const result = await updateAdStatusAction(adId, newStatus);
      if (result.success) {
        toast.success(result.message);
        fetchAds(); // Refresh the list
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  return (
    <>
      <div className="flex justify-end space-x-4">
        <div>
          <Link href="/ads-plan">
            <button className="bg-[#E40004] text-white p-3 px-6 rounded-full cursor-pointer hover:bg-opacity-90 transition-all font-medium">
              Ads Plan
            </button>
          </Link>
        </div>
        <div className="flex gap-5 w-[60%]">
          <div className="w-full relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </span>
            <Input
              className="pl-10 h-12! rounded-full"
              placeholder="Search by name or title"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="w-[180px]">
            <SelectItems
              select={statusOptions}
              placeholder="Filter by status"
              value={status}
              onChange={handleStatusChange}
            />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        {loading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin h-10 w-10 text-red-500" />
          </div>
        )}

        <Table className="mt-7">
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-[60px]">S.No</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Link</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Reach</TableHead>
              <TableHead>Click</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.length > 0
              ? ads.map((item, index) => (
                  <TableRow key={item._id} className="hover:bg-gray-50/50">
                    <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 shrink-0">
                          <Image
                            src={getImageUrl(item.user?.image)}
                            alt={item.user?.name || "User"}
                            fill
                            className="rounded-full object-cover border"
                          />
                        </div>
                        <span className="font-medium whitespace-nowrap">
                          {item.user?.name || "Unknown"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="max-w-[200px] truncate">
                      {item.description}
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">
                      <a
                        href={item.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {item.websiteUrl}
                      </a>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      ${item.price}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(item.startAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(item.endAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.reachCount}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.clickCount}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full capitalize border-none shadow-none ${
                          statusColor[item.status.toLowerCase()] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center space-x-3">
                        <AdsDetailsModal
                          ad={item}
                          trigger={
                            <div className="text-red-400 cursor-pointer hover:text-red-500 transition-colors">
                              <Info size={18} />
                            </div>
                          }
                        />

                        <Select
                          defaultValue={
                            item.approvalStatus || item.status.toLowerCase()
                          }
                          onValueChange={(value) =>
                            handleStatusUpdate(item._id, value)
                          }
                        >
                          <SelectTrigger className="w-[110px] h-9 rounded-md text-xs">
                            <SelectValue />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              : !loading && (
                  <TableRow>
                    <TableCell
                      colSpan={11}
                      className="h-32 text-center text-gray-500 font-medium"
                    >
                      No advertisements found
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {totalPage > 1 && (
        <div className="flex justify-center mt-10 gap-2 pb-10">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded-full text-sm disabled:opacity-50 hover:bg-gray-50 transition-all font-medium"
          >
            Previous
          </button>
          {[...Array(totalPage)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                page === i + 1
                  ? "bg-red-500 text-white"
                  : "border hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={page === totalPage}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded-full text-sm disabled:opacity-50 hover:bg-gray-50 transition-all font-medium"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
