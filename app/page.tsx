import { BlogRow } from "@/components/sections/BlogRow";
import { FlashRelease } from "@/components/sections/FlashRelease";
import { Hero } from "@/components/sections/Hero";
import { OurSupplements } from "@/components/sections/OurSupplements";
import { ScienceTeaser } from "@/components/sections/ScienceTeaser";
import { Stories } from "@/components/sections/Stories";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhyStrips } from "@/components/sections/WhyStrips";

/**
 * The main page, restructured on the client's Nov 2026 notes.
 *
 *   01 Hero — Ralf's first look, the client's mockup's information
 *   02 Our Supplements — Sleep and Energy, straight after, as Arrae does
 *   03 FlashRelease® — Seed's ViaCap section, replicated
 *   04 Why strips — replaces the absorption chart
 *   05 Science teaser with illustration
 *   06 Member story carousel
 *   07 Stories mosaic with press quote
 *   08 Blog row
 *      Footer
 *
 * "Science in a strip" and the absorption chart moved to each product
 * page (app/shop/[slug]).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <OurSupplements />
      <FlashRelease />
      <WhyStrips />
      <ScienceTeaser />
      <Testimonials />
      <Stories />
      <BlogRow />
    </>
  );
}
