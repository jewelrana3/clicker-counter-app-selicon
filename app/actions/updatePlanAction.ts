"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function updatePlanAction(
  planId: string,
  payload: { name: string; price: number },
) {
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

    const res = await fetch(`${baseUrl}/plans/${planId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    await handleAuthError(data);

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update plan.",
      };
    }

    return {
      success: true,
      message: data.message || "Plan updated successfully.",
    };
  } catch (error) {
    console.error("Update plan error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
