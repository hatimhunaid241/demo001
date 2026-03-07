import sql from "@/lib/db";
import { auth } from "@/auth";
import { CreateUserForm } from "@/components/admin/users/CreateUserForm";
import { DeleteUserButton } from "@/components/admin/users/DeleteUserButton";

export const metadata = { title: "Users – Admin" };

export default async function UsersPage() {
  const session = await auth();

  const users = await sql`
    SELECT id, email, name, "createdAt"
    FROM "User"
    ORDER BY "createdAt"
  `;

  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Admin Users</h1>

      {/* User list */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="px-6 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => {
              const isSelf = session?.user?.id === user.id;
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name || "—"}
                    {isSelf && (
                      <span className="ml-2 text-xs bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">You</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {!isSelf && <DeleteUserButton id={user.id} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Create user form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-5">Add User</h2>
        <CreateUserForm />
      </div>
    </div>
  );
}
