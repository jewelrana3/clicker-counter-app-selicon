import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";

export default function UserModal({ trigger }) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">{trigger}</DialogTrigger>

      <DialogContent>
        <h1 className="text-xl font-semibold text-gray-700">Group Users</h1>
        <p className="text-gray-600">John Doe</p>
        <p className="text-gray-600">jewel</p>
        <p className="text-gray-600">jackmason</p>
      </DialogContent>
    </Dialog>
  );
}
