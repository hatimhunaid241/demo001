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

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-great-vibes)! text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-normal tracking-[0.05em] text-charcoal mb-6">
            Royal Chess Design
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.0 }}
            className="font-(family-name:--font-cormorant) text-lg md:text-xl lg:text-2xl font-normal tracking-wide text-text-primary max-w-2xl mx-auto mb-12">
            The Art of Strategic Elegance
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}>
            <Link href="/portfolio" className="btn-luxury">
              VIEW COLLECTION
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2">
            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.3em] text-text-muted">
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
                      className="object-cover"
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
              <div className="image-hover-zoom relative aspect-4/5 bg-medium-gray">
                <Image
                  src="https://images.unsplash.com/photo-1604948501466-4e9c339b9c24?w=1000&q=85"
                  alt="Chess craftsmanship"
                  fill
                  className="object-cover"
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

      {/* ═══════════════ ABOUT THE DESIGNER ═══════════════ */}
      <section className="bg-warm-gray overflow-hidden">
        <div className="max-w-350 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] items-stretch">
            {/* ── Image Column ── */}
            <FadeIn className="flex flex-col bg-medium-gray">
              {/* Image fills all available height */}
              <div className="relative flex-1 min-h-[70vw] lg:min-h-0 overflow-hidden flex items-center justify-center">
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <Image
                    src="/about-me.jpeg"
                    alt="David de Jong — Childhood, Bucaramanga"
                    className="object-contain object-center"
                    width={800}
                    height={1000}
                  />
                  <div className="px-6 py-4">
                    <p className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.35em] text-text-muted uppercase text-center">
                      Bucaramanga, Colombia — Early Childhood
                    </p>
                  </div>
                </div>
                {/* Subtle right-side fade into section background */}
                <div className="hidden lg:block absolute inset-y-0 right-0 w-16 bg-linear-to-r from-transparent to-medium-gray/80" />
              </div>
              {/* Caption strip — same color, small padding */}
            </FadeIn>

            {/* ── Text Column ── */}
            <div className="flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-20">
              <FadeInUp>
                <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.55em] text-gold uppercase block mb-8">
                  THE ARTIST
                </span>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.08em] text-charcoal mb-8">
                  David de Jong
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              <div className="space-y-6">
                <FadeInUp delay={0.2}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    Born in Bucaramanga, Colombia and raised across continents, David de Jong unites
                    a life as a master goldsmith with an enduring fascination for the ancient game
                    of chess — creating sculptural chess designs that transform a game of intellect
                    into a work of art.
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.25}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    His relationship with chess began before language could name it. At three years
                    old, he encountered a chessboard for the first time — sixty-four squares
                    scattered with mysterious figures: kings and queens, bishops and knights, rooks
                    and pawns. He did not yet understand the rules. He knew only the beauty. He
                    arranged the pieces freely, guided by instinct and imagination alone.
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.3}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-[1.4] text-gold/90 italic font-light">
                    &ldquo;Children do not inherit rules — they invent them.&rdquo;
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.35}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    As a goldsmith, David works with noble materials — gold, silver, and rock
                    crystal — transforming them into objects of permanence and precision. He designs
                    each element in its entirety: the pieces, the boards, the tables that hold them.
                    This unity of vision is what distinguishes his work from every other.
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.4}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-[1.4] text-gold/80 italic font-light">
                    &ldquo;Why should a king play with wood when gold, silver, and crystal
                    exist?&rdquo;
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.45}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    Chess is an ancient language — born from early forms such as Chaturanga in
                    6th-century India, refined across civilisations, enduring across millennia.
                    Though machines may master its logic, they cannot experience its wonder. Chess
                    remains profoundly human: a balance of strategy, creativity, and quiet emotion.
                  </p>
                </FadeInUp>

                <FadeInUp delay={0.5}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                    Play sharpens the mind. It teaches patience, humility, and vision. His work
                    seeks to honour this timeless game by elevating it to its highest artistic
                    expression.
                  </p>
                </FadeInUp>
              </div>

              {/* Motto */}
              <FadeInUp delay={0.55} className="mt-12">
                <div className="pl-6 border-l border-gold">
                  <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-charcoal italic font-light mb-1">
                    &ldquo;What nature creates can be sculpted by mankind.&rdquo;
                  </p>
                </div>
              </FadeInUp>

              {/* Signature */}
              <FadeInUp delay={0.62} className="mt-8">
                <p className="font-(family-name:--font-great-vibes) text-4xl md:text-5xl text-gold">
                  David de Jong
                </p>
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
            {["LONDON", "NEW YORK", "PARIS", "DUBAI", "TOKYO"].map((city) => (
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
