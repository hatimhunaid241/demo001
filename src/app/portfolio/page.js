"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FadeInUp,
  FadeIn,
  DividerReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";
import { chessSets } from "@/data/chessSets";

export default function Portfolio() {
  return (
    <>
      {/* ═══════════════ HERO BANNER ═══════════════ */}
      <HeroSection
        src="/heroImages/portfolio.jpg"
        // src="/portfolio.jpg"
        alt="Chess collection"
        overlayClass="bg-gradient-to-b from-white/70 via-white/80 to-white/50"
        height="h-[65vh] md:h-[75vh]"
      >
        <div className="text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] md:text-[13px] tracking-[0.5em] text-gold uppercase block mb-6"
          >
            Chess Artists Portfolio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-playfair) text-4xl md:text-6xl lg:text-7xl font-normal tracking-[0.15em] text-charcoal mb-6"
          >
            OUR COLLECTION
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
            className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light tracking-[0.08em] text-text-secondary max-w-xl mx-auto"
          >
            Each set is a crafted expression of identity, intention, and elegance.
          </motion.p>
        </div>
      </HeroSection>

      {/* ═══════════════ COLLECTION INTRO ═══════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInUp>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
              Five bespoke chess sets, each born from a distinct vision. From
              regal opulence to cosmic wonder, every collection invites you to
              experience the game through the eyes of an artist. These are not
              products — they are statements of beauty and intention.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ CHESS SETS ═══════════════ */}
      <section>
        {chessSets.map((set, index) => (
          <div
            key={set.id}
            className={`${index % 2 === 0 ? "bg-warm-gray" : "bg-white"} ${index === chessSets.length - 1 ? '' : ''}`}
          >
            <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  index % 2 !== 0 ? "lg:direction-rtl" : ""
                }`}
              >
                {/* Image */}
                <FadeIn
                  className={`${index % 2 !== 0 ? "lg:order-2" : ""}`}
                >
                  <div className="image-hover-zoom relative aspect-4/5 bg-medium-gray">
                    <Image
                      src={set.previewImage || set.heroImage}
                      alt={set.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </FadeIn>

                {/* Content */}
                <div className={`${index % 2 !== 0 ? "lg:order-1" : ""}`}>
                  <FadeInUp>
                    <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.5em] text-gold uppercase block mb-4">
                      COLLECTION {String(index + 1).padStart(2, "0")} — {set.category}
                    </span>
                  </FadeInUp>

                  <FadeInUp delay={0.1}>
                    <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-3">
                      {set.name}
                    </h2>
                  </FadeInUp>

                  <FadeInUp delay={0.15}>
                    <p className="font-(family-name:--font-cormorant) text-base md:text-lg tracking-widest text-gold italic mb-8">
                      {set.subtitle}
                    </p>
                  </FadeInUp>

                  <DividerReveal className="mb-8" />

                  <FadeInUp delay={0.25}>
                    <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-8">
                      {set.description}
                    </p>
                  </FadeInUp>

                  <FadeInUp delay={0.35}>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-start gap-4">
                        <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase min-w-25">
                          Materials
                        </span>
                        <span className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light">
                          {set.materials}
                        </span>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase min-w-25">
                          Year
                        </span>
                        <span className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light">
                          {set.year}
                        </span>
                      </div>
                    </div>
                  </FadeInUp>

                  <FadeInUp delay={0.45} className="mt-10">
                    <Link href={`/portfolio/${set.id}`} className="btn-luxury">
                      VIEW SET
                    </Link>
                  </FadeInUp>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section className="py-28 md:py-36 bg-white text-charcoal text-center">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
              PRIVATE VIEWINGS
            </span>
          </FadeInUp>

          <FadeInUp delay={0.15}>
            <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-8">
              Experience The Collection
            </h2>
          </FadeInUp>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-10"
          />

          <FadeInUp delay={0.3}>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mb-12">
              Each chess set can be experienced in person through private
              viewings. We welcome collectors, connoisseurs, and those who
              simply appreciate the extraordinary.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.45}>
            <a href="/contact" className="btn-luxury border-gold text-gold hover:text-white">
              ARRANGE A VIEWING
            </a>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
