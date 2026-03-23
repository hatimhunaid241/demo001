"use client";

import Link from "next/link";
import { FadeInUp, DividerReveal, FadeIn } from "@/components/Animations";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introduction",
    content: [
      "Welcome to David de Jong - Royal Chess Design (\"we\", \"our\", or \"us\"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website: <a class=\"text-gold underline\" href=\"https://royalchessdesign.com\" target=\"_blank\" rel=\"noopener noreferrer\">royalchessdesign.com</a>.",
      "If you do not agree with the terms of this Privacy Policy, please do not access the site.",
    ],
  },
  {
    title: "2. Information We Collect",
    content: [
      "We may collect the following types of information:",
      "<span class=\"font-bold\">Personal Information</span>",
      "Information that identifies you as an individual, such as:\n\n<ul><li class=\"list-disc ml-5\">Full name</li>\n<li class=\"list-disc ml-5\">Email address</li>\n<li class=\"list-disc ml-5\">Phone number</li>\n<li class=\"list-disc ml-5\">Billing and shipping address</li>\n<li class=\"list-disc ml-5\">Payment details (processed securely via third-party providers)</li>\n<li class=\"list-disc ml-5\">Any information you submit through contact forms</li></ul>",
      "<span class=\"font-bold\">Non-Personal Information</span>",
      "Information that does not directly identify you:\n\n<ul><li class=\"list-disc ml-5\">Browser type</li>\n<li class=\"list-disc ml-5\">Device type</li>\n<li class=\"list-disc ml-5\">IP address</li>\n<li class=\"list-disc ml-5\">Pages visited</li>\n<li class=\"list-disc ml-5\">Time and date of visits</li>\n<li class=\"list-disc ml-5\">Referring website</li></ul>",
    ],
  },
  {
    title: "3. How We Use Your Information",
    content: [
      "We use collected information to:\n\n<ul><li class=\"list-disc ml-5\">Provide and maintain our website</li>\n<li class=\"list-disc ml-5\">Process orders and payments</li>\n<li class=\"list-disc ml-5\">Communicate with you</li>\n<li class=\"list-disc ml-5\">Respond to inquiries and customer service requests</li>\n<li class=\"list-disc ml-5\">Send updates, newsletters, or marketing (only if you opt-in)</li>\n<li class=\"list-disc ml-5\">Improve website functionality and user experience</li>\n<li class=\"list-disc ml-5\">Comply with legal obligations</li></ul>",
    ],
  },
  {
    title: "4. Legal Basis for Processing (EU/EEA Users)",
    content: [
      "If you are located in the European Economic Area, we process your data under the following legal bases:\n\n<ul><li class=\"list-disc ml-5\">Your consent</li>\n<li class=\"list-disc ml-5\">Performance of a contract</li>\n<li class=\"list-disc ml-5\">Compliance with legal obligations</li>\n<li class=\"list-disc ml-5\">Legitimate business interests</li></ul>",
    ],
  },
  {
    title: "5. Cookies and Tracking Technologies",
    content: [
      "We use cookies and similar technologies to enhance your browsing experience.",
      "You can choose to disable cookies through your browser settings. Note that some features of the site may not function properly without cookies.",
      "Types of cookies we may use:\n\n<ul><li class=\"list-disc ml-5\">Essential cookies (site functionality)</li>\n<li class=\"list-disc ml-5\">Analytics cookies (site performance and usage)</li>\n<li class=\"list-disc ml-5\">Marketing cookies (advertising and promotions)</li></ul>",
    ],
  },
  {
    title: "6. Sharing Your Information",
    content: [
      "We do not sell your personal information.",
      "We may share information with:\n\n<ul><li class=\"list-disc ml-5\">Payment processors</li>\n<li class=\"list-disc ml-5\">Shipping partners</li>\n<li class=\"list-disc ml-5\">Website hosting providers</li>\n<li class=\"list-disc ml-5\">Analytics services</li>\n<li class=\"list-disc ml-5\">Legal authorities when required by law</li></ul>",
      "All third parties are required to protect your data.",
    ],
  },
  {
    title: "7. Data Retention",
    content: [
      "We retain your personal information only as long as necessary to:\n\n<ul><li class=\"list-disc ml-5\">Provide services</li>\n<li class=\"list-disc ml-5\">Comply with legal obligations</li>\n<li class=\"list-disc ml-5\">Resolve disputes</li>\n<li class=\"list-disc ml-5\">Enforce agreements</li></ul>",
    ],
  },
  {
    title: "8. Data Security",
    content: [
      "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.",
      "However, no internet transmission is completely secure.",
    ],
  },
  {
    title: "9. Your Privacy Rights",
    content: [
      "Depending on your location, you may have the right to:\n\n<ul><li class=\"list-disc ml-5\">Access your personal data</li>\n<li class=\"list-disc ml-5\">Correct inaccurate data</li>\n<li class=\"list-disc ml-5\">Request deletion of your data</li>\n<li class=\"list-disc ml-5\">Restrict or object to processing</li>\n<li class=\"list-disc ml-5\">Data portability</li>\n<li class=\"list-disc ml-5\">Withdraw consent</li></ul>",
      "To exercise your rights, contact us at: <a href=\"mailto:info@royalchessdesign.com\" class=\"text-gold underline\">info@royalchessdesign.com</a>",
    ],
  },
  {
    title: "10. Third-Party Links",
    content: [
      "Our website may contain links to external websites. We are not responsible for the privacy practices of those sites.",
    ],
  },
  {
    title: "11. Children's Privacy",
    content: [
      "Our website is not intended for individuals under the age of 16. We do not knowingly collect personal data from children.",
    ],
  },
  {
    title: "12. Changes to This Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date.",
    ],
  },
  {
    title: "13. Contact Information",
    content: [
      "If you have questions about this Privacy Policy, you may contact us:",
      "David de Jong<br/>The Netherlands<br/>Email: <a href=\"mailto:info@royalchessdesign.com\" class=\"text-gold underline\">info@royalchessdesign.com</a>",
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
            Last updated: March 23, 2026
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
                        dangerouslySetInnerHTML={{ __html: para }}
                        className={`font-(family-name:--font-cormorant) leading-relaxed text-text-secondary font-light ${
                          para.startsWith("—") ? "pl-4 text-base" : "text-base md:text-[17px]"
                        }`}
                      />
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
