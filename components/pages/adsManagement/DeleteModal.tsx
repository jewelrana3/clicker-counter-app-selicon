import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteModal({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl">
        <div className=" mt-5">
          <h3 className="text-xl text-center mb-4 text-gray-700">
            Are you sure you want to delete <br /> this ad?
          </h3>

          {/* Buttons */}
          <div className="flex justify-between gap-4">
            <DialogClose className="w-full">
              <Button className="w-full py-2 bg-white border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100">
                No
              </Button>
            </DialogClose>
            <Button className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
