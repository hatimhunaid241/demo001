"use client";

import Link from "next/link";
import { FadeInUp, DividerReveal } from "@/components/Animations";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "Welcome to David de Jong - Royal Chess Design (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). By accessing or using our website at royalchessdesign.com (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Use and all applicable laws and regulations.",
      "If you do not agree with these Terms, please do not use the Site.",
    ],
  },
  {
    title: "2. Use of the Website",
    content: [
      "You agree to use this Site only for lawful purposes and in a manner that does not infringe the rights of others or restrict their use of the Site.",
      "You must not:\n\n<ul><li class=\"list-disc ml-5\">Use the Site in any way that violates applicable laws or regulations</li>\n<li class=\"list-disc ml-5\">Attempt to gain unauthorized access to systems or networks</li>\n<li class=\"list-disc ml-5\">Distribute malicious software or harmful code</li>\n<li class=\"list-disc ml-5\">Copy, reproduce, or exploit content without permission</li></ul>",
    ],
  },
  {
    title: "3. Intellectual Property",
    content: [
      "All content on this Site, including but not limited to:\n\n<ul></ul><li class=\"list-disc ml-5\">Original chess set designs</li>\n<li class=\"list-disc ml-5\">Sculptural chess pieces</li>\n<li class=\"list-disc ml-5\">Goldsmith artworks</li>\n<li class=\"list-disc ml-5\">Bespoke and commissioned designs</li>\n<li class=\"list-disc ml-5\">Limited editions and collectible pieces</li>\n<li class=\"list-disc ml-5\">Product concepts and prototypes</li>\n<li class=\"list-disc ml-5\">Text, images, photography, and graphics</li>\n<li class=\"list-disc ml-5\">Logos, branding, and visual identity</li></ul>\n\nis the exclusive intellectual property of David de Jong unless otherwise stated.",
      "These materials are protected by copyright, design rights, trademark law, and other intellectual property regulations. You may not copy, reproduce, distribute, modify, display, or create derivative works without prior written permission.",
      "We reserve all rights to artistic methods, design processes, and signature stylistic elements."
    ],
  },
  {
    title: "4. Products and Services",
    content: [
      "David de Jong creates high-end artistic works that unite goldsmith craftsmanship with sculptural chess design.",
      "Offerings may include:\n\n<ul><li class=\"list-disc ml-5\">One-of-a-kind chess sets</li>\n<li class=\"list-disc ml-5\">Limited-edition collectible sets</li>\n<li class=\"list-disc ml-5\">Custom-made and bespoke commissions</li>\n<li class=\"list-disc ml-5\">Exhibition pieces</li>\n<li class=\"list-disc ml-5\">Artistic gold objects</li></ul>",
      "Because many works are handmade and artistic in nature:\n\n<ul><li class=\"list-disc ml-5\">Natural variations and handcrafted irregularities are part of the artistic character</li>\n<li class=\"list-disc ml-5\">Dimensions, materials, and finishes may vary slightly</li>\n<li class=\"list-disc ml-5\">Availability is limited and subject to material sourcing</li></ul>",
      "All product descriptions, images, and pricing are subject to change without notice. We reserve the right to modify or discontinue works at any time.",
      "We make every effort to display works accurately, but we cannot guarantee that your device's display reflects exact colors, textures, or details.",
    ],
  },
  {
    title: "5. Orders, Commissions, and Payments",
    content: [
      "By placing an order or commissioning a custom piece, you agree that:\n\n<ul><li class=\"list-disc ml-5\">All information provided is accurate and complete</li>\n<li class=\"list-disc ml-5\">You are authorized to use the selected payment method</li>\n<li class=\"list-disc ml-5\">Commission requests may require a signed agreement</li>\n<li class=\"list-disc ml-5\">Custom and bespoke works may require a non-refundable deposit before production begins</li>\n<li class=\"list-disc ml-5\">Production timelines are estimates due to the handcrafted nature of the work</li></ul>",
      "We reserve the right to refuse or cancel orders or commissions at our discretion.",
      "Payments are processed securely via third-party providers.",
    ],
  },
  {
    title: "6. Shipping, Insurance, and Delivery",
    content: [
      "Delivery times are estimates and not guaranteed. We are not responsible for delays caused by carriers, customs procedures, material shortages, or events beyond our control.",
      "High-value works may require:\n\n<ul><li class=\"list-disc ml-5\">Insured shipping</li>\n<li class=\"list-disc ml-5\">Signature upon delivery</li>\n<li class=\"list-disc ml-5\">Specialized art or valuables transport services</li></ul>",
      "Risk of loss transfers to you upon confirmed delivery.",
    ],
  },
  {
    title: "7. Returns, Refunds, and Custom Work Policy",
    content: [
      "Due to the artistic and handcrafted nature of our works:\n\n<ul><li class=\"list-disc ml-5\">Custom-made and bespoke commissions are non-refundable</li>\n<li class=\"list-disc ml-5\">Limited editions may be eligible for return only if unused and in original condition</li>\n<li class=\"list-disc ml-5\">Return requests must be made within the stated return period</li></ul>",
      "We reserve the right to refuse returns that do not meet stated conditions.",
    ],
  },
  {
    title: "8. Disclaimer of Warranties",
    content: [
      "The Site and its content are provided \"as is\" and \"as available\" without warranties of any kind, express or implied.",
      "We do not guarantee that:\n\n<ul><li class=\"list-disc ml-5\">The Site will be uninterrupted or error-free</li>\n<li class=\"list-disc ml-5\">Defects will be corrected</li>\n<li class=\"list-disc ml-5\">The Site is free of viruses or harmful components</li></ul>",
    ],
  },
  {
    title: "9. Limitation of Liability",
    content: [
      "To the fullest extent permitted by law, David de Jong shall not be liable for any indirect, incidental, consequential, or reputational damages arising from:\n\n<ul><li class=\"list-disc ml-5\">Use of the Site</li>\n<li class=\"list-disc ml-5\">Purchase or use of artworks or chess sets</li>\n<li class=\"list-disc ml-5\">Delays in production or delivery</li>\n<li class=\"list-disc ml-5\">Collector valuation changes or market fluctuations</li></ul>",
    ],
  },
  {
    title: "10. User Submissions",
    content: [
      "If you submit feedback, messages, or other content to us, you grant us the right to use, reproduce, and display such content for business purposes.",
      "You must not submit unlawful, offensive, or infringing material.",
    ],
  },
  {
    title: "11. Third-Party Links",
    content: [
      "Our Site may contain links to third-party websites. We are not responsible for their content or practices.",
    ],
  },
  {
    title: "12. Privacy",
    content: [
      "Your use of the Site is also governed by our Privacy Policy.",
    ],
  },
  {
    title: "13. Governing Law",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of [Country], without regard to conflict of law principles.",
    ],
  },
  {
    title: "14. Changes to Terms",
    content: [
      "We reserve the right to modify these Terms at any time. Updated versions will be posted on this page with a revised date.",
    ],
  },
  {
    title: "15. Contact Information",
    content: [
      "For questions regarding these Terms, please contact us:",
      "David de Jong<br/>The Netherlands<br/>Email: <a href=\"mailto:info@royalchessdesign.com\" class=\"text-gold underline\">info@royalchessdesign.com</a>",
    ],
  },
];

export default function TermsOfUseContent() {
  return (
    <>
      {/* ═══════════════ PAGE HEADER ═══════════════ */}
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
            Terms of Use
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
            Last updated: March 23, 2026
          </motion.p>
        </div>
      </section>

      {/* ═══════════════ CONTENT ═══════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6 md:px-8">
          {/* Preamble */}
          <FadeInUp>
            <div className="space-y-4 mb-16 pb-16 border-b border-medium-gray">
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
                These Terms of Use govern the relationship between David de Jong Chess Design and all persons who engage with this website. They are written plainly and with integrity — the same values that inform every commission we undertake.
              </p>
            </div>
          </FadeInUp>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((section, i) => (
              <FadeInUp key={i} delay={0.04 * i}>
                <div>
                  <h2 className="font-(family-name:--font-playfair) text-xl md:text-2xl font-normal tracking-[0.08em] text-charcoal mb-5">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((para, j) => (
                      <p
                        key={j}
                        dangerouslySetInnerHTML={{__html: para}}
                        className={`font-(family-name:--font-cormorant) leading-relaxed text-text-secondary font-light ${
                          para.startsWith("—") ? "pl-4 text-base" : "text-base md:text-[17px]"
                        }`}>
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
