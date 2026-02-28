import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-white text-charcoal">
      {/* Top Separator */}
      <div className="flex justify-center">
        <div className="w-3/4 md:w-1/2 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
      </div>
      {/* Main Footer */}
      <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
          {/* Brand Column */}
          <div className="flex flex-col items-center md:items-start">
            <Logo className="items-center mb-8" />
            <p className="font-(family-name:--font-cormorant) text-[15px] leading-relaxed text-text-muted text-center md:text-left max-w-xs">
              Five bespoke chess sets, each a masterwork of design, craftsmanship, and artistic
              vision.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col items-center">
            <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold mb-8">
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
                  className="font-(family-name:--font-cormorant) text-[13px] tracking-[0.2em] text-text-muted hover:text-gold transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="font-(family-name:--font-playfair) text-[11px] tracking-[0.3em] text-gold mb-8">
              ENQUIRIES
            </h4>
            <div className="flex flex-col items-center md:items-end gap-4">
              <a
                href="mailto:info@royalchessdesign.com"
                className="font-(family-name:--font-cormorant) text-[13px] tracking-[0.15em] text-text-muted hover:text-gold transition-colors duration-300">
                info@royalchessdesign.com
              </a>
              <div className="flex items-center gap-6 mt-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/royalchessdesign/"
                  target="_blank"
                  className="text-text-muted hover:text-gold transition-colors duration-300"
                  aria-label="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/david-de-jong-55913922/"
                  target="_blank"
                  className="text-text-muted hover:text-gold transition-colors duration-300"
                  aria-label="LinkedIn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-medium-gray">
        <div className="max-w-350 mx-auto px-6 md:px-12 lg:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.2em] text-text-muted">
              © {new Date().getFullYear()} ROYAL CHESS DESIGN. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-8">
              <Link
                href="/privacy-policy"
                className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.15em] text-text-muted hover:text-text-secondary transition-colors duration-300">
                PRIVACY POLICY
              </Link>
              <Link
                href="/terms-of-use"
                className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.15em] text-text-muted hover:text-text-secondary transition-colors duration-300">
                TERMS OF USE
              </Link>
              <Link
                href="/cookie-policy"
                className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.15em] text-text-muted hover:text-text-secondary transition-colors duration-300">
                COOKIE POLICY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
