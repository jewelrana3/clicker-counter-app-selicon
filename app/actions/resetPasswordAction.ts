"use server";

import { cookies } from "next/headers";

export async function resetPasswordAction(formData: FormData) {
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!newPassword || !confirmPassword) {
    return {
      success: false,
      message: "Both password fields are required.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      message: "Passwords do not match.",
    };
  }

  try {
    const baseUrl = process.env.BASE_URL;
    const cookieStore = await cookies();
    const resetToken = cookieStore.get("resetToken")?.value;

    if (!resetToken) {
      return {
        success: false,
        message: "Reset token missing. Please verify your OTP again.",
      };
    }

    const res = await fetch(`${baseUrl}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: resetToken,
      },
      body: JSON.stringify({ newPassword, confirmPassword }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to reset password. Please try again.",
      };
    }

    // Clear the reset token cookie
    cookieStore.delete("resetToken");

    return {
      success: true,
      message: data.message || "Password reset successfully!",
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
