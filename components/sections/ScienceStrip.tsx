import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { SCIENCE_STRIP as S } from "@/lib/brand";

/**
 * Science in a strip.
 *
 * Built to the structure of the reference the client supplied: a large
 * display heading, one intro line, a row of feature badges, then ingredient
 * cards each carrying an image, benefit tags and a mechanism sentence.
 *
 * Replaces the old ingredients table — same ingredients, more legible, and
 * it does the persuading the table never did.
 */
export function ScienceStrip() {
  return (
    <section
      id="ingredients"
      className="bg-bone py-24 lg:py-32"
      aria-labelledby="science-strip-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Reveal>
            <h2
              id="science-strip-heading"
              className="display text-[clamp(2.5rem,6vw,4.5rem)] lowercase"
            >
              {S.heading}
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="prose-quiet max-w-md text-ink-soft">{S.intro}</p>
          </Reveal>
        </div>

        {/* Feature badges */}
        <Reveal delay={150}>
          <ul className="mt-12 flex flex-wrap gap-x-3 gap-y-3 border-t border-hairline pt-10">
            {S.badges.map((badge) => (
              <li
                key={badge}
                className="micro rounded-full border border-hairline bg-bone-deep px-4 py-2.5 text-ink-soft"
              >
                {badge}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Ingredient cards */}
        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {S.ingredients.map((ing, i) => (
            <Reveal as="li" key={ing.name} delay={i * 90}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-bone-deep">
                <ArtSlot
                  variant={i % 2 === 0 ? "macro" : "field"}
                  onDark={i % 2 !== 0}
                  showCaption={false}
                  showMark={false}
                  brief={ing.brief}
                  className="aspect-16/10 w-full"
                />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="display text-[1.35rem] leading-tight">
                      {ing.name}
                    </h3>
                    <span className="micro tabular-nums text-ink-soft">
                      {ing.dose}
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {ing.tags.map((tag) => (
                      <li
                        key={tag}
                        className="micro rounded-full bg-brand/10 px-2.5 py-1 text-[0.5625rem] text-brand-deep"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 flex-1 text-sm leading-relaxed text-ink-soft">
                    {ing.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={480}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-soft opacity-70">
            Placeholder formulation. Doses, ingredients and every claim made
            about them are unapproved and require regulatory review before
            launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
