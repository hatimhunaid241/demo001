import sql from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EditChessSetForm } from "@/components/admin/chess-sets/EditChessSetForm";

export const metadata = { title: "Edit Chess Set – Admin" };

export default async function EditChessSetPage({ params }) {
  const { id } = await params;

  const [set] = await sql`SELECT * FROM "ChessSet" WHERE id = ${id} LIMIT 1`;
  if (!set) notFound();

  const pieces = await sql`
    SELECT * FROM "ChessPiece"
    WHERE "chessSetId" = ${id}
    ORDER BY "order"
  `;

  // Images for the media picker (no videos)
  const mediaImages = await sql`
    SELECT id, url, filename
    FROM "Media"
    WHERE "mimeType" NOT LIKE 'video/%'
    ORDER BY "createdAt" DESC
    LIMIT 300
  `;

  // Videos for the video picker
  const mediaVideos = await sql`
    SELECT id, url, filename
    FROM "Media"
    WHERE "mimeType" LIKE 'video/%'
    ORDER BY "createdAt" DESC
  `;

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/chess-sets" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">
          ← Chess Sets
        </Link>

        <div className="flex items-start justify-between mt-2">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{set.name}</h1>
            <p className="text-gray-400 text-sm mt-0.5">{set.slug}</p>
          </div>
          <span
            className={`mt-1 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
              set.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
            }`}
          >
            {set.published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      <EditChessSetForm set={set} pieces={pieces} mediaImages={mediaImages} mediaVideos={mediaVideos} />
    </div>
  );
}
