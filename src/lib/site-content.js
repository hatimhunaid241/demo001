import sql from "@/lib/db";

/**
 * Returns all SiteContent rows for a page as a flat key→value object.
 * e.g. { "hero.image": "/heroImages/...", "intro.heading": "..." }
 */
export async function getSiteContent(page) {
  const rows = await sql`SELECT key, value FROM "SiteContent" WHERE page = ${page}`;
  return Object.fromEntries(rows.map((r) => [r.key, r.value ?? ""]));
}
