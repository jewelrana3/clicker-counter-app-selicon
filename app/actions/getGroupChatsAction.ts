"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function getGroupChatsAction(params: {
  page?: number;
  limit?: number;
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

    const { page = 1, limit = 10 } = params;
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(
      `${baseUrl}/chats/group-chats?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 0 },
      },
    );

    const data = await res.json();
    await handleAuthError(data);

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to retrieve group chats.",
      };
    }

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Get group chats error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
