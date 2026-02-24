"use server";

import { cookies } from "next/headers";

export async function togglePostStatusAction(postId: string) {
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

    // Assuming the endpoint for toggling post status is similar to users/toggle-status
    const res = await fetch(`${baseUrl}/posts/toggle-status/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update post status.",
      };
    }

    return {
      success: true,
      message: data.message || "Post status updated successfully.",
    };
  } catch (error) {
    console.error("Toggle post status error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
