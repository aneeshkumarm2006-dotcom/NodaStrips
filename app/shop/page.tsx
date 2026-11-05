import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/sections/OurSupplements";
import { DUO_PRODUCTS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Shop all — NODA",
  description:
    "Sleep, and Energy & Focus — fast-dissolving vegan oral strips. No water, no pills, nothing to swallow.",
};

/**
 * Shop all — its own page, which the hero's "Shop our products" opens
 * (client, Nov 2026: "like sipmondays.com/collections/all").
 *
 * Nov 2026, second round: the whole product, price included, has to show
 * without scrolling, as on the reference's Shop all. So the "Oral strips"
 * label is gone, the title and the line under it are a size down and
 * share one row with the item count, and the grid starts straight under
 * them. The cards are capped so that, on a laptop screen, the full card
 * — title, subtitle and price — sits above the fold. Energy first, then
 * Sleep, as on the main page.
 */
export default function ShopPage() {
  return (
    <section className="bg-bone pb-20 pt-6 lg:pb-28 lg:pt-8" aria-labelledby="shop-heading">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2 border-b border-hairline pb-4">
          <div>
            <h1
              id="shop-heading"
              className="display text-[clamp(2rem,3vw,2.75rem)] text-cocoa"
            >
              Shop all
            </h1>
            <p className="mt-1.5 text-[0.9375rem] font-light text-ink-soft">
              Fast-dissolving vegan strips — no water, no pills, nothing to swallow.
            </p>
          </div>
          <p className="micro text-ink-soft">{DUO_PRODUCTS.length} items</p>
        </Reveal>

        {/* Three columns, each a third of the row or — on a short screen —
            narrower, so the 4:5 card is never taller than the space left
            under the header and the title row, and the price never falls
            below the fold. The cards stay side by side either way. */}
        <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,min(calc((100%_-_2.5rem)/3),calc((100svh_-_15rem)*438/547))))]">
          {DUO_PRODUCTS.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 120}>
              <ProductCard product={product} eager />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
