"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { JOURNAL_POSTS } from "@/lib/brand";

/**
 * The closing blog row, built from the reference's measured DOM rather than
 * from eyeballing it. Its card is four stacked layers:
 *
 *   1. the photograph, filling the WHOLE card
 *   2. a gradient that darkens the top and bottom only, clear through the
 *      middle — so both the category label and the panel edge stay legible
 *   3. a FROSTED PANEL over the bottom 35%: white at 15% with a 20px
 *      backdrop blur and a hard top edge. This is the effect that makes the
 *      reference's cards distinctive — it frosts the image rather than
 *      darkening it, so each panel picks up the photo behind it.
 *   4. the title and an outlined pill inside that panel
 *
 * Card is 5:7 at an 8px radius. The band is warm sand, as the reference has.
 */
export function BlogRow() {
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
      className="overflow-hidden bg-sand py-20 lg:py-28"
      aria-labelledby="blog-row-heading"
    >
      {/* Heading row */}
      <Reveal className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-5 px-6 lg:px-10">
        <h2
          id="blog-row-heading"
          className="display text-[clamp(2rem,4.4vw,3.5rem)] font-normal text-ink"
        >
          Get the scoop on the science
        </h2>

        <Link
          href="/sleep-journal"
          className="shrink-0 rounded-full bg-[#023D3D] px-7 py-3.5 text-[1.0625rem] text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
        >
          View All
        </Link>
      </Reveal>

      {/* The rail — four cards in view, running off the right edge */}
      <Reveal delay={120}>
        <ul
          ref={rail}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 pb-2 [scrollbar-width:none] lg:scroll-pl-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {JOURNAL_POSTS.map((post) => (
            <li
              key={post.slug}
              className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[22.5rem]"
            >
              <Link
                href={`/sleep-journal/${post.slug}`}
                // 5:7 at an 8px radius, per the reference
                className="group relative isolate block aspect-5/7 overflow-hidden rounded-lg text-bone"
              >
                {/* 1 — the photograph fills the whole card */}
                <div className="absolute inset-0">
                  <ArtSlot
                    variant="still"
                    showCaption={false}
                    showMark={false}
                    brief={post.brief}
                    className="h-full w-full"
                  />
                </div>

                {/* 2 — darken top and bottom, clear through the middle */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 24.5%, rgba(0,0,0,0) 58.3%, rgba(0,0,0,0.3) 74%)",
                  }}
                />

                {/* Category label — top, plain sentence-size, not small caps */}
                <p className="absolute inset-x-0 top-0 px-6 pt-6 text-[1.0625rem] uppercase">
                  {post.kicker}
                </p>

                {/* 3 — the frosted panel: bottom 35%, white 15%, blur 20px,
                       hard top edge. This is the reference's signature. */}
                <div className="absolute inset-x-0 bottom-0 flex h-[35%] flex-col justify-center bg-white/15 px-6 backdrop-blur-[20px]">
                  {/* 4 — title and outlined pill inside the panel */}
                  <h3 className="display text-[clamp(1.35rem,1.8vw,1.6rem)] leading-[1.15]">
                    {post.title}
                  </h3>
                  <span className="mt-4 flex h-[54px] items-center justify-center gap-2.5 rounded-full border border-bone text-[1.0625rem] transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:bg-bone/20">
                    Read Blog Post
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Rail controls, bottom right as the reference has them */}
      <Reveal delay={200} className="mx-auto mt-8 flex max-w-[1600px] justify-end gap-3 px-6 lg:px-10">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous entries"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink/5"
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next entries"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink/5"
        >
          <span aria-hidden="true">→</span>
        </button>
      </Reveal>
    </section>
  );
}
