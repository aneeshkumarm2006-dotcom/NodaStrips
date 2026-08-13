import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";

const STEPS = [
  {
    n: "01",
    title: "Place it on your tongue",
    body: "A film thinner than a petal. Nothing to swallow, nothing to carry water for.",
  },
  {
    n: "02",
    title: "It dissolves in seconds",
    body: "The strip breaks down on contact and releases its actives straight into the mouth.",
  },
  {
    n: "03",
    title: "Absorption starts immediately",
    body: "No tablet to break down first — the actives begin working from the moment it melts.",
  },
];

/**
 * 03 — How it works / Science. Calm and editorial, in Seed's register.
 */
export function Science() {
  return (
    <section
      id="science"
      className="bg-bone-deep py-28 lg:py-40"
      aria-labelledby="science-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          <Reveal>
            <ArtSlot
              variant="macro"
              tint="#3D34C9"
              onDark={false}
              brief="macro — a strip dissolving at the edge"
              className="aspect-4/5 w-full lg:sticky lg:top-40"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="micro text-ink-soft">03 — How it works</p>
              <h2
                id="science-heading"
                className="display mt-8 text-[clamp(2.75rem,6vw,4.75rem)]"
              >
                No water.
                <br />
                No pills.
              </h2>
              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-ink-soft">
                A pill has to survive the journey before it can do anything. An
                oral strip skips that entirely — it dissolves where you put it,
                and the actives go from there.
              </p>
            </Reveal>

            <ol className="mt-16 border-t border-hairline">
              {STEPS.map((step, i) => (
                <Reveal as="li" key={step.n} delay={i * 110}>
                  <div className="grid grid-cols-[3.5rem_1fr] gap-6 border-b border-hairline py-9">
                    <span className="micro pt-1 text-ink-soft">{step.n}</span>
                    <div>
                      <h3 className="display text-[1.5rem] leading-tight">{step.title}</h3>
                      <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={220}>
              <Link href="/science" className="micro link-quiet mt-12 inline-block">
                Read the science →
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
