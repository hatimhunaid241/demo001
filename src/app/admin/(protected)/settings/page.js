import { getSiteStatus } from "@/actions/admin/siteStatus";
import { SiteStatusToggle } from "@/components/admin/SiteStatusToggle";

export const metadata = { title: "Settings — Admin" };

export default async function SettingsPage() {
  const enabled = await getSiteStatus();

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage site-wide configuration.</p>
      </div>

      <SiteStatusToggle initialEnabled={enabled} />
    </div>
  );
}
