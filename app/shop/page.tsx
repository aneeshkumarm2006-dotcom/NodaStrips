import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/sections/OurSupplements";
import { PRODUCTS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Shop all — NODA",
  description:
    "Sleep, and Energy & Focus — fast-dissolving vegan oral strips. No water, no pills, nothing to swallow.",
};

/**
 * Shop all — its own page, which the hero's "Shop our products" now opens
 * (client, Nov 2026: "it should take us into a separate page, not just
 * the exact section below the main image… like sipmondays.com/collections/all").
 *
 * Laid out as Mondays' collection page: a title, a slim toolbar with the
 * item count, then the product grid — the same Arrae cards as the main
 * page, so a product looks the same wherever it appears.
 */
export default function ShopPage() {
  return (
    <section className="bg-bone pb-24 pt-10 lg:pb-32 lg:pt-14" aria-labelledby="shop-heading">
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <Reveal>
          <h1
            id="shop-heading"
            className="display text-[clamp(2.5rem,5vw,4rem)] text-cocoa"
          >
            Shop all
          </h1>
          <p className="prose-quiet mt-4 max-w-xl text-ink-soft">
            Fast-dissolving vegan strips — one for sleep, one for energy &amp;
            focus. No water, no pills, nothing to swallow.
          </p>
        </Reveal>

        {/* Mondays' toolbar: count on the right, a hairline under it */}
        <div className="mt-10 flex items-center justify-between border-b border-hairline pb-4">
          <p className="micro text-ink-soft">Oral strips</p>
          <p className="micro text-ink-soft" aria-live="polite">
            {PRODUCTS.length} items
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 120}>
              <ProductCard product={product} eager />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
