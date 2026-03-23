"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeInUp } from "@/components/Animations";

const BackBar = dynamic(() => Promise.resolve(BackBarInner), { ssr: false });

function BackBarInner() {
  const router = useRouter();
  const hasConsent = document.cookie.split("; ").some((row) => row.startsWith("cookie_consent="));

  if (hasConsent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-medium-gray">
      <div className="max-w-3xl mx-auto px-6 h-12 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase hover:text-gold transition-colors duration-200 flex items-center gap-3">
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

const LAST_UPDATED = "March 23, 2026";

const sections = [
  {
    title: "1. What Are Cookies?",
    body: 'Cookies are small text files placed on your device when you visit a website. They help websites function properly, improve user experience, and provide information to site owners.\n\nCookies may be:\n<ul><li class="list-disc ml-5"><span class="font-bold">Session cookies:</span> deleted when you close your browser</li>\n<li class="list-disc ml-5"><span class="font-bold">Persistent cookies:</span> stored on your device until they expire or are deleted</li></ul>',
  },
  {
    title: "2. Why We Use Cookies",
    body: 'We use cookies to:\n<ul><li class="list-disc ml-5">Ensure the website functions correctly</li>\n<li class="list-disc ml-5">Remember your preferences and settings</li>\n<li class="list-disc ml-5">Improve website performance and usability</li>\n<li class="list-disc ml-5">Understand how visitors interact with our content</li>\n<li class="list-disc ml-5">Support secure checkout and inquiry processes</li></ul>',
  },
  {
    title: "3. Types of Cookies We Use",
    items: [
      {
        label: "Essential Cookies",
        description:
          'These cookies are necessary for the website to function and cannot be switched off. They include functions such as:\n<ul><li class="list-disc ml-5">Page navigation</li>\n<li class="list-disc ml-5">Security and fraud prevention</li>\n<li class="list-disc ml-5">Form submissions</li>\n<li class="list-disc ml-5">Session management</li></ul>',
      },
      {
        label: "Performance and Analytics Cookies",
        description:
          'These cookies help us understand how visitors interact with the website by collecting anonymous information such as:\n<ul><li class="list-disc ml-5">Pages visited</li>\n<li class="list-disc ml-5">Time spent on pages</li>\n<li class="list-disc ml-5">Traffic sources</li>\n<li class="list-disc ml-5">Site performance metrics</li></ul>',
      },
      {
        label: "Functional Cookies",
        description:
          'These cookies remember choices you make, such as:\n<ul><li class="list-disc ml-5">Language preferences</li>\n<li class="list-disc ml-5">Region selection</li>\n<li class="list-disc ml-5">Display settings</li></ul>',
      },
      {
        label: "Marketing Cookies",
        description:
          'These cookies may be used to:\n<ul><li class="list-disc ml-5">Deliver relevant advertisements</li>\n<li class="list-disc ml-5">Measure advertising effectiveness</li>\n<li class="list-disc ml-5">Limit how often you see an ad</li></ul>\nMarketing cookies are only used with your consent.',
      },
    ],
  },
  {
    title: "4. Third-Party Cookies",
    body: 'Some cookies may be placed by third-party services that appear on our pages, such as:\n<ul><li class="list-disc ml-5">Website analytics providers</li>\n<li class="list-disc ml-5">Secure payment processors</li>\n<li class="list-disc ml-5">Embedded media services</li>\n<li class="list-disc ml-5">Social media platforms</li></ul>\nThese third parties may collect data in accordance with their own privacy policies.',
  },
  {
    title: "5. Legal Basis (EU/EEA Visitors)",
    body: 'If you are located in the European Union or European Economic Area:\n<ul><li class="list-disc ml-5">Essential cookies are used under legitimate interest</li>\n<li class="list-disc ml-5">All non-essential cookies are used only with your explicit consent</li></ul>\nYou can withdraw or modify your consent at any time.',
  },
  {
    title: "6. How to Control Cookies",
    body: 'You can control or delete cookies through:\n\n<span class="font-bold">Cookie Consent Banner</span>\n\nWhen you first visit the site, you can accept or reject non-essential cookies.\n\n<span class="font-bold">Browser Settings</span>\n\nMost web browsers allow you to:<ul><li class="list-disc ml-5">View stored cookies</li>\n<li class="list-disc ml-5">Delete cookies</li>\n<li class="list-disc ml-5">Block cookies</li>\n<li class="list-disc ml-5">Receive alerts before cookies are stored</li></ul>\n\nDisabling cookies may affect site functionality.',
  },
  {
    title: "7. Data Retention",
    body: 'Cookies remain on your device for varying periods depending on their purpose:\n<ul><li class="list-disc ml-5">Session cookies expire when you close your browser</li>\n<li class="list-disc ml-5">Persistent cookies remain until expiration or deletion</li></ul>',
  },
  {
    title: "8. Updates to This Policy",
    body: "We may update this Cookie Policy from time to time. Updates will be posted on this page with a revised date.",
  },
  {
    title: "9. Contact",
    body: 'If you have questions about our use of cookies, please contact:\n\nDavid de Jong<br/>The Netherlands<br/>Email: <a href="mailto:info@royalchessdesign.com" class="text-gold underline">info@royalchessdesign.com</a>',
  },
];

export default function CookiePolicyContent() {
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
            className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
            LEGAL
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-playfair) text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.12em] text-charcoal mb-8">
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
            className="font-(family-name:--font-cormorant) text-base tracking-[0.15em] text-text-muted">
            Last updated: {LAST_UPDATED}
          </motion.p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Intro */}
          <FadeInUp>
            <div className="space-y-4 mb-16 pb-16 border-b border-medium-gray">
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
                This Cookie Policy explains how David de Jong (&ldquo;we&rdquo;, &ldquo;our&rdquo;,
                or &ldquo;us&rdquo;) uses cookies and similar technologies on our website:
                royalchessdesign.com.
              </p>
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
                It explains what these technologies are, why we use them, and your rights to control
                their use.
              </p>
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
                This policy should be read together with our Privacy Policy.
              </p>
            </div>
          </FadeInUp>

          {/* Sections */}
          <div className="space-y-14 mb-14">
            {sections.map((section, i) => (
              <FadeInUp key={section.title} delay={0.05 * i}>
                <div>
                  <h2 className="font-(family-name:--font-playfair) text-xl md:text-2xl font-normal tracking-[0.08em] text-charcoal mb-5">
                    {section.title}
                  </h2>

                  {section.body && (
                    <div className="space-y-4">
                      {section.body.split(/\r?\n\r?\n/).map((para, j) => (
                        <p
                          dangerouslySetInnerHTML={{ __html: para }}
                          key={j}
                          className="font-(family-name:--font-cormorant) text-base md:text-[17px] leading-relaxed text-text-secondary font-light">
                          {/* {para} */}
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
                          <p
                            dangerouslySetInnerHTML={{ __html: item.description }}
                            className="font-(family-name:--font-cormorant) text-base md:text-[17px] leading-relaxed text-text-secondary font-light"></p>
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
              10. Cookie Details
            </h2>
            <div className="border border-medium-gray overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-warm-gray border-b border-medium-gray">
                    {["Name", "Purpose", "Duration", "Type"].map((h) => (
                      <th
                        key={h}
                        className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.35em] text-text-muted uppercase px-5 py-3">
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
                      1 day
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
