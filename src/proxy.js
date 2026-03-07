import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { proxy } from "@/visit-guard";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { pathname } = req.nextUrl;

  // Always pass NextAuth's own API routes through
  if (pathname.startsWith("/api/auth")) return NextResponse.next();

  // Admin routes: require authentication (middleware JWT check — no DB access)
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    if (!req.auth) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    return NextResponse.next();
  }

  // All other routes: existing kill-switch + cookie-consent proxy
  return proxy(req);
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
