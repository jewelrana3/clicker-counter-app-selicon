"use server";

import { cookies } from "next/headers";

export async function updateProfileAction(formData: FormData) {
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
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update profile.",
      };
    }

    return {
      success: true,
      message: data.message || "Profile updated successfully.",
      data: data.data,
    };
  } catch (error) {
    console.error("Update profile error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
