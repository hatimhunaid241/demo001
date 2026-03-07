import { getSiteContent } from "@/lib/site-content";
import { BASE_URL } from "@/config/site";
import ContactContent from "@/components/site/ContactContent";

export const revalidate = 3600;

export async function generateMetadata() {
  const content = await getSiteContent("contact");
  const img = content["hero.image"];
  return {
    title: "Contact",
    description:
      "Enquire about bespoke commissions, private viewings, or collector collaborations with Royal Chess Design. We welcome every meaningful conversation about the art of chess.",
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
    alternates: { canonical: `${BASE_URL}/contact` },
    openGraph: {
      title: "Contact | Royal Chess Design",
      description:
        "Enquire about bespoke commissions, private viewings, or collector collaborations with Royal Chess Design. We welcome every meaningful conversation about the art of chess.",
      url: `${BASE_URL}/contact`,
      ...(img && { images: [{ url: img, width: 1200, height: 630, alt: "Royal Chess Design \u2014 Contact" }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact | Royal Chess Design",
      description:
        "Enquire about bespoke commissions, private viewings, or collector collaborations with Royal Chess Design. We welcome every meaningful conversation about the art of chess.",
      ...(img && { images: [img] }),
    },
  };
}

export default async function Contact() {
  const content = await getSiteContent("contact");
  return <ContactContent content={content} />;
}
