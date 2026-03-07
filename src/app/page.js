import { getSiteContent } from "@/lib/site-content";
import sql from "@/lib/db";
import HomeContent from "@/components/site/HomeContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const content = await getSiteContent("home");
  const img = content["hero.image"];
  return {
    title: "The Art of Strategic Elegance",
    description:
      "Royal Chess Design is the atelier of David de Jong \u2014 creator of ultra-luxury bespoke chess sets crafted from 18-karat gold, precious gemstones, and rare materials. Where strategy becomes art.",
    openGraph: {
      title: "The Art of Strategic Elegance | Royal Chess Design",
      description:
        "Royal Chess Design is the atelier of David de Jong \u2014 creator of ultra-luxury bespoke chess sets crafted from 18-karat gold, precious gemstones, and rare materials. Where strategy becomes art.",
      ...(img && { images: [{ url: img, width: 1200, height: 630, alt: "Royal Chess Design" }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: "The Art of Strategic Elegance | Royal Chess Design",
      description:
        "Royal Chess Design is the atelier of David de Jong \u2014 creator of ultra-luxury bespoke chess sets crafted from 18-karat gold, precious gemstones, and rare materials. Where strategy becomes art.",
      ...(img && { images: [img] }),
    },
  };
}

export default async function Home() {
  const [content, featuredSets] = await Promise.all([
    getSiteContent("home"),
    sql`
      SELECT id, name, "shortDescription", category, image, slug
      FROM "ChessSet"
      WHERE published = true
      ORDER BY "order", "createdAt"
      LIMIT 3
    `,
  ]);

  return <HomeContent content={content} featuredSets={featuredSets} />;
}
