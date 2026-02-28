import { BASE_URL } from "@/config/site";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Royal Chess Design atelier. Commission a bespoke chess set, inquire about an existing collection, or discuss a private acquisition. David de Jong welcomes collectors and chess enthusiasts worldwide.",
  keywords: [
    "contact Royal Chess Design",
    "commission chess set",
    "bespoke chess inquiry",
    "buy luxury chess set",
    "chess set commission",
    "David de Jong contact",
    "chess atelier inquiry",
    "chess collector contact",
    "luxury chess purchase",
  ],
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Royal Chess Design",
    description:
      "Commission a bespoke chess set or inquire about the collection. Royal Chess Design atelier welcomes collectors worldwide.",
    url: `${BASE_URL}/contact`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Royal Chess Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Royal Chess Design",
    description:
      "Commission a bespoke chess set or inquire about the collection.",
    images: ["/og-image.jpg"],
  },
};

export default function ContactLayout({ children }) {
  return children;
}
