import PrivacyPolicyContent from "@/components/site/PrivacyPolicyContent";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Royal Chess Design privacy policy - how we collect, use, and protect your personal information.",
  alternates: { canonical: `/privacy-policy` },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
