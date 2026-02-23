"use client";
import AdsControlModal from "@/components/pages/adsManagement/AdsControlModal";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState, useCallback } from "react";
import { getPlansAction } from "@/app/actions/getPlansAction";
import { deletePlanAction } from "@/app/actions/deletePlanAction";
import toast from "react-hot-toast";

export default function AdsPlanPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getPlansAction();
      if (result.success) {
        setPlans(result.data || []);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to fetch plans.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "rounded-full px-6 py-2",
        cancelButton: "rounded-full px-6 py-2",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deletePlanAction(id);
          if (res.success) {
            Swal.fire({
              title: "Deleted!",
              text: res.message,
              icon: "success",
              confirmButtonColor: "#EF4444",
              customClass: {
                confirmButton: "rounded-full px-6 py-2",
              },
            });
            fetchPlans();
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          toast.error("An error occurred while deleting.");
        }
      }
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Advertisement Plans
        </h1>
        <AdsControlModal
          id="add"
          onSuccess={fetchPlans}
          trigger={
            <button className="bg-[#E40004] text-white px-8 py-3 rounded-full cursor-pointer hover:bg-red-700 transition-all font-semibold shadow-lg shadow-red-500/20 active:scale-95">
              + Create New Plan
            </button>
          }
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 text-red-500 animate-spin mb-4" />
          <p className="text-gray-500 font-medium animate-pulse">
            Fetching plans...
          </p>
        </div>
      ) : plans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className="w-full p-6 border border-gray-100 rounded-3xl shadow-sm bg-white hover:shadow-xl transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 capitalize group-hover:text-red-600 transition-colors">
                    {plan.name}
                  </h2>
                  <div className="h-1 w-12 bg-red-500 rounded-full mt-1 group-hover:w-full transition-all duration-500"></div>
                </div>

                <div className="flex space-x-2">
                  {/* <AdsControlModal
                    initialData={plan}
                    onSuccess={fetchPlans}
                    trigger={
                      <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-blue-500">
                        <Pencil size={18} />
                      </div>
                    }
                  /> */}
                  <div
                    className="p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer text-gray-400 hover:text-red-500"
                    onClick={() => handleDelete(plan._id)}
                  >
                    <Trash2 size={18} />
                  </div>
                </div>
              </div>

              {/* Price Content */}
              <div className="space-y-4 pt-2">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 font-medium mb-1">
                    / one-time
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                  <span className="text-gray-500 font-medium">
                    Included Duration
                  </span>
                  <span className="text-black font-bold bg-white px-4 py-1 rounded-full shadow-sm text-sm border border-gray-100">
                    {plan.name}
                  </span>
                </div>
              </div>

              {/* Stripe Info (Optional/Internal) */}
              <div className="mt-6 pt-4 border-t border-dashed border-gray-100 flex flex-col gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  Stripe Product ID
                </span>
                <code className="text-[10px] bg-gray-50 px-2 py-1 rounded truncate block">
                  {plan.stripeProductId}
                </code>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50">
          <div className="bg-white p-6 rounded-full shadow-sm mb-4">
            <Trash2 size={40} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-lg font-medium">
            No active plans found
          </p>
          <p className="text-gray-400 text-sm">
            Start by creating your first advertisement plan.
          </p>
        </div>
      )}
    </div>
  );
}
