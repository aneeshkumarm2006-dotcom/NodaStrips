import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { TWO_UP } from "@/lib/brand";

/**
 * 10 — Two-up closing cards, on Seed's model: a pair of large image cards
 * with the title set over the photograph and a filled pill CTA beneath.
 */
export function TwoUp() {
  return (
    <section className="bg-bone pb-24 lg:pb-32" aria-label="Where to next">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {TWO_UP.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 120}>
              <article className="relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-2xl p-8 text-bone lg:min-h-[30rem] lg:p-11">
                <div className="absolute inset-0 -z-20">
                  <ArtSlot
                    variant={card.tone === "ink" ? "still" : "sun"}
                    tint={card.tone === "ink" ? "#16130F" : "#128A7C"}
                    showCaption={false}
                    showMark={card.tone !== "ink"}
                    brief={card.brief}
                    className="h-full w-full"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-ink/25 to-transparent"
                />

                {card.eyebrow && (
                  <p className="micro mb-4 opacity-75">{card.eyebrow}</p>
                )}

                <h2 className="display max-w-sm text-[clamp(1.9rem,3.2vw,2.6rem)]">
                  {card.title}
                </h2>

                <Link
                  href={card.href}
                  className="micro mt-8 inline-flex w-fit items-center rounded-full bg-bone px-8 py-4 text-ink transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-white"
                >
                  {card.cta}
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
