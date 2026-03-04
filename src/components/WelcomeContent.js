"use client";

import { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function WelcomeContent({ saveConsent }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const fallback = setTimeout(() => setVideoReady(true), vid.readyState >= 3 ? 0 : 3000);
    return () => clearTimeout(fallback);
  }, []);


  return (
    <>
      <Navbar showLinks={false} />
      <div className="fixed inset-0 bg-white overflow-hidden flex items-center justify-center">
        {/* ── Video ── */}
        <div className="absolute inset-0 flex items-center justify-center bg-white overflow-hidden">
          <video
            ref={videoRef}
            src="/welcome_video.mp4"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoReady(true)}
            className="block max-w-full max-h-full w-full h-full object-contain outline-none"
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
                  This website uses cookies to improve user experience. By using our website you
                  consent to all cookies in accordance with our{" "}
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
                    className="btn-luxury text-[10px] py-2! px-6!">
                    Reject
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
