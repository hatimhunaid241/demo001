"use client";

import Link from "next/link";
import {
  FadeInUp,
  FadeIn,
  DividerReveal,
} from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";

export default function TheArtist() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <HeroSection
        src="/heroImages/artist.webp"
        alt="David de Jong — Chess Designer"
        overlayClass="bg-gradient-to-b from-white/20 via-white/60 to-white/20"
        height="h-[60vh] md:h-[70vh]"
        showScrollIndicator>
        <div className="text-center px-6 max-w-4xl mx-auto">
          <FadeInUp>
            <span className="font-(family-name:--font-cormorant) text-[13px] md:text-[15px] tracking-[0.5em] text-gold uppercase block mb-6">
              THE ARTIST
            </span>
          </FadeInUp>
          <FadeInUp delay={0.15}>
            <h1 className="font-(family-name:--font-playfair) text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.08em] text-charcoal mb-6">
              David de Jong
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.25}>
            <div className="h-px w-20 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          </FadeInUp>
          <FadeInUp delay={0.35}>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light tracking-wide text-text-primary max-w-xl mx-auto">
              Goldsmith &amp; Chess Designer
            </p>
          </FadeInUp>
        </div>
      </HeroSection>

      {/* ═══════════════ ABOUT CONTENT ═══════════════ */}
      <section className="bg-warm-gray overflow-hidden">
        <div className="max-w-350 mx-auto">
          <div className="max-w-3xl mx-auto px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-28">

            <div className="space-y-6">
              <FadeInUp delay={0.1}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  I am David de Jong, born in Bucaramanga, Colombia and raised across continents.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.15}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  Today I unite my life as a goldsmith with my lifelong fascination for chess,
                  creating sculptural chess designs that transform the game into a work of art.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  My relationship with chess began in early childhood. At the age of three, I
                  encountered a chessboard — sixty-four black and white squares scattered with
                  mysterious figures: kings, queens, bishops, knights, rooks, and pawns. It felt
                  magical. I did not yet understand the rules, only the beauty and presence of the
                  pieces. I arranged them freely, guided only by imagination.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.25}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-[1.6] text-gold/90 italic font-light">
                  Children do not inherit rules — they create them.
                </p>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mt-2">
                  I could not have imagined then that I would one day design chess sets myself.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  Chess represents endless possibilities. The perfect position may still be
                  undiscovered. The most beautiful invention may still lie ahead. This belief
                  guides my work.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.33}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  I design each element — the pieces, the boards, and the tables that hold them.
                  True design requires no improvement; excellence demands constant pursuit.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.36}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  This vision led me to question tradition:
                </p>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-[1.6] text-gold/80 italic font-light mt-2">
                  Why should a king play with wood when gold, silver, and crystal exist?
                  <br />
                  Why should a game of strategy rest on ordinary materials when it can be elevated
                  into sculpture?
                </p>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  As a goldsmith, I work with noble materials — gold, silver, and rock crystal —
                  transforming them into objects that embody permanence, precision, and beauty.
                  Each chess set is conceived as both, instrument and artwork.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.43}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  Chess itself is an ancient language of intellect and imagination, originating
                  from early forms such as Chaturanga in 6th-century India and evolving across
                  civilizations. Though machines may master the logic of the game, they cannot
                  experience its wonder. Chess remains a profoundly human pursuit — a balance of
                  strategy, creativity, and emotion.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.46}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  Play sharpens the mind, reveals character, and inspires innovation. It teaches
                  patience, humility, empathy, and vision.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.49}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light">
                  My work seeks to honour this timeless game by elevating it to its highest
                  artistic form.
                </p>
              </FadeInUp>
            </div>

            {/* Motto */}
            <FadeInUp delay={0.53} className="mt-14">
              <span className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.45em] text-text-muted uppercase block mb-5">
                MY MOTTO
              </span>
              <div className="pl-6 border-l border-gold">
                <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-charcoal italic font-light">
                  &ldquo;What nature creates can be sculpted by mankind.&rdquo;
                </p>
              </div>
            </FadeInUp>

            {/* Signature */}
            <FadeInUp delay={0.6} className="mt-10">
              <p className="font-(family-name:--font-cormorant) text-[10px] tracking-[0.45em] text-text-muted uppercase mb-4">
                SINCERELY,
              </p>
              <p className="font-(family-name:--font-great-vibes) text-4xl md:text-5xl text-gold">
                David de Jong
              </p>
            </FadeInUp>

            {/* CTA */}
            <FadeInUp delay={0.68} className="mt-16">
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
