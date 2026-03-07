"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton } from "@/components/admin/SignOutButton";

const NAV = [
  { href: "/admin/chess-sets", label: "Chess Sets",    icon: "♟" },
  { href: "/admin/pages",      label: "Pages",         icon: "📄" },
  { href: "/admin/media",      label: "Media Library", icon: "🖼" },
  { href: "/admin/newsletter", label: "Newsletter",     icon: "✉" },
  { href: "/admin/users",      label: "Users",         icon: "👤" },
];

const MQ = "(min-width: 1024px)";
function subscribeMQ(cb) {
  const mq = window.matchMedia(MQ);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export default function AdminSidebar({ email }) {
  const pathname = usePathname();

  // useSyncExternalStore handles SSR (server snapshot = false) and subscribes
  // to matchMedia changes without any setState-in-effect anti-pattern.
  const isDesktop = useSyncExternalStore(
    subscribeMQ,
    () => window.matchMedia(MQ).matches,
    () => false
  );

  // On mobile the user can manually open/close; on desktop isDesktop always wins
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = isDesktop || mobileOpen;

  function handleNavClick() {
    if (!isDesktop) setMobileOpen(false);
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Toggle button — only shown when sidebar is closed on mobile */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
        className={`fixed top-3 left-3 z-40 w-8 h-8 items-center justify-center rounded-lg bg-gray-900 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors shadow-md lg:hidden ${open ? "hidden" : "flex"}`}
      >
        {/* Hamburger icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="2" y1="4" x2="14" y2="4" />
          <line x1="2" y1="8" x2="14" y2="8" />
          <line x1="2" y1="12" x2="14" y2="12" />
        </svg>
      </button>

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-screen w-56 bg-gray-950 flex flex-col
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:z-auto lg:h-screen lg:translate-x-0 lg:shrink-0
        `}
      >
        {/* Header */}
        <div className="px-5 py-6 border-b border-gray-800 shrink-0 flex items-start justify-between">
          <div>
            <p className="text-white font-semibold text-sm tracking-wide">Royal Chess Design</p>
            <p className="text-gray-500 text-xs mt-0.5 uppercase tracking-widest">Admin</p>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="lg:hidden -mr-1 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="14" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </button>
        </div>

        {/* Scrollable nav area */}
        <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto min-h-0">
          {NAV.map(({ href, label, icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={handleNavClick}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                  active
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-gray-800 space-y-2 shrink-0">
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-2 py-2 rounded-lg text-gray-400 hover:text-white transition-colors text-xs"
          >
            <span>🌐</span> View Site
          </Link>
          <p className="text-gray-500 text-xs truncate">{email}</p>
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
