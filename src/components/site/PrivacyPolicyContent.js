"use client";

import Link from "next/link";
import { FadeInUp, DividerReveal, FadeIn } from "@/components/Animations";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introduction",
    content: [
      "David de Jong Chess Design ('we', 'us', or 'our') is committed to protecting the personal information of all who visit this website and engage with our services. This Privacy Policy explains what information we collect, how we use it, and the rights you hold in relation to it.",
      "This Policy applies to all visitors, clients, and prospective clients of our website, regardless of the country from which they access it. By using this website, you acknowledge that you have read and understood the terms set out below.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "We collect personal information in the following circumstances:",
      "Contact Enquiries: When you submit a message through our contact form, we collect your name, email address, and the content of your message. This information is provided voluntarily and is necessary to respond to your enquiry.",
      "Correspondence: Should you communicate with us directly by email or telephone, we may retain records of that correspondence, including any personal information provided within.",
      "Technical Data: Our website may automatically collect certain non-personal technical information, including your IP address, browser type, operating system, referring URLs, and pages visited. This data is collected in aggregate and is not linked to personally identifiable information.",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "The information we collect is used exclusively for the following purposes:",
      "— To respond to your enquiries, requests, or correspondence in a timely and professional manner.",
      "— To communicate information regarding our collections, private viewings, or bespoke commissions, where you have expressed interest.",
      "— To improve the functionality and user experience of our website.",
      "— To comply with applicable legal obligations.",
      "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
    ],
  },
  {
    title: "4. Cookies & Tracking Technologies",
    content: [
      "Our website may use cookies — small text files placed on your device — to enhance your browsing experience. Cookies allow us to recognise returning visitors and understand how the website is used.",
      "You may configure your browser to decline cookies at any time. Please note that disabling cookies may affect certain features of the website.",
      "We do not use third-party advertising cookies or track your activity across external websites.",
    ],
  },
  {
    title: "5. Third-Party Services",
    content: [
      "This website may contain links to external platforms and third-party services. We are not responsible for the privacy practices or content of such external sites. We encourage you to review the privacy policies of any third-party services you access.",
      "Where we use third-party tools to support website functionality (such as hosting or analytics providers), those providers are engaged under strict confidentiality terms and are not permitted to use your data for any purpose beyond the provision of those services.",
    ],
  },
  {
    title: "6. International Data Transfers",
    content: [
      "As a design atelier operating globally, your personal information may be processed in countries outside of your own. We take appropriate measures to ensure that such transfers comply with applicable data protection laws and that your information remains protected to the standard described in this Policy.",
      "Where required by law — including compliance with the General Data Protection Regulation (EU/UK GDPR) — we implement appropriate safeguards, including standard contractual clauses, to govern international data transfers.",
    ],
  },
  {
    title: "7. Data Retention",
    content: [
      "We retain personal information only for as long as is necessary to fulfil the purpose for which it was collected, or as required by law. Enquiry data is generally retained for a period of two years unless a client relationship is established, in which case records may be retained for the duration of that relationship and thereafter as required by applicable legal or contractual obligations.",
    ],
  },
  {
    title: "8. Your Rights",
    content: [
      "Depending on your country of residence, you may hold certain rights in relation to your personal information. These may include:",
      "— The right to access the personal data we hold about you.",
      "— The right to request correction of inaccurate data.",
      "— The right to request the deletion of your personal data.",
      "— The right to restrict or object to our processing of your data.",
      "— The right to data portability.",
      "— The right to withdraw consent where processing is based on consent.",
      "To exercise any of these rights, please contact us at the address below. We will respond within the timeframes required by applicable law.",
    ],
  },
  {
    title: "9. Security",
    content: [
      "We implement industry-standard security measures to protect your personal information against unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is entirely secure. While we endeavour to protect your information, we cannot guarantee its absolute security.",
    ],
  },
  {
    title: "10. Children's Privacy",
    content: [
      "This website is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from children. If you believe that we have inadvertently collected information from a person under the age of 16, please contact us immediately and we will take prompt steps to remove such information.",
    ],
  },
  {
    title: "11. Changes to This Policy",
    content: [
      "We reserve the right to update this Privacy Policy at any time. Any changes will be reflected on this page with a revised effective date. We encourage you to review this Policy periodically to remain informed of how we protect your information.",
    ],
  },
  {
    title: "12. Contact",
    content: [
      "For all enquiries relating to this Privacy Policy, your personal data, or to exercise your rights, please contact us at:",
      "David de Jong Chess Design",
      "Email: info@royalchessdesign.com",
    ],
  },
];

export default function PrivacyPolicyContent() {
  return (
    <>
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
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
            Privacy Policy
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
            Last updated: February 2026
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ CONTENT ═══════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8">

          {/* Preamble */}
          <FadeInUp>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mb-16 pb-16 border-b border-medium-gray">
              At David de Jong Chess Design, the confidence of our clients and visitors is the foundation upon which all lasting relationships are built. This document sets out, with full transparency, how we steward the personal information entrusted to us.
            </p>
          </FadeInUp>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((section, i) => (
              <FadeInUp key={i} delay={0.05 * i}>
                <div>
                  <h2 className="font-(family-name:--font-playfair) text-xl md:text-2xl font-normal tracking-[0.08em] text-charcoal mb-5">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((para, j) => (
                      <p
                        key={j}
                        className={`font-(family-name:--font-cormorant) leading-relaxed text-text-secondary font-light ${
                          para.startsWith("—") ? "pl-4 text-base" : "text-base md:text-[17px]"
                        }`}
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>

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
