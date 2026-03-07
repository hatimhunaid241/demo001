import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = { title: "Admin | Royal Chess Design" };

export default async function AdminLayout({ children }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 font-sans">
      <AdminSidebar email={session.user?.email} />

      {/* Main content scrolls independently; left padding on mobile for hamburger */}
      <div className="flex-1 min-w-0 overflow-y-auto pt-14 lg:pt-0">
        {children}
      </div>
    </div>
  );
}
