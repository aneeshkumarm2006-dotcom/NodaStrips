"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { useCart } from "@/components/CartProvider";
import { PRODUCTS, type Product } from "@/lib/brand";
import { getPhoto } from "@/lib/photos";

/**
 * 02 — Our Supplements, straight after the hero, on Arrae's model.
 *
 * Card measurements are Arrae's, taken off their live site: 438×547
 * (4:5), 8px radius, a tan ground under the photograph, a cream fade over
 * its last quarter, a 32px cream "+" quick-add in the corner, and a 12px /
 * 12px / 20px content block carrying a flavour chip, a 16px semibold
 * uppercase title, a light subtitle and the price.
 *
 * Per the client: no star ratings or review counts, no category tabs
 * (Best Sellers, Hair Skin & Beauty…), and "Our Supplements" in place of
 * "Targeted Supplements" — two products, centred. The gap above it was
 * narrowed in Nov 2026 ("too much of a gap between the entrance image
 * and the second section").
 */
export function OurSupplements({
  heading = "Our Supplements",
  id = "products",
}: {
  heading?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      // The foot was narrowed too (Nov 2026): under the white header it
      // read as an empty band before FlashRelease
      className="scroll-mt-0 bg-cream pb-12 pt-10 lg:pb-14 lg:pt-14"
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-[1600px] px-5 lg:px-10">
        <Reveal>
          <h2
            id={`${id}-heading`}
            className="display text-center text-[clamp(2.25rem,3.9vw,3.5rem)] text-cocoa"
          >
            {heading}
          </h2>
        </Reveal>

        <ul className="mx-auto mt-8 grid max-w-[57rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10">
          {PRODUCTS.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={i * 120}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ProductCard({
  product,
  eager = false,
}: {
  product: Product;
  /** Above the fold (the /shop grid) — load the photograph straight away */
  eager?: boolean;
}) {
  const photo = getPhoto(product.card);
  const href = `/shop/${product.slug}`;

  return (
    <article className="group relative aspect-[438/547] overflow-hidden rounded-[8px] bg-tan text-cocoa">
      <Link href={href} className="absolute inset-0" aria-label={product.title}>
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            loading={eager ? "eager" : undefined}
            sizes="(max-width: 640px) 100vw, 460px"
            className="object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-quiet)] group-hover:scale-[1.035]"
          />
        )}
        {/* Arrae's fade: clear for three quarters, cream at the foot */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0) 62%, var(--color-cream) 100%)",
          }}
        />
      </Link>

      <QuickAdd product={product} />

      {/* Content, over the fade */}
      <div className="pointer-events-none absolute inset-x-1 bottom-1 rounded-[4px] px-3 pb-5 pt-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-cream/90 py-1 pl-1.5 pr-3 text-[0.9375rem] font-normal">
          <span
            aria-hidden="true"
            className="h-5 w-5 rounded-full"
            style={{ background: product.flavour.swatch }}
          />
          {product.flavour.name}
        </span>

        <h3 className="mt-4 text-base font-semibold uppercase leading-[1.06] tracking-[0.84px]">
          {product.title}
        </h3>
        <p className="mt-1.5 text-base font-light tracking-[-0.14px] text-cocoa/80">
          {product.subtitle}
        </p>

        <div className="mt-4 flex items-baseline justify-between gap-4 text-base">
          <span className="text-[0.8125rem] uppercase tracking-[0.06em] text-cocoa/60">
            {product.unit}
          </span>
          <span className="text-cocoa">{product.price}</span>
        </div>
      </div>
    </article>
  );
}

/**
 * The 32px cream "+" in the corner — adds one box, one-time purchase.
 * Subscriptions are only ever chosen in the product's own purchase box,
 * where their terms are shown.
 */
function QuickAdd({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const once = product.plans.find((p) => p.id === "once") ?? product.plans[0];

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      onClick={() => {
        add({ slug: `${product.slug}-${once.id}`, name: `${product.name} — ${once.name}` });
        setAdded(true);
      }}
      aria-label={`Add ${product.title}, ${once.name}, to cart`}
      className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-[8px] bg-cream text-cocoa shadow-[0_2px_10px_-4px_rgba(32,26,19,0.3)] transition-transform duration-300 hover:scale-105"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        {added ? (
          <path d="M3.5 8.4 6.6 11.2 12.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
        ) : (
          <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.2" />
        )}
      </svg>
    </button>
  );
}
