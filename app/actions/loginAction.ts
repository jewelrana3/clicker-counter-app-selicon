"use server";

import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Validate inputs
  if (!email || !password) {
    return {
      success: false,
      message: "Email and password are required.",
    };
  }

  try {
    const baseUrl = process.env.BASE_URL;

    const res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Login failed. Please try again.",
      };
    }

    // Store the access token in an httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set("accessToken", data.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      message: data.message || "Login successful!",
      role: data.data.role,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
