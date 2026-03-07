import sql from "@/lib/db";
import { BASE_URL } from "@/config/site";
import { notFound } from "next/navigation";
import SlugContent from "@/components/site/SlugContent";

export async function generateStaticParams() {
  const sets = await sql`SELECT slug FROM "ChessSet" WHERE published = true`;
  return sets.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [set] = await sql`
    SELECT name, "shortDescription", materials, category, image, "heroImage"
    FROM "ChessSet" WHERE slug = ${slug} LIMIT 1
  `;
  if (!set) return {};

  return {
    title: set.name,
    description: `${set.shortDescription} Materials: ${set.materials}. A limited-edition creation by chess designer and artist David de Jong.`,
    keywords: [
      set.name,
      set.category,
      "luxury chess set",
      "bespoke chess",
      "David de Jong",
      "chess art",
      "chess sculpture",
      "collectible chess",
      "fine chess piece",
      ...(set.materials ? set.materials.split(",").map((m) => m.trim()) : []),
    ],
    alternates: {
      canonical: `${BASE_URL}/portfolio/${slug}`,
    },
    openGraph: {
      title: `${set.name} | Royal Chess Design`,
      description: set.shortDescription,
      url: `${BASE_URL}/portfolio/${slug}`,
      type: "article",
      images: [
        {
          url: set.heroImage || set.image,
          width: 1200,
          height: 630,
          alt: `${set.name} — Royal Chess Design`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${set.name} | Royal Chess Design`,
      description: set.shortDescription,
      images: [set.heroImage || set.image],
    },
  };
}

export default async function ChessSetPage({ params }) {
  const { slug } = await params;

  const [set] = await sql`
    SELECT * FROM "ChessSet" WHERE slug = ${slug} AND published = true LIMIT 1
  `;
  if (!set) notFound();

  const [pieces, allSets] = await Promise.all([
    sql`SELECT * FROM "ChessPiece" WHERE "chessSetId" = ${set.id} ORDER BY "order"`,
    sql`SELECT id, slug, name FROM "ChessSet" WHERE published = true ORDER BY "order", "createdAt"`,
  ]);

  const currentIndex = allSets.findIndex((s) => s.id === set.id);
  const prevSet = currentIndex > 0 ? allSets[currentIndex - 1] : null;
  const nextSet = currentIndex < allSets.length - 1 ? allSets[currentIndex + 1] : null;

  return <SlugContent set={set} pieces={pieces} prevSet={prevSet} nextSet={nextSet} />;
}
