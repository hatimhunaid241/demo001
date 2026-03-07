import sql from "@/lib/db";
import SendNewsletterForm from "@/components/admin/newsletter/SendNewsletterForm";

export const metadata = { title: "Newsletter – Admin" };

function fmt(date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

export default async function NewsletterPage() {
  const [chessSets, allSubscribers] = await Promise.all([
    sql`SELECT id, name, slug, image, description FROM "ChessSet" ORDER BY "order", "createdAt"`,
    sql`SELECT id, email, status, "subscribedAt", "createdAt" FROM "Subscriber" ORDER BY "createdAt" DESC`,
  ]);

  const activeSubscribers = allSubscribers.filter((s) => s.status === "active");
  const pendingCount = allSubscribers.filter((s) => s.status === "pending").length;
  const unsubscribedCount = allSubscribers.filter((s) => s.status === "unsubscribed").length;

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Newsletter</h1>
        <div className="flex gap-6 mt-2 text-sm text-gray-500">
          <span><span className="font-medium text-gray-900">{activeSubscribers.length}</span> active</span>
          <span><span className="font-medium text-gray-400">{pendingCount}</span> pending</span>
          <span><span className="font-medium text-gray-400">{unsubscribedCount}</span> unsubscribed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ── Left: Send newsletter ── */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-6">Send Newsletter</h2>
          {activeSubscribers.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No active subscribers yet.</p>
          ) : (
            <SendNewsletterForm
              chessSets={chessSets}
              subscribers={activeSubscribers}
            />
          )}
        </div>

        {/* ── Right: Subscribers table ── */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-6">Subscribers</h2>
          {allSubscribers.length === 0 ? (
            <p className="text-sm text-gray-400 italic">No subscribers yet.</p>
          ) : (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {allSubscribers.map((sub) => (
                    <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-700 truncate max-w-50" title={sub.email}>
                        {sub.email}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                          sub.status === "active"
                            ? "bg-green-50 text-green-700"
                            : sub.status === "pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            sub.status === "active" ? "bg-green-500"
                            : sub.status === "pending" ? "bg-amber-500"
                            : "bg-gray-400"
                          }`} />
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                        {fmt(sub.subscribedAt || sub.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
