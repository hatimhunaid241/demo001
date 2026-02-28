import { BASE_URL } from "@/config/site";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/portfolio", "/the-artist", "/contact"],
        disallow: [
          "/welcome",
          "/maintenance",
          "/cookie-policy",
          "/privacy-policy",
          "/terms-of-use",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
