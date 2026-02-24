"use server";

import { cookies } from "next/headers";

export async function getEarningGrowthAction(year?: string) {
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

    const url = year
      ? `${baseUrl}/analytics/earning-growth?year=${year}`
      : `${baseUrl}/analytics/earning-growth`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 3600 },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Get earning growth error:", error);
    return {
      success: false,
      message: "Something went wrong fetching earning data",
    };
  }
}
