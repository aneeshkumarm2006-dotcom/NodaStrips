import { Fragment } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { PRESS_QUOTE, STORIES } from "@/lib/brand";

/**
 * 09 — Stories, on Seed's model: a heading, then an irregular mosaic mixing
 * circular and rectangular crops at varying spans, with a press pull quote
 * sitting inside the grid rather than beside it.
 */

const SPAN: Record<string, string> = {
  normal: "row-span-1",
  wide: "sm:col-span-2",
  tall: "row-span-2",
};

export function Stories() {
  return (
    <section
      className="bg-bone py-24 lg:py-32"
      aria-labelledby="mosaic-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal>
          <h2
            id="mosaic-heading"
            className="display max-w-2xl text-[clamp(2.25rem,4.5vw,3.5rem)]"
          >
            Stories from scientists,
            <br />
            formulators, and people
            <br />
            who sleep badly.
          </h2>
        </Reveal>

        {/* grid-flow-dense lets the small tiles backfill the holes the
            spanning ones leave, so the collage has no gaps */}
        <div className="mt-16 grid auto-rows-[minmax(150px,auto)] grid-flow-row-dense grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {STORIES.map((tile, i) => (
            <Fragment key={tile.brief}>
              {/* The press quote sits inside the mosaic, not beside it */}
              {i === 3 && (
                <Reveal delay={3 * 70} className="col-span-2 row-span-2">
                  <figure className="m-0 flex h-full flex-col justify-center rounded-2xl bg-bone-deep p-7">
                    <blockquote className="display text-[1.3rem] leading-snug">
                      “{PRESS_QUOTE.quote}”
                    </blockquote>
                    <figcaption className="micro mt-6 text-ink-soft">
                      {PRESS_QUOTE.source}
                    </figcaption>
                  </figure>
                </Reveal>
              )}

              <Reveal
                delay={i * 70}
                className={
                  tile.shape === "circle"
                    ? "self-center"
                    : (SPAN[tile.span] ?? "")
                }
              >
                <ArtSlot
                  variant={i % 3 === 0 ? "field" : i % 3 === 1 ? "still" : "macro"}
                  onDark={i % 3 === 0}
                  showCaption={false}
                  showMark={false}
                  brief={tile.brief}
                  className={
                    tile.shape === "circle"
                      ? "aspect-square w-full rounded-full"
                      : "h-full min-h-38 w-full rounded-2xl"
                  }
                />
              </Reveal>
            </Fragment>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-ink-soft opacity-70">
            Placeholder mosaic. Every tile is an image slot and the quote is
            unattributed — real press and member content to follow.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
