import { Playfair_Display, Cormorant_Garamond, Arsenal, Great_Vibes } from "next/font/google";
import "./globals.css";
import ConditionalShell from "@/components/ConditionalShell";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const arsenal = Arsenal({
  variable: "--font-arsenal",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "ROYAL CHESS DESIGN | The Art of Strategic Elegance",
  description:
    "A curated portfolio of five bespoke chess sets, each a masterwork of design, craftsmanship, and artistic vision. Chess Artists Portfolio.",
  keywords:
    "chess, chess sets, luxury chess, chess artists portfolio, bespoke chess, handcrafted chess",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${cormorant.variable} ${arsenal.variable} ${greatVibes.variable}`}>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
