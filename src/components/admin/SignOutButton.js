"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="text-gray-400 hover:text-white transition-colors text-xs"
    >
      Sign out
    </button>
  );
}
