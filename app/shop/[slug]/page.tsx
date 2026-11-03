import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBuy } from "@/components/ProductBuy";
import { Compare } from "@/components/sections/Compare";
import { ScienceStrip } from "@/components/sections/ScienceStrip";
import { ScienceTeaser } from "@/components/sections/ScienceTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import {
  COMPARISON,
  COMPARISON_CLAIMS,
  COMPARISON_CLAIMS_ENERGY,
  COMPARISON_ENERGY,
  PRODUCTS,
  getProduct,
} from "@/lib/brand";

/**
 * A product page — Sleep, or Energy & Focus.
 *
 * Per the client's Nov 2026 notes, two sections moved here from the main
 * page: "Science in a strip" (now the formula of this product) and the
 * absorption chart. The second Nov 2026 doc moved two more onto the
 * Sleep page only: the "timing problem" science teaser and the "Better
 * nights, one strip at a time" member stories.
 */
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found — NODA" };
  return {
    title: `${product.title} — NODA`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const energy = product.slug === "energy";
  const sleep = product.slug === "sleep";

  return (
    <>
      <ProductBuy product={product} />
      <ScienceStrip product={product} />
      {sleep && <ScienceTeaser />}
      <Compare
        datasets={energy ? COMPARISON_ENERGY : COMPARISON}
        claims={energy ? COMPARISON_CLAIMS_ENERGY : COMPARISON_CLAIMS}
      />
      {sleep && <Testimonials />}
    </>
  );
}
