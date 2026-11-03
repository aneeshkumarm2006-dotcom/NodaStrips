"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { useCart } from "@/components/CartProvider";
import {
  PRODUCTS,
  SUBSCRIPTION_BENEFITS,
  type Product,
  type ProductPlan,
} from "@/lib/brand";

/**
 * The buying block: gallery on the left, plan choice and add-to-cart on the
 * right. Client-side because it holds the selected image and plan.
 *
 * The purchase options are Arrae's, built to measurements taken off
 * arrae.com/products/mb-1-45 (client, Nov 2026: "purchase option should be
 * exactly the same as Arrae's website"):
 *
 *   FORMULA   "Choose your formula: Sleep", then pill links with a 20px
 *             swatch — Arrae switches MB-1 / MB-1 45+; we switch products.
 *   OPTIONS   three 8px-radius cards, 12px apart, 0.8px borders. A dark
 *             "Best value  Save 30%" bar across the first. Each row: an
 *             18px radio, an 18px/600 name over a 14px/300 grey line, and
 *             on the right a 14px price, the struck compare-at, a 12px
 *             per-month figure and a "Save 20%" chip.
 *   BENEFITS  under the selected subscription only: a 12px/600 caps
 *             heading and four ticked 14px/300 lines, inset 42px.
 *   BUTTON    a full-width 46px pill: "Add to cart" then the price and the
 *             struck compare-at.
 *
 * Where Arrae uses its dark cocoa — the selected card, the bar, the radio
 * and the button — this uses the product's carton colour (client: "where
 * you see green for add to cart, selected purchase category — change it to
 * the colour of the box").
 *
 * On Shopify the three options are selling plans on the product, so the
 * structure carries over directly.
 */
