import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";

const QUESTIONS = [
  "When does the night usually go wrong — falling asleep, or staying asleep?",
  "What time do you want to be up?",
  "What have you already tried?",
];

/**
 * 04 — Take the quiz. Entry to personalization; supports the hero CTA.
 * A teaser, not a hard sell.
 */
export function Quiz() {
  return (
    <section
      id="quiz"
      className="bg-ink py-28 text-bone lg:py-40"
      aria-labelledby="quiz-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-24">
          <div>
            <Reveal>
              <p className="micro opacity-60">04 — Personalization</p>
              <h2
                id="quiz-heading"
                className="display mt-8 text-[clamp(2.75rem,6vw,4.75rem)]"
              >
                Three questions.
                <br />
                Then your strip.
              </h2>
              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed opacity-70">
                Sleep is not one problem, so it is not one formula. Tell us how
                your nights actually go and we will build the strip around it.
              </p>
            </Reveal>

            <ol className="mt-14 flex flex-col gap-5">
              {QUESTIONS.map((q, i) => (
                <Reveal as="li" key={q} delay={i * 110}>
                  <div className="flex items-start gap-5 border-b border-bone/15 pb-5">
                    <span className="micro pt-1 opacity-50">0{i + 1}</span>
                    <p className="max-w-md text-[1.0625rem] leading-relaxed opacity-90">
                      {q}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={330}>
              <Link
                href="/quiz"
                className="micro group mt-14 inline-flex h-14 items-center gap-3 border border-bone/40 px-8 transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:border-bone"
              >
                Take the quiz
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <ArtSlot
              variant="dusk"
              tint="#3D34C9"
              brief="portrait, eyes closed, indigo light"
              className="aspect-4/5 w-full"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
