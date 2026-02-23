"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { resetPasswordAction } from "@/app/actions/resetPasswordAction";
import toast from "react-hot-toast";

export default function NewPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPasswordAction(formData);

      if (result.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 sm:w-[80%]">
      <div>
        <Label htmlFor="newPassword" className="block text-md mb-1">
          Password
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full px-3 h-11"
            required
          />
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="block text-md mb-1">
          Confirm Password
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full px-3 h-11"
            required
          />
          <span
            className="absolute top-3 right-4 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
}
