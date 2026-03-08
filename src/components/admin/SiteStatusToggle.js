"use client";

import { useState, useTransition } from "react";
import { setSiteStatus } from "@/actions/admin/siteStatus";

export function SiteStatusToggle({ initialEnabled }) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    setError(null);
    startTransition(async () => {
      try {
        await setSiteStatus(next);
      } catch (e) {
        setEnabled(!next); // revert on error
        setError("Failed to update site status. Please try again.");
      }
    });
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between gap-6">
        <div>
          <h2 className="text-base font-semibold text-gray-900">Site Visibility</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {enabled
              ? "The website is live and accessible to visitors."
              : "The website is in maintenance mode. Visitors see the maintenance page."}
          </p>
        </div>

        <button
          onClick={toggle}
          disabled={isPending}
          aria-label={enabled ? "Pause website" : "Resume website"}
          className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 cursor-pointer ${
            enabled
              ? "bg-green-500 focus:ring-green-500"
              : "bg-gray-300 focus:ring-gray-400"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            enabled ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              enabled ? "bg-green-500" : "bg-amber-500"
            }`}
          />
          {isPending ? "Updating…" : enabled ? "Live" : "Maintenance Mode"}
        </span>

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
