import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductBuy } from "@/components/ProductBuy";
import { Compare } from "@/components/sections/Compare";
import { ScienceStrip } from "@/components/sections/ScienceStrip";

export const metadata: Metadata = {
  title: "The strip — NODA",
  description:
    "A fast-dissolving vegan sleep strip. No water, no pills. One strip, thirty minutes before bed.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        index="The strip"
        title={
          <>
            One product.
            <br />
            Made properly.
          </>
        }
        intro="We sell one thing. Everything on this page is about that one thing — what is in it, how it is taken, and why the format is the argument."
      />
      <ProductBuy />
      <ScienceStrip />
      <Compare />
    </>
  );
}
