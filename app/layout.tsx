import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { Announcement } from "@/components/Announcement";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

/**
 * One family, both roles.
 *
 * Headlines were previously TAN Ashiord (stood in by Bodoni Moda), per the
 * direction document. The reference site sets its headlines in a grotesque
 * sans, so display now points at Archivo too — see app/globals.css.
 *
 * To go back to a serif display face, add it here with the variable name
 * `--font-display` consumed by the `.display` class.
 */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Swap for the real domain at launch; needed to resolve social images.
  metadataBase: new URL("https://noda.example"),
  title: "NODA — Vegan oral wellness strips",
  description:
    "Fast-dissolving vegan oral strips for daily wellness. No water, no pills — one strip straight into your system. Sleep leads the range.",
  openGraph: {
    title: "NODA — Where better days begin",
    description:
      "No water, no pills. One strip straight into your system. Melt into rest.",
    type: "website",
    images: [{ url: "/brand/logo-card-dark.png", width: 1600, height: 1600 }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          {/* Announcement sits above the sticky header and scrolls away */}
          <Announcement />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
