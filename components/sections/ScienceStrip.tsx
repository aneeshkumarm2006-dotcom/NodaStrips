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
 * Built to measurements taken off the reference's science page, not from a
 * screenshot:
 *
 *   LEFT COLUMN  ~405px. Heading 70px / 700 / uppercase with a 66px line
 *                height, so it sets closed-up. The intro sits well down the
 *                column rather than tight under the heading. Badges 2×2.
 *
 *   RIGHT COLUMN cards 435×519. Photograph on top, then a #F5F5F5 panel
 *                with 20px padding and a 0 0 10px 10px radius, carrying a
 *                40px bold uppercase name, white pill tags (14px, radius
 *                30px, 5px/15px padding) and a 14px description.
 *
 * The reference has two product cards because it sells two products. We have
 * one product and five ingredients, so the same card runs as a rail.
 */
export function ScienceStrip() {
  const rail = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      id="ingredients"
      className="overflow-hidden bg-bone py-24 lg:py-32"
      aria-labelledby="science-strip-heading"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 px-6 lg:grid-cols-[25.5rem_1fr] lg:gap-14 lg:px-10">
        {/* ------------------------------------------- left column */}
        <Reveal className="flex flex-col">
          <h2
            id="science-strip-heading"
            className="display text-[clamp(3rem,5.6vw,4.375rem)] font-bold uppercase leading-[0.94] tracking-[-0.02em]"
          >
            science
            <br />
            in a strip
          </h2>

          {/* The reference drops the intro well below the heading rather
              than setting it tight underneath */}
          <p className="mt-14 max-w-[25rem] text-[1.0625rem] leading-relaxed text-ink-soft lg:mt-auto">
            {S.intro}
          </p>

          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5">
            {S.badges.map((badge, i) => (
              <li key={badge} className="flex items-center gap-3">
                <ClaimIcon
                  name={BADGE_ICONS[i] ?? "leaf"}
                  className="h-6 w-6 shrink-0 border-0"
                />
                <span className="text-[0.8125rem] font-medium uppercase leading-tight tracking-[0.04em]">
                  {badge}
                </span>
              </li>
            ))}
          </ul>

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
            className="flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {S.ingredients.map((ing, i) => (
              <li
                key={ing.name}
                className="w-[82vw] shrink-0 snap-start sm:w-[24rem] lg:w-[27rem]"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-[10px]">
                  <ArtSlot
                    variant={i % 2 === 0 ? "macro" : "field"}
                    onDark={i % 2 !== 0}
                    showCaption={false}
                    showMark={false}
                    brief={ing.brief}
                    className="h-[18.75rem] w-full shrink-0"
                  />

                  {/* The reference's panel: #F5F5F5, 20px, rounded only at
                      the foot so it reads as one piece with the photograph */}
                  <div className="flex flex-1 flex-col rounded-b-[10px] bg-[#F5F5F5] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="display text-[2.5rem] font-bold uppercase leading-[0.94] tracking-[-0.02em]">
                        {ing.name}
                      </h3>
                      <span className="micro shrink-0 pt-2 tabular-nums text-ink-soft">
                        {ing.dose}
                      </span>
                    </div>

                    <ul className="mt-4 flex flex-wrap gap-2">
                      {ing.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-[30px] bg-white px-[15px] py-[5px] text-[0.875rem] uppercase leading-none tracking-[0.02em]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-ink-soft">
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
