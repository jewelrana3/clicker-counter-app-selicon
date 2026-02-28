"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getSettingsAction } from "@/app/actions/getSettingsAction";
import { updateSettingsAction } from "@/app/actions/updateSettingsAction";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function NearBy() {
  const [range, setRange] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const res = await getSettingsAction();
        if (res.success) {
          setRange(res.data?.nearbyRange?.toString() || "");
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Failed to fetch settings.");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSet = async () => {
    if (!range || isNaN(Number(range))) {
      toast.error("Please enter a valid numeric range.");
      return;
    }

    setUpdating(true);
    try {
      const res = await updateSettingsAction({ nearbyRange: Number(range) });
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="w-[40%] h-64 flex flex-col items-center justify-center space-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        <p className="text-gray-500 font-medium">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="w-[40%] bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <h1 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
        Set Your Nearby Location Range
      </h1>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="range"
            className="text-sm font-semibold text-gray-600 ml-1"
          >
            Range (in kilometers)
          </Label>
          <Input
            id="range"
            type="text"
            placeholder="e.g. 500"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="h-12 rounded-2xl border-gray-200 focus:ring-red-500 focus:border-red-500 text-lg px-4"
          />
        </div>

        <Button
          className="w-full h-12 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all"
          onClick={handleSet}
          disabled={updating}
        >
          {updating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Updating...
            </>
          ) : (
            "Set Range"
          )}
        </Button>
      </div>

      <p className="mt-6 text-sm text-gray-400 text-center leading-relaxed">
        This range determines the search radius for users looking for services
        or advertisements nearby.
      </p>
    </div>
  );
}
