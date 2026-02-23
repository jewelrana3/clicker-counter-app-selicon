"use server";

import { cookies } from "next/headers";

export async function getAdsAction({
  page = 1,
  limit = 10,
  search = "",
  status = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
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

    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (search) queryParams.append("searchTerm", search);
    if (status && status !== "All")
      queryParams.append("status", status.toLowerCase());

    const res = await fetch(
      `${baseUrl}/advertisements/all?${queryParams.toString()}`,
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

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to retrieve advertisements data.",
      };
    }

    return {
      success: true,
      data: data.data,
      pagination: data.pagination,
    };
  } catch (error) {
    console.error("Get ads error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
