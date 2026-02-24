"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function togglePostStatusAction(postId: string, status: string) {
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

    const res = await fetch(`${baseUrl}/posts/update/${postId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();
    await handleAuthError(data);

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
