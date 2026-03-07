import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 bg-warm-gray flex items-center justify-center overflow-hidden">
      {/* Watermark logo */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <Image
          src="/logo.png"
          alt=""
          width={600}
          height={600}
          className="opacity-[0.04] w-[min(70vw,70vh)]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.55em] text-gold uppercase block mb-8">
          Royal Chess Design
        </span>

        <p className="font-(family-name:--font-cormorant) text-[clamp(6rem,18vw,10rem)] font-light leading-none tracking-widest text-charcoal/10 select-none mb-4">
          404
        </p>

        <h1 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.12em] text-charcoal mb-6">
          Page Not Found
        </h1>

        <div className="h-px w-16 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

        <p className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light leading-relaxed text-text-secondary mb-12">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link href="/" className="btn-luxury">
          RETURN TO ATELIER
        </Link>
      </div>
    </div>
  );
}
