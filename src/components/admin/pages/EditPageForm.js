"use client";

import { useState, useActionState, useRef } from "react";
import { updatePageContent } from "@/actions/admin/pages";
import InlineVideoThumb from "@/components/admin/InlineVideoThumb";

// ── Primitive field components ─────────────────────────────────────────────

function Field({ label, name, defaultValue = "", placeholder = "", hint }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <input
        type="text"
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
      />
    </div>
  );
}

function Textarea({ label, name, defaultValue = "", rows = 4, hint }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white resize-y"
      />
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <div className="pt-6 pb-2 border-b border-gray-100">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{children}</h3>
    </div>
  );
}

function StatusBar({ state, pending }) {
  if (pending) return <p className="text-sm text-indigo-600">Saving…</p>;
  if (!state) return null;
  if (state.error) return (
    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
  );
  if (state.success) return (
    <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">✓ Saved successfully.</p>
  );
  return null;
}

// ── Image picker field ─────────────────────────────────────────────────────

function ImageField({ label, name, initialUrl = "", mediaImages }) {
  const [url, setUrl] = useState(initialUrl || "");
  const dialogRef = useRef(null);

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-3 items-start">
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
            placeholder="https://… or /path/to/image.jpg"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white font-mono"
          />
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Browse Media Library
          </button>
        </div>
      </div>

      <dialog ref={dialogRef} className="w-full max-w-3xl rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 m-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">Choose Image</h3>
          <button type="button" onClick={() => dialogRef.current?.close()} className="text-gray-400 hover:text-gray-700 text-lg leading-none">✕</button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-6 gap-2">
            {mediaImages.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => { setUrl(m.url); dialogRef.current?.close(); }}
                className="aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-indigo-400 focus:border-indigo-500 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.filename} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
          {mediaImages.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No images in media library.</p>
          )}
        </div>
      </dialog>
    </div>
  );
}

// ── Video picker field ────────────────────────────────────────────────────────

function VideoField({ label, name, initialUrl = "", mediaVideos = [], hint }) {
  const [url, setUrl] = useState(initialUrl || "");
  const dialogRef = useRef(null);

  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
        {label}
      </label>
      {hint && <p className="text-xs text-gray-400 mb-1">{hint}</p>}
      <div className="flex gap-3 items-start">
        <div className="w-20 h-16 rounded-lg border border-gray-200 bg-gray-900 overflow-hidden shrink-0 flex items-center justify-center">
          {url ? (
            <InlineVideoThumb url={url} className="w-full h-full" />
          ) : (
            <span className="text-gray-500 text-xs text-center leading-tight px-1">No video</span>
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
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Browse Media Library
          </button>
        </div>
      </div>

      <dialog ref={dialogRef} className="w-full max-w-3xl rounded-2xl p-0 shadow-2xl backdrop:bg-black/60 m-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">Choose Video</h3>
          <button type="button" onClick={() => dialogRef.current?.close()} className="text-gray-400 hover:text-gray-700 text-lg leading-none">✕</button>
        </div>
        <div className="p-4 max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {mediaVideos.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => { setUrl(v.url); dialogRef.current?.close(); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border-2 border-transparent hover:border-indigo-400 text-left transition-colors bg-gray-50"
              >
                <InlineVideoThumb url={v.url} className="w-20 h-12 rounded-lg shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-800 font-medium truncate">{v.filename}</p>
                  <p className="text-xs text-gray-400 truncate font-mono">{v.url}</p>
                </div>
              </button>
            ))}
          </div>
          {mediaVideos.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No videos in media library.</p>
          )}
        </div>
      </dialog>
    </div>
  );
}

// ── Page-specific field sets ────────────────────────────────────────────────

