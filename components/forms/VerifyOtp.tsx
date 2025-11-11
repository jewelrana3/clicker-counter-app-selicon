"use client";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import Form from "next/form";
import { Button } from "../ui/button";
import Link from "next/link";

export default function VerifyOtp() {
  const [otpValue, setOtpValue] = useState("");

  const handleOtpChange = (value: string) => {
    setOtpValue(value);
  };

  return (
    <Form action="forgot" className="w-[80%] mx-auto">
      <div className="flex flex-col justify-center items-center">
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={handleOtpChange}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        >
          <InputOTPGroup className="space-x-6">
            {[...Array(5)].map((_, i) => (
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
        <Link href="/new-password">
          <Button className="mt-6 w-full">Verify Code</Button>
        </Link>
      </div>
    </Form>
  );
}
