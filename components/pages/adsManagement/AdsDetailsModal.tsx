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
import Link from "next/link";
import { getImageUrl } from "@/lib/GetImageUrl";
import { useState } from "react";
import { updateAdStatusAction } from "@/app/actions/updateAdStatusAction";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function AdsDetailsModal({
  trigger,
  ad,
  fetchAds,
}: {
  trigger: React.ReactNode;
  ad: any;
  fetchAds: () => void;
}) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!ad) return null;

  const handleStatusUpdate = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const result = await updateAdStatusAction(ad._id, newStatus);
      if (result.success) {
        toast.success(result.message);
        fetchAds();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const isActionDisabled =
    isUpdating ||
    ad.approvalStatus.toLowerCase() === "approved" ||
    ad.approvalStatus.toLowerCase() === "rejected";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl max-w-xl w-full h-[80%] overflow-y-auto outline-none">
        <DialogHeader className="sr-only">
          <DialogTitle>Advertisement Details - {ad.title}</DialogTitle>
          <DialogDescription>
            Detailed information about the advertisement including user,
            description, price, and reach.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          {/* Header */}
          <div className="p-3 flex items-center gap-3">
            <div className="relative w-16 h-16 shrink-0">
              <Image
                src={getImageUrl(ad.user?.image)}
                fill
                alt={ad.user?.name || "User"}
                className="rounded-full object-cover border"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {ad.user?.name || "Unknown User"}
              </h2>
              <p className="text-gray-500 text-sm">{ad.user?.email || "N/A"}</p>
            </div>
          </div>

          {/* Main Image */}
          <div className="w-full bg-gray-50 py-4">
            <div className="relative w-[80%] aspect-video mx-auto">
              {ad.image ? (
                <Image
                  src={getImageUrl(ad.image)}
                  fill
                  alt={ad.title}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  No Ad Image
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Ads Title */}
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                Ads Title
              </p>
              <p className="text-lg font-medium text-gray-900">{ad.title}</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                Description
              </p>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                {ad.description}
              </p>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                Price
              </p>
              <p className="text-xl font-bold text-red-600">${ad.price}</p>
            </div>

            {/* Reach & Click */}
            <div className="grid grid-cols-2 gap-8 border-y py-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                  Total Reach
                </p>
                <p className="text-lg font-medium">
                  {ad.reachCount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                  Total Clicks
                </p>
                <p className="text-lg font-medium">
                  {ad.clickCount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Link */}
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                Target Link
              </p>
              <a
                href={ad.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#008CFF] hover:underline text-sm font-medium break-all"
              >
                {ad.websiteUrl}
              </a>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-8 border-t pt-4">
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                  Start Date
                </p>
                <p className="font-medium">
                  {new Date(ad.startAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                  End Date
                </p>
                <p className="font-medium">
                  {new Date(ad.endAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="p-6 flex justify-between gap-4 sticky bottom-0 bg-white border-t">
            <Button
              onClick={() => handleStatusUpdate("rejected")}
              disabled={isActionDisabled}
              className="w-1/2 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 bg-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Reject"
              )}
            </Button>
            <Button
              onClick={() => handleStatusUpdate("approved")}
              disabled={isActionDisabled}
              className="w-1/2 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Approve"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
