import sql from "@/lib/db";
import ChessSetsTable from "@/components/admin/chess-sets/ChessSetsTable";

export const metadata = { title: "Chess Sets – Admin" };

export default async function ChessSetsPage() {
  const sets = await sql`
    SELECT id, slug, name, category, year, published, "order"
    FROM "ChessSet"
    ORDER BY "order", "createdAt"
  `;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Chess Sets</h1>
      </div>
      <ChessSetsTable initialSets={sets} />
    </div>
  );
}
