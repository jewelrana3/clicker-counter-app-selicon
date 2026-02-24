"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function toggleUserStatusAction(userId: string) {
  try {
    const baseUrl = process.env.BASE_URL;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Access token missing.",
      };
    }

    const res = await fetch(`${baseUrl}/users/toggle-status/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    await handleAuthError(data);

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update user status.",
      };
    }

    return {
      success: true,
      message: data.message || "User status updated successfully.",
    };
  } catch (error) {
    console.error("Toggle user status error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
