import { BASE_URL } from "@/config/site";

export const metadata = {
  title: "Cookie Policy",
  description:
    "Royal Chess Design cookie policy — learn how we use cookies and similar technologies on our website to improve your browsing experience.",
  alternates: { canonical: `${BASE_URL}/cookie-policy` },
  robots: { index: false, follow: false },
};

export default function CookiePolicyLayout({ children }) {
  return children;
}
