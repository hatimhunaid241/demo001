import sql from "@/lib/db";
import { UploadButton } from "@/components/admin/media/UploadButton";
import MediaGrid from "@/components/admin/media/MediaGrid";
import { CleanupButton } from "@/components/admin/media/CleanupButton";

export const metadata = { title: "Media Library – Admin" };

const STORAGE_LIMIT_MB = 512;

function StorageBar({ usedBytes }) {
  const usedMB = usedBytes / (1024 * 1024);
  const pct = Math.min((usedMB / STORAGE_LIMIT_MB) * 100, 100);
  const color =
    pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-400" : "bg-indigo-500";

  function fmt(mb) {
    return mb >= 1024
      ? `${(mb / 1024).toFixed(2)} GB`
      : `${mb.toFixed(1)} MB`;
  }

  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{fmt(usedMB)} used</span>
        <span>{fmt(STORAGE_LIMIT_MB)} limit</span>
      </div>
      <div className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-400 mt-0.5 text-right">{pct.toFixed(1)}% of storage used</p>
    </div>
  );
}

export default async function MediaPage() {
  const items = await sql`
    SELECT id, url, pathname, filename, "mimeType", size, "createdAt"
    FROM "Media"
    ORDER BY "createdAt" DESC
  `;

  const totalBytes = items.reduce((sum, item) => sum + (item.size || 0), 0);

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Media Library</h1>
          <p className="text-gray-400 text-sm mt-0.5">{items.length} files</p>
        </div>
        <div className="flex items-center gap-3">
          <CleanupButton />
          <UploadButton />
        </div>
      </div>

      <div className="mb-6">
        <StorageBar usedBytes={totalBytes} />
      </div>

      <MediaGrid items={items} />
    </div>
  );
}
