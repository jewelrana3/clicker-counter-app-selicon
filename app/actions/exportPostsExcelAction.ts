"use server";

import { cookies } from "next/headers";
import { handleAuthError } from "@/lib/handleAuthError";

export async function exportPostsExcelAction() {
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

    const res = await fetch(`${baseUrl}/posts/export-to-excel`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      try {
        const data = await res.json();
        await handleAuthError(data);
        return {
          success: false,
          message: data?.message || "Failed to download excel file.",
        };
      } catch (e) {
        return {
          success: false,
          message: `Failed to download excel file. Status: ${res.status}`,
        };
      }
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");

    // Attempting to get filename from content-disposition header if present
    const contentDisposition = res.headers.get("content-disposition");
    let filename = `activities-${new Date().toISOString().split("T")[0]}.xlsx`;
    if (contentDisposition && contentDisposition.includes("filename=")) {
      const match = contentDisposition.match(/filename="?([^"]+)"?/);
      if (match && match[1]) {
        filename = match[1];
      }
    }

    return {
      success: true,
      data: base64Data,
      filename: filename,
    };
  } catch (error) {
    console.error("Export posts excel error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
