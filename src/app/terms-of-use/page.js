"use client";

import Link from "next/link";
import { FadeInUp, DividerReveal } from "@/components/Animations";
import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing or using this website (the 'Site'), you agree to be bound by these Terms of Use ('Terms'). If you do not agree to these Terms, you must discontinue use of the Site immediately.",
      "These Terms apply to all visitors, prospective clients, and any other person who accesses or uses the Site, regardless of their country of residence. David de Jong Chess Design reserves the right to modify these Terms at any time. Continued use of the Site following the publication of revised Terms constitutes acceptance of those changes.",
    ],
  },
  {
    title: "2. Intellectual Property",
    content: [
      "All content on this Site — including but not limited to text, images, photographs, graphics, design layouts, logotypes, and the David de Jong Chess Design brand identity — is the exclusive intellectual property of David de Jong Chess Design and is protected by applicable copyright, trademark, and intellectual property laws worldwide.",
      "No content may be reproduced, distributed, transmitted, published, modified, or otherwise exploited, in whole or in part, without the prior written consent of David de Jong Chess Design. Unauthorised use of any content may constitute infringement and may give rise to civil and/or criminal liability.",
      "The names 'David de Jong', 'David de Jong Chess Design', and associated marks are unregistered designations of origin. Any use of these names or marks without authorisation is strictly prohibited.",
    ],
  },
  {
    title: "3. Permitted Use of the Website",
    content: [
      "This Site is made available for informational and commercial enquiry purposes only. You agree to use the Site solely for lawful purposes and in a manner that does not infringe the rights of others or restrict their use and enjoyment of the Site.",
      "You must not:",
      "— Attempt to gain unauthorised access to any part of the Site or its underlying systems.",
      "— Introduce viruses, malware, or any other harmful material to the Site.",
      "— Use the Site to transmit unsolicited communications.",
      "— Impersonate any person or entity, or misrepresent your affiliation with any person or entity.",
      "— Engage in data scraping, harvesting, or any automated extraction of content from the Site.",
    ],
  },
  {
    title: "4. Accuracy of Information",
    content: [
      "While we endeavour to ensure that the content of this Site is accurate and current, we make no representations or warranties — express or implied — regarding the completeness, accuracy, reliability, or suitability of the information presented. All content is provided for general informational purposes and is subject to change without notice.",
      "Photographs and renderings of our chess sets are intended to represent the works faithfully; however, slight variations in colour, material, and finish may exist between digital representation and the finished object. Each piece is individually crafted, and such variations are inherent to the nature of handmade artisanal work.",
    ],
  },
  {
    title: "5. Commissions & Commercial Engagements",
    content: [
      "Enquiries submitted through the Site do not constitute a binding contract or offer of purchase. All commercial engagements — including bespoke commissions, private viewings, and acquisitions — are governed by separate written agreements entered into between David de Jong Chess Design and the client.",
      "Prices, availability, and production timelines discussed in any correspondence are indicative only and are subject to formal confirmation. A commission is considered accepted only upon the execution of a written commission agreement and receipt of any agreed deposit.",
      "As each chess set is designed and crafted to individual specification, all sales are final. Refunds are not offered except in circumstances of a material defect confirmed in writing by David de Jong Chess Design.",
    ],
  },
  {
    title: "6. International Transactions",
    content: [
      "David de Jong Chess Design operates globally and welcomes clients from all countries. All pricing quoted in correspondence is exclusive of applicable taxes, import duties, customs levies, and shipping costs unless expressly stated otherwise. It is the responsibility of the client to ensure compliance with all applicable import regulations in their country of receipt.",
      "Export of certain materials — including precious metals and gemstones — may be subject to regulatory requirements. David de Jong Chess Design will cooperate fully with lawful customs and export formalities but bears no liability for delays or costs arising from regulatory processes in the client's jurisdiction.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    content: [
      "To the fullest extent permitted by applicable law, David de Jong Chess Design shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of, or inability to use, this Site or its content.",
      "David de Jong Chess Design provides this Site and its content 'as is', without warranties of any kind, whether express or implied. We do not warrant that the Site will be available at all times, uninterrupted, or free of error.",
    ],
  },
  {
    title: "8. External Links",
    content: [
      "This Site may contain links to external websites operated by third parties. These links are provided for convenience only. David de Jong Chess Design does not endorse, control, or assume responsibility for the content, privacy practices, or availability of any third-party website. Access to external links is entirely at your own risk.",
    ],
  },
  {
    title: "9. Indemnification",
    content: [
      "You agree to indemnify and hold harmless David de Jong Chess Design, its principals, collaborators, and representatives from and against any claims, liabilities, damages, losses, and expenses — including legal fees — arising out of or in any way connected with your access to or use of the Site, your violation of these Terms, or your infringement of any intellectual property or other rights of any person or entity.",
    ],
  },
  {
    title: "10. Governing Law & Jurisdiction",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the Kingdom of the Netherlands, without regard to conflict of law principles. Any dispute arising out of or in connection with these Terms that cannot be resolved amicably shall be subject to the exclusive jurisdiction of the competent courts of the Netherlands.",
      "Where mandatory consumer protection laws of a client's country of residence confer rights that cannot be excluded by contract, those rights shall remain unaffected by this clause.",
    ],
  },
  {
    title: "11. Dispute Resolution",
    content: [
      "In the event of any dispute, both parties agree to first seek resolution through good-faith negotiation. Should the matter remain unresolved after thirty (30) days of written notice, either party may pursue formal legal remedy in accordance with the governing law provisions above.",
      "For clients based in the European Union, the European Commission's Online Dispute Resolution platform is available at: https://ec.europa.eu/consumers/odr.",
    ],
  },
  {
    title: "12. Changes to These Terms",
    content: [
      "David de Jong Chess Design reserves the right to revise these Terms at any time. The current version will always be available on this page, and we encourage you to review it periodically. Your continued use of the Site after any modification constitutes your acceptance of the revised Terms.",
    ],
  },
  {
    title: "13. Contact",
    content: [
      "For any enquiries relating to these Terms, please contact:",
      "David de Jong Chess Design",
      "Email: royalchessdesign@gmail.com",
    ],
  },
];

export default function TermsOfUse() {
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
              These Terms of Use govern the relationship between David de Jong Chess Design and all persons who engage with this website. They are written plainly and with integrity — the same values that inform every commission we undertake.
            </p>
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
