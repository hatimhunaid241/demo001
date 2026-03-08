import TermsOfUseContent from "@/components/site/TermsOfUseContent";

export const metadata = {
  title: "Terms of Use",
  description:
    "Royal Chess Design terms of use - the conditions governing your use of this website and its content.",
  alternates: { canonical: `/terms-of-use` },
  robots: { index: false, follow: false },
};

export default function TermsOfUsePage() {
  return <TermsOfUseContent />;
}