function HomeFields({ c, mediaImages, mediaVideos }) {
  return (
    <>
      <SectionHeading>Hero</SectionHeading>
      <ImageField label="Hero Image" name="hero.image" initialUrl={c["hero.image"]} mediaImages={mediaImages} />
      <Field label="Eyebrow Text" name="hero.eyebrow" defaultValue={c["hero.eyebrow"]} placeholder="Chess Designers Portfolio" />
      <Field label="Subtitle" name="hero.subtitle" defaultValue={c["hero.subtitle"]} placeholder="The Art of Strategic Elegance" />
      <VideoField label="Hero Video" name="hero.videoUrl" initialUrl={c["hero.videoUrl"]} mediaVideos={mediaVideos} hint="Played when visitor clicks 'Watch Film'" />

      <SectionHeading>Introduction Section</SectionHeading>
      <Field label="Eyebrow" name="intro.eyebrow" defaultValue={c["intro.eyebrow"]} />
      <Field label="Heading" name="intro.heading" defaultValue={c["intro.heading"]} />
      <Textarea label="Body Paragraph 1" name="intro.body1" defaultValue={c["intro.body1"]} rows={3} />
      <Textarea label="Body Paragraph 2" name="intro.body2" defaultValue={c["intro.body2"]} rows={2} />

      <SectionHeading>Philosophy Section</SectionHeading>
      <ImageField label="Philosophy Image" name="philosophy.image" initialUrl={c["philosophy.image"]} mediaImages={mediaImages} />
      <Field label="Eyebrow" name="philosophy.eyebrow" defaultValue={c["philosophy.eyebrow"]} />
      <Field label="Heading" name="philosophy.heading" defaultValue={c["philosophy.heading"]} />
      <Textarea label="Body Paragraph 1" name="philosophy.body1" defaultValue={c["philosophy.body1"]} rows={3} />
      <Textarea label="Body Paragraph 2" name="philosophy.body2" defaultValue={c["philosophy.body2"]} rows={3} />

      <SectionHeading>Enquiries Section</SectionHeading>
      <Field label="Heading" name="enquiries.heading" defaultValue={c["enquiries.heading"]} />
      <Textarea label="Body" name="enquiries.body" defaultValue={c["enquiries.body"]} rows={2} />
    </>
  );
}

function ArtistFields({ c, mediaImages }) {
  return (
    <>
      <SectionHeading>Hero</SectionHeading>
      <ImageField label="Hero Image" name="hero.image" initialUrl={c["hero.image"]} mediaImages={mediaImages} />
      <Field label="Artist Name" name="hero.name" defaultValue={c["hero.name"]} />
      <Field label="Subtitle" name="hero.subtitle" defaultValue={c["hero.subtitle"]} />

      <SectionHeading>Bio — Paragraphs</SectionHeading>
      <Textarea label="Paragraph 1 (Introduction)" name="bio.p1" defaultValue={c["bio.p1"]} rows={2} />
      <Textarea label="Paragraph 2" name="bio.p2" defaultValue={c["bio.p2"]} rows={2} />
      <Textarea label="Paragraph 3 (Chess origin story)" name="bio.p3" defaultValue={c["bio.p3"]} rows={4} />
      <Field label="Italic Quote 1" name="bio.quote1" defaultValue={c["bio.quote1"]} hint="Displayed in italic gold" />
      <Textarea label="Paragraph 4" name="bio.p4" defaultValue={c["bio.p4"]} rows={2} />
      <Textarea label="Paragraph 5 (Endless possibilities)" name="bio.p5" defaultValue={c["bio.p5"]} rows={2} />
      <Textarea label="Paragraph 6 (Design elements)" name="bio.p6" defaultValue={c["bio.p6"]} rows={2} />
      <Textarea label="Paragraph 7 (Transition sentence)" name="bio.p7" defaultValue={c["bio.p7"]} rows={1} />
      <Textarea label="Italic Quote 2 (The 'why' question)" name="bio.quote2" defaultValue={c["bio.quote2"]} rows={2} hint="Displayed in italic gold" />
      <Textarea label="Paragraph 8 (Goldsmith)" name="bio.p8" defaultValue={c["bio.p8"]} rows={2} />
      <Textarea label="Paragraph 9 (Chess history)" name="bio.p9" defaultValue={c["bio.p9"]} rows={3} />
      <Textarea label="Paragraph 10 (Play)" name="bio.p10" defaultValue={c["bio.p10"]} rows={2} />
      <Textarea label="Paragraph 11 (Vision)" name="bio.p11" defaultValue={c["bio.p11"]} rows={2} />

      <SectionHeading>Motto</SectionHeading>
      <Field label="Motto Text" name="motto.text" defaultValue={c["motto.text"]} />

      <SectionHeading>Images</SectionHeading>
      <ImageField label="Signature Image" name="signature.image" initialUrl={c["signature.image"]} mediaImages={mediaImages} />
      <ImageField label="Artist Portrait" name="portrait.image" initialUrl={c["portrait.image"]} mediaImages={mediaImages} />
    </>
  );
}

