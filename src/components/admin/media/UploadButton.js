"use client";

import { useState, useRef } from "react";
import { saveMedia } from "@/actions/admin/media";

export function UploadButton() {
  const [state, setState] = useState(null);
  const [pending, setPending] = useState(false);
  const inputRef = useRef(null);

  async function handleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPending(true);
    setState(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/media/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed.");

      const result = await saveMedia(data);
      setState(result);
    } catch (err) {
      setState({ error: err.message || "Upload failed." });
    } finally {
      setPending(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/mp4,video/quicktime,video/webm"
        className="hidden"
        onChange={handleChange}
      />
      <button
        type="button"
        disabled={pending}
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
      >
        {pending ? "Uploading…" : "↑ Upload File"}
      </button>

      {state?.error && (
        <p className="mt-2 text-sm text-red-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="mt-2 text-sm text-green-600">✓ Uploaded: {state.name}</p>
      )}
    </div>
  );
}

