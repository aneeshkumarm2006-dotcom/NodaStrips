"use client";

import { useRef } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/brand";

/**
 * 08 — Member stories, on Seed's model: a centred heading and a horizontal
 * carousel of portrait cards with arrows beneath.
 *
 * Native scroll with snap points rather than a JS slider, so it stays
 * swipeable, keyboard-scrollable and trivial to rebuild in Liquid.
 */
export function Testimonials() {
  const track = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      className="overflow-hidden bg-bone py-24 lg:py-32"
      aria-labelledby="stories-heading"
    >
      <Reveal className="mx-auto max-w-[1600px] px-6 text-center lg:px-10">
        <h2
          id="stories-heading"
          className="display mx-auto max-w-2xl text-[clamp(2.25rem,4.5vw,3.5rem)]"
        >
          Better nights, one strip at a time.
        </h2>
        <p className="mt-6 text-ink-soft">
          Placeholder social proof — real member stories to follow.
        </p>
      </Reveal>

      <Reveal delay={120}>
        {/* Bleeds off the right edge, as Seed's does */}
        <ul
          ref={track}
          // scroll-pl keeps the snap point at the container edge rather than
          // the padding edge, so the first card doesn't jump flush left
          className="mt-16 flex snap-x snap-mandatory scroll-pl-6 gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] lg:scroll-pl-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((person) => (
            <li
              key={person.tag}
              className="w-[85vw] shrink-0 snap-start sm:w-[58vw] lg:w-[42vw] xl:w-[34vw]"
            >
              <div className="relative isolate overflow-hidden rounded-2xl">
                <ArtSlot
                  variant="still"
                  showCaption={false}
                  brief={person.brief}
                  className="aspect-16/10 w-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-bone">
                  <p className="display text-[1.35rem] leading-tight">
                    {person.tag}
                  </p>
                  <span className="micro shrink-0 opacity-70">
                    {person.name}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={200} className="mt-10 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous story"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-bone-deep"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next story"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-bone-deep"
        >
          <span aria-hidden="true">→</span>
        </button>
      </Reveal>
    </section>
  );
}
