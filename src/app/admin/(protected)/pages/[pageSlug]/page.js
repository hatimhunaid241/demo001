import { notFound } from "next/navigation";
import { getSiteContent } from "@/lib/site-content";
import sql from "@/lib/db";
import EditPageForm from "@/components/admin/pages/EditPageForm";
import Link from "next/link";

const VALID_PAGES = ["home", "artist", "portfolio", "contact", "wood-care", "welcome"];

const PAGE_LABELS = {
  home: "Home Page",
  artist: "The Artist",
  portfolio: "Portfolio",
  contact: "Contact",
  "wood-care": "Wood Care",
  welcome: "Welcome / Cookie",
};

export async function generateMetadata({ params }) {
  const { pageSlug } = await params;
  return { title: `${PAGE_LABELS[pageSlug] ?? pageSlug} — Admin` };
}

export default async function EditPageAdmin({ params }) {
  const { pageSlug } = await params;
  if (!VALID_PAGES.includes(pageSlug)) notFound();

  const [content, mediaImages, mediaVideos] = await Promise.all([
    getSiteContent(pageSlug),
    sql`SELECT id, url, filename FROM "Media" WHERE "mimeType" NOT LIKE 'video/%' ORDER BY "createdAt" DESC`,
    sql`SELECT id, url, filename FROM "Media" WHERE "mimeType" LIKE 'video/%' ORDER BY "createdAt" DESC`,
  ]);

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8 flex items-center gap-3">
        <Link href="/admin/pages" className="text-sm text-gray-400 hover:text-gray-700">← Pages</Link>
        <span className="text-gray-300">/</span>
        <h1 className="text-2xl font-bold text-gray-900">{PAGE_LABELS[pageSlug]}</h1>
      </div>

      <EditPageForm page={pageSlug} content={content} mediaImages={mediaImages} mediaVideos={mediaVideos} />
    </div>
  );
}
