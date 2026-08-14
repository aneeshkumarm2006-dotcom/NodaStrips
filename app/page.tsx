import { Bundle } from "@/components/sections/Bundle";
import { Compare } from "@/components/sections/Compare";
import { Format } from "@/components/sections/Format";
import { Hero } from "@/components/sections/Hero";
import { Inside } from "@/components/sections/Inside";
import { Range } from "@/components/sections/Range";
import { ScienceTeaser } from "@/components/sections/ScienceTeaser";
import { Stories } from "@/components/sections/Stories";
import { Testimonials } from "@/components/sections/Testimonials";
import { TwoUp } from "@/components/sections/TwoUp";

/**
 * The main page, following seed.com's homepage structure:
 *
 *   01 Photo hero with overlaid copy and two CTAs
 *   02 Product grid on a dark band
 *   03 Subscription offer — copy left, image over thumbnails right
 *   04 Full-bleed annotated product card
 *   05 What's inside — the formula, listed
 *   06 How it compares — the chart
 *   07 Science teaser with illustration
 *   08 Member story carousel
 *   09 Stories mosaic with press quote
 *   10 Two-up closing cards
 *      Footer — statement, newsletter, five link columns
 *
 * Each becomes one Shopify section.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Range />
      <Bundle />
      <Format />
      <Inside />
      <Compare />
      <ScienceTeaser />
      <Testimonials />
      <Stories />
      <TwoUp />
    </>
  );
}
