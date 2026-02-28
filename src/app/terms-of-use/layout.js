import { BASE_URL } from "@/config/site";

export const metadata = {
  title: "Terms of Use",
  description:
    "Royal Chess Design terms of use — the conditions governing your use of this website and its content.",
  alternates: { canonical: `${BASE_URL}/terms-of-use` },
  robots: { index: false, follow: false },
};

export default function TermsOfUseLayout({ children }) {
  return children;
}
