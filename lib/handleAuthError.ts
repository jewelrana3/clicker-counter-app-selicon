"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Handles authentication-related errors globally in server actions.
 * If the error message indicates an invalid signature or expired token,
 * it clears the access token cookie and redirects to the login page.
 */
export async function handleAuthError(data: any) {
  const message = data?.message?.toLowerCase() || "";

  if (
    message.includes("invalid signature") ||
    message.includes("jwt expired") ||
    message.includes("unauthorized")
  ) {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    redirect("/login");
  }
}
