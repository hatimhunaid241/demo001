import { getSiteContent } from "@/lib/site-content";
import { BASE_URL } from "@/config/site";
import ArtistContent from "@/components/site/ArtistContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const content = await getSiteContent("artist");
  const img = content["hero.image"];
  return {
    title: "David de Jong \u2013 The Artist",
    description:
      "Meet David de Jong, goldsmith and chess designer born in Bucaramanga, Colombia. Discover the story behind the sculptor who unites precious metals and the ancient game of chess into timeless works of art.",
    keywords: [
      "David de Jong",
      "chess designer",
      "chess artist",
      "luxury chess maker",
      "chess craftsman",
      "bespoke chess creator",
      "fine art chess",
      "chess artisan biography",
      "chess sculptor",
      "chess designer portfolio",
    ],
    alternates: { canonical: `${BASE_URL}/the-artist` },
    openGraph: {
      title: "David de Jong \u2013 The Artist | Royal Chess Design",
      description:
        "Meet David de Jong, goldsmith and chess designer born in Bucaramanga, Colombia. Discover the story behind the sculptor who unites precious metals and the ancient game of chess into timeless works of art.",
      url: `${BASE_URL}/the-artist`,
      ...(img && { images: [{ url: img, width: 1200, height: 630, alt: "David de Jong \u2014 Goldsmith & Chess Designer" }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: "David de Jong \u2013 The Artist | Royal Chess Design",
      description:
        "Meet David de Jong, goldsmith and chess designer born in Bucaramanga, Colombia. Discover the story behind the sculptor who unites precious metals and the ancient game of chess into timeless works of art.",
      ...(img && { images: [img] }),
    },
  };
}

export default async function TheArtist() {
  const content = await getSiteContent("artist");
  return <ArtistContent content={content} />;
}
