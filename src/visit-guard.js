import { NextResponse } from "next/server";
import { createClient } from "@vercel/edge-config";

// ─── Kill Switches ────────────────────────────────────────────────────────────
// Two independent flags — both must be true for the site to be live.
//   EDGE_CONFIG     → client's Edge Config (toggled from the admin panel)
//   DEV_EDGE_CONFIG → developer's Edge Config (toggled from Vercel dashboard)
// ─────────────────────────────────────────────────────────────────────────────

async function isSiteEnabled() {
  try {
    const [clientEnabled, backupEnabled] = await Promise.all([
      createClient(process.env.EDGE_CONFIG).get("siteEnabled").catch(() => true),
      createClient(process.env.DEV_EDGE_CONFIG).get("siteEnabled").catch(() => true),
    ]);
    return clientEnabled !== false && backupEnabled !== false;
  } catch {
    return true; // fail open — never lock users out on SDK errors
  }
}

export async function proxy(request, session = null) {
  const { pathname } = request.nextUrl;

  // Always allow static assets and internals through
  if (
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/cookie-policy") ||
    pathname.startsWith("/subscription") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Kill switch check
  const enabled = await isSiteEnabled();

  if (pathname.startsWith("/maintenance")) {
    // Block direct access to /maintenance when site is live
    return enabled
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  // Redirect all other pages to maintenance when site is disabled
  // Logged-in admins bypass maintenance and can always see the site
  if (!enabled && !session) {
    const maintenanceUrl = new URL("/maintenance", request.url);
    maintenanceUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(maintenanceUrl);
  }

  const consent = request.cookies.get("cookie_consent");
  if (!consent) {
    const welcomeUrl = new URL("/welcome", request.url);
    welcomeUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(welcomeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
