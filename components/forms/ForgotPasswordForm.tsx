"use client";

import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { forgotPasswordAction } from "@/app/actions/forgotPasswordAction";
import toast from "react-hot-toast";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);

    try {
      const result = await forgotPasswordAction(formData);

      if (result.success) {
        toast.success(result.message);
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
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
    <form onSubmit={handleSubmit} className="space-y-5 w-[90%] sm:w-[80%]">
      <div>
        <Label htmlFor="email" className="block text-md mb-1">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter Your Email"
          className="w-full px-3 h-11"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full py-2 cursor-pointer"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending OTP...
          </>
        ) : (
          "Continue"
        )}
      </Button>
    </form>
  );
}
