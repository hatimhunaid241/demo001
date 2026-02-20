import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start mb-8">
              <span className="font-[family-name:var(--font-playfair)] text-xl font-semibold tracking-[0.3em] text-white">
                CHESS
              </span>
              <span className="font-[family-name:var(--font-playfair)] text-[10px] tracking-[0.5em] text-gold-light -mt-1">
                MASTER
              </span>
            </div>
            <p className="font-[family-name:var(--font-cormorant)] text-[15px] leading-relaxed text-white/50 text-center md:text-left max-w-xs">
              Five bespoke chess sets, each a masterwork of design,
              craftsmanship, and artistic vision.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center">
            <h4 className="font-[family-name:var(--font-playfair)] text-[11px] tracking-[0.3em] text-gold mb-8">
              NAVIGATION
            </h4>
            <div className="flex flex-col items-center gap-5">
              {[
                { href: "/", label: "HOME" },
                { href: "/portfolio", label: "PORTFOLIO" },
                { href: "/contact", label: "CONTACT" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-[family-name:var(--font-cormorant)] text-[13px] tracking-[0.2em] text-white/50 hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-[family-name:var(--font-playfair)] text-[11px] tracking-[0.3em] text-gold mb-8">
              ENQUIRIES
            </h4>
            <div className="flex flex-col items-center md:items-end gap-4">
              <a
                href="mailto:atelier@chessmaster.com"
                className="font-[family-name:var(--font-cormorant)] text-[13px] tracking-[0.15em] text-white/50 hover:text-gold transition-colors duration-300"
              >
                atelier@chessmaster.com
              </a>
              <a
                href="tel:+11234567890"
                className="font-[family-name:var(--font-cormorant)] text-[13px] tracking-[0.15em] text-white/50 hover:text-gold transition-colors duration-300"
              >
                +1 (123) 456-7890
              </a>
              <div className="flex items-center gap-6 mt-4">
                {/* Instagram */}
                <a
                  href="#"
                  className="text-white/40 hover:text-gold transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="17.5" cy="6.5" r="1" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  className="text-white/40 hover:text-gold transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-[family-name:var(--font-cormorant)] text-[11px] tracking-[0.2em] text-white/30">
              © {new Date().getFullYear()} CHESS MASTER. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="#"
                className="font-[family-name:var(--font-cormorant)] text-[11px] tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors duration-300"
              >
                PRIVACY POLICY
              </Link>
              <Link
                href="#"
                className="font-[family-name:var(--font-cormorant)] text-[11px] tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors duration-300"
              >
                TERMS OF USE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