export function ProductBuy({ product }: { product: Product }) {
  const { plans, gallery, facts } = product;

  const [shot, setShot] = useState(0);
  const [plan, setPlan] = useState<ProductPlan["id"]>(product.defaultPlan);
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  const chosen = plans.find((p) => p.id === plan) ?? plans[0];

  return (
    <section
      className="bg-bone pb-24 pt-10 lg:pb-32 lg:pt-14"
      aria-label={`Buy ${product.title}`}
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* ------------------------------------------------ gallery */}
          <div>
            <ArtSlot
              variant="field"
              brief={gallery[shot]}
              showCaption={false}
              eager
              className="aspect-4/5 w-full rounded-2xl"
            />

            <ul className="mt-4 grid grid-cols-4 gap-4">
              {gallery.map((brief, i) => (
                <li key={brief}>
                  <button
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-current={i === shot}
                    className={`block w-full overflow-hidden rounded-xl transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)] ${
                      i === shot ? "opacity-100" : "opacity-55 hover:opacity-85"
                    }`}
                  >
                    <ArtSlot
                      variant="field"
                      brief={brief}
                      showCaption={false}
                      showMark={false}
                      className="aspect-square w-full"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* --------------------------------------------------- form */}
          <div className="flex flex-col justify-center lg:max-w-[30rem]">
            <p className="micro text-ink-soft">
              {product.code} · {product.name}
            </p>
            <h1 className="display mt-5 text-[clamp(2.75rem,5vw,4.25rem)]">
              {product.title}
            </h1>
            <p className="mt-2 font-serif text-[1.75rem] italic leading-tight text-ink-soft">
              {product.line}
            </p>
            <p className="prose-quiet mt-5 text-ink-soft">{product.description}</p>

            {/* Formula — Arrae's variant pills, switching product */}
            <div className="mt-9">
              <p className="text-sm font-light text-ink-soft">
                Choose your formula:{" "}
                <span className="font-medium text-ink">{product.name}</span>
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRODUCTS.map((p) => {
                  const current = p.slug === product.slug;
                  return (
                    <Link
                      key={p.slug}
                      href={`/shop/${p.slug}`}
                      aria-current={current ? "page" : undefined}
                      scroll={false}
                      className={`inline-flex items-center gap-2 rounded-full border-[0.8px] py-1 pl-1 pr-3 text-xs transition-colors duration-300 ${
                        current
                          ? "border-ink bg-white text-ink"
                          : "border-hairline bg-bone-deep text-ink-soft hover:border-ink/40"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="h-5 w-5 rounded-full"
                        style={{ background: p.accent }}
                      />
                      {p.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Purchase options */}
            <fieldset className="mt-6">
              <legend className="sr-only">Purchase option</legend>
              <div className="flex flex-col gap-3">
                {plans.map((p) => (
                  <PlanOption
                    key={p.id}
                    plan={p}
                    active={p.id === plan}
                    onSelect={() => setPlan(p.id)}
                  />
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() => {
                add({ slug: `${product.slug}-${chosen.id}`, name: `${product.name} — ${chosen.name}` });
                setAdded(true);
              }}
              className="mt-5 inline-flex h-[46px] w-full items-center justify-center gap-3 rounded-full border-[0.8px] border-[var(--accent)] bg-[var(--accent)] px-6 text-sm uppercase tracking-[0.06em] text-white transition-[filter] duration-300 hover:brightness-110"
            >
              {added ? (
                <span aria-live="polite">Added to cart ✓</span>
              ) : (
                <>
                  <span>Add to cart</span>
                  <span className="flex items-baseline gap-2 font-semibold">
                    {chosen.price}
                    {chosen.compareAt && (
                      <s className="font-normal opacity-80">{chosen.compareAt}</s>
                    )}
                  </span>
                </>
              )}
            </button>

            <dl className="mt-10 border-t border-hairline">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <dt className="micro text-ink-soft">{fact.label}</dt>
                  <dd className="text-right font-light">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlanOption({
  plan,
  active,
  onSelect,
}: {
  plan: ProductPlan;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`block cursor-pointer overflow-hidden rounded-[8px] border-[0.8px] transition-colors duration-300 ${
        active
          ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--accent)_5%,white)]"
          : "border-[#cfcbc4] bg-white hover:border-ink/40"
      }`}
    >
      {plan.banner && (
        <span className="block rounded-b-[4px] bg-[var(--accent)] px-4 py-2 text-center text-xs uppercase leading-[1.2] tracking-[0.06em] text-white">
          <strong className="font-semibold">{plan.banner.strong}</strong> {plan.banner.rest}
        </span>
      )}

      <span className="flex items-start gap-3 px-4 py-3">
        <input
          type="radio"
          name="plan"
          value={plan.id}
          checked={active}
          onChange={onSelect}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className={`mt-[2px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[0.8px] transition-colors duration-300 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
            active ? "border-[var(--accent)]" : "border-ink-soft/70"
          }`}
        >
          {active && <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="text-lg font-semibold leading-[1.2] tracking-[-0.01em] text-ink">
            {plan.name}
          </span>
          <span className="text-sm font-light leading-[1.2] tracking-[-0.02em] text-[#6e6e6e]">
            {plan.note}
          </span>
        </span>

        <span className="flex shrink-0 flex-col items-end gap-0.5 text-right">
          <span className="flex items-baseline gap-1 text-sm">
            <span className="font-medium text-ink">{plan.price}</span>
            {plan.compareAt && <s className="text-ink">{plan.compareAt}</s>}
          </span>
          {plan.perMonth && (
            <span className="text-xs font-light tracking-[-0.01em] text-[#6e6e6e]">
              {plan.perMonth}
            </span>
          )}
          {plan.save && (
            <span className="mt-1.5 rounded-[4px] bg-bone-deep px-1 py-0.5 text-xs uppercase leading-[1.1] tracking-[0.06em] text-ink-soft">
              {plan.save}
            </span>
          )}
        </span>
      </span>

      {/* Benefits open under the selected subscription only */}
      {plan.subscription && (
        <span
          className={`grid transition-[grid-template-rows] duration-500 [transition-timing-function:var(--ease-quiet)] ${
            active ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <span className="overflow-hidden">
            <span className="block pb-[18px] pl-[42px] pr-4 pt-1">
              <span className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink">
                Subscription benefits
              </span>
              <span className="mt-2 flex flex-col gap-2">
                {SUBSCRIPTION_BENEFITS.map((b) => (
                  <span key={b} className="flex items-center gap-2 text-sm font-light tracking-[-0.02em] text-ink">
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
                      <path d="M3 8.4 6.3 11.5 13 4.6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    {b}
                  </span>
                ))}
              </span>
            </span>
          </span>
        </span>
      )}
    </label>
  );
}
