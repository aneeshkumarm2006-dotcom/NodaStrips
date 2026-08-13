import { Hero } from "@/components/sections/Hero";
import { Journal } from "@/components/sections/Journal";
import { Quiz } from "@/components/sections/Quiz";
import { Range } from "@/components/sections/Range";
import { Science } from "@/components/sections/Science";

/**
 * The main page — the section stack from the brand direction:
 *   01 Hero · 02 The range + Combo · 03 How it works / Science
 *   04 Take the quiz · 05 Sleep Journal (+ footer, in the layout)
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Range />
      <Science />
      <Quiz />
      <Journal />
    </>
  );
}
