"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { verifyOtpAction } from "@/app/actions/verifyOtpAction";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const [otpValue, setOtpValue] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!otpValue || otpValue.length < 6) {
      toast.error("Please enter the complete 6-digit OTP.");
      return;
    }

    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    setLoading(true);

    try {
      const result = await verifyOtpAction(email, Number(otpValue));

      if (result.success) {
        toast.success(result.message);
        router.push("/new-password");
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
    <form onSubmit={handleSubmit} className="w-[80%] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={handleOtpChange}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup className="space-x-2 sm:space-x-6">
            {[...Array(6)].map((_, i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="w-12 h-12 border bg-white rounded-md text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md "
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="w-[70%] mx-auto">
        <Button className="mt-6 w-full" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>
      </div>
    </form>
  );
}
