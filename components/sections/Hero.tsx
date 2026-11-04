import { ArtSlot } from "@/components/ArtSlot";
import { StripDoorway } from "@/components/StripDoorway";
import { HERO } from "@/lib/brand";

/**
 * 01 — Hero, after the Ralf reference: a full-bleed photograph, the
 * header floating over it, and one centred column of type.
 *
 * The information is laid out as the client's mockup has it; the type is
 * Ralf's:
 *   · "Not a pill. Not a gummy." — the size of Ralf's "The Comfort of
 *     Home. The Luxury of Elsewhere.", set in STIX Two Text italic, per
 *     the client's Nov 2026 typography note (a touch smaller than the
 *     serif it replaces, since STIX sets wider);
 *   · "Wellness takes a new form" — built like Ralf's "BIENVENUE": light
 *     serif capitals, wide open tracking — but smaller, as asked;
 *   · the button and the line beneath it in Ralf's extended, widely
 *     tracked caps, and "Discover more ↓" in small serif capitals.
 *
 * The button opens the strip doorway (see StripDoorway) and lands on the
 * shop — its own page, as Mondays' "Our Products" is, rather than the
 * section under the hero (client, Nov 2026).
 */
export function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden text-cream"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 -z-20">
        <ArtSlot
          variant="still"
          brief="hero — warm wall, leaf shadow, sleep carton"
          showCaption={false}
          sizes="100vw"
          className="h-full w-full"
        />
      </div>

      {/* A soft, warm darkening behind the column, and a little at the top
          for the header — the wall is bright enough to swallow cream type
          without it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 55% at 46% 48%, rgba(60,38,20,0.32) 0%, rgba(60,38,20,0.12) 60%, transparent 100%), linear-gradient(180deg, rgba(40,26,14,0.28) 0%, transparent 22%, transparent 78%, rgba(40,26,14,0.22) 100%)",
        }}
      />

      <div className="mx-auto flex min-h-svh max-w-[1600px] flex-col items-center px-6 pb-10 pt-[calc(5rem+3rem)] text-center lg:px-10">
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="font-tagline text-[clamp(1.375rem,2.1vw,2.125rem)] italic leading-tight tracking-[-0.005em] [text-shadow:0_1px_18px_rgba(40,24,10,0.25)]">
            {HERO.tagline}
          </p>

          <h1
            id="hero-heading"
            className="mt-[clamp(0.9rem,1.6vw,1.6rem)] font-serif text-[clamp(2.15rem,5.6vw,5.75rem)] uppercase leading-[0.98] tracking-[0.03em] [text-shadow:0_2px_30px_rgba(40,24,10,0.22)] sm:tracking-[0.05em]"
          >
            {HERO.title[0]}
            <br />
            {HERO.title[1]}
          </h1>

          <StripDoorway
            href="/shop"
            className="caps-wide mt-[clamp(2.25rem,4vw,3.75rem)] inline-flex items-center justify-center border border-cocoa/70 bg-oat px-[clamp(2rem,3.4vw,3.25rem)] py-[1.15rem] text-cocoa transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-cocoa hover:text-cream"
          >
            {HERO.cta}
          </StripDoorway>
        </div>

        <p className="caps-wide mt-14 text-[0.8125rem] tracking-[0.45em]">
          {HERO.eyebrow}
        </p>

        <a
          href="#products"
          className="caps-wide group mt-7 flex flex-col items-center gap-2 text-[0.6875rem] text-cream/85 transition-colors hover:text-cream"
        >
          {HERO.more}
          <span
            aria-hidden="true"
            className="text-lg leading-none transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-y-1"
          >
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}
