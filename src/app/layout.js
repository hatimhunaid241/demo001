import { Playfair_Display, Cormorant_Garamond, Arsenal, Great_Vibes } from "next/font/google";
import "./globals.css";
import ConditionalShell from "@/components/ConditionalShell";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const arsenal = Arsenal({
  variable: "--font-arsenal",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

import { BASE_URL } from "@/config/site";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  
  title: {
    default: "Royal Chess Design | The Art of Strategic Elegance",
    template: "%s | Royal Chess Design",
  },

  description:
    "Royal Chess Design is the atelier of David de Jong — creator of ultra-luxury, bespoke chess sets crafted from 18-karat gold, precious gemstones, rare quartz, and fine materials. Explore five masterwork collections uniting sculpture, strategy, and timeless craftsmanship.",

  keywords: [
    "Royal Chess Design",
    "David de Jong chess",
    "luxury chess sets",
    "bespoke chess sets",
    "handcrafted chess sets",
    "gold chess set",
    "18 karat gold chess",
    "gemstone chess pieces",
    "chess art",
    "chess sculpture",
    "chess collectors",
    "luxury chess collector",
    "fine chess pieces",
    "chess artisan",
    "chess designer",
    "chess portfolio",
    "chess masterpiece",
    "chess gift",
    "exclusive chess set",
    "precious stone chess",
    "rutilated quartz chess",
    "chess investment",
    "limited edition chess",
    "chess craftsmanship",
    "chess design atelier",
    "high end chess",
    "chess as art",
  ],

  authors: [{ name: "David de Jong", url: BASE_URL }],
  creator: "David de Jong",
  publisher: "Royal Chess Design",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Royal Chess Design",
    title: "Royal Chess Design | The Art of Strategic Elegance",
    description:
      "Ultra-luxury bespoke chess sets by David de Jong. Each set is a sculptural masterwork of gold, gemstones, and rare materials — where strategy meets fine art.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Chess Design — Luxury Bespoke Chess Sets by David de Jong",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Royal Chess Design | The Art of Strategic Elegance",
    description:
      "Ultra-luxury bespoke chess sets by David de Jong. Each set is a sculptural masterwork of gold, gemstones, and rare materials.",
    images: ["/og-image.jpg"],
    creator: "@royalchessdesign",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/logo.png",
  },

  category: "art",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b8952a",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "Royal Chess Design",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/logo.png`,
        },
        description:
          "Royal Chess Design is the atelier of David de Jong, creator of ultra-luxury bespoke chess sets crafted from precious metals, gemstones, and rare materials.",
        founder: {
          "@type": "Person",
          name: "David de Jong",
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        url: BASE_URL,
        name: "Royal Chess Design",
        description:
          "Ultra-luxury bespoke chess sets by David de Jong — where strategy meets fine art.",
        publisher: { "@id": `${BASE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/portfolio?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "David de Jong",
        jobTitle: "Chess Designer & Artist",
        worksFor: { "@id": `${BASE_URL}/#organization` },
        url: `${BASE_URL}/the-artist`,
      },
    ],
  };

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${arsenal.variable} ${greatVibes.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
