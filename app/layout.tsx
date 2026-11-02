import type { Metadata } from "next";
import { Archivo, Cormorant_Garamond, IBM_Plex_Mono } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

/**
 * Archivo carries the interface and body. Its width axis is loaded so the
 * Ralf-style extended caps (`.caps-wide`) come from the same family rather
 * than a fourth face.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

/** The hero serif — the Ralf reference's light, high-contrast Garamond. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

/** Stands in for Seed Sans Mono on the FlashRelease label. */
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

/**
 * The favicon (app/icon.png, app/apple-icon.png) and the share image are
 * the N alone, cut from the custom NODA wordmark — the sunburst mark is
 * no longer used anywhere, per the client's Nov 2026 notes.
 */
export const metadata: Metadata = {
  // Swap for the real domain at launch; needed to resolve social images.
  metadataBase: new URL("https://noda.example"),
  title: "NODA — Sleep and energy, in a strip",
  description:
    "Not a pill. Not a gummy. Fast-dissolving vegan oral strips for sleep and energy — no water, nothing to swallow.",
  openGraph: {
    title: "NODA — Wellness takes a new form",
    description:
      "Not a pill. Not a gummy. Fast-dissolving vegan oral strips for sleep and energy.",
    type: "website",
    images: [{ url: "/brand/og-n.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${cormorant.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
