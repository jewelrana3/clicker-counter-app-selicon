"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function getUsersAction(params: {
  searchTerm?: string;
  role?: string;
  status?: string;
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

    const { searchTerm, role, status, page = 1, limit = 5 } = params;

    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append("searchTerm", searchTerm);
    if (role && role !== "All Users" && role !== "All")
      queryParams.append("role", role.toLowerCase());
    if (status && status !== "All")
      queryParams.append("status", status.toLowerCase());
    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(`${baseUrl}/users?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    const data = await res.json();
    await handleAuthError(data);

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to retrieve users.",
      };
    }

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Get users error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
