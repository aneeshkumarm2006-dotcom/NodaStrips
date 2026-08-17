import { BlogRow } from "@/components/sections/BlogRow";
import { Compare } from "@/components/sections/Compare";
import { Format } from "@/components/sections/Format";
import { Hero } from "@/components/sections/Hero";
import { ScienceStrip } from "@/components/sections/ScienceStrip";
import { ScienceTeaser } from "@/components/sections/ScienceTeaser";
import { Stories } from "@/components/sections/Stories";
import { Testimonials } from "@/components/sections/Testimonials";

/**
 * The main page.
 *
 *   01 Photo hero with overlaid copy and two CTAs
 *   02 Full-bleed annotated product card
 *   03 Science in a strip — the formula, with tags and mechanisms
 *   04 How it compares — the chart
 *   05 Science teaser with illustration
 *   06 Member story carousel
 *   07 Stories mosaic with press quote
 *   08 Blog row
 *      Footer
 *
 * The purchase-card grid and the subscription block were removed on the
 * client's Aug 16 notes — subscription is not offered yet. Both are in git
 * history if they come back.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Format />
      <ScienceStrip />
      <Compare />
      <ScienceTeaser />
      <Testimonials />
      <Stories />
      <BlogRow />
    </>
  );
}