function PortfolioFields({ c, mediaImages }) {
  return (
    <>
      <SectionHeading>Hero</SectionHeading>
      <ImageField label="Hero Image" name="hero.image" initialUrl={c["hero.image"]} mediaImages={mediaImages} />
      <Field label="Eyebrow Text" name="hero.eyebrow" defaultValue={c["hero.eyebrow"]} />
      <Field label="Main Heading" name="hero.heading" defaultValue={c["hero.heading"]} />
      <Textarea label="Subtitle" name="hero.subtitle" defaultValue={c["hero.subtitle"]} rows={2} />

      <SectionHeading>Collection Introduction</SectionHeading>
      <Textarea label="Intro Paragraph" name="intro.body" defaultValue={c["intro.body"]} rows={3} />
    </>
  );
}

function ContactFields({ c, mediaImages }) {
  return (
    <>
      <SectionHeading>Hero</SectionHeading>
      <ImageField label="Hero Image" name="hero.image" initialUrl={c["hero.image"]} mediaImages={mediaImages} />
      <Field label="Eyebrow Text" name="hero.eyebrow" defaultValue={c["hero.eyebrow"]} />

      <SectionHeading>Introduction Text</SectionHeading>
      <Textarea label="Intro Paragraph" name="intro.body" defaultValue={c["intro.body"]} rows={3} />

      <SectionHeading>Contact Details</SectionHeading>
      <Field label="Section Heading" name="details.heading" defaultValue={c["details.heading"]} />
      <Textarea label="Description" name="details.description" defaultValue={c["details.description"]} rows={3} />
      <Field label="Email Address" name="details.email" defaultValue={c["details.email"]} placeholder="info@royalchessdesign.com" />

      <SectionHeading>Social Links</SectionHeading>
      <Field label="Instagram URL" name="social.instagram" defaultValue={c["social.instagram"]} placeholder="https://www.instagram.com/…" />
      <Field label="LinkedIn URL" name="social.linkedin" defaultValue={c["social.linkedin"]} placeholder="https://www.linkedin.com/…" />
    </>
  );
}

function WelcomeFields({ c, mediaVideos }) {
  const [cookieText, setCookieText] = useState(c["cookie.text"] || "");
  const missingKeyword = cookieText && !cookieText.includes("Cookie Policy");

  return (
    <>
      <SectionHeading>Welcome Video</SectionHeading>
      <VideoField label="Background Video" name="video.url" initialUrl={c["video.url"]} mediaVideos={mediaVideos} hint="Full-screen video shown on the welcome/cookie-consent page" />

      <SectionHeading>Cookie Consent Banner</SectionHeading>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">
          Cookie Text
        </label>
        <p className="text-xs text-gray-400 mb-1">
          The consent sentence displayed to visitors. Must contain the exact words{" "}
          <span className="font-semibold text-gray-600">Cookie Policy</span> — those words will
          automatically become a link to the Cookie Policy URL below.
        </p>
        <textarea
          name="cookie.text"
          value={cookieText}
          onChange={(e) => setCookieText(e.target.value)}
          onInvalid={(e) => e.target.setCustomValidity('Must contain the exact words "Cookie Policy"')}
          onInput={(e) => e.target.setCustomValidity("")}
          rows={3}
          required
          className={`w-full border rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none transition-colors bg-white resize-y ${
            missingKeyword
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-indigo-400"
          }`}
        />
        {missingKeyword && (
          <p className="text-xs text-red-500 mt-1">
            ⚠ Text must contain the words <strong>Cookie Policy</strong> (exact case).
          </p>
        )}
        {/* Hidden input blocks native form submission when keyword is absent */}
        {missingKeyword && (
          <input type="text" required defaultValue="" aria-hidden className="sr-only" tabIndex={-1} />
        )}
      </div>
      <Field label="Cookie Policy URL" name="cookie.policyUrl" defaultValue={c["cookie.policyUrl"]} placeholder="/cookie-policy" />
    </>
  );
}

