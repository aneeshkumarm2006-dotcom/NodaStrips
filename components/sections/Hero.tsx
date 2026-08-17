import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { PRODUCT } from "@/lib/brand";

/**
 * 01 — Hero, on the reference site's model: a high-key photograph with the
 * product right of centre, and the copy set in dark type over the bright,
 * empty left third. One filled pill plus one underlined text link.
 *
 * A soft bone scrim sits over the left so the type stays legible whatever
 * photograph lands here later.
 */
export function Hero() {
  return (
    // Pulled up under the sticky header (5rem tall) so the capsules float
    // on the photograph. The announcement bar above stays in flow.
    <section
      className="relative isolate -mt-20 overflow-hidden rounded-b-[2rem] text-brand-deep"
      aria-labelledby="hero-heading"
    >
      {/* The photograph. ArtSlot positions itself, so it is wrapped rather
          than given an `absolute` that would collide with its own class. */}
      <div className="absolute inset-0 -z-20">
        <ArtSlot
          variant="still"
          brief="the strips on a bedside table, low evening light"
          showCaption={false}
          className="h-full w-full"
        />
      </div>

      {/* Scrim — light, not dark, so dark type reads over a high-key image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-bone via-bone/70 to-transparent lg:via-bone/45"
      />

      <div className="mx-auto flex min-h-svh max-w-[1600px] flex-col justify-center px-6 pb-28 pt-[calc(5rem+4rem)] lg:px-10">
        <div className="max-w-2xl">
          <h1
            id="hero-heading"
            className="display text-[clamp(2.5rem,5vw,4.25rem)]"
          >
            A better night, built
            <br />
            around how you absorb.
          </h1>

          <p className="prose-quiet mt-7 max-w-md text-ink-soft">
            {PRODUCT.subtitle} One strip, thirty minutes before bed.
          </p>

          <div className="mt-11 flex flex-wrap items-center gap-x-9 gap-y-4">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-brand-deep px-9 py-4 text-[0.9375rem] text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
            >
              Shop the strip
            </Link>

            <Link
              href="/science"
              className="group inline-flex items-center gap-2.5 text-[0.9375rem]"
            >
              <span className="underline decoration-1 underline-offset-[6px]">
                How it works
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
