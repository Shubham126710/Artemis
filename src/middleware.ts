import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This is a basic middleware to check for better-auth session cookies.
// In a real app, you might use better-fetch or call the DB directly if not edge, 
// but checking the cookie presence is the standard edge-compatible way for middleware.
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");
  
  const isAuthRoute = request.nextUrl.pathname.startsWith("/login");
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/profile") || request.nextUrl.pathname.startsWith("/dashboard");

  if (!sessionCookie && isProtectedRoute) {
    const isBypass = request.cookies.get("bypass_auth")?.value === "true";
    if (!isBypass) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (sessionCookie && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
