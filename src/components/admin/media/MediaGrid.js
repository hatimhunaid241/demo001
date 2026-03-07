"use client";

import { useState, useRef } from "react";
import MediaModal from "@/components/MediaModal";
import { DeleteMediaButton } from "@/components/admin/media/DeleteMediaButton";

function VideoThumbnail({ url, label, onClick }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const playPromise = useRef(null);

  function handleMouseEnter() {
    setHovered(true);
    const v = videoRef.current;
    if (!v) return;
    playPromise.current = v.play();
    playPromise.current?.catch(() => {});
  }

  function handleMouseLeave() {
    setHovered(false);
    const v = videoRef.current;
    if (!v) return;
    // Wait for any in-flight play() to settle before pausing
    (playPromise.current ?? Promise.resolve()).then(() => {
      v.pause();
      v.currentTime = 0;
    });
  }

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-video overflow-hidden bg-black block"
      aria-label={`Play ${label}`}
    >
      <video
        ref={videoRef}
        src={url}
        preload="metadata"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Play icon — fades out while hovered */}
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity ${hovered ? "opacity-0" : "opacity-100"}`}
      >
        <span className="w-9 h-9 rounded-full bg-black/50 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="white"><polygon points="4,2 14,8 4,14" /></svg>
        </span>
      </span>
    </button>
  );
}

function formatBytes(bytes) {
  if (bytes < 1024)         return `${bytes} B`;
  if (bytes < 1024 * 1024)  return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function CopyUrlButton({ url, className = "" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.stopPropagation();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy URL"}
      className={`absolute w-6 h-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full items-center justify-center hidden group-hover:flex transition-colors shadow-sm z-10 ${className}`}
    >
      {copied ? (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 8 6 12 14 4" /></svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="9" height="9" rx="1" /><path d="M3 10H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v1" /></svg>
      )}
    </button>
  );
}

export default function MediaGrid({ items }) {
  const [modalIndex, setModalIndex] = useState(null);

  const videos = items.filter((m) => m.mimeType.startsWith("video/"));
  const images = items.filter((m) => !m.mimeType.startsWith("video/"));

  // Unified array for modal navigation: videos first, then images
  const allItems = [...videos, ...images];

  function openModal(id) {
    setModalIndex(allItems.findIndex((m) => m.id === id));
  }

  function closeModal() { setModalIndex(null); }
  function prevItem() { setModalIndex((i) => (i - 1 + allItems.length) % allItems.length); }
  function nextItem() { setModalIndex((i) => (i + 1) % allItems.length); }

  return (
    <>
      {/* Videos */}
      {videos.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Videos ({videos.length})
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {videos.map((v) => (
              <div
                key={v.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group relative"
              >
                <DeleteMediaButton id={v.id} />
                <CopyUrlButton url={v.url} className="top-1 left-1" />
                <VideoThumbnail
                  url={v.url}
                  label={v.filename}
                  onClick={() => openModal(v.id)}
                />
                <div className="p-3">
                  <p className="text-xs text-gray-700 font-medium truncate" title={v.filename}>
                    {v.filename}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{formatBytes(v.size)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Images */}
      <section>
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
          Images ({images.length})
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((img) => (
            <div key={img.id} className="group relative">
              <button
                onClick={() => openModal(img.id)}
                className="block w-full"
                aria-label={`Preview ${img.filename}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="aspect-square w-full object-cover rounded-lg border border-gray-100 group-hover:border-indigo-300 transition-colors"
                  loading="lazy"
                />
              </button>
              <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              <DeleteMediaButton id={img.id} />
              <CopyUrlButton url={img.url} className="top-1 left-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Modal — navigates through all items */}
      {modalIndex !== null && (
        <MediaModal
          items={allItems}
          index={modalIndex}
          onClose={closeModal}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </>
  );
}
