import { getSiteContent } from "@/lib/site-content";
import { BASE_URL } from "@/config/site";
import sql from "@/lib/db";
import PortfolioContent from "@/components/site/PortfolioContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const content = await getSiteContent("portfolio");
  const img = content["hero.image"];
  return {
    title: "The Collection \u2013 Bespoke Chess Sets",
    description:
      "Explore five bespoke chess set collections by Royal Chess Design \u2014 each a distinct sculptural vision crafted from gold, silver, crystal, and precious gemstones. From regal opulence to cosmic wonder.",
    keywords: [
      "luxury chess collection",
      "bespoke chess portfolio",
      "gold chess sets collection",
      "chess art portfolio",
      "David de Jong chess collection",
      "limited edition chess",
      "chess sculpture collection",
      "fine chess pieces",
      "chess investor",
      "precious stone chess sets",
    ],
    alternates: { canonical: `${BASE_URL}/portfolio` },
    openGraph: {
      title: "The Collection \u2013 Bespoke Chess Sets | Royal Chess Design",
      description:
        "Explore five bespoke chess set collections by Royal Chess Design \u2014 each a distinct sculptural vision crafted from gold, silver, crystal, and precious gemstones. From regal opulence to cosmic wonder.",
      url: `${BASE_URL}/portfolio`,
      ...(img && { images: [{ url: img, width: 1200, height: 630, alt: "Royal Chess Design Collection" }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: "The Collection \u2013 Bespoke Chess Sets | Royal Chess Design",
      description:
        "Explore five bespoke chess set collections by Royal Chess Design \u2014 each a distinct sculptural vision crafted from gold, silver, crystal, and precious gemstones. From regal opulence to cosmic wonder.",
      ...(img && { images: [img] }),
    },
  };
}

export default async function Portfolio() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${BASE_URL}/portfolio` },
    ],
  };

  const [content, chessSets] = await Promise.all([
    getSiteContent("portfolio"),
    sql`
      SELECT id, slug, name, subtitle, description, category, materials, year, image, "heroImage"
      FROM "ChessSet"
      WHERE published = true
      ORDER BY "order", "createdAt"
    `,
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortfolioContent content={content} chessSets={chessSets} />
    </>
  );
}
