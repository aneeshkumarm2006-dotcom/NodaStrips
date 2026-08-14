import Link from "next/link";
import { AddToCart } from "@/components/AddToCart";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { PRODUCT, PURCHASE_OPTIONS } from "@/lib/brand";

/**
 * 02 — The range, on Seed's model: a dark band with the heading on the left,
 * a supporting paragraph and "Shop all" on the right, then a row of cards.
 *
 * Seed puts four products here. We have one, so the cards are purchase
 * options — the same furniture, honestly used. When a second outcome
 * launches these become products and the layout is untouched.
 */
export function Range() {
  return (
    <section
      id="shop"
      className="bg-brand py-24 text-bone lg:py-32"
      aria-labelledby="range-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
          <h2
            id="range-heading"
            className="display text-[clamp(2.25rem,4.5vw,3.5rem)]"
          >
            Better nights start
            <br />
            with better delivery.
          </h2>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <p className="max-w-sm leading-relaxed opacity-70">
              One formulation, in the format that actually reaches you. Choose
              how often it arrives.
            </p>
            <Link href="/shop" className="micro link-quiet whitespace-nowrap">
              Shop all →
            </Link>
          </div>
        </Reveal>

        <ul className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PURCHASE_OPTIONS.map((opt, i) => (
            <Reveal as="li" key={opt.name} delay={i * 90}>
              <article
                className={`flex h-full flex-col rounded-2xl p-6 ${
                  opt.featured ? "bg-bone text-ink" : "bg-bone/8 text-bone"
                }`}
              >
                <div className="flex h-6 items-start justify-between gap-3">
                  <span className="micro opacity-55">{opt.code}</span>
                  {opt.badge && (
                    <span
                      className={`micro rounded-full px-2.5 py-1 text-[0.5625rem] ${
                        opt.featured
                          ? "bg-ignite/15 text-ignite"
                          : "bg-bone/15 text-bone"
                      }`}
                    >
                      {opt.badge}
                    </span>
                  )}
                </div>

                <h3 className="display mt-4 text-[1.5rem] leading-tight">
                  {opt.name}
                </h3>

                <ArtSlot
                  variant="field"
                  onDark={!opt.featured}
                  showCaption={false}
                  brief="the box, straight on"
                  className="mt-6 aspect-square w-full rounded-xl"
                />

                <p
                  className={`mt-6 flex-1 text-sm leading-relaxed ${
                    opt.featured ? "text-ink-soft" : "opacity-70"
                  }`}
                >
                  {opt.body}
                </p>

                <div className="mt-7">
                  <AddToCart
                    slug={`${PRODUCT.slug}-${opt.name}`}
                    name={opt.name}
                    label="Shop now"
                    className="w-full rounded-full border-current"
                  />
                  <p
                    className={`micro mt-4 text-center ${
                      opt.featured ? "text-ink-soft" : "opacity-55"
                    }`}
                  >
                    from {opt.from}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
