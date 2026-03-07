"use server";

import { del } from "@vercel/blob";
import sql from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { randomUUID } from "crypto";

// Called by UploadButton after the client-side blob upload completes
export async function saveMedia({ url, pathname, filename, mimeType, size }) {
  const session = await auth();
  if (!session) return { error: "Unauthorized" };

  await sql`
    INSERT INTO "Media" (id, url, pathname, filename, "mimeType", size)
    VALUES (
      ${randomUUID()},
      ${url},
      ${pathname},
      ${filename},
      ${mimeType},
      ${size}
    )
    ON CONFLICT (url) DO NOTHING
  `;

  revalidatePath("/admin/media");
  return { success: true, name: filename };
}

// ── Delete media ──────────────────────────────────────────────────────────────

export async function deleteMedia(id) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const [item] = await sql`SELECT id, url FROM "Media" WHERE id = ${id} LIMIT 1`;
  if (!item) throw new Error("Media item not found.");

  const blobUrl = item.url;

  // Check if this URL is referenced anywhere in the DB
  const [chessSetsRef] = await sql`
    SELECT id FROM "ChessSet"
    WHERE image = ${blobUrl}
       OR "heroImage" = ${blobUrl}
       OR "videoUrls"      @> ${JSON.stringify([blobUrl])}::jsonb
       OR "tableImageUrls" @> ${JSON.stringify([blobUrl])}::jsonb
    LIMIT 1
  `;

  const [piecesRef] = await sql`
    SELECT id FROM "ChessPiece"
    WHERE "imageUrls" @> ${JSON.stringify([blobUrl])}::jsonb
    LIMIT 1
  `;

  if (chessSetsRef || piecesRef) {
    throw new Error(
      "This file is still in use by a chess set or piece. Remove it there first before deleting."
    );
  }

  // Delete from Vercel Blob
  await del(blobUrl, { token: process.env.BLOB_READ_WRITE_TOKEN });

  // Delete from DB
  await sql`DELETE FROM "Media" WHERE id = ${id}`;

  revalidatePath("/admin/media");
}

// ── Cleanup orphaned blobs ────────────────────────────────────────────────────
//
// Lists every file under images/ and videos/ in Vercel Blob, then collects
// every URL that is referenced anywhere in the database.  Files not referenced
// are deleted from both Blob storage and the Media table.
//
// Returns { deleted: string[], kept: number, errors: string[] }

export async function cleanupOrphanedBlobs() {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  // ── 1. Get all Media rows ─────────────────────────────────────────────────
  const mediaRows = await sql`SELECT id, url, pathname FROM "Media"`;
  if (mediaRows.length === 0) return { deleted: [], kept: 0, errors: [] };

  // ── 2. Collect every URL referenced outside the Media table ───────────────
  const referencedUrls = new Set();

  // ChessSet — scalar columns + JSONB array columns
  const chessSets = await sql`
    SELECT image, "heroImage", "videoUrls", "tableImageUrls" FROM "ChessSet"
  `;
  for (const s of chessSets) {
    if (s.image)     referencedUrls.add(s.image);
    if (s.heroImage) referencedUrls.add(s.heroImage);
    if (Array.isArray(s.videoUrls))      s.videoUrls.forEach((u) => referencedUrls.add(u));
    if (Array.isArray(s.tableImageUrls)) s.tableImageUrls.forEach((u) => referencedUrls.add(u));
  }

  // ChessPiece — JSONB array column
  const pieces = await sql`SELECT "imageUrls" FROM "ChessPiece"`;
  for (const p of pieces) {
    if (Array.isArray(p.imageUrls)) p.imageUrls.forEach((u) => referencedUrls.add(u));
  }

  // SiteContent — values that are blob URLs
  const siteRows = await sql`SELECT value FROM "SiteContent" WHERE value LIKE 'https://%'`;
  for (const r of siteRows) referencedUrls.add(r.value);

  // ── 3. Find Media rows not referenced anywhere else ───────────────────────
  const orphans = mediaRows.filter((m) => !referencedUrls.has(m.url));

  if (orphans.length === 0) {
    return { deleted: [], kept: mediaRows.length, errors: [] };
  }

  // ── 4. Delete blob + Media row for each orphan ────────────────────────────
  const deleted = [];
  const errors = [];

  for (const media of orphans) {
    try {
      await del(media.url, { token });
      await sql`DELETE FROM "Media" WHERE id = ${media.id}`;
      deleted.push(media.pathname);
    } catch (err) {
      errors.push(`${media.pathname}: ${err.message}`);
    }
  }

  revalidatePath("/admin/media");
  return { deleted, kept: mediaRows.length - deleted.length, errors };
}
