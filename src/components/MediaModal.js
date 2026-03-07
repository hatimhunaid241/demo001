"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

function getMediaType(item) {
  if (item.mimeType) {
    if (item.mimeType.startsWith("video/")) return "video";
    if (item.mimeType.startsWith("image/")) return "image";
    return "file";
  }
  const ext = (item.url || "").split(".").pop()?.toLowerCase().split("?")[0];
  if (["mp4", "mov", "webm", "avi", "mkv"].includes(ext)) return "video";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "avif"].includes(ext)) return "image";
  return "file";
}

function Spinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border border-white/30 border-t-white rounded-full animate-spin" />
    </div>
  );
}

function VideoView({ item }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full max-w-5xl mx-auto px-6">
      {loading && <Spinner />}
      <video
        src={item.url}
        autoPlay
        controls
        playsInline
        onCanPlay={() => setLoading(false)}
        className={`w-full max-h-[85vh] object-contain transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
      />
    </div>
  );
}

function ImageView({ item }) {
  const [loading, setLoading] = useState(true);
  return (
    <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto px-16 flex items-center justify-center">
      {loading && <Spinner />}
      <Image
        src={item.url}
        alt={item.filename || ""}
        fill
        onLoad={() => setLoading(false)}
        className={`object-contain transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
        sizes="100vw"
        unoptimized
      />
    </div>
  );
}

function FileView({ item }) {
  return (
    <div className="flex flex-col items-center gap-6 text-white/80 px-8 text-center">
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
      <p className="font-(family-name:--font-cormorant) text-lg tracking-wide break-all">
        {item.filename || item.url}
      </p>
      {item.url && (
        <a
          href={item.url}
          download={item.filename}
          className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.4em] text-gold uppercase border border-gold/40 px-5 py-2 hover:border-gold transition-colors"
        >
          DOWNLOAD
        </a>
      )}
    </div>
  );
}

/**
 * MediaModal — unified media viewer.
 *
 * Props:
 *   items   — array of { url, mimeType?, filename? }
 *   index   — currently active item index (default 0)
 *   onClose — required
 *   onPrev  — optional, enables prev arrow (images only)
 *   onNext  — optional, enables next arrow (images only)
 */
export default function MediaModal({ items, index = 0, onClose, onPrev, onNext }) {
  const item = items[index];
  const type = getMediaType(item);
  const multi = onPrev && onNext;

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
      if (multi && e.key === "ArrowLeft") onPrev();
      if (multi && e.key === "ArrowRight") onNext();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [multi, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      <motion.div
        key="media-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-9999 bg-charcoal/95 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-6 font-(family-name:--font-cormorant) text-[11px] tracking-[0.4em] text-white/60 uppercase hover:text-white transition-colors duration-200 z-10000"
        >
          CLOSE ✕
        </button>

        {/* Counter */}
        {multi && (
          <span className="absolute top-5 left-6 font-(family-name:--font-cormorant) text-[11px] tracking-[0.4em] text-white/40 uppercase">
            {index + 1} / {items.length}
          </span>
        )}

        {/* Media content */}
        <motion.div
          key={item.url}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {type === "video" && <VideoView item={item} />}
          {type === "image" && <ImageView item={item} />}
          {type === "file"  && <FileView  item={item} />}
        </motion.div>

        {/* Prev / Next arrows */}
        {multi && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl transition-colors duration-200 px-3 py-4 z-10000"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl transition-colors duration-200 px-3 py-4 z-10000"
            >
              →
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
