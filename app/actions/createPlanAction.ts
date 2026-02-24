"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function createPlanAction(payload: {
  name: string;
  price: number;
}) {
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

    const url = `${baseUrl}/plans/create`;
    console.log("Creating plan at:", url);
    console.log("Payload:", JSON.stringify(payload));

    const res = await fetch(url, {
      method: "POST",
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
        message: data.message || "Failed to create plan.",
      };
    }

    return {
      success: true,
      message: data.message || "Plan created successfully.",
    };
  } catch (error) {
    console.error("Create plan error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
