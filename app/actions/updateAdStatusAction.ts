"use server";

import { cookies } from "next/headers";

export async function updateAdStatusAction(adId: string, status: string) {
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

    const res = await fetch(`${baseUrl}/advertisements/update-status/${adId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update advertisement status.",
      };
    }

    return {
      success: true,
      message: data.message || "Advertisement status updated successfully.",
    };
  } catch (error) {
    console.error("Update ad status error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
