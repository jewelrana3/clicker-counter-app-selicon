import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

export default function UserActivityDetailsModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl  max-w-xl w-full ">
        <div className="">
          {/* Header */}
          <div className="flex items-center gap-3">
            <Image
              src="/user-activity/user-activity.png"
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

          <hr className="my-5" />

          {/*images  */}
          <div className="my-4">
            <h1 className="mb-2">Moments</h1>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <Image
                  src="/user-activity/modal-image.png"
                  width={10}
                  height={10}
                  alt="avatar"
                  sizes="100vh"
                  className="w-full h-full object-cover"
                />
              ))}
            </div>
          </div>

          <div className=" space-y-4">
            {/* Description */}
            <div>
              <h1 className=" text-gray-500 font-medium mb-3">Description</h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                The standard lorem ipsum passage has been a printer's friend for
                centuries. Like stock photos today, it served as a placeholder
                for actual content.
              </p>
            </div>
            <hr />

            {/* Price */}
            <div className="grid grid-cols-2">
              <div className=" gap-3">
                <p className=" text-gray-500 font-medium">Clicker</p>
                <p className="text-sm">Great Vibes</p>
              </div>
              <div className=" gap-3">
                <p className=" text-gray-500 font-medium">Privacy</p>
                <p className="text-sm">Public</p>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-10 mt-9">
              <Button className="font-normal rounded-lg border border-[#F48201] bg-white text-black px-7">
                Pending
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
