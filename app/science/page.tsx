import type { Metadata } from "next";
import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { Compare } from "@/components/sections/Compare";
import { Format } from "@/components/sections/Format";
import { STEPS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Science — NODA",
  description:
    "How an oral film works, why the format matters for absorption, and what we can and cannot claim yet.",
};

export default function SciencePage() {
  return (
    <>
      <PageHeader
        index="Science"
        title={
          <>
            No water.
            <br />
            No pills.
          </>
        }
        intro="A pill has to survive the journey before it can do anything. A film dissolves where you put it. That difference is the whole reason this product exists."
      />

      {/* How it works */}
      <section className="bg-bone pb-24 lg:pb-32" aria-labelledby="how-heading">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
            <Reveal>
              <ArtSlot
                variant="macro"
                onDark={false}
                brief="macro of the film, backlit"
                showCaption={false}
                className="aspect-4/5 w-full rounded-2xl lg:sticky lg:top-40"
              />
            </Reveal>

            <div>
              <Reveal>
                <h2 id="how-heading" className="display text-[clamp(2rem,4vw,3rem)]">
                  Three steps, then nothing
                </h2>
              </Reveal>

              <ol className="mt-12 border-t border-hairline">
                {STEPS.map((step, i) => (
                  <Reveal as="li" key={step.n} delay={i * 110}>
                    <div className="grid grid-cols-[3rem_1fr] gap-6 border-b border-hairline py-8">
                      <span className="micro pt-1 text-ink-soft">{step.n}</span>
                      <div>
                        <h3 className="display text-[1.4rem] leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Format />
      <Compare />

      {/* Evidence — the honest bit */}
      <section className="bg-bone-deep py-24 lg:py-32" aria-labelledby="evidence-heading">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal className="max-w-2xl">
            <p className="micro text-ink-soft">Evidence</p>
            <h2
              id="evidence-heading"
              className="display mt-7 text-[clamp(2rem,4vw,3rem)]"
            >
              What we can say, and what we can’t
            </h2>
            <p className="prose-quiet mt-7 text-ink-soft">
              This page is a placeholder. Nothing here has been reviewed by a
              regulator, and no figure on this site has been measured. Before any
              of it goes live it needs third-party testing, a qualified reviewer,
              and sign-off against the advertising rules of every market we ship
              to.
            </p>
            <p className="prose-quiet mt-6 text-ink-soft">
              That is not a disclaimer we want buried in the footer. A brand that
              argues from absorption has to be able to show its working.
            </p>

            <Link href="/shop" className="micro link-quiet mt-10 inline-block">
              See the strip →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
