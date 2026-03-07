/**
 * migrate-sitecontent-paths.mjs
 *
 * Finds all SiteContent rows whose value is a local public-folder path
 * (starts with '/') and replaces them with the matching Vercel Blob URL
 * from the Media table (matched on filename = value).
 *
 * Run: node scripts/migrate-sitecontent-paths.mjs
 * Add --dry-run to preview without writing.
 */

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

// Load .env.local
const envFile = readFileSync(".env.local", "utf8");
for (const line of envFile.split("\n")) {
  const eqIdx = line.indexOf("=");
  if (eqIdx === -1) continue;
  const key = line.slice(0, eqIdx).trim();
  const val = line.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
  if (key) process.env[key] = val;
}

const sql = neon(process.env.DATABASE_URL);
const DRY_RUN = process.argv.includes("--dry-run");

if (DRY_RUN) console.log("🔍 DRY RUN — no changes will be written.\n");

// 1. Fetch all SiteContent rows that look like local paths
const localRows = await sql`
  SELECT page, key, value
  FROM "SiteContent"
  WHERE value LIKE '/%'
  ORDER BY page, key
`;

console.log(`Found ${localRows.length} SiteContent row(s) with local paths:\n`);

// 2. Fetch all Media records
const mediaRows = await sql`SELECT url, filename FROM "Media"`;

// Build a lookup: filename → url  (most recently matching wins in case of dupes)
const mediaByFilename = {};
for (const m of mediaRows) {
  mediaByFilename[m.filename] = m.url;
}

let updated = 0;
let skipped = 0;

for (const row of localRows) {
  const blobUrl = mediaByFilename[row.value];

  if (!blobUrl) {
    console.warn(`  ⚠  NO MATCH  [${row.page}] ${row.key} = "${row.value}"`);
    skipped++;
    continue;
  }

  console.log(`  ✓  [${row.page}] ${row.key}`);
  console.log(`     "${row.value}"`);
  console.log(`  →  "${blobUrl}"\n`);

  if (!DRY_RUN) {
    await sql`
      UPDATE "SiteContent"
      SET value = ${blobUrl}, "updatedAt" = NOW()
      WHERE page = ${row.page} AND key = ${row.key}
    `;
  }
  updated++;
}

console.log(`\n${ DRY_RUN ? "[DRY RUN] Would update" : "Updated"} ${updated} row(s).`);
if (skipped > 0) {
  console.log(`Skipped ${skipped} row(s) — no matching file found in Media table.`);
  console.log("These rows still point to local public/ paths and need manual attention.");
}
