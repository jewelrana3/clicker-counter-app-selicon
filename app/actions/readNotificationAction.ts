"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function readNotificationAction(id: string) {
  try {
    const baseUrl = process.env.BASE_URL;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "No access token found",
      };
    }

    const res = await fetch(`${baseUrl}/notifications/read/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await res.json();
    await handleAuthError(data);
    return data;
  } catch (error) {
    console.error("Read notification error:", error);
    return {
      success: false,
      message: "Something went wrong marking notification as read",
    };
  }
}
