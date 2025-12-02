import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";

export default function AdsDetailsModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl  max-w-xl w-full h-[80%] overflow-y-auto">
        <div className="">
          {/* Header */}
          <div className="p-3 flex items-center gap-3">
            <Image
              src="/ads/ads-modal-banner.png"
              width={10}
              height={10}
              alt="avatar"
              sizes="100vh"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h2 className=" text-xl ">Cafe d Rio</h2>
              <p className="text-gray-500 text-sm">madelyn@gmail.com</p>
            </div>
          </div>

          {/* Main Image */}
          <div className="w-full">
            <Image
              src="/ads/ads-modal-banner.png"
              width={10}
              height={10}
              alt="avatar"
              sizes="100vh"
              className="w-[80%] h-full mx-auto object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Ads Title */}
            <div>
              <p className="text-sm text-gray-500 font-medium">Ads Title</p>
              <p className="">Delicious Fast Food</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-500 font-medium">Description</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The standard lorem ipsum passage has been a printer’s friend for
                centuries. Like stock photos today, it served as a placeholder
                for actual content.
              </p>
            </div>

            {/* Price */}
            <div>
              <p className="text-sm text-gray-500 font-medium">Price</p>
              <p className="">$200</p>
            </div>

            {/* Reach & Click */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Reach</p>
                <p className="">10,000</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Click</p>
                <p className="">8,000</p>
              </div>
            </div>

            {/* Link */}
            <div>
              <p className="text-sm text-gray-500 font-medium">Link</p>
              <Link href="#" className="text-[#008CFF] hover:underline text-sm">
                Website.com/restaurant
              </Link>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Start Date</p>
                <p className="">12/12/2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">End Date</p>
                <p className="">12/12/2025</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          {/* <div className="p-6 flex justify-between gap-4">
            <Button className="w-1/2 py-2 border border-red-500 text-red-500 rounded-full hover:bg-red-50 bg-white">
              Reject
            </Button>
            <Button className="w-1/2 py-2 bg-green-600 text-white rounded-full hover:bg-green-700">
              Confirm
            </Button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
