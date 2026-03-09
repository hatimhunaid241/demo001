import sql from "@/lib/db";
import { BASE_URL } from "@/config/site";

export default async function sitemap() {
  const now = new Date();

  const staticRoutes = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/the-artist`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const sets = await sql`SELECT slug, "updatedAt" FROM "ChessSet" WHERE published = true ORDER BY "order"`;
  const dynamicRoutes = sets.map((set) => ({
    url: `${BASE_URL}/portfolio/${set.slug}`,
    lastModified: set.updatedAt ? new Date(set.updatedAt) : now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
