"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { createPlanAction } from "@/app/actions/createPlanAction";
import { updatePlanAction } from "@/app/actions/updatePlanAction";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdsControlModal({
  trigger,
  id,
  initialData,
  onSuccess,
}: {
  trigger: React.ReactNode;
  id?: string;
  initialData?: { _id: string; name: string; price: number };
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price.toString());
    } else {
      setName("");
      setPrice("");
    }
  }, [initialData, open]);

  const handleSubmit = async () => {
    const numericPrice = Number(price);
    if (!name || !price || isNaN(numericPrice)) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name,
        price: numericPrice,
      };

      const result = initialData
        ? await updatePlanAction(initialData._id, payload)
        : await createPlanAction(payload);

      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        if (!initialData) {
          setName("");
          setPrice("");
        }
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(
        initialData ? "Failed to update plan." : "Failed to create plan.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white rounded-xl min-w-xl max-w-xl w-full p-8 outline-none shadow-2xl border-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-black font-semibold mb-2">
            {initialData ? "Edit Plan" : "Add New Plan"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-500 mb-6">
            Configure the details for your advertisement plan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-[#636363] font-medium text-lg ml-1">
              Plan Name / Duration
            </Label>
            <Select onValueChange={setName} value={name}>
              <SelectTrigger className="h-12 rounded-full px-6 border border-gray-200 focus:ring-2 focus:ring-red-500/20 w-full bg-white">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[#636363] font-medium text-lg ml-1">
              Ads Price
            </Label>
            <Input
              type="number"
              placeholder="Enter price in USD"
              className="h-12 rounded-full px-6 border border-gray-200 focus:ring-2 focus:ring-red-500/20"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <Button
            className="w-full bg-[#E40004] hover:bg-red-700 h-12 rounded-full text-lg font-bold mt-4 shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Set Plan"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
