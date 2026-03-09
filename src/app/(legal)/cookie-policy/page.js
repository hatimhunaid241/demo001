import CookiePolicyContent from "@/components/site/CookiePolicyContent";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Royal Chess Design cookie policy - learn how we use cookies and similar technologies on our website to improve your browsing experience.",
  alternates: { canonical: `/cookie-policy` },
};

export default function CookiePolicyPage() {
  return <CookiePolicyContent />;
}
