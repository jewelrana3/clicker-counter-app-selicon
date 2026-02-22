"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";

export default function UsersDetailsModal({
  trigger,
  index,
}: {
  trigger: React.ReactNode;
  index: number;
}) {
  const [status, setStatus] = useState("user");
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl  max-w-xl w-full ">
        {index % 2 === 0 ? <span>Active</span> : <span>Inactive</span>}

        <div className="flex gap-5">
          <button
            className={`border rounded py-1 px-2 cursor-pointer ${
              status === "user" ? "bg-green-700 text-white" : ""
            }`}
            onClick={() => setStatus("user")}
          >
            User Info
          </button>
          <button
            className={`border rounded py-1 px-2 cursor-pointer ${
              status === "bussiness" ? "bg-green-700 text-white" : ""
            }`}
            onClick={() => setStatus("bussiness")}
          >
            Bussiness Info
          </button>
        </div>
        <div className="">
          {/* Header */}
          {status === "user" ? (
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
          ) : (
            <div className="p-3 flex items-center gap-3">
              <Image
                src="/bussiness.png"
                width={10}
                height={10}
                alt="avatar"
                sizes="100vh"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className=" text-xl ">Fast Food Ltd</h2>
                <p className="text-gray-500 text-sm">madelyn@gmail.com</p>
              </div>
            </div>
          )}

          {/* Content */}
          {status === "user" ? (
            <div className="p-2 space-y-4">
              <hr />
              {/* Price */}
              <div>
                <p className="text-sm text-gray-500 font-medium">Age</p>
                <p className="">50</p>
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
          ) : (
            <div className="p-6 space-y-4">
              {/* Description */}
              <div>
                <p className="text-sm text-gray-500 font-medium">Bio</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The standard lorem ipsum passage has been a printer’s friend
                  for centuries. Like stock photos today, it served as a
                  placeholder for actual content.
                </p>
              </div>
              <hr />

              {/* Price */}
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone</p>
                <p className="">+123456789</p>
              </div>

              {/* Reach & Click */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Business License Number{" "}
                  </p>
                  <p className="">56565757</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Bussiness Type
                  </p>
                  <p className="">Restaurant</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
