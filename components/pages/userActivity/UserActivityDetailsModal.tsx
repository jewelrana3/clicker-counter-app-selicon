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

export default function UserActivityDetailsModal({
  trigger,
  post,
}: {
  trigger: React.ReactNode;
  post: any;
}) {
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
                <Image
                  key={idx}
                  src={getImageUrl(photo)}
                  width={150}
                  height={150}
                  alt={`Moment ${idx + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
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

            {/* Status indicators (keeping the design pattern) */}
            <div className="flex items-center justify-center space-x-10 mt-9">
              <Button
                variant="outline"
                className={`font-normal rounded-lg border px-7 ${
                  post.status === "active"
                    ? "border-green-500 text-green-600"
                    : "border-yellow-500 text-yellow-600"
                }`}
              >
                {post.status === "active" ? "Active" : "Blocked/Pending"}
              </Button>
              <Button className="font-normal bg-[#008F37] text-white rounded-md">
                Checked
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
