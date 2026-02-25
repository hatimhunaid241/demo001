"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/Animations";

const BackBar = dynamic(() => Promise.resolve(BackBarInner), { ssr: false });

function BackBarInner() {
  const router = useRouter();
  const hasConsent = document.cookie
    .split("; ")
    .some((row) => row.startsWith("cookie_consent="));

  if (hasConsent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-medium-gray"
    >
      <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase hover:text-gold transition-colors duration-200 flex items-center gap-3"
        >
          <span className="text-base leading-none">←</span>
          BACK
        </button>
        <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase">
          Cookie Policy
        </span>
        <div className="w-16" />
      </div>
    </motion.div>
  );
}

const LAST_UPDATED = "February 26, 2026";

const sections = [
  {
    title: "What Are Cookies?",
    body: "Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, to enhance user experience, and to provide information to the website owner. Cookies do not contain personally identifiable information.",
  },
  {
    title: "How We Use Cookies",
    body: "This website uses cookies solely to improve your browsing experience. We do not use cookies for advertising, tracking across third-party websites, or any purpose beyond the functional operation of this website. Specifically, we store your cookie consent preference so that you are not prompted again on future visits.",
  },
  {
    title: "Types of Cookies We Use",
    items: [
      {
        label: "Strictly Necessary Cookies",
        description:
          "These cookies are essential for the website to function properly. They include your cookie consent preference (cookie_consent), which is stored for 12 months. The website cannot function correctly without these cookies.",
      },
      {
        label: "No Analytics or Marketing Cookies",
        description:
          "We do not use analytics cookies, advertising cookies, or any third-party tracking technologies on this website.",
      },
    ],
  },
  {
    title: "Your Consent",
    body: "When you first visit our website, you are asked to accept or reject the use of cookies. Your choice is saved in a cookie (cookie_consent) for 12 months. If you choose to reject cookies, only the consent cookie itself is stored — no other cookies are placed on your device.\n\nYou may change your preference at any time by clearing your browser cookies and revisiting the website.",
  },
  {
    title: "Managing Cookies",
    body: "You can control and delete cookies through your browser settings. Most browsers allow you to refuse or delete cookies. Please note that disabling cookies may affect the functionality of some websites. For more information on how to manage cookies in your browser, visit your browser's help documentation.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may contain links to third-party websites. These websites have their own privacy and cookie policies, which we have no control over and accept no responsibility for. We encourage you to review the cookie policies of any third-party sites you visit.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.",
  },
  {
    title: "Contact Us",
    body: "If you have any questions about our use of cookies, please contact us through the enquiry form on our Contact page.",
  },
];

export default function CookiePolicy() {
  return (
    <>
      <BackBar />

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 bg-warm-gray text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8"
          >
            LEGAL
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-playfair) text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.12em] text-charcoal mb-8"
          >
            Cookie Policy
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="font-(family-name:--font-cormorant) text-base tracking-[0.15em] text-text-muted"
          >
            Last updated: {LAST_UPDATED}
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8">

          {/* Intro */}
          <FadeInUp>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mb-16 pb-16 border-b border-medium-gray">
              This Cookie Policy explains what cookies are, how David de Jong — Chess Designer
              (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) uses cookies on this
              website, and the choices available to you regarding cookies. By continuing to use this
              website, you agree to our use of cookies in accordance with this policy.
            </p>
          </FadeInUp>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((section, i) => (
              <FadeInUp key={section.title} delay={0.05 * i}>
                <div>
                  <h2 className="font-(family-name:--font-playfair) text-xl md:text-2xl font-normal tracking-[0.08em] text-charcoal mb-5">
                    {section.title}
                  </h2>

                  {section.body && (
                    <div className="space-y-4">
                      {section.body.split("\n\n").map((para, j) => (
                        <p
                          key={j}
                          className="font-(family-name:--font-cormorant) text-base md:text-[17px] leading-relaxed text-text-secondary font-light"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.items && (
                    <div className="space-y-6">
                      {section.items.map((item) => (
                        <div key={item.label} className="pl-5 border-l-2 border-gold/40">
                          <p className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-gold uppercase mb-2">
                            {item.label}
                          </p>
                          <p className="font-(family-name:--font-cormorant) text-base md:text-[17px] leading-relaxed text-text-secondary font-light">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FadeInUp>
            ))}
          </div>

          {/* Cookie table */}
          <FadeInUp delay={0.4} className="mt-4">
            <h2 className="font-(family-name:--font-playfair) text-xl md:text-2xl font-normal tracking-[0.08em] text-charcoal mb-5">
              Cookie Details
            </h2>
            <div className="border border-medium-gray overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-warm-gray border-b border-medium-gray">
                    {["Name", "Purpose", "Duration", "Type"].map((h) => (
                      <th
                        key={h}
                        className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.35em] text-text-muted uppercase px-5 py-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-(family-name:--font-cormorant) text-sm text-charcoal px-5 py-4 border-b border-medium-gray align-top">
                      cookie_consent
                    </td>
                    <td className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light px-5 py-4 border-b border-medium-gray align-top">
                      Stores your cookie consent preference (accepted / rejected)
                    </td>
                    <td className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light px-5 py-4 border-b border-medium-gray align-top whitespace-nowrap">
                      12 months
                    </td>
                    <td className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light px-5 py-4 border-b border-medium-gray align-top">
                      Strictly Necessary
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FadeInUp>

          {/* Back to home */}
          <FadeInUp delay={0.3} className="mt-24 pt-12 border-t border-medium-gray text-center">
            <Link href="/" className="btn-luxury">
              RETURN TO ATELIER
            </Link>
          </FadeInUp>

        </div>
      </section>
    </>
  );
}
