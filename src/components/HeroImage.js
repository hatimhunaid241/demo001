"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroImage({ src, alt, overlay }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Solid placeholder color shown while image loads */}
      <div
        className={`absolute inset-0 bg-warm-gray transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        priority
        sizes="100vw"
        onLoad={handleLoad}
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${overlay}`}
      />
    </div>
  );
}

export function useHeroReady() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const onImageLoad = useCallback(() => setImageLoaded(true), []);
  return { imageLoaded, onImageLoad };
}

export function HeroSection({
  src,
  alt,
  overlayClass,
  height = "h-screen",
  showScrollIndicator = false,
  children,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  return (
    <section
      className={`relative ${height} flex items-center justify-center overflow-hidden`}
    >
      {/* Background */}
      <div className="absolute inset-0">
        {/* Warm placeholder */}
        <div className="absolute inset-0 bg-warm-gray" />

        <Image
          src={src}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-1000 ease-out ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          // priority
          sizes="100vw"
          onLoad={handleLoad}
        />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 ${overlayClass}`}
        />
      </div>

      {/* Content — only animates in after image is loaded */}
      <AnimatePresence>
        {imageLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-full h-full flex items-center justify-center"
          >
            {children}

            {showScrollIndicator && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.3em]">
                    SCROLL
                  </span>
                  <div className="w-px h-8 bg-linear-to-b from-gold/60 to-transparent" />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
