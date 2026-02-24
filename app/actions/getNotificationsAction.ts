"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function getNotificationsAction(
  page: number = 1,
  limit: number = 10,
) {
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

    const res = await fetch(
      `${baseUrl}/notifications/me?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 0 }, // Disable cache for notifications
      },
    );

    const data = await res.json();
    await handleAuthError(data);
    return data;
  } catch (error) {
    console.error("Get notifications error:", error);
    return {
      success: false,
      message: "Something went wrong fetching notifications",
    };
  }
}
