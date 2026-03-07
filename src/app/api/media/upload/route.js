import { put } from "@vercel/blob";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

/**
 * Normalise an uploaded filename:
 *  - lowercase everything (including extension)
 *  - replace spaces and dashes with underscores
 *  - collapse multiple consecutive underscores into one
 */
function normalizeFilename(raw) {
  if (!raw) return raw;
  const name = raw.includes("/") ? raw.slice(raw.lastIndexOf("/") + 1) : raw;
  return name
    .replace(/[\s\-()\[\]{}]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/_\./g, ".")
    .replace(/^_|_$/g, "")
    .toLowerCase();
}

const ALLOWED_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: `Unsupported file type: ${file.type}` }, { status: 400 });
  }

  const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
  const isVideo = file.type.startsWith("video/");
  const pathname = `${isVideo ? "videos" : "images"}/${randomUUID()}${ext}`;

  const blob = await put(pathname, file.stream(), {
    access: "public",
    contentType: file.type,
  });

  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
    filename: normalizeFilename(file.name),
    mimeType: file.type,
    size: file.size,
  });
}
