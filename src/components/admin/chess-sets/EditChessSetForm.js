"use client";

import InlineVideoThumb from "@/components/admin/InlineVideoThumb";
import { useState, useActionState, useRef } from "react";
import { updateGeneral, updateMedia, updateTable, updatePiece } from "@/actions/admin/chess-sets";

// ── tiny helpers ──────────────────────────────────────────────────────────────

function Field({
  label,
  name,
  defaultValue = "",
  defaultChecked = false,
  placeholder = "",
  required = false,
  type = "text",
}) {
  if (type === "checkbox") {
    return (
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="w-4 h-4 rounded accent-indigo-600"
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
      />
    </div>
  );
}

function Textarea({ label, name, defaultValue = "", rows = 3, placeholder = "" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white resize-y"
      />
    </div>
  );
}

function StatusBar({ state, pending }) {
  if (pending) return <p className="text-sm text-indigo-600">Saving…</p>;
  if (!state) return null;
  if (state.error)
    return (
      <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
        {state.error}
      </p>
    );
  if (state.success)
    return (
      <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
        ✓ Saved successfully.
      </p>
    );
  return null;
}

function SaveBtn({ pending }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors">
      {pending ? "Saving…" : "Save Changes"}
    </button>
  );
}

// ── multi-URL field with media picker dialog ────────────────────────────────
// Used for videoUrls, tableImageUrls, piece imageUrls
// mediaItems: full media array (images + videos filtered by caller)

