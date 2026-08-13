import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

/**
 * TAN Ashiord stand-in.
 *
 * TAN Ashiord is licensed and the files are still to be supplied. When they
 * arrive, swap this for a next/font/local declaration keeping the same
 * `variable` name — nothing downstream changes.
 */
const display = Bodoni_Moda({
  variable: "--font-tan-ashiord",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
      className={`${display.variable} ${archivo.variable} h-full antialiased`}
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
