import type { Metadata } from "next";
import { Figtree, Instrument_Serif, STIX_Two_Text } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

/**
 * Two families, the way Arrae runs theirs — a serif for every heading and
 * one sans for everything else (client, Nov 2026: "let's use consistent
 * font choices… they have 2 font choices and it looks very cohesive and
 * premium").
 *
 * Instrument Serif stands in for Arrae's Cardinal Fruit: condensed, high
 * contrast, one weight, with an italic that does the emphasis.
 */
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * STIX Two Text, for the hero's type only — the tagline (client, Nov
 * 2026: "can you try stix two text font for the hero image's tagline"),
 * then the headline as well. Upright for the headline, italic for the
 * tagline; not
 * preloaded, as it is a single line.
 */
const stix = STIX_Two_Text({
  variable: "--font-stix",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
});

/** Figtree stands in for Arrae's Proxima Nova — body, labels, buttons. */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

/**
 * The favicon (app/icon.png, app/apple-icon.png) is the "n" of the noda™
 * wordmark, cut from the client's file (Nov 2026: "change tab N to our
 * noda n"). The share image is still the old serif N.
 */
export const metadata: Metadata = {
  // Swap for the real domain at launch; needed to resolve social images.
  metadataBase: new URL("https://noda.example"),
  title: "NODA — Sleep, energy & focus, in a strip",
  description:
    "Not a pill. Not a gummy. Fast-dissolving vegan oral strips for sleep, and for energy & focus — no water, nothing to swallow.",
  openGraph: {
    title: "NODA — Wellness takes a new form",
    description:
      "Not a pill. Not a gummy. Fast-dissolving vegan oral strips for sleep, and for energy & focus.",
    type: "website",
    images: [{ url: "/brand/og-n.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Keeps the smooth in-page scroll for anchors, but lets route changes
      // (the hero CTA now goes to /shop) jump straight to the top.
      data-scroll-behavior="smooth"
      className={`${instrument.variable} ${figtree.variable} ${stix.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
