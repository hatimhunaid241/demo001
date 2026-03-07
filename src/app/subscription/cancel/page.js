import Image from "next/image";
import Link from "next/link";
import { unsubscribeUser } from "@/actions/newsletter";

export const metadata = {
  title: "Unsubscribed",
  robots: { index: false, follow: false },
};

export default async function CancelPage({ searchParams }) {
  const { id } = await searchParams;
  const result = await unsubscribeUser(id);

  const isError = result?.error;
  const alreadyDone = result?.alreadyUnsubscribed;

  return (
    <div className="fixed inset-0 bg-warm-gray flex items-center justify-center overflow-hidden">
      {/* Watermark logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <Image src="/logo.png" alt="" width={600} height={600}
          className="opacity-[0.04] w-[min(70vw,70vh)]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <span className="font-(family-name:--font-cormorant) text-[11px] tracking-[0.55em] text-gold uppercase block mb-8">
          Royal Chess Design
        </span>

        {isError ? (
          <>
            <h1 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.12em] text-charcoal mb-6">
              Invalid Link
            </h1>
            <div className="h-px w-16 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light leading-relaxed text-text-secondary mb-12">
              This unsubscribe link is invalid or could not be found.
            </p>
          </>
        ) : alreadyDone ? (
          <>
            <h1 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.12em] text-charcoal mb-6">
              Already Unsubscribed
            </h1>
            <div className="h-px w-16 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light leading-relaxed text-text-secondary mb-12">
              This email address has already been removed from our mailing list.
            </p>
          </>
        ) : (
          <>
            <h1 className="font-(family-name:--font-playfair) text-3xl md:text-4xl font-normal tracking-[0.12em] text-charcoal mb-6">
              Unsubscribed
            </h1>
            <div className="h-px w-16 bg-linear-to-r from-transparent via-gold to-transparent mx-auto mb-8" />
            <p className="font-(family-name:--font-cormorant) text-lg md:text-xl font-light leading-relaxed text-text-secondary mb-12">
              You have been successfully removed from the Royal Chess Design mailing list.
              We are sorry to see you go.
            </p>
          </>
        )}

        <Link href="/" className="btn-luxury">RETURN TO ATELIER</Link>
      </div>
    </div>
  );
}
