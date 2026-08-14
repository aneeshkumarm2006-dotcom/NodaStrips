import { Reveal } from "@/components/Reveal";
import { INGREDIENTS } from "@/lib/brand";

/**
 * 03 — What's inside. The section that buys credibility: the formula
 * listed plainly, doses shown, nothing hidden behind a "proprietary blend".
 */
export function Inside() {
  return (
    <section
      id="ingredients"
      className="bg-bone-deep py-28 lg:py-40"
      aria-labelledby="inside-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <p className="micro text-ink-soft">03 — What’s inside</p>
          <h2
            id="inside-heading"
            className="display mt-8 text-[clamp(2.75rem,6vw,4.75rem)]"
          >
            Five things.
            <br />
            All of them listed.
          </h2>
          <p className="prose-quiet mt-8 max-w-lg text-ink-soft">
            No proprietary blend, no hidden quantities. If it is in the strip it
            is on this page, with the dose beside it.
          </p>
        </Reveal>

        <ul className="mt-20 border-t border-hairline">
          {INGREDIENTS.map((ing, i) => (
            <Reveal as="li" key={ing.name} delay={i * 80}>
              <div className="grid grid-cols-1 items-baseline gap-2 border-b border-hairline py-8 md:grid-cols-[1fr_7rem_1.4fr] md:gap-10">
                <h3 className="display text-[1.75rem] leading-tight">
                  {ing.name}
                </h3>
                <p className="micro text-ink-soft tabular-nums">{ing.dose}</p>
                <p className="max-w-md leading-relaxed text-ink-soft">
                  {ing.role}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={420}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-soft opacity-70">
            Placeholder formulation. Doses, ingredients and any claim made about
            them are unapproved and require regulatory review before launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
