"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalShell({ children }) {
  const pathname = usePathname();
  const hasConsent =
    typeof document !== "undefined"
      ? document.cookie.split("; ").some((row) => row.startsWith("cookie_consent="))
      : false;

  const alwaysHide = pathname.startsWith("/welcome");
  const conditionalHide = pathname.startsWith("/cookie-policy") && !hasConsent;
  const hide = alwaysHide || conditionalHide;

  return (
    <>
      {!hide && <Navbar />}
      <main>{children}</main>
      {!hide && <Footer />}
    </>
  );
}
