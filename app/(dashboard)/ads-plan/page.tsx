"use client";
import AdsControlModal from "@/components/pages/adsManagement/AdsControlModal";
import { Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

export default function page() {
  const handle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want be delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <AdsControlModal
        id="add"
        trigger={
          <button className="bg-[#E40004] text-white p-3 rounded-full cursor-pointer">
            Ads Plan
          </button>
        }
      />

      <div className="w-full max-w-sm p-4 border rounded-lg shadow-sm bg-white mt-10">
        {/* Header */}

        <div className="flex justify-between space-x-2">
          <h2 className="text-xl font-semibold text-gray-700">Plan</h2>

          <div className="flex space-x-3">
            <AdsControlModal trigger={<Pencil className="cursor-pointer" />} />
            <Trash2 className="text-red-500 cursor-pointer" onClick={handle} />
          </div>
        </div>

        {/* Price */}
        <div className="my-3">
          <h1 className="text-gray-600 font-medium">Price</h1>
          <p className="text-xl font-semibold text-black">$10.00</p>
        </div>

        {/* Duration */}
        <div>
          <h1 className="text-gray-600 font-medium">Duration</h1>
          <p className="text-lg text-black">30 Days</p>
        </div>
      </div>
    </div>
  );
}
