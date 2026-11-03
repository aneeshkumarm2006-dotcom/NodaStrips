import { BlogRow } from "@/components/sections/BlogRow";
import { Community } from "@/components/sections/Community";
import { FlashRelease } from "@/components/sections/FlashRelease";
import { Hero } from "@/components/sections/Hero";
import { OurSupplements } from "@/components/sections/OurSupplements";
import { WhyStrips } from "@/components/sections/WhyStrips";

/**
 * The main page, after the client's second Nov 2026 doc.
 *
 *   Hero — "Shop our products" opens /shop, its own page
 *   Our Supplements — Sleep, and Energy & Focus
 *   FlashRelease® — Seed's ViaCap section, replicated
 *   The Right Format — why strips, and the other formats
 *   Noda Community — creator posts on Arrae's structure
 *   Noda Journal — the blog row
 *   Footer
 *
 * No section numbers anywhere on the page. The science teaser ("You don't
 * have a sleep problem…") and the member stories ("Better nights…") moved
 * to the Sleep page; the Stories mosaic became Noda Community.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OurSupplements />
      <FlashRelease />
      <WhyStrips />
      <Community />
      <BlogRow />
    </>
  );
}
