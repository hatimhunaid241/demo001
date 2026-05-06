"use server";

import sql from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

function requireAuth(session) {
  if (!session) throw new Error("Unauthorized");
}

const VALID_PAGES = ["home", "artist", "portfolio", "contact", "wood-care", "welcome"];

export async function updatePageContent(page, prevState, formData) {
  const session = await auth();
  requireAuth(session);

  if (!VALID_PAGES.includes(page)) return { error: "Invalid page." };

  if (page === "wood-care") {
    await sql`
      DELETE FROM "SiteContent"
      WHERE page = ${page}
      AND (
        key LIKE 'content.title%'
        OR key LIKE 'content.p%'
        OR key LIKE 'title%'
        OR key LIKE 'p%'
      )
    `;
  }

  const entries = [...formData.entries()].filter(([k]) => k !== "_page");

  for (const [key, value] of entries) {
    await sql`
      INSERT INTO "SiteContent" (page, key, value)
      VALUES (${page}, ${key}, ${value})
      ON CONFLICT (page, key) DO UPDATE SET value = EXCLUDED.value, "updatedAt" = NOW()
    `;
  }

  revalidatePath(`/admin/pages/${page}`);
  // Revalidate the corresponding public page
  revalidatePath(page === "home" ? "/" : page === "artist" ? "/the-artist" : `/${page}`);

  return { success: true, ts: Date.now() };
}
