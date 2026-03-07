"use server";

import sql from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

function requireAuth(session) {
  if (!session) throw new Error("Unauthorized");
}

// ── Chess Set: reorder (drag-to-reorder) ─────────────────────────────────────

export async function reorderChessSets(orderedIds) {
  const session = await auth();
  requireAuth(session);

  // Build a CASE…END statement to update all rows in one query
  await Promise.all(
    orderedIds.map((id, index) =>
      sql`UPDATE "ChessSet" SET "order" = ${index}, "updatedAt" = now() WHERE id = ${id}`
    )
  );

  revalidatePath("/admin/chess-sets");
  revalidatePath("/portfolio");
}

// ── Chess Set: toggle published ───────────────────────────────────────────────

export async function togglePublished(formData) {
  const session = await auth();
  requireAuth(session);

  const id        = formData.get("id");
  const published = formData.get("published") === "true";

  await sql`UPDATE "ChessSet" SET published = ${published}, "updatedAt" = now() WHERE id = ${id}`;

  revalidatePath("/admin/chess-sets");
  revalidatePath("/portfolio");
}

// ── Chess Set: update basic info + overview content ───────────────────────────

export async function updateGeneral(prevState, formData) {
  const session = await auth();
  requireAuth(session);

  const id                  = formData.get("id");
  const name                = formData.get("name");
  const subtitle            = formData.get("subtitle");
  const shortDescription    = formData.get("shortDescription");
  const description         = formData.get("description");
  const category            = formData.get("category");
  const year                = formData.get("year");
  const materials           = formData.get("materials");
  const published           = formData.get("published") === "on";
  const setNumber           = formData.get("setNumber");
  const overview            = formData.get("overview");
  const overviewQuoteText   = formData.get("overviewQuoteText");
  const overviewQuoteAuthor = formData.get("overviewQuoteAuthor");
  const orderRaw            = formData.get("order");
  const order               = orderRaw !== null && orderRaw !== "" ? parseInt(orderRaw, 10) : 0;

  if (!name?.trim()) return { error: "Name is required." };

  await sql`
    UPDATE "ChessSet" SET
      name                = ${name.trim()},
      subtitle            = ${subtitle || ""},
      "shortDescription"  = ${shortDescription || ""},
      description         = ${description || ""},
      category            = ${category || ""},
      year                = ${year || ""},
      materials           = ${materials || ""},
      published           = ${published},
      "setNumber"         = ${setNumber || ""},
      overview            = ${overview || ""},
      "overviewQuoteText"   = ${overviewQuoteText || ""},
      "overviewQuoteAuthor" = ${overviewQuoteAuthor || ""},
      "order"             = ${isNaN(order) ? 0 : order},
      "updatedAt"         = now()
    WHERE id = ${id}
  `;

  revalidatePath(`/admin/chess-sets/${id}`);
  revalidatePath("/admin/chess-sets");
  revalidatePath(`/portfolio/${await getSlug(id)}`);

  return { success: true, ts: Date.now() };
}

// ── Chess Set: update media (image, heroImage, videos) ────────────────────────

export async function updateMedia(prevState, formData) {
  const session = await auth();
  requireAuth(session);

  const id        = formData.get("id");
  const image     = formData.get("image") || null;
  const heroImage = formData.get("heroImage") || null;

  const videoUrlsRaw = formData.get("videoUrls") || "";
  const videoUrls    = videoUrlsRaw.split("\n").map((s) => s.trim()).filter(Boolean);

  await sql`
    UPDATE "ChessSet" SET
      image       = ${image},
      "heroImage" = ${heroImage},
      "videoUrls" = ${JSON.stringify(videoUrls)}::jsonb,
      "updatedAt" = now()
    WHERE id = ${id}
  `;

  revalidatePath(`/admin/chess-sets/${id}`);
  revalidatePath(`/portfolio/${await getSlug(id)}`);

  return { success: true, ts: Date.now() };
}

// ── Chess Set: update table section ──────────────────────────────────────────

export async function updateTable(prevState, formData) {
  const session = await auth();
  requireAuth(session);

  const id               = formData.get("id");
  const tableDescription = formData.get("tableDescription") || "";
  const tableQuoteText   = formData.get("tableQuoteText") || "";
  const tableQuoteAuthor = formData.get("tableQuoteAuthor") || "";

  const tableImageUrlsRaw = formData.get("tableImageUrls") || "";
  const tableImageUrls    = tableImageUrlsRaw.split("\n").map((s) => s.trim()).filter(Boolean);

  let tableSpecs = [];
  try {
    const raw = (formData.get("tableSpecs") || "").trim();
    if (raw) tableSpecs = JSON.parse(raw);
    if (!Array.isArray(tableSpecs)) tableSpecs = [];
  } catch {
    tableSpecs = [];
  }

  await sql`
    UPDATE "ChessSet" SET
      "tableDescription" = ${tableDescription},
      "tableQuoteText"   = ${tableQuoteText},
      "tableQuoteAuthor" = ${tableQuoteAuthor},
      "tableImageUrls"   = ${JSON.stringify(tableImageUrls)}::jsonb,
      "tableSpecs"       = ${JSON.stringify(tableSpecs)}::jsonb,
      "updatedAt"        = now()
    WHERE id = ${id}
  `;

  revalidatePath(`/admin/chess-sets/${id}`);
  revalidatePath(`/portfolio/${await getSlug(id)}`);

  return { success: true, ts: Date.now() };
}

// ── Chess Piece: update ───────────────────────────────────────────────────────

export async function updatePiece(pieceId, prevState, formData) {
  const session = await auth();
  requireAuth(session);

  const name        = formData.get("name");
  const height      = formData.get("height") || "";
  const description = formData.get("description") || "";
  const quoteText   = formData.get("quoteText") || "";
  const quoteAuthor = formData.get("quoteAuthor") || "";
  const chessSetId  = formData.get("chessSetId");

  const imageUrlsRaw = formData.get("imageUrls") || "";
  const imageUrls    = imageUrlsRaw.split("\n").map((s) => s.trim()).filter(Boolean);

  if (!name?.trim()) return { error: "Piece name is required." };

  await sql`
    UPDATE "ChessPiece" SET
      name        = ${name.trim()},
      height      = ${height},
      description = ${description},
      "quoteText"   = ${quoteText},
      "quoteAuthor" = ${quoteAuthor},
      "imageUrls"   = ${JSON.stringify(imageUrls)}::jsonb,
      "updatedAt"   = now()
    WHERE id = ${pieceId}
  `;

  revalidatePath(`/admin/chess-sets/${chessSetId}`);
  revalidatePath(`/portfolio/${await getSlug(chessSetId)}`);

  return { success: true, ts: Date.now() };
}

// ── helper ────────────────────────────────────────────────────────────────────

async function getSlug(id) {
  const [row] = await sql`SELECT slug FROM "ChessSet" WHERE id = ${id} LIMIT 1`;
  return row?.slug ?? id;
}
