import { BASE_URL } from "@/config/site";

export const metadata = {
  title: "The Artist",
  description:
    "Meet David de Jong — the visionary chess designer behind Royal Chess Design. Discover the passion, philosophy, and craftsmanship that transforms chess into fine art through gold, gemstones, and sculptural precision.",
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
  alternates: {
    canonical: `${BASE_URL}/the-artist`,
  },
  openGraph: {
    title: "The Artist | Royal Chess Design",
    description:
      "Meet David de Jong — the visionary chess designer whose atelier transforms gold, gemstones, and rare materials into sculptural masterworks of play.",
    url: `${BASE_URL}/the-artist`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "David de Jong — Chess Designer & Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Artist | Royal Chess Design",
    description:
      "Meet David de Jong — the visionary chess designer whose atelier transforms gold and gemstones into sculptural masterworks.",
    images: ["/og-image.jpg"],
  },
};

export default function TheArtistLayout({ children }) {
  return children;
}
