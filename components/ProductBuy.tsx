"use client";

import { useState } from "react";
import { ArtSlot } from "@/components/ArtSlot";
import { useCart } from "@/components/CartProvider";
import type { Product } from "@/lib/brand";

/**
 * The buying block: gallery on the left, plan choice and add-to-cart on the
 * right. Client-side because it holds the selected image and plan.
 *
 * On Shopify this becomes the product form — the plan radios are selling
 * plans on the product, so the structure carries over directly.
 */
export function ProductBuy({ product }: { product: Product }) {
  const { plans, gallery, facts } = product;
  type PlanId = (typeof plans)[number]["id"];

  const [shot, setShot] = useState(0);
  const [plan, setPlan] = useState<PlanId>(plans[plans.length - 1].id);
  const { add } = useCart();

  const chosen = plans.find((p) => p.id === plan) ?? plans[0];

  return (
    <section className="bg-bone pb-24 pt-10 lg:pb-32 lg:pt-14" aria-label={`Buy ${product.title}`}>
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* ------------------------------------------------ gallery */}
          <div>
            <ArtSlot
              variant="field"
              brief={gallery[shot]}
              showCaption={false}
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
          <div className="flex flex-col justify-center">
            <p className="micro text-ink-soft">
              {product.code} · {product.name}
            </p>
            <h1 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.5rem)]">
              {product.title}
            </h1>
            <p className="mt-3 font-serif text-[1.6rem] leading-tight text-ink-soft">
              {product.line}
            </p>
            <p className="prose-quiet mt-6 max-w-md text-ink-soft">
              {product.description}
            </p>

            {/* Plan choice */}
            <fieldset className="mt-10">
              <legend className="micro text-ink-soft">How often</legend>
              <div className="mt-5 flex flex-col gap-3">
                {plans.map((p) => {
                  const active = p.id === plan;
                  return (
                    <label
                      key={p.id}
                      className={`flex cursor-pointer items-center justify-between gap-6 rounded-2xl border p-5 transition-colors duration-300 ${
                        active
                          ? "border-brand bg-brand/5"
                          : "border-hairline hover:border-ink-soft/40"
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="plan"
                          value={p.id}
                          checked={active}
                          onChange={() => setPlan(p.id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                            active ? "border-brand" : "border-ink-soft/40"
                          }`}
                        >
                          {active && (
                            <span className="h-2.5 w-2.5 rounded-full bg-brand" />
                          )}
                        </span>
                        <span>
                          <span className="block font-medium">{p.name}</span>
                          <span className="block text-sm text-ink-soft">
                            {p.note}
                          </span>
                        </span>
                      </span>

                      <span className="shrink-0 text-right">
                        <span className="block font-medium">{p.price}</span>
                        <span className="micro block text-ink-soft">
                          {p.cadence}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={() =>
                add({ slug: `${product.slug}-${chosen.id}`, name: `${product.name} — ${chosen.name}` })
              }
              className="micro mt-8 inline-flex h-14 items-center justify-center rounded-full bg-brand-deep px-9 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
            >
              Add to cart — {chosen.price}
            </button>

            <dl className="mt-12 border-t border-hairline">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-6 border-b border-hairline py-4"
                >
                  <dt className="micro text-ink-soft">{fact.label}</dt>
                  <dd className="text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
