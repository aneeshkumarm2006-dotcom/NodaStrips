"use client";

import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { useCart } from "@/components/CartProvider";

/**
 * The cart. Reads the same in-memory cart the header count uses.
 *
 * There is no checkout here on purpose — that is Shopify's job, and faking
 * it would be the one part of this prototype that could mislead someone.
 */
export function CartView() {
  const { lines, count } = useCart();

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[1600px] px-6 pb-32 lg:px-10">
        <div className="max-w-md border-t border-hairline pt-14">
          <h2 className="display text-[1.75rem]">Nothing in the cart yet</h2>
          <p className="prose-quiet mt-4 text-ink-soft">
            One product, one decision. It won’t take long.
          </p>
          <Link
            href="/shop"
            className="micro mt-9 inline-flex h-13 items-center rounded-full bg-brand-deep px-8 py-4 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
          >
            Shop the strip
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-32 lg:px-10">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <ul className="border-t border-hairline">
          {lines.map((line) => (
            <li
              key={line.slug}
              className="flex items-center gap-6 border-b border-hairline py-6"
            >
              <ArtSlot
                variant="field"
                brief="the box, straight on"
                showCaption={false}
                showMark={false}
                className="h-24 w-24 shrink-0 rounded-xl"
              />
              <div className="flex-1">
                <h2 className="display text-[1.35rem] leading-tight">{line.name}</h2>
                <p className="micro mt-2 text-ink-soft">Quantity {line.qty}</p>
              </div>
              <p className="micro text-ink-soft">SL-01</p>
            </li>
          ))}
        </ul>

        <aside className="lg:pt-14">
          <div className="rounded-2xl border border-hairline p-7">
            <h2 className="display text-[1.5rem]">Summary</h2>

            <dl className="mt-7 flex flex-col gap-3 border-t border-hairline pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Items</dt>
                <dd>{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd>Calculated at checkout</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Total</dt>
                <dd>—</dd>
              </div>
            </dl>

            <p className="mt-7 rounded-xl bg-bone-deep p-4 text-sm leading-relaxed text-ink-soft">
              Checkout is not wired up. Payment, tax and shipping belong to
              Shopify — this prototype deliberately stops here rather than
              pretending to take an order.
            </p>

            <Link
              href="/shop"
              className="micro mt-7 inline-flex w-full items-center justify-center rounded-full border border-ink/20 px-6 py-4 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-bone-deep"
            >
              Keep shopping
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
