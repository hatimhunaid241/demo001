import { neon } from "@neondatabase/serverless";
import { readFileSync } from "fs";

const env = readFileSync(".env.local", "utf8");
for (const line of env.split("\n")) {
  const [k, ...rest] = line.split("=");
  if (k && rest.length) process.env[k.trim()] = rest.join("=").trim();
}

const sql = neon(process.env.DATABASE_URL);

const rows = [
  {
    page: "welcome",
    key: "video.url",
    value:
      "https://exyrxjlxax0fnljb.public.blob.vercel-storage.com/videos/2114f7b6-3758-445a-90c6-c7d01dd61578.mp4",
  },
  {
    page: "welcome",
    key: "cookie.text",
    value:
      "This website uses cookies to improve user experience. By using our website you consent to all cookies in accordance with our Cookie Policy.",
  },
  {
    page: "welcome",
    key: "cookie.policyUrl",
    value: "/cookie-policy",
  },
];

for (const r of rows) {
  await sql`
    INSERT INTO "SiteContent" (page, key, value, "updatedAt")
    VALUES (${r.page}, ${r.key}, ${r.value}, NOW())
    ON CONFLICT (page, key) DO UPDATE SET value = EXCLUDED.value, "updatedAt" = NOW()
  `;
  console.log("upserted", r.page, r.key);
}

console.log("done");
