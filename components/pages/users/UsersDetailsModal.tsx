import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function UsersDetailsModal({
  trigger,
  index,
}: {
  trigger: React.ReactNode;
  index: number;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl  max-w-xl w-full ">
        {index % 2 === 0 ? <span>Active</span> : <span>Inactive</span>}
        <div className="">
          {/* Header */}
          <div className="p-3 flex items-center gap-3">
            <Image
              src="/ads/profile.png"
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

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Description */}
            <div>
              <p className="text-sm text-gray-500 font-medium">Description</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                The standard lorem ipsum passage has been a printer’s friend for
                centuries. Like stock photos today, it served as a placeholder
                for actual content.
              </p>
            </div>
            <hr />

            {/* Price */}
            <div>
              <p className="text-sm text-gray-500 font-medium">Age</p>
              <p className="">200</p>
            </div>

            {/* Reach & Click */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Gender</p>
                <p className="">Male</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Address</p>
                <p className="">California, USA</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Country</p>
                <p className="">USA</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
