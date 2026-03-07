import Link from "next/link";

const PAGES = [
  {
    slug: "home",
    label: "Home Page",
    description: "Hero image, intro text, philosophy section, enquiries text",
    icon: "🏠",
  },
  {
    slug: "artist",
    label: "The Artist",
    description: "Artist bio, portrait images, signature, motto",
    icon: "🎨",
  },
  {
    slug: "portfolio",
    label: "Portfolio",
    description: "Hero image and introductory text (chess sets managed separately)",
    icon: "📐",
  },
  {
    slug: "contact",
    label: "Contact",
    description: "Hero image, intro text, contact details, social links",
    icon: "✉️",
  },
  {
    slug: "welcome",
    label: "Welcome / Cookie",
    description: "Background video and cookie-consent banner text",
    icon: "🍪",
  },
];

export const metadata = { title: "Pages — Admin" };

export default function PagesAdmin() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
        <p className="text-sm text-gray-500 mt-1">
          Edit the text and images displayed on each public-facing page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
        {PAGES.map(({ slug, label, description, icon }) => (
          <Link
            key={slug}
            href={`/admin/pages/${slug}`}
            className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-sm transition-all group"
          >
            <span className="text-2xl mt-0.5">{icon}</span>
            <div>
              <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {label}
              </p>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
            </div>
            <span className="ml-auto text-gray-300 group-hover:text-indigo-400 text-lg mt-0.5">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
