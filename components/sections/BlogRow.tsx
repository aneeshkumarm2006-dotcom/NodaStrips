"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { JOURNAL_POSTS } from "@/lib/brand";

/**
 * The closing blog row, built from the reference the client supplied.
 *
 * Anatomy, in the order it reads on the card:
 *   · category label pinned to the TOP of the card, in letterspaced caps
 *   · title at the bottom, large, over a bottom-weighted scrim
 *   · "Read Blog Post" as a full-width OUTLINED PILL, not a text link
 *   · rounded corners on the card, ~5:7 portrait crop
 *
 * The band is warm sand (#EDEBE4) as the reference has it, deliberately
 * warmer than the neutral page — it reads as an accent band.
 */
export function BlogRow() {
  const rail = useRef<HTMLUListElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 32 : el.clientWidth * 0.8;
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous entries"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink/5 sm:flex"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next entries"
            className="hidden h-11 w-11 items-center justify-center rounded-full border border-ink/20 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink/5 sm:flex"
          >
            <span aria-hidden="true">→</span>
          </button>
          <Link
            href="/sleep-journal"
            className="shrink-0 rounded-full bg-[#023D3D] px-7 py-3.5 text-[1.0625rem] text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
          >
            View All
          </Link>
        </div>
      </Reveal>

      {/* The rail — runs off the right edge, as the reference does */}
      <Reveal delay={120}>
        <ul
          ref={rail}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-pl-6 px-6 pb-2 [scrollbar-width:none] lg:scroll-pl-10 lg:gap-8 lg:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {JOURNAL_POSTS.map((post) => (
            <li
              key={post.slug}
              className="w-[80vw] shrink-0 snap-start sm:w-[48vw] lg:w-[29rem]"
            >
              <Link
                href={`/sleep-journal/${post.slug}`}
                className="group relative isolate flex aspect-5/7 flex-col overflow-hidden rounded-xl p-6 text-bone lg:p-7"
              >
                <div className="absolute inset-0 -z-20">
                  <ArtSlot
                    variant="still"
                    showCaption={false}
                    showMark={false}
                    brief={post.brief}
                    className="h-full w-full"
                  />
                </div>
                {/* Bottom-weighted scrim so the title and pill stay legible */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/10"
                />

                {/* Category, pinned to the top */}
                <p className="micro tracking-[0.14em] opacity-90">{post.kicker}</p>

                {/* Title and the outlined pill, pinned to the bottom */}
                <div className="mt-auto">
                  <h3 className="display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.1]">
                    {post.title}
                  </h3>
                  <span className="mt-6 flex items-center justify-center gap-2.5 rounded-full border border-bone/60 py-3.5 text-[1.0625rem] transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:bg-bone/15">
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
    </section>
  );
}
