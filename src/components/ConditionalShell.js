"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subscribe = () => () => {};
const getSnapshot = () =>
  document.cookie.split("; ").some((row) => row.startsWith("cookie_consent="));
const getServerSnapshot = () => false;

export default function ConditionalShell({ children }) {
  const pathname = usePathname();
  const hasConsent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
