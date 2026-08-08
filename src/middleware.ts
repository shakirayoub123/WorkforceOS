import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = ["/admin", "/dashboard", "/manager", "/worker", "/profile", "/settings"];
const publicPrefixes = ["/login", "/unauthorized", "/api/auth", "/_next", "/favicon.ico"];
const sessionCookieNames = ["authjs.session-token", "__Secure-authjs.session-token"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (publicPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const hasSessionCookie = sessionCookieNames.some((name) => request.cookies.has(name));
  const isProtectedRoute = protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(prefix));

  if (isProtectedRoute && !hasSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|icons|logos).*)",
  ],
};
