"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getImageUrl } from "@/lib/GetImageUrl";
import { useState } from "react";
import { updateSupportStatusAction } from "@/app/actions/updateSupportStatusAction";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function SupportDetailsModal({
  trigger,
  support,
  fetchSupport,
}: {
  trigger: React.ReactNode;
  support: any;
  fetchSupport: () => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!support) return null;

  const handleMarkAsResolved = async () => {
    setIsUpdating(true);
    try {
      const result = await updateSupportStatusAction(support._id, "resolved");
      if (result.success) {
        toast.success("Ticket marked as resolved");
        fetchSupport();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update ticket status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const isActionDisabled =
    isUpdating || support.status.toLowerCase() === "resolved";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl max-w-xl w-full max-h-[90vh] overflow-y-auto outline-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Support Details - {support.title}</DialogTitle>
          <DialogDescription>
            Detailed information about the support inquiry.
          </DialogDescription>
        </DialogHeader>

        <div className="p-2">
          {/* Top Section: Info and Image */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 space-y-4 pr-4">
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="text-gray-700 font-medium whitespace-nowrap">
                  From :
                </span>
                <span className="text-gray-500">
                  {support.user?.name || "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="text-gray-700 font-medium whitespace-nowrap">
                  Date :
                </span>
                <span className="text-gray-500">
                  {new Date(support.createdAt).toISOString().split("T")[0]}
                </span>
              </div>
              <div className="flex items-center gap-2 border-b border-gray-200 pb-1">
                <span className="text-gray-700 font-medium whitespace-nowrap">
                  Status :
                </span>
                <span className="text-gray-500 capitalize">
                  {support.status}
                </span>
              </div>
            </div>

            <div className="w-[140px] h-[100px] shrink-0 relative bg-gray-100 rounded-lg overflow-hidden border shadow-sm">
              <Image
                src={getImageUrl(
                  support.attachments?.[0] || support.user?.image,
                )}
                fill
                alt="Support Thumbnail"
                className="object-cover"
              />
            </div>
          </div>

          {/* Message Section */}
          <div className="mb-10">
            <label className="block text-gray-700 font-medium mb-2">
              Message :
            </label>
            <div className="w-full p-4 border border-gray-200 rounded-lg bg-white min-h-[120px] text-gray-600 text-sm leading-relaxed">
              {support.message}
            </div>
          </div>

          {/* Resolve Button */}
          <Button
            onClick={handleMarkAsResolved}
            disabled={isActionDisabled}
            className="w-full py-6 bg-[#E40004] hover:bg-red-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-md disabled:opacity-50"
          >
            {isUpdating ? (
              <Loader2 className="animate-spin h-6 w-6" />
            ) : (
              "Mark as resolved"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
