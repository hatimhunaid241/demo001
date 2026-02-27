import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Skip: welcome page, cookie-policy page, Next.js internals, API routes, static files
  if (
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/cookie-policy") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
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
