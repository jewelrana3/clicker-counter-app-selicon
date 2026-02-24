"use server";

import { cookies } from "next/headers";

export async function getPostsAction(params: {
  searchTerm?: string;
  clickerType?: string;
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

    const { searchTerm, clickerType, status, page = 1, limit = 10 } = params;

    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append("searchTerm", searchTerm);

    if (clickerType && clickerType !== "All Post" && clickerType !== "All") {
      queryParams.append("clickerType", clickerType);
    }

    if (status && status !== "All Post" && status !== "All") {
      queryParams.append(
        "status",
        status.toLowerCase().includes("active") ? "active" : "blocked",
      );
    }

    queryParams.append("page", page.toString());
    queryParams.append("limit", limit.toString());

    const res = await fetch(`${baseUrl}/posts?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to retrieve posts.",
      };
    }

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Get posts error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
