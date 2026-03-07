import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

// Load .env.local manually
const envFile = readFileSync(".env.local", "utf8");
for (const line of envFile.split("\n")) {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
}

const sql = neon(process.env.DATABASE_URL);

const rows = await sql`
  SELECT page, key, value
  FROM "SiteContent"
  WHERE value LIKE '/%'
     OR (value NOT LIKE 'http%' AND value != '' AND length(value) > 0)
  ORDER BY page, key
`;

console.log("=== SiteContent rows with local/relative paths ===");
console.log(JSON.stringify(rows, null, 2));

const media = await sql`SELECT id, url, filename, pathname FROM "Media" ORDER BY "createdAt" DESC`;
console.log("\n=== Media table ===");
console.log(JSON.stringify(media, null, 2));
