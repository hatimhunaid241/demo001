import { BASE_URL } from "@/config/site";

export const metadata = {
  title: "Portfolio",
  description:
    "Explore the Royal Chess Design collection — five ultra-luxury chess sets crafted from 18-karat gold, precious gemstones, rare quartz, silver, and fine materials. Each set is a limited-edition sculptural masterwork by David de Jong.",
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
  alternates: {
    canonical: `${BASE_URL}/portfolio`,
  },
  openGraph: {
    title: "Portfolio | Royal Chess Design",
    description:
      "Five ultra-luxury chess sets crafted from 18-karat gold, gemstones, and rare materials. Each a sculptural masterwork by David de Jong.",
    url: `${BASE_URL}/portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Chess Design Portfolio — Luxury Bespoke Chess Sets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Royal Chess Design",
    description:
      "Five ultra-luxury chess sets crafted from 18-karat gold, gemstones, and rare materials.",
    images: ["/og-image.jpg"],
  },
};

export default function PortfolioLayout({ children }) {
  return children;
}
