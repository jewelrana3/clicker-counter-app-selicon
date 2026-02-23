import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UserModal({ trigger }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>

      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Group Members</DialogTitle>
          <DialogDescription>
            List of users currently in this group chat.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-4">
          <p className="text-gray-600">John Doe</p>
          <p className="text-gray-600">jewel</p>
          <p className="text-gray-600">jackmason</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
