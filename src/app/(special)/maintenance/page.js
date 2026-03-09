"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const KILL_SWITCH_URL =
  "https://gist.githubusercontent.com/hatimhunaid241/b2a46398611fcc2d4595d875dc274e23/raw/royalchessdesign.json";

function MaintenanceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";

  useEffect(() => {
    // Poll every 30 seconds — when site re-enables, send user to their original destination
    const check = async () => {
      try {
        const res = await fetch(`${KILL_SWITCH_URL}?t=${Date.now()}`, { cache: "no-store" });
        const json = await res.json();
        if (json.enabled !== false) {
          router.replace(nextPath);
        }
      } catch {
        // ignore — keep showing maintenance
      }
    };
    const interval = setInterval(check, 30_000);
    return () => clearInterval(interval);
  }, [nextPath, router]);

  return (
    <>
      <Navbar showLinks={false} />
      <div className="fixed inset-0 bg-warm-gray flex items-center justify-center overflow-hidden">
        {/* Watermark logo */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden>
          <Image
            src="/logo.png"
            alt=""
            width={600}
            height={600}
            className="opacity-[0.04] w-[min(70vw,70vh)]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.55em] text-gold uppercase block mb-8">
            Royal Chess Design
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-playfair) text-4xl md:text-5xl font-normal tracking-widest text-charcoal mb-8">
            Temporarily Unavailable
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light leading-relaxed text-text-secondary">
            This website is currently undergoing scheduled maintenance.
            <br />
            Please check back shortly.
          </motion.p>
        </div>
      </div>
    </>
  );
}

export default function MaintenancePage() {
  return (
    <Suspense>
      <MaintenanceContent />
    </Suspense>
  );
}
