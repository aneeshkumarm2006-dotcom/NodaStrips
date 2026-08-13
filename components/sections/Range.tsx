import Link from "next/link";
import { AddToCart } from "@/components/AddToCart";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { CATEGORIES } from "@/lib/brand";

/**
 * 02 — The range + Combo. Category cards, one colour each, plus the Combo
 * bundle. The grid auto-fills, so a sixth outcome is a data entry in
 * lib/brand.ts and nothing else.
 */
export function Range() {
  return (
    <section id="range" className="bg-bone py-28 lg:py-40" aria-labelledby="range-heading">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="max-w-3xl">
          <p className="micro text-ink-soft">02 — The range</p>
          <h2 id="range-heading" className="display mt-8 text-[clamp(2.75rem,6vw,4.75rem)]">
            Organised by outcome
          </h2>
          <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-ink-soft">
            One saturated colour per category, so you find what you came for
            without reading a label. Sleep leads the launch; the rest follow.
          </p>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <Reveal as="li" key={cat.slug} delay={i * 90}>
              <article>
                <ArtSlot
                  variant="field"
                  tint={cat.hex}
                  onDark={cat.on === "bone"}
                  brief={`${cat.name.toLowerCase()} strip on ${cat.name.toLowerCase()} colour`}
                  className="aspect-square w-full"
                />

                <div className="mt-7 flex items-baseline justify-between gap-4">
                  <h3 className="display text-[2rem]">{cat.name}</h3>
                  <span className="micro text-ink-soft">
                    {cat.available ? "£28 · 30 strips" : "Coming soon"}
                  </span>
                </div>

                <p className="mt-3 text-ink-soft">{cat.line}</p>

                <div className="mt-7">
                  {cat.available ? (
                    <AddToCart slug={cat.slug} name={`${cat.name} Strips`} />
                  ) : (
                    <Link
                      href="/subscription"
                      className="micro link-quiet inline-flex h-11 items-center text-ink-soft"
                    >
                      Notify me
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}

          {/* Combo — the bundle, given the width it deserves */}
          <Reveal as="li" delay={CATEGORIES.length * 90} className="sm:col-span-2 lg:col-span-3">
            <article className="grid grid-cols-1 items-stretch border border-hairline lg:grid-cols-[1.1fr_1fr]">
              <div className="flex flex-col justify-center p-9 lg:p-16">
                <p className="micro text-ink-soft">The bundle</p>
                <h3 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)]">
                  Combo
                </h3>
                <p className="mt-7 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
                  Build your own set across the range — one strip for the night,
                  one for the morning after. Every outcome, one box, one price.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-6">
                  <AddToCart slug="combo" name="Combo Bundle" label="Add combo to cart" />
                  <span className="micro text-ink-soft">£72 · 90 strips</span>
                </div>
              </div>

              <ArtSlot
                variant="still"
                tint="#3D34C9"
                onDark={false}
                brief="all five sachets fanned on bone"
                className="min-h-72 w-full"
              />
            </article>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
