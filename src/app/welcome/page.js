"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";

function WelcomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    // If consent already exists, skip straight to destination
    const existing = document.cookie.split("; ").find((row) => row.startsWith("cookie_consent="));
    if (existing) {
      router.replace(nextPath);
    }
  }, [nextPath, router]);

  // When video is cached the canplay event fires before React attaches handlers.
  // Check readyState after mount and set a fallback timeout.
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const fallback = setTimeout(() => setVideoReady(true), vid.readyState >= 3 ? 0 : 3000);
    return () => clearTimeout(fallback);
  }, []);

  function saveConsent(value) {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `cookie_consent=${value}; path=/; max-age=${maxAge}; SameSite=Lax`;
    router.replace(nextPath);
  }

  return (
    <>
    <Navbar showLinks={false}/>
    <div className="fixed inset-0 bg-white overflow-hidden flex items-center justify-center">
      {/* ── Video ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          ref={videoRef}
          src="/welcome_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(true)}
          className="max-w-full max-h-full w-full h-full object-contain"
        />
      </div>

      {/* ── Cookie prompt ── */}
      <AnimatePresence>
        {videoReady && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 max-w-[70vw] w-full">
          <div className="border px-6 py-4 flex justify-center md:justify-between items-center gap-4 md:gap-20 flex-wrap md:flex-nowrap border-none text-center md:text-start">
            <p className="font-(family-name:--font-cormorant) md:text-[14px] leading-relaxed text-text-muted font-semibold text-balance">
              This website uses cookies to improve user experience. By using our website you consent
              to all cookies in accordance with our{" "}
              <a
                href="/cookie-policy"
                className="text-gold underline underline-offset-2 hover:text-gold-dark transition-colors">
                Cookie Policy
              </a>
              .
            </p>

            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => saveConsent("accepted")}
                className="btn-luxury text-[10px] py-2! px-6!">
                Accept
              </button>
              <button
                onClick={() => saveConsent("rejected")}
                className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] uppercase text-text-muted hover:text-charcoal transition-colors duration-200 px-4 py-2">
                Reject
              </button>
            </div>
          </div>
        </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframe for slow spin */}
      <style>{`
        @keyframes slowspin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
    </>
  );
}

export default function WelcomePage() {
  return (
    <Suspense>
      <WelcomeContent />
    </Suspense>
  );
}
