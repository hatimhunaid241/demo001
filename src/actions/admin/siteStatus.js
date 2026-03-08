"use server";

import { auth } from "@/auth";
import { createClient } from "@vercel/edge-config";

function requireAuth(session) {
  if (!session) throw new Error("Unauthorized");
}

export async function getSiteStatus() {
  const session = await auth();
  requireAuth(session);

  const enabled = await createClient(process.env.EDGE_CONFIG).get("siteEnabled");
  return enabled !== false;
}

export async function setSiteStatus(enabled) {
  const session = await auth();
  requireAuth(session);

  const configId = process.env.VERCEL_EDGE_CONFIG_ID;
  const token = process.env.VERCEL_API_TOKEN;
  const teamId = process.env.VERCEL_TEAM_ID;

  const url = new URL(`https://api.vercel.com/v1/edge-config/${configId}/items`);
  if (teamId) url.searchParams.set("teamId", teamId);

  const res = await fetch(url.toString(), {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [{ operation: "update", key: "siteEnabled", value: enabled }],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Vercel API error: ${text}`);
  }

  return { success: true };
}
