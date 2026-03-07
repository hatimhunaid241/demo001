"use client";

import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cleanupOrphanedBlobs } from "@/actions/admin/media";

export function CleanupButton() {
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!result) return;
    const t = setTimeout(() => setResult(null), 10000);
    return () => clearTimeout(t);
  }, [result]);

  function handleCleanup() {
    if (
      !confirm(
        "This will permanently delete all files in Vercel Blob storage (images/ and videos/ folders) that are not referenced anywhere in the database.\n\nContinue?"
      )
    )
      return;

    setResult(null);
    startTransition(async () => {
      try {
        const res = await cleanupOrphanedBlobs();
        setResult(res);
        router.refresh();
      } catch (err) {
        setResult({ error: err.message });
      }
    });
  }

  return (
    <>
      <button
        onClick={handleCleanup}
        disabled={pending}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:border-red-300 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-600 rounded-lg text-sm font-medium transition-colors shadow-sm"
      >
        {pending ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" strokeOpacity=".25" />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
            Scanning…
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Clean Up Storage
          </>
        )}
      </button>

      {result && !result.error && (
        <div className="fixed bottom-6 right-6 left-6 sm:left-auto z-50 bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-3 text-sm">
          {result.deleted.length === 0 ? (
            <p className="text-green-600 font-medium">✓ No orphaned files found ({result.kept} checked)</p>
          ) : (
            <>
              <p className="text-green-700 font-medium">
                ✓ Deleted {result.deleted.length} orphaned file{result.deleted.length !== 1 ? "s" : ""}
              </p>
              {result.errors.length > 0 && (
                <p className="text-red-500 mt-0.5 text-xs">{result.errors.length} error{result.errors.length !== 1 ? "s" : ""} — check console</p>
              )}
            </>
          )}
        </div>
      )}

      {result?.error && (
        <div className="fixed bottom-6 right-6 left-6 sm:left-auto z-50 bg-white border border-red-200 shadow-lg rounded-lg px-4 py-3 text-sm text-red-600">
          {result.error}
        </div>
      )}
    </>
  );
}
