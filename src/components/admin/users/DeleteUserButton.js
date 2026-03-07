"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/actions/admin/users";

export function DeleteUserButton({ id }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm("Delete this user? This cannot be undone.")) return;
    startTransition(async () => {
      try {
        await deleteUser(id);
        router.refresh();
      } catch (err) {
        alert(err.message || "Failed to delete user.");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 font-medium transition-colors"
    >
      {pending ? "…" : "Delete"}
    </button>
  );
}
