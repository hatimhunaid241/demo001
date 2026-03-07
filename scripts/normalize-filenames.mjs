/**
 * normalize-filenames.mjs
 *
 * Normalises the `filename` column in the Media table:
 *   - chessSets paths  → keep full path, strip leading slash, replace / - space → _, collapse runs, lowercase
 *   - everything else  → keep only the part after the last slash,
 *                        replace - and space → _, collapse runs, lowercase
 *
 * Run:  node scripts/normalize-filenames.mjs          (live)
 *       node scripts/normalize-filenames.mjs --dry-run (preview only)
 */

import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

const envFile = readFileSync(".env.local", "utf8");
for (const line of envFile.split("\n")) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const sql = neon(process.env.DATABASE_URL);
const DRY_RUN = process.argv.includes("--dry-run");

if (DRY_RUN) console.log("🔍 DRY RUN — no changes will be written.\n");

function normalizeFilename(raw) {
  if (!raw) return raw;

  if (raw.startsWith("/chessSets/") || raw.startsWith("chessSets/")) {
    return raw
      .replace(/^\//, "")
      .replace(/[\s/\-()\[\]{}]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/_\./g, ".")
      .toLowerCase();
  }

  const name = raw.includes("/") ? raw.slice(raw.lastIndexOf("/") + 1) : raw;
  return name
    .replace(/[\s\-()\[\]{}]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/_\./g, ".")
    .replace(/^_|_$/g, "")
    .toLowerCase();
}

const rows = await sql`SELECT id, filename FROM "Media" ORDER BY "createdAt"`;

let changed = 0;
let unchanged = 0;

for (const row of rows) {
  const newName = normalizeFilename(row.filename);

  if (newName === row.filename) {
    unchanged++;
    continue;
  }

  console.log(`  [${row.id.slice(0, 8)}…]`);
  console.log(`    "${row.filename}"`);
  console.log(`  → "${newName}"\n`);

  if (!DRY_RUN) {
    await sql`UPDATE "Media" SET filename = ${newName} WHERE id = ${row.id}`;
  }
  changed++;
}

console.log(`${DRY_RUN ? "[DRY RUN] Would update" : "Updated"} ${changed} row(s).`);
console.log(`${unchanged} row(s) already normalised — no change needed.`);
