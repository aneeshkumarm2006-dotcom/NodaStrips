"use client";

import { useRef } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { ClaimIcon, type ClaimIconName } from "@/components/ClaimIcon";
import { Reveal } from "@/components/Reveal";
import { SCIENCE_STRIP as S } from "@/lib/brand";

/** One glyph per badge, in the order the badges are declared. */
const BADGE_ICONS: ClaimIconName[] = ["leaf", "nowater", "nosugar", "dose"];

/**
 * Science in a strip.
 *
 * Laid out like the reference the client supplied, which is two columns
 * rather than stacked bands:
 *
 *   LEFT   heading set large on two lines, one intro paragraph beneath it,
 *          then the feature badges in a 2×2 grid with icons
 *   RIGHT  the ingredient cards as a horizontal rail that runs off the
 *          edge — image on top, then name, benefit tags and mechanism
 *
 * The earlier version stacked these full width, which is what the client
 * marked as not matching.
 */
export function ScienceStrip() {
  const rail = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      id="ingredients"
      className="overflow-hidden bg-bone py-24 lg:py-32"
      aria-labelledby="science-strip-heading"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 lg:grid-cols-[minmax(20rem,26rem)_1fr] lg:gap-14 lg:px-10">
        {/* ------------------------------------------- left column */}
        <Reveal className="lg:pt-2">
          <h2
            id="science-strip-heading"
            className="display text-[clamp(2.5rem,5vw,3.75rem)] font-semibold uppercase leading-[0.95]"
          >
            science
            <br />
            in a strip
          </h2>

          <p className="mt-7 max-w-sm leading-relaxed text-ink-soft">{S.intro}</p>

          {/* Badges, 2×2 as the reference has them */}
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5">
            {S.badges.map((badge, i) => (
              <li key={badge} className="flex items-center gap-3 text-ink-soft">
                <ClaimIcon
                  name={BADGE_ICONS[i] ?? "leaf"}
                  className="h-7 w-7 border-0"
                />
                <span className="micro leading-tight">{badge}</span>
              </li>
            ))}
          </ul>

          {/* Rail controls */}
          <div className="mt-10 hidden gap-3 lg:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              aria-label="Previous ingredient"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink/5"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              aria-label="Next ingredient"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink/5"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </Reveal>

        {/* ------------------------------- right: the ingredient rail */}
        <Reveal delay={120} className="min-w-0">
          <ul
            ref={rail}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {S.ingredients.map((ing, i) => (
              <li
                key={ing.name}
                className="w-[74vw] shrink-0 snap-start sm:w-[20rem] lg:w-[17.5rem]"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-xl border border-hairline bg-bone-deep">
                  <ArtSlot
                    variant={i % 2 === 0 ? "macro" : "field"}
                    onDark={i % 2 !== 0}
                    showCaption={false}
                    showMark={false}
                    brief={ing.brief}
                    className="aspect-4/3 w-full"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="micro text-[0.8125rem] tracking-[0.12em]">
                        {ing.name}
                      </h3>
                      <span className="micro tabular-nums text-ink-soft">
                        {ing.dose}
                      </span>
                    </div>

                    <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
                      {ing.tags.map((tag) => (
                        <li
                          key={tag}
                          className="micro text-[0.5625rem] text-ink-soft"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                      {ing.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-soft opacity-70">
            Placeholder formulation. Doses, ingredients and every claim made
            about them are unapproved and require regulatory review before
            launch.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