function getInitialWoodCareSections(content) {
  const sections = [];
  const seenNumbers = new Set();

  Object.keys(content || {}).forEach((key) => {
    const match = key.match(/(?:content\.)?title(\d+)$/i) || key.match(/^title(\d+)$/i);
    if (match) seenNumbers.add(Number(match[1]));
  });

  const orderedNumbers = [...seenNumbers].sort((a, b) => a - b);
  orderedNumbers.forEach((n) => {
    sections.push({
      id: `section-${n}`,
      title: content[`content.title${n}`] || content[`title${n}`] || "",
      text: content[`content.p${n}`] || content[`p${n}`] || "",
    });
  });

  if (sections.length === 0) {
    sections.push({ id: "section-1", title: "", text: "" });
  }

  return sections;
}

function WoodCareFields({ c, mediaImages }) {
  const [sections, setSections] = useState(() => getInitialWoodCareSections(c));

  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title: "", text: "" },
    ]);
  }

  function removeSection(id) {
    setSections((prev) => prev.filter((section) => section.id !== id));
  }

  function updateSection(id, field, value) {
    setSections((prev) =>
      prev.map((section) => (section.id === id ? { ...section, [field]: value } : section))
    );
  }

  return (
    <>
      <SectionHeading>Hero</SectionHeading>
      <ImageField label="Hero Image" name="hero.image" initialUrl={c["hero.image"]} mediaImages={mediaImages} />
      <Field label="Hero Title" name="hero.name" defaultValue={c["hero.name"]} placeholder="Wood Care & Maintenance" />
      <Field label="Hero Subtitle" name="hero.subtitle" defaultValue={c["hero.subtitle"]} />

      <SectionHeading>Content Sections</SectionHeading>
      <div className="rounded-lg border border-indigo-100 bg-indigo-50/50 p-3 text-xs text-indigo-900 space-y-1.5">
        <p className="font-semibold uppercase tracking-wider text-[10px] text-indigo-700">Formatting Tips</p>
        <p>Use an empty line between paragraphs.</p>
        <p>Use **bold** for emphasis.</p>
        <p>Use unordered lists with lines starting with - .</p>
        <p>Use ordered lists with lines starting with 1. 2. 3.</p>
      </div>

      <div className="space-y-6">
        {sections.map((section, idx) => (
          <div key={section.id} className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-sm font-semibold text-gray-700">Section {idx + 1}</h4>
              <button
                type="button"
                onClick={() => removeSection(section.id)}
                disabled={sections.length === 1}
                className="text-xs px-2.5 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(section.id, "title", e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1 uppercase tracking-wider">Text</label>
              <textarea
                value={section.text}
                onChange={(e) => updateSection(section.id, "text", e.target.value)}
                rows={6}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-indigo-400 transition-colors bg-white resize-y"
              />
            </div>

            <input type="hidden" name={`content.title${idx + 1}`} value={section.title} />
            <input type="hidden" name={`content.p${idx + 1}`} value={section.text} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addSection}
        className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50"
      >
        + Add Section
      </button>
    </>
  );
}

// ── Main form component ─────────────────────────────────────────────────────

const PAGE_LABELS = {
  home: "Home Page",
  artist: "The Artist",
  portfolio: "Portfolio",
  contact: "Contact",
  "wood-care": "Wood Care",
  welcome: "Welcome / Cookie",
};

export default function EditPageForm({ page, content: c, mediaImages, mediaVideos = [] }) {
  const boundAction = updatePageContent.bind(null, page);
  const [state, action, pending] = useActionState(boundAction, undefined);

  return (
    <form action={action} className="space-y-5">
      {page === "home"      && <HomeFields      c={c} mediaImages={mediaImages} mediaVideos={mediaVideos} />}
      {page === "artist"    && <ArtistFields    c={c} mediaImages={mediaImages} />}
      {page === "portfolio" && <PortfolioFields c={c} mediaImages={mediaImages} />}
      {page === "contact"   && <ContactFields   c={c} mediaImages={mediaImages} />}
      {page === "wood-care" && <WoodCareFields c={c} mediaImages={mediaImages} />}
      {page === "welcome"   && <WelcomeFields   c={c} mediaVideos={mediaVideos} />}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <StatusBar state={state} pending={pending} />
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors ml-auto"
        >
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
