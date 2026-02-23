import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteModal({ trigger }: { trigger: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl text-center mb-2 text-gray-700">
            Confirm Deletion
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mb-4">
            Are you sure you want to delete this advertisement? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between gap-4 mt-4">
          <DialogClose asChild>
            <Button className="w-1/2 py-2 bg-white border border-gray-400 text-gray-600 rounded-md hover:bg-gray-100">
              No
            </Button>
          </DialogClose>
          <Button className="w-1/2 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
            Yes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
