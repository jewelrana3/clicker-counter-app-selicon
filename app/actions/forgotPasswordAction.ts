"use server";

export async function forgotPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return {
      success: false,
      message: "Email is required.",
    };
  }

  try {
    const baseUrl = process.env.BASE_URL;

    const res = await fetch(`${baseUrl}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to send OTP. Please try again.",
      };
    }

    return {
      success: true,
      message: data.message || "OTP sent successfully!",
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
