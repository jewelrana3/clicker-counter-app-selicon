import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UserModal({
  trigger,
  participants = [],
}: {
  trigger: React.ReactNode;
  participants?: string[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>

      <DialogContent className="bg-white max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-4">
          <DialogTitle>Group Members ({participants.length})</DialogTitle>
          <DialogDescription>
            List of user IDs currently in this group chat.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          {participants.length > 0 ? (
            participants.map((id) => (
              <div
                key={id}
                className="p-3 bg-gray-50 rounded-lg text-sm font-mono text-gray-700 border border-gray-100 break-all"
              >
                {id}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4 italic">
              No members found in this group.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
