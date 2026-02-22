import Image from "next/image";

export default function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <Image src="/logo.png" alt="Logo" width={40} height={40} className="h-10 w-auto" />
      <div className="flex flex-col">
        <div className="flex items-baseline text-3xl text-charcoal">
          <span className="font-(family-name:--font-arsenal) font-bold">David</span>
          <span className="font-(family-name:--font-arsenal) font-normal text-[0.8em]">e</span>
          <span className="font-(family-name:--font-arsenal) font-normal">&nbsp;Jong</span>
        </div>
        <span className="font-(family-name:--font-playfair) text-xs tracking-[0.2em] text-gold -mt-1">
          CHESS DESIGNER
        </span>
      </div>
    </div>
  );
}
