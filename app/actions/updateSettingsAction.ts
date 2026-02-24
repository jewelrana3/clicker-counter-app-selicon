"use server";

import { cookies } from "next/headers";

export async function updateSettingsAction(payload: { nearbyRange: number }) {
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

    const res = await fetch(`${baseUrl}/settings`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update settings.",
      };
    }

    return {
      success: true,
      message: data.message || "Settings updated successfully.",
    };
  } catch (error) {
    console.error("Update settings error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