function UrlListField({ label, name, initialUrls = [], mediaItems, accept = "images" }) {
  const [value, setValue] = useState(
    Array.isArray(initialUrls) ? initialUrls.join("\n") : initialUrls || "",
  );
  const dialogRef = useRef(null);
  const dragIdx = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  const urls = value
    .split(/\r?\n/)
    .map((u) => u.trim())
    .filter(Boolean);

  function addUrl(url) {
    setValue((prev) => {
      const existing = prev
        .split(/\r?\n/)
        .map((u) => u.trim())
        .filter(Boolean);
      if (existing.includes(url)) return prev;
      return [...existing, url].join("\n");
    });
  }

  function removeUrl(urlToRemove) {
    setValue((prev) =>
      prev
        .split(/\r?\n/)
        .map((u) => u.trim())
        .filter((u) => u && u !== urlToRemove)
        .join("\n"),
    );
  }

  function handleDragStart(i) {
    dragIdx.current = i;
  }

  function handleDragOver(e, i) {
    e.preventDefault();
    if (i !== dragIdx.current) setDragOver(i);
  }

  function handleDrop(e, i) {
    e.preventDefault();
    setDragOver(null);
    if (dragIdx.current === null || dragIdx.current === i) return;
    const next = [...urls];
    const [moved] = next.splice(dragIdx.current, 1);
    next.splice(i, 0, moved);
    dragIdx.current = null;
    setValue(next.join("\n"));
  }

  function handleDragEnd() {
    dragIdx.current = null;
    setDragOver(null);
  }

  const isVideo = accept === "videos";

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="block text-xs font-medium text-gray-600 uppercase tracking-wider">
          {label}
        </label>
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
          Browse Media Library
        </button>
      </div>

      {/* Preview strip */}
      {urls.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {urls.map((url, i) => (
            <div
              key={url}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={`relative group cursor-grab active:cursor-grabbing transition-opacity ${
                dragOver === i ? "ring-2 ring-indigo-400 rounded-lg opacity-60" : ""
              }`}>
              {isVideo ? (
                <InlineVideoThumb
                  url={url}
                  className="w-20 h-14 rounded-lg border border-gray-200"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={url}
                  alt=""
                  className="w-20 h-14 object-cover rounded-lg border border-gray-200"
                />
              )}
              <button
                type="button"
                onClick={() => removeUrl(url)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] leading-none hidden group-hover:flex items-center justify-center">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <textarea
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder={
          isVideo
            ? "https://…blob.vercel-storage.com/videos/…"
            : "https://…blob.vercel-storage.com/images/…"
        }
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white resize-y"
      />

      {/* Media picker dialog */}
      <dialog
        ref={dialogRef}
        className="w-full max-w-3xl rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 m-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">
            {isVideo ? "Choose Video" : "Choose Image"}
          </h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none">
            ✕
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          {isVideo ? (
            <div className="space-y-2">
              {mediaItems.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    addUrl(m.url);
                    dialogRef.current?.close();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-gray-200 hover:border-indigo-400 text-left transition-colors">
                  <InlineVideoThumb url={m.url} className="w-20 h-12 rounded-lg shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-800 font-medium truncate">{m.filename}</p>
                    <p className="text-xs text-gray-400 truncate font-mono">{m.url}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-6 gap-2">
              {mediaItems.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    addUrl(m.url);
                    dialogRef.current?.close();
                  }}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-400 focus:border-indigo-500 transition-colors">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}

// ── image picker with media dialog ───────────────────────────────────────────

function ImageField({ label, name, initialUrl = "", mediaImages }) {
  const [url, setUrl] = useState(initialUrl || "");
  const dialogRef = useRef(null);

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </label>

      <div className="flex gap-3 items-start">
        {/* Thumbnail */}
        <div className="w-20 h-16 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden shrink-0 flex items-center justify-center">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-300 text-xs text-center leading-tight px-1">No image</span>
          )}
        </div>

        <div className="flex-1 space-y-1.5">
          <input
            type="text"
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://…"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white font-mono"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
            Browse Media Library
          </button>
        </div>
      </div>

      {/* Media picker dialog */}
      <dialog
        ref={dialogRef}
        className="w-full max-w-3xl rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 m-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">Choose Image</h3>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="text-gray-400 hover:text-gray-700 text-lg leading-none">
            ✕
          </button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {mediaImages.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setUrl(m.url);
                  dialogRef.current?.close();
                }}
                className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-400 focus:border-indigo-500 transition-colors">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}

// ── tabs ──────────────────────────────────────────────────────────────────────

const TABS = ["General", "Media", "Table", "Pieces"];

// ── General tab ───────────────────────────────────────────────────────────────

function GeneralTab({ set }) {
  const [state, formAction, pending] = useActionState(updateGeneral, null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={set.id} />

      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" name="name" defaultValue={set.name} required />
        <Field label="Category" name="category" defaultValue={set.category} />
        <Field label="Year" name="year" defaultValue={set.year} />
        <Field
          label="Set Number (Roman)"
          name="setNumber"
          defaultValue={set.setNumber}
          placeholder="e.g. I"
        />
        <Field
          label="Display Order"
          name="order"
          type="number"
          defaultValue={set.order ?? 0}
          placeholder="0"
        />
        <Field
          label="Has Wood Care"
          name="hasWoodCare"
          type="checkbox"
          defaultChecked={set.hasWoodCare ?? false}
        />
      </div>

      <Field label="Subtitle" name="subtitle" defaultValue={set.subtitle} />
      <Textarea
        label="Short Description"
        name="shortDescription"
        defaultValue={set.shortDescription}
        rows={2}
      />
      <Textarea
        label="Full Description"
        name="description"
        defaultValue={set.description}
        rows={4}
      />
      <Textarea label="Materials" name="materials" defaultValue={set.materials} rows={2} />

      <div className="border-t pt-5">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
          Overview Section
        </h3>
        <div className="space-y-4">
          <Textarea label="Overview Text" name="overview" defaultValue={set.overview} rows={4} />
          <Field
            label="Overview Quote"
            name="overviewQuoteText"
            defaultValue={set.overviewQuoteText}
          />
          <Field
            label="Quote Author"
            name="overviewQuoteAuthor"
            defaultValue={set.overviewQuoteAuthor}
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          name="published"
          defaultChecked={set.published}
          className="w-4 h-4 rounded accent-indigo-600"
        />
        <span className="text-sm font-medium text-gray-700">Published</span>
      </label>

      <div className="flex items-center gap-4 pt-1">
        <SaveBtn pending={pending} />
        <StatusBar state={state} pending={pending} />
      </div>
    </form>
  );
}

// ── Media tab ─────────────────────────────────────────────────────────────────

function MediaTab({ set, mediaImages, mediaVideos }) {
  const [state, formAction, pending] = useActionState(updateMedia, null);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="id" value={set.id} />

      <ImageField
        label="Main Set Image"
        name="image"
        initialUrl={set.image || ""}
        mediaImages={mediaImages}
      />

      <ImageField
        label="Hero Image"
        name="heroImage"
        initialUrl={set.heroImage || ""}
        mediaImages={mediaImages}
      />

      <UrlListField
        label="Video URLs (one per line)"
        name="videoUrls"
        initialUrls={set.videoUrls || []}
        mediaItems={mediaVideos}
        accept="videos"
      />

      <div className="flex items-center gap-4 pt-1">
        <SaveBtn pending={pending} />
        <StatusBar state={state} pending={pending} />
      </div>
    </form>
  );
}

// ── Table tab ─────────────────────────────────────────────────────────────────

function SpecsEditor({ initialSpecs }) {
  const initial =
    Array.isArray(initialSpecs) && initialSpecs.length > 0
      ? initialSpecs.map((r) => ({ label: r.label ?? r.spec ?? "", value: r.value ?? "" }))
      : [{ label: "", value: "" }];

  const [rows, setRows] = useState(initial);

  function update(idx, key, val) {
    setRows((prev) => prev.map((r, i) => (i === idx ? { ...r, [key]: val } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { label: "", value: "" }]);
  }

  function removeRow(idx) {
    setRows((prev) =>
      prev.length === 1 ? [{ label: "", value: "" }] : prev.filter((_, i) => i !== idx),
    );
  }

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
        Table Specs
      </label>

      <div className="space-y-2 mb-3">
        {rows.map((row, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              name="specLabel"
              value={row.label}
              onChange={(e) => update(idx, "label", e.target.value)}
              placeholder="Label (e.g. Height)"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
            />
            <input
              name="specValue"
              value={row.value}
              onChange={(e) => update(idx, "value", e.target.value)}
              placeholder="Value (e.g. 15 cm)"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
            />
            <button
              type="button"
              onClick={() => removeRow(idx)}
              className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors text-lg leading-none shrink-0"
              title="Remove">
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
        + Add spec row
      </button>

      {/* Hidden field — serialises rows for the server action */}
      <input
        type="hidden"
        name="tableSpecs"
        value={JSON.stringify(rows.filter((r) => (r.label ?? "").trim() || (r.value ?? "").trim()))}
      />
    </div>
  );
}

function TableTab({ set, mediaImages }) {
  const [state, formAction, pending] = useActionState(updateTable, null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="id" value={set.id} />

      <Textarea
        label="Table Description"
        name="tableDescription"
        defaultValue={set.tableDescription}
        rows={4}
      />
      <Field label="Table Quote" name="tableQuoteText" defaultValue={set.tableQuoteText} />
      <Field label="Quote Author" name="tableQuoteAuthor" defaultValue={set.tableQuoteAuthor} />

      <UrlListField
        label="Table Image URLs (one per line)"
        name="tableImageUrls"
        initialUrls={set.tableImageUrls || []}
        mediaItems={mediaImages}
        accept="images"
      />

      <SpecsEditor initialSpecs={set.tableSpecs} />

      <div className="flex items-center gap-4 pt-1">
        <SaveBtn pending={pending} />
        <StatusBar state={state} pending={pending} />
      </div>
    </form>
  );
}

// ── Pieces tab ────────────────────────────────────────────────────────────────

function PieceForm({ piece, setId, mediaImages }) {
  const boundAction = updatePiece.bind(null, piece.id);
  const [state, formAction, pending] = useActionState(boundAction, null);
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left">
        <div>
          <p className="font-medium text-gray-900 text-sm">{piece.name}</p>
          {piece.height && <p className="text-xs text-gray-400 mt-0.5">{piece.height}</p>}
        </div>
        <span className="text-gray-400 text-sm">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <form action={formAction} className="p-5 space-y-4 border-t border-gray-200">
          <input type="hidden" name="chessSetId" value={setId} />

          <div className="grid grid-cols-2 gap-4">
            <Field label="Name" name="name" defaultValue={piece.name} required />
            <Field
              label="Height"
              name="height"
              defaultValue={piece.height}
              placeholder="e.g. 12 cm"
            />
          </div>

          <Textarea
            label="Description"
            name="description"
            defaultValue={piece.description}
            rows={3}
          />
          <Field label="Quote" name="quoteText" defaultValue={piece.quoteText} />
          <Field label="Quote Author" name="quoteAuthor" defaultValue={piece.quoteAuthor} />

          <UrlListField
            label="Image URLs (one per line)"
            name="imageUrls"
            initialUrls={piece.imageUrls || []}
            mediaItems={mediaImages}
            accept="images"
          />

          <div className="flex items-center gap-4 pt-1">
            <SaveBtn pending={pending} />
            <StatusBar state={state} pending={pending} />
          </div>
        </form>
      )}
    </div>
  );
}

function PiecesTab({ pieces, setId, mediaImages }) {
  if (!pieces || pieces.length === 0) {
    return <p className="text-sm text-gray-400">No pieces for this chess set.</p>;
  }

  return (
    <div className="space-y-3">
      {pieces.map((piece) => (
        <PieceForm key={piece.id} piece={piece} setId={setId} mediaImages={mediaImages} />
      ))}
    </div>
  );
}

// ── main export ───────────────────────────────────────────────────────────────

export function EditChessSetForm({ set, pieces, mediaImages, mediaVideos }) {
  const [tab, setTab] = useState("General");

  return (
    <div>
      {/* Tab nav */}
      <div className="flex gap-0 mb-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "General" && <GeneralTab set={set} />}
      {tab === "Media" && (
        <MediaTab set={set} mediaImages={mediaImages} mediaVideos={mediaVideos} />
      )}
      {tab === "Table" && <TableTab set={set} mediaImages={mediaImages} />}
      {tab === "Pieces" && <PiecesTab pieces={pieces} setId={set.id} mediaImages={mediaImages} />}
    </div>
  );
}
