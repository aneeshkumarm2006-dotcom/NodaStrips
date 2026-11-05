import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/Hero";
import { FontCheck } from "./FontCheck";

/**
 * Hero type tests — not linked from anywhere, and not indexed.
 *
 * Client, Nov 2026, on "Wellness takes a new form": "Can I see some
 * different fonts? Can you try all of these and gather them in a drive
 * folder as a screenshot?" Each page is the real hero with only the
 * headline swapped, so the faces are compared in place.
 *
 * Inter and Montserrat are open fonts and load here from Google Fonts.
 * The other seven are licensed: each page asks for the face by its
 * installed name, so it renders wherever that font is installed — Helvetica
 * Neue, Avenir Next and Futura ship with every Mac — and the corner badge
 * says plainly when a device doesn't have it and is showing a fallback.
 */

const inter = Inter({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const montserrat = Montserrat({ subsets: ["latin"], weight: "400", display: "swap", preload: false });

type Face = { slug: string; name: string; family: string; installed: string; open?: boolean };

const FACES: Face[] = [
  {
    slug: "suisse-intl",
    name: "Suisse Int'l",
    installed: "Suisse Int'l",
    family: `"Suisse Int'l", "Suisse Intl", "SuisseIntl-Regular"`,
  },
  { slug: "sohne", name: "Söhne", installed: "Söhne", family: `"Söhne", "Sohne", "Soehne"` },
  {
    slug: "neue-haas-grotesk",
    name: "Neue Haas Grotesk",
    installed: "Neue Haas Grotesk Display Pro",
    family: `"Neue Haas Grotesk Display Pro", "Neue Haas Grotesk Text Pro", "neue-haas-grotesk-display", "NHaasGroteskDSPro-55Rg"`,
  },
  { slug: "inter", name: "Inter", installed: "", family: inter.style.fontFamily, open: true },
  { slug: "avenir-next", name: "Avenir Next", installed: "Avenir Next", family: `"Avenir Next", "AvenirNext-Regular"` },
  { slug: "montserrat", name: "Montserrat", installed: "", family: montserrat.style.fontFamily, open: true },
  { slug: "gotham", name: "Gotham", installed: "Gotham", family: `"Gotham", "Gotham Book", "Gotham-Book"` },
  {
    slug: "helvetica-neue",
    name: "Helvetica Neue",
    installed: "Helvetica Neue",
    family: `"Helvetica Neue", "HelveticaNeue"`,
  },
  { slug: "futura", name: "Futura", installed: "Futura", family: `"Futura", "Futura PT", "futura-pt"` },
];

/** A neutral, clearly different fallback, so a missing face is obvious */
const FALLBACK = `ui-monospace, "Courier New", monospace`;

export function generateStaticParams() {
  return FACES.map((f) => ({ font: f.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/type-test/[font]">): Promise<Metadata> {
  const { font } = await params;
  const face = FACES.find((f) => f.slug === font);
  return {
    title: `Hero type test — ${face?.name ?? "?"} — NODA`,
    robots: { index: false, follow: false },
  };
}

export default async function TypeTestPage({ params }: PageProps<"/type-test/[font]">) {
  const { font } = await params;
  const index = FACES.findIndex((f) => f.slug === font);
  if (index < 0) notFound();
  const face = FACES[index];

  return (
    <>
      <Hero headlineFont={`${face.family}, ${FALLBACK}`} />

      {/* The label and switcher — hidden when screenshotting */}
      <aside
        data-type-test
        className="fixed bottom-4 left-1/2 z-[60] flex max-w-[calc(100vw-2rem)] -translate-x-1/2 flex-wrap items-center justify-center gap-1.5 rounded-2xl bg-white/90 p-2 text-cocoa shadow-[0_18px_40px_-18px_rgba(32,26,19,0.45)] backdrop-blur"
      >
        <span className="px-2 text-sm font-medium">
          {index + 1}/{FACES.length} · {face.name}
        </span>
        <FontCheck installed={face.installed} open={face.open ?? false} />
        {FACES.map((f) => (
          <Link
            key={f.slug}
            href={`/type-test/${f.slug}`}
            className={`rounded-full px-2.5 py-1 text-xs ${
              f.slug === face.slug ? "bg-cocoa text-white" : "hover:bg-cocoa/10"
            }`}
          >
            {f.name}
          </Link>
        ))}
      </aside>
    </>
  );
}
