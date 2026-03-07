"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeInUp, FadeIn, DividerReveal } from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";
import Image from "next/image";

export default function ArtistContent({ content: c }) {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <HeroSection
        src={c["hero.image"]}
        alt="David de Jong — luxury chess designer and artist, founder of Royal Chess Design atelier"
        overlayClass="bg-gradient-to-b from-white/60 via-white/90 to-white/60"
        height="h-[70vh] md:h-[75vh]"
        showScrollIndicator>
        <div className="text-center px-6 max-w-4xl mx-auto">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[13px] md:text-[15px] tracking-[0.5em] text-gold uppercase block mb-6">
              THE ARTIST
            </span>
          </FadeInUp>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.4, ease: [0.25, 0.46, 0.65, 0.94] }}>
            <h1 className="font-(family-name:--font-playfair) text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.08em] text-charcoal mb-6">
              {c["hero.name"]}
            </h1>
          </motion.div>
          <FadeInUp delay={2}>
            <div className="h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          </FadeInUp>
          <FadeInUp delay={2.2}>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light tracking-wide text-text-primary max-w-xl mx-auto">
              {c["hero.subtitle"]}
            </p>
          </FadeInUp>
        </div>
      </HeroSection>

      {/* ═══════════════ ABOUT CONTENT ═══════════════ */}
      <section className="bg-warm-gray overflow-hidden">
        <div className="max-w-350 mx-auto">
          <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">

            <div className="space-y-6">
              {/* Regular paragraphs p1–p3 */}
              {[c["bio.p1"], c["bio.p2"], c["bio.p3"]].filter(Boolean).map((text, i) => (
                <FadeInUp key={i} delay={0.1 + i * 0.05}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    {text}
                  </p>
                </FadeInUp>
              ))}

              {/* Italic quote 1 */}
              {c["bio.quote1"] && (
                <FadeInUp delay={0.25}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-[1.6] text-gold/90 italic font-light">
                    {c["bio.quote1"]}
                  </p>
                </FadeInUp>
              )}

              {/* p4–p7 */}
              {[c["bio.p4"], c["bio.p5"], c["bio.p6"], c["bio.p7"]].filter(Boolean).map((text, i) => (
                <FadeInUp key={`p4-${i}`} delay={0.3 + i * 0.03}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    {text}
                  </p>
                </FadeInUp>
              ))}

              {/* Italic quote 2 */}
              {c["bio.quote2"] && (
                <FadeInUp delay={0.36}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-[1.6] text-gold/80 italic font-light">
                    {c["bio.quote2"].split("\n").map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                </FadeInUp>
              )}

              {/* p8–p11 */}
              {[c["bio.p8"], c["bio.p9"], c["bio.p10"], c["bio.p11"]].filter(Boolean).map((text, i) => (
                <FadeInUp key={`p8-${i}`} delay={0.4 + i * 0.03}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    {text}
                  </p>
                </FadeInUp>
              ))}
            </div>

            {/* Motto */}
            {c["motto.text"] && (
              <FadeInUp delay={0.53} className="mt-14">
                <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.45em] text-text-muted uppercase block mb-5">
                  MY MOTTO
                </span>
                <div className="pl-6 border-l border-gold">
                  <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-charcoal italic font-light">
                    &ldquo;{c["motto.text"]}&rdquo;
                  </p>
                </div>
              </FadeInUp>
            )}

            {/* Signature */}
            <FadeInUp delay={0.6} className="mt-5">
              {c["signature.image"] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c["signature.image"]} alt="David de Jong" width={200} height={80} className="" />
              )}
            </FadeInUp>

            {/* Portrait */}
            {c["portrait.image"] && (
              <FadeInUp delay={0.68} className="mt-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c["portrait.image"]}
                  alt="David de Jong — chess designer and artist behind Royal Chess Design"
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </FadeInUp>
            )}

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
