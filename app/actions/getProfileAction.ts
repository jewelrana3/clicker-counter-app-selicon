"use server";

import { cookies } from "next/headers";

export async function getProfileAction() {
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

    const res = await fetch(`${baseUrl}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 }, // Ensure fresh data
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to retrieve profile data.",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    console.error("Get profile error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
