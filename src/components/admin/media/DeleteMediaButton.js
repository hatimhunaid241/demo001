"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteMedia } from "@/actions/admin/media";

export function DeleteMediaButton({ id }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    if (!confirm("Delete this file permanently? This cannot be undone.")) return;
    startTransition(async () => {
      try {
        await deleteMedia(id);
        router.refresh();
      } catch (err) {
        alert(err.message || "Failed to delete.");
      }
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      title="Delete"
      className="absolute top-1 right-1 w-5 h-5 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white rounded-full text-[11px] leading-none items-center justify-center hidden group-hover:flex transition-colors shadow-sm z-10"
    >
      ✕
    </button>
  );
}
