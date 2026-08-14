import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { SCIENCE_TEASER as T } from "@/lib/brand";

/**
 * 07 — Science teaser, on Seed's "You are more than human" model: a bracketed
 * brand label, a large claim, a short paragraph, a pill CTA, and a scientific
 * illustration in a panel on the right.
 */
export function ScienceTeaser() {
  return (
    <section className="bg-bone py-24 lg:py-32" aria-labelledby="science-heading">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal>
          <p className="micro text-ink-soft">{T.label}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <Reveal>
            <h2
              id="science-heading"
              className="display text-[clamp(2.25rem,4.5vw,3.5rem)]"
            >
              {T.title}
            </h2>

            <p className="prose-quiet mt-8 max-w-md text-ink-soft">{T.body}</p>

            <Link
              href={T.href}
              className="micro group mt-10 inline-flex items-center gap-2.5 rounded-full bg-brand px-8 py-4 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-brand-deep"
            >
              {T.cta}
              <span
                aria-hidden="true"
                className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <p className="micro mt-16 text-ink-soft opacity-70">{T.footLabel}</p>
          </Reveal>

          <Reveal delay={120}>
            <ArtSlot
              variant="field"
              onDark
              showMark={false}
              brief="illustration — the body clock, brand"
              className="aspect-4/3 w-full rounded-2xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
