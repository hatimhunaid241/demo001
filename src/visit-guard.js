import { NextResponse } from "next/server";

// ─── Kill Switch ──────────────────────────────────────────────────────────────
// Create a GitHub Gist with a single file named "flag.json" containing:
//   { "enabled": true }
// Paste the raw URL below. To disable the site, change "enabled" to false.
const KILL_SWITCH_URL =
  "https://gist.githubusercontent.com/hatimhunaid241/b2a46398611fcc2d4595d875dc274e23/raw/royalchessdesign.json";

// In-memory cache so we only hit GitHub at most once per minute
let _siteEnabled = true;
let _lastChecked = 0;
const CACHE_TTL = 60_000; // 1 minute

async function isSiteEnabled() {
  const now = Date.now();
  if (now - _lastChecked < CACHE_TTL) return _siteEnabled;
  try {
    const res = await fetch(`${KILL_SWITCH_URL}?t=${Date.now()}`, { cache: "no-store" });
    const json = await res.json();
    _siteEnabled = json.enabled !== false;
  } catch {
  }
  _lastChecked = Date.now();
  return _siteEnabled;
}
// ─────────────────────────────────────────────────────────────────────────────

export async function proxy(request) {
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

  // Block access to /maintenance when site is live
  if (pathname.startsWith("/maintenance")) {
    return enabled
      ? NextResponse.redirect(new URL("/", request.url))
      : NextResponse.next();
  }

  // Redirect all other pages to maintenance when site is disabled
  if (!enabled) {
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
