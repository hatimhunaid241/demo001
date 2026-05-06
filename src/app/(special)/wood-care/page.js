import { BASE_URL } from "@/config/site";
import WoodCareContent from "@/components/site/WoodCareContent";

export const revalidate = 3600;

export async function generateMetadata() {
  return {
    title: "Wood Care & Maintenance | Royal Chess Design",
    description:
      "Learn how to care for and maintain your luxury chess set. Expert guidance on wood care, varnish protection, and preserving your masterpiece.",
    keywords: [
      "wood care",
      "chess set maintenance",
      "wood maintenance",
      "furniture care",
      "varnish care",
      "luxury furniture maintenance",
    ],
    alternates: { canonical: `${BASE_URL}/wood-care` },
    openGraph: {
      title: "Wood Care & Maintenance | Royal Chess Design",
      description:
        "Learn how to care for and maintain your luxury chess set. Expert guidance on wood care, varnish protection, and preserving your masterpiece.",
      url: `${BASE_URL}/wood-care`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Wood Care & Maintenance | Royal Chess Design",
      description:
        "Learn how to care for and maintain your luxury chess set. Expert guidance on wood care, varnish protection, and preserving your masterpiece.",
    },
  };
}

export default async function WoodCarePage() {
  // Test content structure: array of { title, text } objects
  const content = {
    "hero.image": "/Wood page.jpg",
    "hero.name": "Wood Care & Maintenance",
    "hero.subtitle": "Expert Guidance for Preserving Your Luxury Chess Set",
    "content.title1": "Maintenance",
    "content.p1": `All materials used in our furniture are carefully selected and applied in their purest form. Our pieces are crafted from sustainably sourced tropical hardwood, finished with a premium protective varnish. As wood is a natural material, each piece will develop character over time. Variations in grain, texture, and color between individual wood components are natural and part of the unique beauty of each piece.`,
    "content.title2": "Wood",
    "content.p2": `Wood is an organic material that naturally responds to its environment. Light, temperature, and humidity all influence the appearance and condition of your furniture over time.\r\n\r\nPlease note that exposure to direct sunlight may gradually alter the color and tone of the wood. This natural aging process is part of the material's inherent beauty.\r\n\r\nAvoid exposing your furniture to extreme temperature fluctuations, as these may cause the wood to expand and contract, potentially resulting in hairline or drying cracks over time.\r\n\r\nFor optimal preservation, we recommend maintaining:\r\n- Room temperature between **16°C and 24°C**\r\n- Humidity levels between **40% and 60%**\r\n\r\nWhere possible, avoid placing furniture directly next to radiators, fireplaces, underfloor heating outlets, or other heat sources.`,
    "content.title3": "Varnish",
    "content.p3": `Your furniture is finished with a premium protective varnish. Although dry upon delivery, the varnish requires approximately **two months** to reach maximum hardness.\r\n\r\nDuring this period, we recommend handling your furniture with extra care and avoiding heavy or sharp objects that may damage the surface.`,
    "content.title4": "Care Instructions",
    "content.p4": `- Clean the furniture only with a soft damp cloth.\r\n- Do not use abrasive products, polishes, or chemical cleaning agents.\r\n- Avoid placing hot objects directly on the surface.\r\n- Remove spilled liquids immediately to prevent staining or damage.\r\n- In the case of acidic liquids such as coffee, wine, or alcohol, wipe the surface immediately with a soft damp cloth and dry thoroughly.`,
  };

  return <WoodCareContent content={content} />;
}
