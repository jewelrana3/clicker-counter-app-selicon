"use server";

import { cookies } from "next/headers";

export async function deletePlanAction(planId: string) {
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

    const res = await fetch(`${baseUrl}/plans/delete/${planId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to delete plan.",
      };
    }

    return {
      success: true,
      message: data.message || "Plan deleted successfully.",
    };
  } catch (error) {
    console.error("Delete plan error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
