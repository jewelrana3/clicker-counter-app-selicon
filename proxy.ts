import { NextRequest, NextResponse } from "next/server";

const authRoutes = [
  "/login",
  "/forgot-password",
  "/verify-otp",
  "/new-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // If user is NOT logged in and trying to access a protected route → redirect to /login
  if (!accessToken && !isAuthRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user IS logged in and trying to access auth routes → redirect to /
  if (accessToken && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - public folder assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth/).*)",
  ],
};
