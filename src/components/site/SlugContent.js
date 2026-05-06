"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp, FadeIn, DividerReveal } from "@/components/Animations";
import { BASE_URL } from "@/config/site";
import MediaModal from "@/components/MediaModal";

/* ─────────────────────────────────────────────────────────
   PIECE SECTION
───────────────────────────────────────────────────────── */
function PieceSection({ piece, index, onOpen }) {
  const images = piece.imageUrls || [];
  return (
    <div className={index % 2 === 0 ? "bg-warm-gray" : "bg-white"}>
      <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center`}>
          {/* ── Image ── */}
          <FadeIn className={`${index % 2 !== 0 ? "lg:order-2" : ""}`}>
            <div
              className="image-hover-zoom relative bg-medium-gray lg:aspect-4/5 cursor-zoom-in"
              onClick={() => images.length > 0 && onOpen(images, 0)}>
              {images[0] && (
                <Image
                  src={images[0]}
                  alt={piece.name}
                  width={800}
                  height={1000}
                  className="w-full h-auto lg:absolute lg:inset-0 lg:w-full lg:h-full object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
            </div>
          </FadeIn>

          {/* ── Content ── */}
          <div className={`${index % 2 !== 0 ? "lg:order-1" : ""}`}>
            <FadeInUp>
              <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.5em] text-gold uppercase block mb-4">
                THE PIECE — {String(index + 1).padStart(2, "0")}
              </span>
            </FadeInUp>

            <FadeInUp delay={0.1}>
              <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl lg:text-5xl font-normal tracking-widest text-charcoal mb-3">
                {piece.name}
              </h2>
            </FadeInUp>

            {piece.quoteText && (
              <FadeInUp delay={0.15}>
                <blockquote className="mb-8">
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg tracking-widest text-gold italic">
                    &ldquo;{piece.quoteText}&rdquo;
                  </p>
                  {piece.quoteAuthor && (
                    <cite className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase not-italic mt-2 block">
                      — {piece.quoteAuthor}
                    </cite>
                  )}
                </blockquote>
              </FadeInUp>
            )}

            <DividerReveal className="mb-8" />

            <FadeInUp delay={0.25}>
              <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-8">
                {piece.description}
              </p>
            </FadeInUp>

            <FadeInUp delay={0.35}>
              <div className="flex flex-col gap-3">
                {piece.height && (
                  <div className="flex items-start gap-4">
                    <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase min-w-25">
                      Height
                    </span>
                    <span className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light">
                      {piece.height}
                    </span>
                  </div>
                )}
              </div>
            </FadeInUp>

            {images.length > 0 && (
              <FadeInUp delay={0.45} className="mt-8">
                <button type="button" onClick={() => onOpen(images, 0)} className="btn-luxury">
                  VIEW PHOTOS
                </button>
              </FadeInUp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TABLE SECTION
───────────────────────────────────────────────────────── */
function TableSection({ table, onOpen, setName, hasWoodCare }) {
  return (
    <section className="relative bg-white overflow-hidden">
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
            {table.description.split(/\r?\n\r?\n/).map((para, i) => (
              <FadeInUp key={i} delay={0.1 + i * 0.08}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
                  {para.split(/\r?\n/).map((line, j, arr) => (
                    <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                  ))}
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

            {table.image && table.image.length > 0 && (
              <FadeInUp delay={0.5} className="mt-12">
                <div
                  className="image-hover-zoom relative aspect-6/4 overflow-hidden bg-medium-gray cursor-zoom-in"
                  onClick={() => onOpen(table.image, 0)}>
                  <Image
                    src={table.image[0]}
                    alt={`Chess table for ${setName} — Royal Chess Design`}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="mt-8 flex justify-center lg:justify-start flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => onOpen(table.image, 0)}
                    className="btn-luxury"
                  >
                    VIEW PHOTOS
                  </button>
                  {hasWoodCare && (
                    <Link href={`/wood-care`} className="btn-luxury">
                      Wood Care & maintenance
                    </Link>
                  )}
                </div>
              </FadeInUp>
            )}
          </div>

          {/* Specs */}
          {table.specs && table.specs.length > 0 && (
            <FadeInUp delay={0.25}>
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
   PAGE COMPONENT
───────────────────────────────────────────────────────── */
export default function SlugContent({ set, pieces, prevSet, nextSet }) {
  const [lightbox, setLightbox] = useState(null);
  const openLightbox = useCallback((images, index) => setLightbox({ images, index }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const prevImage = useCallback(
    () =>
      setLightbox((lb) => ({ ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length })),
    [],
  );
  const nextImage = useCallback(
    () => setLightbox((lb) => ({ ...lb, index: (lb.index + 1) % lb.images.length })),
    [],
  );

  const [videoOpen, setVideoOpen] = useState(false);

  const table = set.tableDescription
    ? {
        description: set.tableDescription,
        quote: set.tableQuoteText
          ? { text: set.tableQuoteText, author: set.tableQuoteAuthor }
          : null,
        specs: set.tableSpecs || [],
        image: set.tableImageUrls || [],
      }
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${BASE_URL}/portfolio/${set.slug}#product`,
        name: set.name,
        description: set.shortDescription,
        image: set.heroImage ? `${BASE_URL}${set.heroImage}` : `${BASE_URL}${set.image}`,
        brand: { "@type": "Brand", name: "Royal Chess Design" },
        manufacturer: { "@type": "Organization", "@id": `${BASE_URL}/#organization` },
        material: set.materials,
        category: `Luxury Chess Sets — ${set.category}`,
        url: `${BASE_URL}/portfolio/${set.slug}`,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/LimitedAvailability",
          priceCurrency: "EUR",
          seller: { "@type": "Organization", name: "Royal Chess Design", url: BASE_URL },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Portfolio", item: `${BASE_URL}/portfolio` },
          {
            "@type": "ListItem",
            position: 3,
            name: set.name,
            item: `${BASE_URL}/portfolio/${set.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative h-[85vh] min-h-150 overflow-hidden">
        <Image
          src={set.heroImage || set.image}
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
          className="pointer-events-none select-none absolute inset-0 flex items-center justify-center font-(family-name:--font-playfair) text-[35vw] leading-none text-charcoal/20 overflow-hidden">
          {set.setNumber}
        </span>

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] md:text-[13px] tracking-[0.55em] text-gold uppercase block mb-5">
            CHESS SET DESIGN &nbsp;·&nbsp; {set.setNumber}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.4, ease: [0.25, 0.46, 0.65, 0.94] }}
            className="font-(family-name:--font-playfair) text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.08em] text-charcoal mb-4 md:max-w-xl lg:max-w-2xl">
            {set.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.75 }}
            className="font-(family-name:--font-cormorant) text-base md:text-lg text-gold italic font-light tracking-wide mb-5">
            {set.subtitle}
          </motion.p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-5"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-wrap justify-center gap-6 mb-4 text-[14px]">
            <span className="font-(family-name:--font-cormorant) tracking-[0.35em] uppercase flex items-center">
              {set.category}
            </span>
            <span className="">·</span>
            <span className="font-(family-name:--font-cormorant) tracking-[0.35em] uppercase flex items-center">
              {set.year}
            </span>
            {pieces.length > 0 && (
              <>
                <span className="">·</span>
                <span className="font-(family-name:--font-cormorant) tracking-[0.35em] uppercase flex items-center">
                  {
                    [
                      "Zero",
                      "One",
                      "Two",
                      "Three",
                      "Four",
                      "Five",
                      "Six",
                      "Seven",
                      "Eight",
                      "Nine",
                      "Ten",
                      "Eleven",
                      "Twelve",
                      "Thirteen",
                      "Fourteen",
                      "Fifteen",
                      "Sixteen",
                      "Seventeen",
                      "Eighteen",
                      "Nineteen",
                      "Twenty",
                    ][pieces.length]
                  }{" "}
                  Pieces
                </span>
              </>
            )}
          </motion.div>

          {set.videoUrls?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}>
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

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2">
            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.3em] text-charcoal">
              SCROLL
            </span>
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
              className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-text-muted uppercase hover:text-gold transition-colors duration-300 flex items-center gap-3">
              <span className="text-base leading-none">←</span>
              BACK TO COLLECTION
            </Link>

            <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase hidden md:block">
              {set.name}
            </span>

            <Link
              href="/contact"
              className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.35em] text-gold uppercase hover:text-gold-dark transition-colors duration-300 flex items-center gap-3">
              ENQUIRE
              <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════ OVERVIEW ═══════════════ */}
      {set.overview && (
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

              {set.overview.split(/\r?\n\r?\n/).map((para, i) => (
                <FadeInUp key={i} delay={0.15 + i * 0.07}>
                  <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-6">
                    {para.split(/\r?\n/).map((line, j, arr) => (
                      <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
                    ))}
                  </p>
                </FadeInUp>
              ))}

              {set.overviewQuoteText && (
                <FadeInUp delay={0.4} className="mt-10">
                  <blockquote className="pl-6 border-l-2 border-gold/50">
                    <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-gold/80 italic font-light">
                      &ldquo;{set.overviewQuoteText}&rdquo;
                    </p>
                    <cite className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.4em] text-text-muted uppercase not-italic mt-3 block">
                      — {set.overviewQuoteAuthor}
                    </cite>
                  </blockquote>
                </FadeInUp>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════ PIECES DIVIDER ═══════════════ */}
      {pieces.length > 0 && (
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
                {pieces.length} Pieces
              </span>
            </FadeInUp>
          </div>
        </div>
      )}

      {/* ═══════════════ PIECES ═══════════════ */}
      {pieces.map((piece, i) => (
        <PieceSection key={piece.id} piece={piece} index={i} onOpen={openLightbox} />
      ))}

      {/* ═══════════════ TABLE ═══════════════ */}
      {table && <TableSection table={table} onOpen={openLightbox} setName={set.name} hasWoodCare={set.hasWoodCare} />}

      {/* ═══════════════ MEDIA MODAL ═══════════════ */}
      {lightbox && (
        <MediaModal
          items={lightbox.images.map((url) => ({ url }))}
          index={lightbox.index}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      {videoOpen && set.videoUrls?.length > 0 && (
        <MediaModal
          items={[{ url: set.videoUrls[0], mimeType: "video/mp4" }]}
          onClose={() => setVideoOpen(false)}
        />
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
              Acquire by Private Commission
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
              {prevSet ? (
                <Link
                  href={`/portfolio/${prevSet.slug}`}
                  className="group flex items-center gap-6 px-8 md:px-12 lg:px-16 py-10 hover:bg-white transition-colors duration-400">
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

              {nextSet ? (
                <Link
                  href={`/portfolio/${nextSet.slug}`}
                  className="group flex items-center justify-end gap-6 px-8 md:px-12 lg:px-16 py-10 hover:bg-white transition-colors duration-400 text-right">
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
