"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeInUp,
  FadeIn,
  DividerReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";
import MediaModal from "@/components/MediaModal";

export default function HomeContent({ content: c, featuredSets }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <HeroSection
        src={c["hero.image"]}
        alt="Luxury bespoke chess pieces by Royal Chess Design — handcrafted from gold and precious gemstones"
        overlayClass="bg-gradient-to-b from-white/70 via-white/60 to-white/80"
        height="h-screen">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="">
            <span className="font-(family-name:--font-cormorant) text-[14px] md:text-[16px] tracking-[0.5em] text-gold uppercase">
              {c["hero.eyebrow"]}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.4, ease: [0.25, 0.46, 0.65, 0.94] }}
            className="">
            <Image src="/royalchessdesign.png" alt="Royal Chess Design" width={550} height={100} className="mx-auto" />
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 2.0 }}
            className="font-(family-name:--font-cormorant) text-lg md:text-xl lg:text-2xl font-normal tracking-wide text-text-primary max-w-2xl mx-auto mb-12">
            {c["hero.subtitle"]}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.3 }}>
            <Link href="/portfolio" className="btn-luxury mb-6">
              VIEW COLLECTION
            </Link>
          </motion.div>
          {c["hero.videoUrl"] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.8 }}>
              <button
                onClick={() => setVideoOpen(true)}
                className="nav-link relative font-(family-name:--font-cormorant) text-[15px] hover:scale-125 tracking-[0.2em] uppercase transition-all duration-300 mx-auto group font-bold opacity-70 hover:opacity-100 hover:text-gold">
                <span className="absolute top-1/2 -translate-y-1/2 right-[calc(100%+8px)] w-4 h-px bg-text-muted group-hover:bg-gold transition-colors duration-200" />
                Watch Film
                <span className="absolute top-1/2 -translate-y-1/2 left-[calc(100%+8px)] w-4 h-px bg-text-muted group-hover:bg-gold transition-colors duration-200" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
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

      {videoOpen && <MediaModal items={[{ url: c["hero.videoUrl"], mimeType: "video/mp4" }]} onClose={() => setVideoOpen(false)} />}

      {/* ═══════════════ INTRODUCTION SECTION ═══════════════ */}
      <section className="py-28 md:py-40 bg-white">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl mx-auto text-center">
            <FadeInUp>
              <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
                {c["intro.eyebrow"]}
              </span>
            </FadeInUp>

            <FadeInUp delay={0.15}>
              <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-8">
                {c["intro.heading"]}
              </h2>
            </FadeInUp>

            <DividerReveal className="mx-auto mb-10" />

            <FadeInUp delay={0.3}>
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
                {c["intro.body1"]}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.45}>
              <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mt-8">
                {c["intro.body2"]}
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
            <FadeIn>
              <div className="image-hover-zoom relative aspect-square bg-medium-gray">
                <Image
                  src={c["philosophy.image"]}
                  alt="Handcrafted luxury chess set detail — Royal Chess Design atelier by David de Jong"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </FadeIn>

            <div>
              <FadeInUp>
                <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-6">
                  {c["philosophy.eyebrow"]}
                </span>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.08em] text-charcoal mb-8">
                  {c["philosophy.heading"]}
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              <FadeInUp delay={0.25}>
                <p className="font-(family-name:--font-cormorant) text-lg leading-relaxed text-text-secondary font-light mb-6">
                  {c["philosophy.body1"]}
                </p>
              </FadeInUp>

              <FadeInUp delay={0.35}>
                <p className="font-(family-name:--font-cormorant) text-lg leading-relaxed text-text-secondary font-light mb-10">
                  {c["philosophy.body2"]}
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
              {c["enquiries.heading"]}
            </h2>
          </FadeInUp>

          <DividerReveal className="mx-auto mb-10" />

          <FadeInUp delay={0.3}>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mb-12">
              {c["enquiries.body"]}
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
