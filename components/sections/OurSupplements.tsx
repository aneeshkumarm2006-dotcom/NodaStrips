"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { useCurrency } from "@/components/CurrencyProvider";
import { DUO, DUO_PRODUCTS, type Product } from "@/lib/brand";
import { getPhoto } from "@/lib/photos";

/**
 * 02 — Meet Your Day & Night Duo (was "Our Supplements"), straight after
 * the hero, on Arrae's model.
 *
 * Card measurements are Arrae's, taken off their live site: 438×547
 * (4:5), 8px radius, a tan ground under the photograph, a white fade over
 * its last quarter, and a 12px / 12px / 20px content block carrying a
 * flavour chip, a 16px semibold uppercase title, a light subtitle and the
 * price.
 *
 * Per the client: no star ratings or review counts, no category tabs, two
 * products, centred. Nov 2026: the heading is "Meet Your Day & Night Duo",
 * Energy comes first and then Sleep, the "+" quick-add is gone, and the
 * section is #FFFFFF.
 */
export function OurSupplements({
  heading = DUO.heading,
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
      className="scroll-mt-0 bg-[#FFFFFF] pb-12 pt-10 lg:pb-14 lg:pt-14"
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
          {DUO_PRODUCTS.map((product, i) => (
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
  const { money } = useCurrency();
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
        {/* Arrae's fade: clear for three quarters, white at the foot */}
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0) 62%, #FFFFFF 100%)",
          }}
        />
      </Link>

      {/* Content, over the fade */}
      <div className="pointer-events-none absolute inset-x-1 bottom-1 rounded-[4px] px-3 pb-5 pt-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/90 py-1 pl-1.5 pr-3 text-[0.9375rem] font-normal">
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
          <span className="text-cocoa tabular-nums">{money(product.price, { cents: true })}</span>
        </div>
      </div>
    </article>
  );
}
