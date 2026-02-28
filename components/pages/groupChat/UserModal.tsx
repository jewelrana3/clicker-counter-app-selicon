import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/GetImageUrl";

export default function UserModal({
  trigger,
  participants = [],
}: {
  trigger: React.ReactNode;
  participants?: any[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {trigger}
      </DialogTrigger>

      <DialogContent className="bg-white max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader className="mb-2">
          <DialogTitle className="text-xl">
            Group Members{" "}
            <span className="text-gray-500 text-sm font-normal ml-1">
              ({participants?.length})
            </span>
          </DialogTitle>
          <DialogDescription>
            List of users currently in this group chat.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 mt-2">
          {participants && participants?.length > 0 ? (
            participants?.map((member, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
              >
                <img
                  src={getImageUrl(member?.image)}
                  alt={member?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-white shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/ads/profile.png";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {member?.name || "Unknown User"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 space-y-3">
              <div className="p-3 bg-gray-50 rounded-full">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
              </div>
              <p className="text-sm">No members found in this group.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
