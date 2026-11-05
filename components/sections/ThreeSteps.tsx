import { Reveal } from "@/components/Reveal";
import { THREE_STEPS as T, type Product } from "@/lib/brand";

/**
 * Three Simple Steps — on each product page, straight after "Science in a
 * strip" (client, Nov 2026), on Mondays' "Don't Overthink It": a centred
 * heading over three soft cards, each a numbered disc top left, a line
 * icon, a title and one line. Mix / Sip / Repeat became Peel / Place /
 * Dissolve, with the client's wording.
 *
 * Mondays' discs are their coral; ours take the carton's colour, so the
 * Sleep page reads navy and the Energy & Focus page amber.
 */
export function ThreeSteps({ product }: { product: Product }) {
  return (
    <section
      className="bg-bone py-12 lg:py-16"
      aria-labelledby="steps-heading"
      style={{ "--accent": product.accent } as React.CSSProperties}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal>
          <h2
            id="steps-heading"
            className="display text-center text-[clamp(2.25rem,4vw,3.5rem)] text-ink"
          >
            {T.title}
          </h2>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-12 lg:gap-5">
          {T.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120}>
              <article className="relative flex h-full flex-col items-center rounded-[24px] bg-bone-deep px-8 pb-12 pt-24 text-center lg:pt-28">
                <span
                  aria-hidden="true"
                  className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-[1.375rem] font-light leading-none text-white lg:left-10 lg:top-10 lg:h-[3.25rem] lg:w-[3.25rem]"
                >
                  {i + 1}
                </span>
                <StepIcon name={step.icon} />
                <h3 className="mt-8 text-[1.75rem] font-normal leading-tight tracking-[-0.01em] text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[17rem] text-[1.0625rem] font-light leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Line icons at the weight of Mondays' — a sachet peeling open, a strip
    going onto the tongue, a strip breaking up into nothing. */
function StepIcon({ name }: { name: (typeof T.steps)[number]["icon"] }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className="h-[5.5rem] w-[5.5rem] text-ink"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "peel" && (
        <>
          {/* The sealed sachet, its top right corner folded back */}
          <path d="M10 16a3 3 0 0 1 3-3h16l9 9v14a3 3 0 0 1-3 3H13a3 3 0 0 1-3-3V16Z" />
          <path d="M29 13v6.5a2.5 2.5 0 0 0 2.5 2.5H38" />
          <path d="M29 13c3.6-2.6 7.6-2.9 11.2-.8" />
          {/* The strip inside, and the seal line */}
          <rect x="15.5" y="21.5" width="11" height="11" rx="1.6" />
          <path d="M13.5 16.5h11" strokeDasharray="1.4 2.2" />
        </>
      )}
      {name === "place" && (
        <>
          {/* Coming down onto the tongue */}
          <path d="M24 4.5v8M20.8 9.7 24 12.9l3.2-3.2" />
          {/* The strip */}
          <rect x="18.5" y="16.5" width="11" height="6" rx="1.2" />
          {/* An open mouth and the tongue */}
          <path d="M7 26c5.5-2.8 11.2-4.2 17-4.2S35.5 23.2 41 26c-3.4 8.2-9.5 12.6-17 12.6S10.4 34.2 7 26Z" />
          <path d="M14.5 29.5c2.6 4.4 5.8 6.5 9.5 6.5s6.9-2.1 9.5-6.5" />
          <path d="M24 30.5v4.5" />
        </>
      )}
      {name === "dissolve" && (
        <>
          {/* The strip, its right edge breaking up */}
          <path d="M26 13H14.5a2.5 2.5 0 0 0-2.5 2.5v17a2.5 2.5 0 0 0 2.5 2.5H26" />
          <path d="M26 13v3M26 19.5v2.5M26 25.5v2M26 31.5v3.5" />
          {[
            [30.5, 15.5, 1.3],
            [33.5, 21, 1.1],
            [30, 25.5, 1.2],
            [35.5, 28.5, 0.9],
            [31.5, 32.5, 1],
            [38.5, 18.5, 0.7],
            [39, 34, 0.6],
            [36.5, 11.5, 0.6],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" />
          ))}
        </>
      )}
    </svg>
  );
}
