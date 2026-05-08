"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInUp, FadeIn, DividerReveal } from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";
import Image from "next/image";

// Helper: Parse bold markers (**text**)
function parseBold(text) {
  const parts = [];
  let lastIndex = 0;
  const regex = /\*\*([^*]+)\*\*/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={`bold-${match.index}`} className="font-semibold not-italic">
        {match[1]}
      </strong>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Helper: Detect and render lists or paragraphs
function renderContent(text) {
  console.log(text);
  const paragraphs = text.split(/\r?\n\r?\n/);
  console.log(paragraphs);
  return paragraphs.map((para, pIdx) => {
    const lines = para.split(/\r?\n/).filter(Boolean);

    // Detect if this is an unordered list
    const isUnorderedList = lines.some((line) => line.trim().startsWith("- "));

    // Detect if this is an ordered list
    const isOrderedList = lines.some((line) => /^\s*\d+\.\s/.test(line.trim()));

    if (isUnorderedList) {
      return (
        <FadeInUp key={pIdx} delay={0.1 + pIdx * 0.08}>
          <ul className="list-disc ml-6 space-y-2 text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
            {lines
              .filter((line) => line.trim().startsWith("- "))
              .map((line, idx) => (
                <li key={idx} className="font-(family-name:--font-cormorant)">
                  {parseBold(line.replace(/^\s*-\s/, ""))}
                </li>
              ))}
          </ul>
        </FadeInUp>
      );
    }

    if (isOrderedList) {
      return (
        <FadeInUp key={pIdx} delay={0.1 + pIdx * 0.08}>
          <ol className="list-decimal ml-6 space-y-2 text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
            {lines
              .filter((line) => /^\s*\d+\.\s/.test(line.trim()))
              .map((line, idx) => (
                <li key={idx} className="font-(family-name:--font-cormorant)">
                  {parseBold(line.replace(/^\s*\d+\.\s/, ""))}
                </li>
              ))}
          </ol>
        </FadeInUp>
      );
    }

    // Regular paragraph with line breaks
    return (
      <FadeInUp key={pIdx} delay={0.1 + pIdx * 0.08}>
        <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
          {lines.map((line, lineIdx, arr) => (
            <span key={lineIdx}>
              {parseBold(line)}
              {lineIdx < arr.length - 1 && <br />}
            </span>
          ))}
        </p>
      </FadeInUp>
    );
  });
}

export default function WoodCareContent({ content: c }) {
  // Normalize content: support either
  // - `c["content"]` as an array of {title, text}
  // - flat keys `title1`, `p1`, `title2`, `p2`, ...
  function normalizedSections() {
    if (!c) return [];
    if (Array.isArray(c["content"])) return c["content"];

    // Support flat keys like: title1 / p1 OR content.title1 / content.p1
    const titleEntries = [];
    Object.keys(c).forEach((k) => {
      // match content.title1 or content_title1 or title1
      const m = k.match(/(?:content[._])?title(\d+)$/i) || k.match(/^title(\d+)$/i);
      if (m) {
        titleEntries.push({ n: Number(m[1]), key: k, value: c[k] });
      }
    });

    if (titleEntries.length === 0) return [];

    titleEntries.sort((a, b) => a.n - b.n);

    return titleEntries.map(({ n, value }) => {
      // possible text key variants
      const textKeyPatterns = [
        `p${n}`,
        `text${n}`,
        `content${n}`,
        `content.p${n}`,
        `content.text${n}`,
        `content_p${n}`,
      ];
      let text = "";
      for (const pattern of textKeyPatterns) {
        if (pattern in c && typeof c[pattern] === "string") {
          text = c[pattern];
          break;
        }
      }
      return { title: value, text };
    });
  }

  const sections = normalizedSections();
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <HeroSection
        src={c["hero.image"]}
        alt="David de Jong — luxury chess designer and artist, founder of Royal Chess Design atelier"
        overlayClass="bg-gradient-to-b from-white/60 via-white/90 to-white/60"
        height="h-[70vh] md:h-[75vh]"
        showScrollIndicator>
        <div className="text-center px-6 max-w-8xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] md:text-[13px] tracking-[0.5em] text-gold uppercase block mb-6">
            Maintenance Guide
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.4, ease: [0.25, 0.46, 0.65, 0.94] }}
            className="font-(family-name:--font-playfair) text-4xl md:text-6xl lg:text-7xl font-normal tracking-[0.15em] text-charcoal mb-6">
            {c["hero.name"]}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light tracking-[0.08em] text-text-secondary max-w-lg mx-auto">
            {c["hero.subtitle"]}
          </motion.p>
        </div>
      </HeroSection>

      {/* ═══════════════ CONTENT SECTIONS ═══════════════ */}
      <section className="bg-warm-gray overflow-hidden">
        <div className="max-w-350 mx-auto">
          <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">
            {sections.length > 0 &&
              sections.map((section, idx) => (
                <div key={idx} className="mb-16">
                  {section.title && (
                    <FadeInUp delay={idx * 0.05}>
                      <h2 className="font-(family-name:--font-playfair) text-2xl md:text-3xl font-normal tracking-[0.06em] text-charcoal mb-6">
                        {section.title}
                      </h2>
                    </FadeInUp>
                  )}
                  {section.text && renderContent(section.text)}
                </div>
              ))}

            {/* CTA */}
            <FadeInUp delay={0.76} className="mt-16">
              <DividerReveal className="mb-12" />
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <Link href="/portfolio" className="btn-luxury">
                  VIEW COLLECTION
                </Link>
                <Link href="/contact" className="btn-luxury">
                  BEGIN A CONVERSATION
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  );
}
