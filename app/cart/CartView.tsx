"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { useCurrency } from "@/components/CurrencyProvider";
import { Stepper, SubscribeUpsell } from "@/components/SubscribeUpsell";
import { SUBSCRIBE_UPSELL } from "@/lib/brand";
import { getPhoto } from "@/lib/photos";

/**
 * The cart. Reads the same in-memory cart the header count uses.
 *
 * Nov 2026: each line can be taken down, built up or removed outright
 * ("add the option to erase a product or add more products"), carries its
 * price in the header's currency, and a one-time line offers the
 * subscribe pop-up. The summary totals it all.
 *
 * There is no checkout here on purpose — that is Shopify's job, and faking
 * it would be the one part of this prototype that could mislead someone.
 */
export function CartView() {
  const { lines, count, subtotal, setQty, remove } = useCart();
  const { money } = useCurrency();
  const [upsell, setUpsell] = useState<string | null>(null);

  if (count === 0) {
    return (
      <div className="mx-auto max-w-[1600px] px-6 pb-32 lg:px-10">
        <div className="max-w-md border-t border-hairline pt-14">
          <h2 className="display text-[1.75rem]">Nothing in the cart yet</h2>
          <p className="prose-quiet mt-4 text-ink-soft">
            Two strips, one for the day and one for the night. It won’t take long.
          </p>
          <Link
            href="/shop"
            className="micro mt-9 inline-flex h-13 items-center rounded-full bg-brand-deep px-8 py-4 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
          >
            Shop all
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-6 pb-32 lg:px-10">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <ul className="border-t border-hairline">
          {lines.map((line) => {
            const { product, option, qty } = line;
            const photo = getPhoto(product.card);
            const offer = Math.max(...product.plans.map((p) => p.savePct ?? 0));
            return (
              <li
                key={line.key}
                className="flex gap-5 border-b border-hairline py-6 sm:gap-6"
                style={{ "--accent": product.accent } as React.CSSProperties}
              >
                <Link
                  href={`/shop/${product.slug}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-tan"
                  aria-label={product.title}
                >
                  {photo && (
                    <Image src={photo.src} alt="" fill sizes="96px" className="object-cover" />
                  )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="display text-[1.35rem] leading-tight">
                        {product.name} — {option.name}
                      </h2>
                      <p className="micro mt-2 text-ink-soft">
                        {product.code} · {product.flavour.name}
                      </p>
                    </div>
                    <p className="shrink-0 text-right text-sm tabular-nums">
                      {option.compareAt && (
                        <s className="mr-1.5 text-ink-soft">{money(option.compareAt * qty)}</s>
                      )}
                      <span className="font-medium">{money(option.price * qty)}</span>
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Stepper
                      qty={qty}
                      label={`${product.name}, ${option.name}`}
                      onChange={(n) => setQty(line.key, n)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(line.key)}
                      className="micro link-quiet text-ink-soft hover:text-ink"
                    >
                      Remove
                    </button>
                    {!option.subscription && (
                      <button
                        type="button"
                        onClick={() => setUpsell(line.key)}
                        className="micro inline-flex items-center gap-1.5 rounded-full bg-[color-mix(in_srgb,var(--accent)_8%,white)] px-3.5 py-2 text-[var(--accent)] transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_14%,white)]"
                      >
                        {SUBSCRIBE_UPSELL.inCart.replace("{pct}", String(offer))}
                        <span aria-hidden="true">→</span>
                      </button>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="lg:pt-14">
          <div className="rounded-2xl border border-hairline p-7">
            <h2 className="display text-[1.5rem]">Summary</h2>

            <dl className="mt-7 flex flex-col gap-3 border-t border-hairline pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Items</dt>
                <dd className="tabular-nums">{count}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums">{money(subtotal, { cents: true })}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Shipping</dt>
                <dd>Calculated at checkout</dd>
              </div>
              <div className="flex justify-between border-t border-hairline pt-3 text-base">
                <dt>Total</dt>
                <dd className="font-medium tabular-nums">{money(subtotal, { cents: true })}</dd>
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

      {upsell && (
        <SubscribeUpsell lineKey={upsell} context="cart" onClose={() => setUpsell(null)} />
      )}
    </div>
  );
}
