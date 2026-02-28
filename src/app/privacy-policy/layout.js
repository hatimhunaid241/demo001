import { BASE_URL } from "@/config/site";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Royal Chess Design privacy policy — how we collect, use, and protect your personal information.",
  alternates: { canonical: `${BASE_URL}/privacy-policy` },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyLayout({ children }) {
  return children;
}
