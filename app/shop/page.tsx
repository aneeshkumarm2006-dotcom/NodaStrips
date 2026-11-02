import type { Metadata } from "next";
import { OurSupplements } from "@/components/sections/OurSupplements";

export const metadata: Metadata = {
  title: "Shop — NODA",
  description:
    "Sleep and Energy — fast-dissolving vegan oral strips. No water, no pills, nothing to swallow.",
};

/** Shop all: the same two-card grid as the main page. */
export default function ShopPage() {
  return <OurSupplements heading="Shop all" id="shop" />;
}
