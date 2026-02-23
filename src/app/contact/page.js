"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FadeInUp, FadeIn, DividerReveal } from "@/components/Animations";
import { HeroSection } from "@/components/HeroImage";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would send to a backend
    setSubmitted(true);
  };

  return (
    <>
      {/* ═══════════════ HERO BANNER ═══════════════ */}
      <HeroSection
        // src="https://images.unsplash.com/photo-1560174038-da43ac74f01b?w=1920&q=85"
        src="/heroImages/contact.jpg"
        alt="Contact us"
        overlayClass="bg-gradient-to-b from-white/40 via-white/90 to-white/50"
        height="h-[65vh] md:h-[75vh]">
        <div className="text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-(family-name:--font-cormorant) text-[11px] md:text-[13px] tracking-[0.5em] text-gold uppercase block mb-6">
            Get In Touch
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              Elegance speaks softly. Whether you are a collector drawn to the extraordinary, a
              connoisseur of fine craftsmanship, or simply someone who believes in the art of the
              game — we welcome the beginning of a meaningful conversation. Every great
              collaboration starts with a single move.
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
                  Reach Out To Us
                </h2>
              </FadeInUp>

              <DividerReveal className="mb-10" />

              <FadeInUp delay={0.2}>
                <p className="font-(family-name:--font-cormorant) text-base md:text-lg leading-relaxed text-text-secondary font-light mb-12">
                  We believe that true artistry resides in connection. If you feel drawn to our
                  vision and wish to learn more about our collections, arrange a private viewing, or
                  discuss a bespoke commission, please reach out. Every meaningful collaboration
                  begins with a thoughtful conversation.
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
                      href="mailto:info@royalchessdesign.com"
                      className="font-(family-name:--font-cormorant) text-base text-text-secondary font-light hover:text-gold transition-colors duration-300">
                      info@royalchessdesign.com
                    </a>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.35}>
                  <div>
                    <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                      TELEPHONE
                    </h4>
                    <a className="font-(family-name:--font-cormorant) text-base text-text-secondary font-light duration-300">
                      Available upon request
                    </a>
                  </div>
                </FadeInUp>

                <FadeInUp delay={0.4}>
                  <div>
                    <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                      FOLLOW US
                    </h4>
                    <div className="flex items-center gap-6">
                      <a
                        href="https://www.instagram.com/royalchessdesign/"
                        target="_blank"
                        className="text-text-muted hover:text-gold transition-colors duration-300"
                        aria-label="Instagram">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="17.5" cy="6.5" r="1" />
                        </svg>
                      </a>
                      <a
                        href="https://www.linkedin.com/in/david-de-jong-55913922/"
                        target="_blank"
                        className="text-text-muted hover:text-gold transition-colors duration-300"
                        aria-label="LinkedIn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                          <rect x="2" y="9" width="4" height="12" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      </a>
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

              {submitted ? (
                <FadeIn>
                  <div className="text-center py-16">
                    <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-gold flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#B8860B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-(family-name:--font-playfair) text-2xl tracking-widest text-charcoal mb-4">
                      Thank You
                    </h3>
                    <p className="font-(family-name:--font-cormorant) text-lg text-text-secondary font-light mb-8">
                      Your message has been received. We will be in touch shortly.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="btn-luxury">
                      SEND ANOTHER
                    </button>
                  </div>
                </FadeIn>
              ) : (
                <FadeInUp delay={0.2}>
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">
                        NAME *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 placeholder:text-text-muted/40"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 placeholder:text-text-muted/40"
                        placeholder="Your email address"
                      />
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">
                        SUBJECT
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 placeholder:text-text-muted/40"
                        placeholder="Private viewing, commission, or general enquiry"
                      />
                    </div>

                    <div>
                      <label className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.3em] text-text-muted uppercase block mb-3">
                        MESSAGE *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-transparent border-b border-medium-gray pb-3 text-charcoal font-(family-name:--font-cormorant) text-base focus:border-gold transition-colors duration-300 resize-none placeholder:text-text-muted/40"
                        placeholder="Tell us about your interest..."
                      />
                    </div>

                    <div className="pt-4">
                      <button type="submit" className="btn-luxury-filled">
                        SUBMIT
                      </button>
                    </div>
                  </form>
                </FadeInUp>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MAP / CITIES SECTION ═══════════════ */}
      {/* <section className="py-20 md:py-28 bg-white border-t border-medium-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20">
          <FadeInUp className="text-center mb-16">
            <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.5em] text-gold uppercase block mb-8">
              VISIT US
            </span>
            <h2 className="font-(family-name:--font-playfair) text-2xl md:text-3xl font-normal tracking-widest text-charcoal">
              Our Presence
            </h2>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">
            <FadeInUp delay={0.1}>
              <div>
                <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                  EUROPE
                </h4>
                <h3 className="font-(family-name:--font-playfair) text-lg tracking-[0.15em] text-charcoal mb-3">
                  LONDON
                </h3>
                <p className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light leading-relaxed">
                  42 King&apos;s Road
                  <br />
                  Chelsea, SW3 4UD
                  <br />
                  +44 (0) 20 1234 5678
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div>
                <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                  UNITED STATES
                </h4>
                <h3 className="font-(family-name:--font-playfair) text-lg tracking-[0.15em] text-charcoal mb-3">
                  NEW YORK
                </h3>
                <p className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light leading-relaxed">
                  680 Madison Avenue
                  <br />
                  New York, NY 10065
                  <br />
                  +1 (212) 555-0192
                </p>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div>
                <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold uppercase mb-4">
                  MIDDLE EAST
                </h4>
                <h3 className="font-(family-name:--font-playfair) text-lg tracking-[0.15em] text-charcoal mb-3">
                  DUBAI
                </h3>
                <p className="font-(family-name:--font-cormorant) text-sm text-text-secondary font-light leading-relaxed">
                  DIFC, Gate Village
                  <br />
                  Building 5, Dubai
                  <br />
                  +971 4 818 7274
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section> */}
    </>
  );
}
