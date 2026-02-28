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

export default function Home() {
  const featuredSets = chessSets.slice(0, 3);

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <HeroSection
        // src="https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=1920&q=85"
        src="/heroImages/hero.jpg"
        alt="Chess artistry"
        overlayClass="bg-gradient-to-b from-white/70 via-white/60 to-white/80"
        height="h-screen">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6">
            <span className="font-(family-name:--font-cormorant) text-[14px] md:text-[16px] tracking-[0.5em] text-gold uppercase">
              Chess Designers Portfolio
            </span>
          </motion.div>

          {/* ── TITLE ANIMATION ──
               Rollback: letter-by-letter fade stagger
          <motion.h1
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.22, delayChildren: 0.4 } },
            }}
            initial="hidden"
            animate="visible"
            className="font-(family-name:--font-great-vibes)! text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-normal tracking-[0.05em] text-charcoal mb-6">
            {"Royal Chess Design".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
                }}
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>
          */}

          {/* Trailing fade — letters stagger with long overlap so ~6 are fading simultaneously */}
          <motion.h1
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.22, delayChildren: 0.4 } },
            }}
            initial="hidden"
            animate="visible"
            className="font-(family-name:--font-great-vibes)! text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.05em] text-charcoal mb-6 select-none">
            {"Royal Chess Design".split("").map((char, i) =>
              char === " " ? (
                <span key={i} style={{ display: "inline-block" }}>&nbsp;</span>
              ) : (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 2.2, ease: "linear" } },
                  }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              )
            )}
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 6.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 6.6 }}
            className="font-(family-name:--font-cormorant) text-lg md:text-xl lg:text-2xl font-normal tracking-wide text-text-primary max-w-2xl mx-auto mb-12">
            The Art of Strategic Elegance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 6.9 }}>
            <Link href="/portfolio" className="btn-luxury">
              VIEW COLLECTION
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 7.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2">
            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.3em] ">
              SCROLL
            </span>
            <div className="w-px h-8 bg-linear-to-b from-gold/60 to-transparent" />
          </motion.div>
        </motion.div>
      </HeroSection>

      {/* ═══════════════ INTRODUCTION SECTION ═══════════════ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInUp>
              <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
                THE ATELIER
              </span>
            </FadeInUp>

            <FadeInUp delay={0.15}>
              <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-8">
                Where Strategy Becomes Art
              </h2>
            </FadeInUp>

            <DividerReveal className="mx-auto mb-10" />

            <FadeInUp delay={0.3}>
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
                Each chess set in our collection is a testament to the convergence of artistic
                vision and masterful craftsmanship. Designed not merely as instruments of play, but
                as sculptures that embody the timeless elegance of the game — where every piece
                tells a story, and every move is a work of art.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.45}>
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mt-8">
                Five collections. Five visions. Each one an invitation to experience chess through
                the eyes of an artist.
              </p>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED COLLECTION SECTION ═══════════════ */}
      <section className="py-28 md:py-40 bg-warm-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <FadeInUp>
              <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-6">
                SELECTED WORKS
              </span>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-6">
                Our Collection
              </h2>
            </FadeInUp>
            <DividerReveal className="mx-auto" />
          </div>

          {/* Featured Chess Sets Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {featuredSets.map((set) => (
              <StaggerItem key={set.id}>
                <div className="group cursor-pointer">
                  <div className="image-hover-zoom relative aspect-3/4 mb-8 bg-medium-gray">
                    <Image
                      src={set.image}
                      alt={set.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-all duration-700" />
                  </div>
                  <div className="text-center">
                    <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-gold uppercase block mb-3">
                      {set.category}
                    </span>
                    <h3 className="font-(family-name:--font-playfair) text-xl md:text-2xl tracking-[0.15em] text-charcoal mb-3 group-hover:text-gold transition-colors duration-500">
                      {set.name}
                    </h3>
                    <p className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light max-w-xs mx-auto">
                      {set.shortDescription}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* View All Button */}
          <FadeInUp delay={0.3} className="text-center mt-20">
            <Link href="/portfolio" className="btn-luxury">
              VIEW ALL COLLECTIONS
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ PHILOSOPHY SECTION ═══════════════ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <FadeIn>
              <div className="image-hover-zoom relative aspect-square bg-medium-gray">
                <Image
                  src="/otherImages/homePhilosophy2.jpg"
                  alt="Chess craftsmanship"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            {/* Text */}
            <div>
              <FadeInUp>
                <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-6">
                  PHILOSOPHY
                </span>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.08em] text-charcoal mb-8">
                  Crafted With Intention, Designed With Soul
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              <FadeInUp delay={0.25}>
                <p className="font-(family-name:--font-cormorant) text-lg leading-relaxed text-text-secondary font-light mb-6">
                  We believe that chess is more than a game — it is a dialogue between minds, a
                  dance of strategy and intuition. Our sets are designed to honor this timeless
                  exchange by elevating the physical experience of play to an art form.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.35}>
                <p className="font-(family-name:--font-cormorant) text-lg leading-relaxed text-text-secondary font-light mb-10">
                  Every material is chosen with purpose. Every line is drawn with meaning. The
                  result is not merely a chess set, but a statement — an object that speaks of
                  taste, heritage, and the quiet confidence of those who appreciate the finer
                  things.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.45}>
                <Link href="/contact" className="btn-luxury">
                  BEGIN A CONVERSATION
                </Link>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════ CITIES / PRESENCE SECTION ═══════════════ */}
      <section className="py-20 md:py-28 bg-warm-gray border-t border-medium-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <FadeInUp className="text-center mb-14">
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-6">
              EXHIBITED WORLDWIDE
            </span>
          </FadeInUp>

          <FadeIn className="flex flex-wrap justify-center gap-x-12 md:gap-x-20 gap-y-4">
            {["LONDON", "NEW YORK", "PARIS", "DUBAI", "HONG KONG", "TOKYO"].map((city) => (
              <span
                key={city}
                className="font-(family-name:--font-playfair) text-sm md:text-base tracking-[0.3em] text-text-muted">
                {city}
              </span>
            ))}
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════ ENQUIRIES SECTION ═══════════════ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
              ENQUIRIES
            </span>
          </FadeInUp>

          <FadeInUp delay={0.15}>
            <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-8">
              Let Us Begin
            </h2>
          </FadeInUp>

          <DividerReveal className="mx-auto mb-10" />

          <FadeInUp delay={0.3}>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mb-12">
              For bespoke collaborations, commissions, and private viewings, we welcome the
              beginning of a meaningful conversation.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.45}>
            <Link href="/contact" className="btn-luxury">
              CONVERSATION
            </Link>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
