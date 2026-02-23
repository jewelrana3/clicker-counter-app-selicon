"use server";

import { cookies } from "next/headers";

export async function updateDisclaimerAction({
  type,
  content,
}: {
  type: "privacy-policy" | "terms-and-conditions";
  content: string;
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

    const res = await fetch(`${baseUrl}/disclaimer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ type, content }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || `Failed to update ${type}.`,
      };
    }

    return {
      success: true,
      message: data.message || `${type} updated successfully.`,
    };
  } catch (error) {
    console.error(`Update disclaimer (${type}) error:`, error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
