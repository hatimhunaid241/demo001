"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalShell({ children }) {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const found = document.cookie
      .split("; ")
      .some((row) => row.startsWith("cookie_consent="));
    setHasConsent(found);
  }, [pathname]);

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
