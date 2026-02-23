"use server";

import { cookies } from "next/headers";

export async function verifyOtpAction(email: string, oneTimeCode: number) {
  if (!email || !oneTimeCode) {
    return {
      success: false,
      message: "Email and OTP code are required.",
    };
  }

  try {
    const baseUrl = process.env.BASE_URL;

    const res = await fetch(`${baseUrl}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, oneTimeCode }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "OTP verification failed. Please try again.",
      };
    }

    // Store the reset token in a secure cookie
    const cookieStore = await cookies();
    cookieStore.set("resetToken", data.data.resetToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    return {
      success: true,
      message: data.message || "Verification successful!",
    };
  } catch (error) {
    console.error("Verify OTP error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
