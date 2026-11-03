import type { Metadata } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
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

/** Figtree stands in for Arrae's Proxima Nova — body, labels, buttons. */
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
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
      className={`${instrument.variable} ${figtree.variable} h-full antialiased`}
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
