"use client";

import { useRef, useState } from "react";

/**
 * Small video thumbnail that shows the first frame at rest
 * and plays (muted) on hover.
 *
 * Props:
 *   url       — video src
 *   className — sizing / rounding applied to the container
 */
export default function InlineVideoThumb({ url, className = "" }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const playPromise = useRef(null);

  function onEnter() {
    setPlaying(true);
    const v = ref.current;
    if (!v) return;
    playPromise.current = v.play();
    playPromise.current?.catch(() => {});
  }

  function onLeave() {
    setPlaying(false);
    const v = ref.current;
    if (!v) return;
    (playPromise.current ?? Promise.resolve()).then(() => {
      v.pause();
      v.currentTime = 0;
    });
  }

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <video
        ref={ref}
        src={url}
        preload="metadata"
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      <span
        className={`absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none ${playing ? "opacity-0" : "opacity-100"}`}
      >
        <span className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
          <svg width="9" height="9" viewBox="0 0 16 16" fill="white">
            <polygon points="4,2 14,8 4,14" />
          </svg>
        </span>
      </span>
    </div>
  );
}
