"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { chessSets } from "@/data/chessSets";
import { FadeInUp, FadeIn, DividerReveal } from "@/components/Animations";

/* ─────────────────────────────────────────────────────────
   PIECE SECTION  (alternating left / right)
───────────────────────────────────────────────────────── */
function PieceSection({ piece, index }) {
  const imageLeft = index % 2 === 0;

  return (
    <section
      className={`relative overflow-hidden ${
        index % 2 === 0 ? "bg-white" : "bg-warm-gray"
      }`}
    >
      {/* Giant watermark number */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -bottom-6 right-4 font-(family-name:--font-playfair) text-[22vw] leading-none text-charcoal/[0.035]"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className={`grid grid-cols-1 lg:grid-cols-2 min-h-155`}
      >
        {/* ── Image ── */}
        <FadeIn
          className={`relative aspect-3/4 lg:aspect-auto lg:min-h-0 overflow-hidden ${
            imageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <Image
            src={piece.image}
            alt={piece.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-charcoal/20" />

          {/* Piece name tag at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 px-8 pb-6 pt-10 bg-linear-to-t from-charcoal/40 to-transparent">
            <p className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.45em] text-white/80 uppercase">
              {piece.name}
            </p>
          </div>
        </FadeIn>

        {/* ── Text ── */}
        <div
          className={`flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-16 lg:py-20 ${
            imageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          {/* Category label */}
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.5em] text-gold uppercase block mb-5">
              THE PIECE
            </span>
          </FadeInUp>

          {/* Piece name */}
          <FadeInUp delay={0.08}>
            <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.06em] text-charcoal">
              {piece.name}
            </h2>
          </FadeInUp>

          {/* Height + base badge */}
          <FadeInUp delay={0.14}>
            <div className="flex flex-wrap items-center gap-4 mt-4 mb-0">
              {piece.height && (
                <span className="inline-flex items-center gap-2">
                  <span className="w-5 h-px bg-gold" />
                  <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase">
                    Height&nbsp;&nbsp;{piece.height}
                  </span>
                </span>
              )}
              {piece.base && (
                <span className="inline-flex items-center gap-2">
                  <span className="w-5 h-px bg-gold/40" />
                  <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase">
                    Base&nbsp;&nbsp;{piece.base}
                  </span>
                </span>
              )}
            </div>
          </FadeInUp>

          <DividerReveal className="my-8" />

          {/* Description */}
          <FadeInUp delay={0.22}>
            <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
              {piece.description}
            </p>
          </FadeInUp>

          {/* Quote */}
          {piece.quote && (
            <FadeInUp delay={0.32} className="mt-10">
              <blockquote className="pl-5 border-l-2 border-gold/50">
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-gold/80 italic font-light">
                  &ldquo;{piece.quote.text}&rdquo;
                </p>
                <cite className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase not-italic mt-3 block">
                  — {piece.quote.author}
                </cite>
              </blockquote>
            </FadeInUp>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   TABLE SECTION
───────────────────────────────────────────────────────── */
function TableSection({ table, heroImage }) {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-warm-gray/60 via-white to-white" />
      </div>

      <div className="relative max-w-350 mx-auto px-6 md:px-12 lg:px-20 py-28 md:py-36">
        {/* Heading */}
        <div className="mb-16 max-w-2xl">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.55em] text-gold uppercase block mb-6">
              THE TABLE
            </span>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.06em] text-charcoal mb-6">
              The Battlefield
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.18}>
            <div className="h-px w-16 bg-linear-to-r from-gold to-transparent" />
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[5fr_3fr] gap-16 lg:gap-24 items-start">
          {/* Description */}
          <div>
            {table.description.split("\n\n").map((para, i) => (
              <FadeInUp key={i} delay={0.1 + i * 0.08}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
                  {para}
                </p>
              </FadeInUp>
            ))}

            {/* Quote */}
            {table.quote && (
              <FadeInUp delay={0.4} className="mt-12">
                <blockquote className="pl-6 border-l-2 border-gold/50">
                  <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-gold/80 italic font-light">
                    &ldquo;{table.quote.text}&rdquo;
                  </p>
                  <cite className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase not-italic mt-3 block">
                    — {table.quote.author}
                  </cite>
                </blockquote>
              </FadeInUp>
            )}

            {table.image && (
            <FadeInUp delay={0.5} className="mt-12">
              {/* Image */}
              <div className="relative aspect-6/4 overflow-hidden bg-medium-gray">
                <Image
                  src={table.image || heroImage}
                  alt="The Table"
                  fill
                  className="object-cover"
                  // width={1000}
                  // height={800}
                />
                <div className="absolute inset-0 bg-linear-to-t from-charcoal/30 to-transparent" />
              </div>
            </FadeInUp>
          )}
          </div>

          {/* Specs + Image */}
          {table.specs && table.specs.length > 0 && (
            <FadeInUp delay={0.25}>
              {/* Specs panel */}
              <div className="border border-medium-gray p-8">
                <p className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.5em] text-gold uppercase mb-8">
                  SPECIFICATIONS
                </p>
                <dl className="space-y-5">
                  {table.specs.map((s) => (
                    <div key={s.label} className="border-b border-medium-gray pb-4">
                      <dt className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.3em] text-text-muted uppercase mb-1">
                        {s.label}
                      </dt>
                      <dd className="font-(family-name:--font-cormorant) text-sm md:text-base text-text-secondary font-light">
                        {s.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </FadeInUp>
          )}
          
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
export default function ChessSetPage({ params }) {
  const { slug } = use(params);
  const set = chessSets.find((s) => s.id === slug);
  if (!set || !set.detail) notFound();

  const { detail } = set;
  const setIndex = chessSets.indexOf(set);
  const prevSet = setIndex > 0 ? chessSets[setIndex - 1] : null;
  const nextSet = setIndex < chessSets.length - 1 ? chessSets[setIndex + 1] : null;

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-[85vh] min-h-150 overflow-hidden">
        <Image
          src={set.heroImage}
          alt={set.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-white/60 via-white/50 to-white/75" />

        {/* Roman numeral watermark */}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-(family-name:--font-playfair) text-[35vw] leading-none text-charcoal/20 overflow-hidden"
        >
          {detail.setNumber}
        </span>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] md:text-[13px] tracking-[0.55em] text-gold uppercase block mb-5"
          >
            CHESS SET DESIGN &nbsp;·&nbsp; {detail.setNumber}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-(family-name:--font-playfair) text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.08em] text-charcoal mb-4"
          >
            {set.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="font-(family-name:--font-cormorant) text-base md:text-lg text-gold italic font-light tracking-wide mb-10"
          >
            {set.subtitle}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] uppercase flex items-center">
              {set.category}
            </span>
            <span className="">·</span>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] uppercase flex items-center">
              {set.year}
            </span>
            <span className="">·</span>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] uppercase flex items-center">
              {set.detail.pieces.length} Pieces
            </span>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-px h-8 bg-linear-to-b from-gold/60 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ BACK NAV ═══════════════ */}
      <div className="bg-white border-b border-medium-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-14">
            <Link
              href="/portfolio"
              className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase hover:text-gold transition-colors duration-300 flex items-center gap-3"
            >
              <span className="text-base leading-none">←</span>
              BACK TO COLLECTION
            </Link>

            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase hidden md:block">
              {set.name}
            </span>

            <Link
              href="/contact"
              className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-gold uppercase hover:text-gold-dark transition-colors duration-300 flex items-center gap-3"
            >
              ENQUIRE
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      {detail.overview && (
        <section className="py-24 md:py-32 bg-white">
          <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto">
              <FadeInUp>
                <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
                  THE COLLECTION
                </span>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h2 className="font-(family-name:--font-playfair) text-2xl md:text-4xl font-normal tracking-[0.06em] text-charcoal mb-8">
                  A Vision of Excellence
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              {detail.overview.split("\n\n").map((para, i) => (
                <FadeInUp key={i} delay={0.15 + i * 0.07}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
                    {para}
                  </p>
                </FadeInUp>
              ))}

              {detail.overviewQuote && (
                <FadeInUp delay={0.4} className="mt-10">
                  <blockquote className="pl-6 border-l-2 border-gold/50">
                    <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-gold/80 italic font-light">
                      &ldquo;{detail.overviewQuote.text}&rdquo;
                    </p>
                    <cite className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase not-italic mt-3 block">
                      — {detail.overviewQuote.author}
                    </cite>
                  </blockquote>
                </FadeInUp>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ PIECES DIVIDER ═══════════════ */}
      <div className="bg-warm-gray py-10 border-y border-medium-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 flex items-center gap-8">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.55em] text-gold uppercase">
              THE PIECES
            </span>
          </FadeInUp>
          <div className="flex-1 h-px bg-medium-gray" />
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase">
              {set.detail.pieces.length} Pieces
            </span>
          </FadeInUp>
        </div>
      </div>

      {/* ═══════════════ PIECES ═══════════════ */}
      {detail.pieces.map((piece, i) => (
        <PieceSection key={piece.name} piece={piece} index={i} />
      ))}

      {/* ═══════════════ TABLE ═══════════════ */}
      {detail.table && (
        <TableSection table={detail.table} heroImage={set.heroImage} />
      )}

      {/* ═══════════════ MATERIALS STRIP ═══════════════ */}
      <section className="py-14 bg-warm-gray border-y border-medium-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 text-center">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.5em] text-text-muted uppercase block mb-4">
              MATERIALS
            </span>
            <p className="font-(family-name:--font-cormorant) text-base md:text-lg text-text-secondary font-light max-w-2xl mx-auto">
              {set.materials}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ ENQUIRE CTA ═══════════════ */}
      <section className="py-28 md:py-36 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
              PRIVATE ENQUIRY
            </span>
          </FadeInUp>
          <FadeInUp delay={0.12}>
            <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-[0.08em] text-charcoal mb-6">
              Commission This Set
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="h-px w-16 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-10" />
          </FadeInUp>
          <FadeInUp delay={0.28}>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light mb-12">
              Each set is produced to the highest standards of individual craftsmanship. We welcome
              private enquiries, bespoke commissions, and personal viewings from those who seek the
              extraordinary.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.38}>
            <Link href="/contact" className="btn-luxury">
              BEGIN A CONVERSATION
            </Link>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ PREV / NEXT NAV ═══════════════ */}
      {(prevSet || nextSet) && (
        <section className="border-t border-medium-gray bg-warm-gray">
          <div className="max-w-350 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-medium-gray">
              {/* Prev */}
              {prevSet ? (
                <Link
                  href={`/portfolio/${prevSet.id}`}
                  className="group flex items-center gap-6 px-8 md:px-12 lg:px-16 py-10 hover:bg-white transition-colors duration-400"
                >
                  <span className="text-2xl text-gold group-hover:-translate-x-1 transition-transform duration-300">
                    ←
                  </span>
                  <div>
                    <p className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase mb-2">
                      PREVIOUS SET
                    </p>
                    <p className="font-(family-name:--font-playfair) text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                      {prevSet.name}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {/* Next */}
              {nextSet ? (
                <Link
                  href={`/portfolio/${nextSet.id}`}
                  className="group flex items-center justify-end gap-6 px-8 md:px-12 lg:px-16 py-10 hover:bg-white transition-colors duration-400 text-right"
                >
                  <div>
                    <p className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase mb-2">
                      NEXT SET
                    </p>
                    <p className="font-(family-name:--font-playfair) text-lg md:text-xl text-charcoal group-hover:text-gold transition-colors duration-300">
                      {nextSet.name}
                    </p>
                  </div>
                  <span className="text-2xl text-gold group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
