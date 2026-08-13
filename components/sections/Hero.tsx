import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Wordmark } from "@/components/Wordmark";
import { HERO_CATEGORY, PRIMARY_CTA } from "@/lib/brand";

/**
 * 01 — Hero. One category in full colour, the wordmark big, the primary CTA.
 * Sleep leads.
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-indigo text-bone"
      aria-labelledby="hero-heading"
    >
      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7.25rem)] max-w-[1600px] grid-cols-1 items-center gap-14 px-6 pb-32 pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-10 lg:pb-40 lg:pt-24">
        <div className="max-w-2xl">
          <p className="micro opacity-70">
            01 — The {HERO_CATEGORY.name} range
          </p>

          <h1
            id="hero-heading"
            className="display mt-8 text-[clamp(3.5rem,10vw,7.5rem)]"
          >
            {HERO_CATEGORY.line}
          </h1>

          <p className="mt-9 max-w-md text-[1.0625rem] leading-relaxed opacity-80">
            A fast-dissolving vegan strip that goes straight into your system.
            No water. No pills. One strip, and the night takes it from there.
          </p>

          <div className="mt-12 flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:gap-10">
            <Link
              href={PRIMARY_CTA.href}
              className="micro group inline-flex h-14 items-center gap-3 bg-bone px-8 text-ink transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-white sm:whitespace-nowrap"
            >
              {PRIMARY_CTA.label}
              <span
                aria-hidden="true"
                className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link href="#range" className="micro link-quiet whitespace-nowrap opacity-80">
              See the range
            </Link>
          </div>
        </div>

        <ArtSlot
          variant="sun"
          tint={HERO_CATEGORY.hex}
          brief="the sleep strip, low sun behind, deep indigo"
          className="aspect-4/5 w-full lg:aspect-square"
        />
      </div>

      {/* The wordmark, big and quiet, running off the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 overflow-hidden"
      >
        <Wordmark
          mono
          className="mx-6 block h-[15vw] translate-y-[26%] text-bone/12 lg:mx-10"
        />
      </div>
    </section>
  );
}
