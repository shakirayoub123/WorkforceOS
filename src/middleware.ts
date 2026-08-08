import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware
 *
 * This middleware runs on every matched request before the route handler.
 * It will be the central place for:
 *
 * 1. Authentication — Verify session tokens and redirect unauthenticated
 *    users to the login page.
 *
 * 2. Tenant Validation — Extract and validate the tenant context from
 *    the session or request headers for multi-tenancy.
 *
 * 3. Role Authorization — Check whether the authenticated user's role
 *    has access to the requested route.
 *
 * 4. Rate Limiting — Optionally enforce rate limits on API routes.
 *
 * Phase 1 will implement authentication checks here.
 */

export function middleware(_request: NextRequest) {
    // ---------------------------------------------------------------------------
    // TODO: Phase 1 — Authentication
    //
    // - Check for session token in cookies
    // - If no valid session, redirect to /login for protected routes
    // - Allow public routes (/login, /register, /api/auth/*) to pass through
    // ---------------------------------------------------------------------------

    // ---------------------------------------------------------------------------
    // TODO: Phase 1 — Tenant Validation
    //
    // - Extract tenantId from the session
    // - Attach tenant context to request headers for downstream use
    // ---------------------------------------------------------------------------

    // ---------------------------------------------------------------------------
    // TODO: Phase 1 — Role-based Route Protection
    //
    // - /admin/* routes: SUPER_ADMIN only
    // - /dashboard/* routes: all authenticated users
    // - /api/* routes: validate API-specific auth
    // ---------------------------------------------------------------------------

    return NextResponse.next();
}

/**
 * Matcher configuration.
 *
 * Specifies which routes the middleware should intercept.
 * Static files, images, and the favicon are excluded.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         * - public folder assets
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|icons|logos).*)",
    ],
};
