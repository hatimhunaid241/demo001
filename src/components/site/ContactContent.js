"use client";

import { useActionState, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FadeInUp, FadeIn, DividerReveal } from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";
import PhoneField from "@/components/PhoneField";
import { sendContactMessage } from "@/actions/contact";

export default function ContactContent({ content: c }) {
  const [state, action, pending] = useActionState(sendContactMessage, undefined);
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const startTimeRef = useRef(null);

  const handleFirstInteraction = () => {
    if (startTimeRef.current === null) startTimeRef.current = Date.now();
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    const elapsedInput = form.querySelector('input[name="elapsed"]');
    if (elapsedInput && startTimeRef.current !== null) {
      elapsedInput.value = ((Date.now() - startTimeRef.current) / 1000).toString();
    }
    startTimeRef.current = null;
  };

  return (
    <>
      {/* ═══════════════ HERO BANNER ═══════════════ */}
      <HeroSection
        src={c["hero.image"]}
        alt="Contact Royal Chess Design — commission a bespoke luxury chess set by David de Jong"
        overlayClass="bg-gradient-to-b from-white/40 via-white/60 to-white/50"
        height="h-[65vh] md:h-[75vh]"
        showScrollIndicator>
        <div className="text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] md:text-[13px] tracking-[0.5em] text-gold uppercase block mb-6">
            {c["hero.eyebrow"]}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 3, delay: 0.4, ease: [0.25, 0.46, 0.65, 0.94] }}
            className="font-(family-name:--font-playfair) text-4xl md:text-6xl lg:text-7xl font-normal tracking-[0.15em] text-charcoal mb-6">
            CONTACT
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="h-px bg-linear-to-r from-transparent via-gold to-transparent mx-auto"
          />
        </div>
      </HeroSection>

      {/* ═══════════════ INTRODUCTION TEXT ═══════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeInUp>
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl leading-relaxed text-text-secondary font-light">
              {c["intro.body"]}
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ═══════════════ MAIN CONTACT SECTION ═══════════════ */}
      <section className="py-16 md:py-28 bg-warm-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28">
            {/* Left — Contact Details */}
            <div>
              <FadeInUp>
                <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-6">
                  OUR ATELIER
                </span>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.08em] text-charcoal mb-8">
                  {c["details.heading"]}
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              <FadeInUp delay={0.2}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-12">
                  {c["details.description"]}
                </p>
              </FadeInUp>

              {/* Contact Cards */}
              <div className="space-y-10">
                <FadeInUp delay={0.3}>
                  <div>
                    <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                      EMAIL US
                    </h4>
                    <a
                      href={`mailto:${c["details.email"]}`}
                      className="font-(family-name:--font-cormorant) text-base text-text-secondary font-light hover:text-gold transition-colors duration-300">
                      {c["details.email"]}
                    </a>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.35}>
                  <div>
                    <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                      TELEPHONE
                    </h4>
                    <span className="font-(family-name:--font-cormorant) text-base text-text-secondary font-light">
                      Available upon request
                    </span>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.4}>
                  <div>
                    <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                      FOLLOW US
                    </h4>
                    <div className="flex items-center gap-6">
                      {c["social.instagram"] && (
                        <a
                          href={c["social.instagram"]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-text-muted hover:text-gold transition-colors duration-300"
                          aria-label="Instagram">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <circle cx="12" cy="12" r="5" />
                            <circle cx="17.5" cy="6.5" r="1" />
                          </svg>
                        </a>
                      )}
                      {c["social.linkedin"] && (
                        <a
                          href={c["social.linkedin"]}
                          target="_blank"
                          rel="noreferrer"
                          className="text-text-muted hover:text-gold transition-colors duration-300"
                          aria-label="LinkedIn">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect x="2" y="9" width="4" height="12" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </FadeInUp>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div>
              <FadeInUp>
                <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-6">
                  WRITE TO US
                </span>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.08em] text-charcoal mb-8">
                  Send An Enquiry
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              {state?.success ? (
                <FadeIn>
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-gold flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-(family-name:--font-playfair) text-2xl tracking-widest text-charcoal mb-4">Thank You</h3>
                    <p className="font-(family-name:--font-cormorant) text-lg text-text-secondary font-light mb-8">
                      Your enquiry has been received and will receive my personal attention.
                    </p>
                    <button onClick={() => router.refresh()} className="btn-luxury">SEND ANOTHER</button>
                  </div>
                </FadeIn>
              ) : (
                <FadeInUp delay={0.2}>
                  <form action={action} onSubmit={handleSubmit} className="space-y-8" autoComplete="off">
                    {/* Honeypot */}
                    <div style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                      <input type="text" name="name" tabIndex={-1} autoComplete="off" />
                      <input type="email" name="email" tabIndex={-1} autoComplete="off" />
                      <textarea name="message" tabIndex={-1} autoComplete="off" />
                    </div>
                    <input type="hidden" name="elapsed" defaultValue="" />
                    <input type="hidden" name="phone" value={phone} readOnly />

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">NAME *</label>
                      <input type="text" name="eman" required autoComplete="off" onFocus={handleFirstInteraction} onChange={handleFirstInteraction}
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 placeholder:text-text-muted/40"
                        placeholder="Your full name" />
                      {state?.errors?.name && <p className="font-(family-name:--font-cormorant) text-sm text-red-500 mt-2 tracking-wide">{state.errors.name[0]}</p>}
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">EMAIL *</label>
                      <input type="email" name="liame" required autoComplete="off" onFocus={handleFirstInteraction} onChange={handleFirstInteraction}
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 placeholder:text-text-muted/40"
                        placeholder="Your email address" />
                      {state?.errors?.email && <p className="font-(family-name:--font-cormorant) text-sm text-red-500 mt-2 tracking-wide">{state.errors.email[0]}</p>}
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">PHONE</label>
                      <PhoneField value={phone} onChange={setPhone} />
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">SUBJECT</label>
                      <input type="text" name="subject" autoComplete="off" onFocus={handleFirstInteraction} onChange={handleFirstInteraction}
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 placeholder:text-text-muted/40"
                        placeholder="Private viewing, commission, or general enquiry" />
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">MESSAGE *</label>
                      <textarea name="egassem" required rows={5} autoComplete="off" onFocus={handleFirstInteraction} onChange={handleFirstInteraction}
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 resize-none placeholder:text-text-muted/40"
                        placeholder="Tell us about your interest..." />
                      {state?.errors?.message && <p className="font-(family-name:--font-cormorant) text-sm text-red-500 mt-2 tracking-wide">{state.errors.message[0]}</p>}
                    </div>

                    {state?.message && !state?.success && (
                      <p className="font-(family-name:--font-cormorant) text-sm text-red-500 tracking-wide">{state.message}</p>
                    )}

                    <div className="pt-4">
                      <button type="submit" disabled={pending} className="btn-luxury-filled disabled:opacity-50 disabled:cursor-not-allowed">
                        {pending ? "SENDING..." : "SUBMIT"}
                      </button>
                    </div>
                  </form>
                </FadeInUp>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
