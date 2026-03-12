import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getImageUrl } from "@/lib/GetImageUrl";
import { togglePostStatusAction } from "@/app/actions/togglePostStatusAction";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useState } from "react";
import { X } from "lucide-react";

export default function UserActivityDetailsModal({
  trigger,
  post,
  onSuccess,
}: {
  trigger: React.ReactNode;
  post: any;
  onSuccess?: () => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleToggleStatus = async () => {
    const isCurrentlyActive = post.status === "active";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You want to ${isCurrentlyActive ? "block" : "unblock"} this post!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      didOpen: () => {
        const container = Swal.getContainer();
        if (container) {
          container.style.pointerEvents = "auto";
        }
      },
    });

    if (result.isConfirmed) {
      const loadingToast = toast.loading("Updating status...");
      try {
        const res = await togglePostStatusAction(
          post._id,
          isCurrentlyActive ? "inactive" : "active",
        );

        toast.dismiss(loadingToast);

        if (res.success) {
          await Swal.fire({
            title: isCurrentlyActive ? "Blocked!" : "Unblocked!",
            text: `The post has been ${
              isCurrentlyActive ? "blocked" : "unblocked"
            }.`,
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          if (onSuccess) onSuccess();
        } else {
          toast.error(res.message || "Failed to update status");
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        console.error("Toggle status error:", error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl max-w-xl w-full p-6">
        <DialogHeader className="sr-only">
          <DialogTitle>User Activity Details</DialogTitle>
          <DialogDescription>
            Detailed view of user moments, description, and status.
          </DialogDescription>
        </DialogHeader>

        <div className="">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Image
              src={getImageUrl(post.user?.image)}
              width={64}
              height={64}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className=" text-xl ">{post.user?.name || "Unknown"}</h2>
              <p className="text-gray-500 text-sm">
                {post.user?.email || "N/A"}
              </p>
            </div>
          </div>

          <hr className="my-5" />

          {/*images  */}
          <div className="my-4">
            <h1 className="mb-2 font-medium">Moments</h1>
            <div className="grid grid-cols-4 gap-3">
              {post.photos?.map((photo: string, idx: number) => (
                <div
                  key={idx}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImage(getImageUrl(photo))}
                >
                  <Image
                    src={getImageUrl(photo)}
                    fill
                    alt={`Moment ${idx + 1}`}
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Aspect ratio container since we changed Image to layout="fill" */}
                  <div className="pb-[100%] w-full"></div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-medium transition-opacity shadow-sm">
                      View
                    </span>
                  </div>
                </div>
              ))}
              {(!post.photos || post.photos.length === 0) && (
                <p className="text-sm text-gray-400 col-span-4">
                  No moments available
                </p>
              )}
            </div>
          </div>

          <div className=" space-y-4">
            {/* Description */}
            <div>
              <h1 className=" text-gray-500 font-medium mb-3">Description</h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                {post.description || "No description provided."}
              </p>
            </div>
            <hr />

            {/* Post Info */}
            <div className="grid grid-cols-2">
              <div className=" gap-3">
                <p className=" text-gray-500 font-medium">Clicker</p>
                <p className="text-sm">{post.clickerType || "N/A"}</p>
              </div>
              <div className=" gap-3">
                <p className=" text-gray-500 font-medium">Privacy</p>
                <p className="text-sm capitalize">{post.privacy || "N/A"}</p>
              </div>
            </div>

            {/* Warning Text and Block Button */}
            <div className="pt-4  space-y-6">
              <p className="text-red-500 text-sm text-start font-normal leading-tight">
                The administrator reserves the right to suspend or block any
                user found posting illegal or prohibited content.
              </p>

              <div className="flex justify-center">
                <Button
                  onClick={handleToggleStatus}
                  className={`w-full max-w-[200px] h-12 text-white font-medium rounded-lg text-lg ${
                    post.status === "active"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {post.status === "active" ? "Block" : "Unblock"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      {/* Full Screen Image Overlay */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-100 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 z-101 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={24} />
          </button>
          <div
            className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
          >
            <Image
              src={selectedImage}
              fill
              alt="Full screen moment"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </Dialog>
  );
}
