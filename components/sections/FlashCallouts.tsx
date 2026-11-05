"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The two FlashRelease® callouts, with Seed's scroll animation (client,
 * Nov 2026: "FlashRelease Technology section in the seed website has this
 * cool animation when you scroll down for that line. Can we have the
 * same?"). Timings measured off seed.com/daily-synbiotic:
 *
 *   · the rule grows out from the capsule — width 0 → full, 1s;
 *   · a 5px dot lands on the capsule end of it, 0.25s after 0.75s;
 *   · the copy fades in over 0.75s while it settles into place, 1s.
 *
 * Like Seed's, it resets once the section has left the screen, so it
 * plays again on the way back. Reduced motion shows it all at once.
 *
 * Geometry (lg): the column is 400px tall with the 484px capsule
 * animation centred in it; the capsule itself is 19% of that frame, so its
 * edges sit 47px either side of the centre line. Each rule runs from the
 * outside of the column to one of those edges.
 */

type Copy = { title: string; body: string };

export function FlashCallouts({ outer, inner }: { outer: Copy; inner: Copy }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) setShown(true);
        else if (!entry.isIntersecting) setShown(false);
      },
      { threshold: [0, 0.35] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-8 flex flex-col gap-8 lg:absolute lg:inset-0 lg:mt-0 lg:block">
      <Callout
        side="left"
        shown={shown}
        copy={outer}
        className="lg:absolute lg:left-0 lg:right-[calc(50%+47px)] lg:top-[104px]"
      />
      <Callout
        side="right"
        shown={shown}
        delay={250}
        copy={inner}
        className="lg:absolute lg:left-[calc(50%+47px)] lg:right-0 lg:top-[232px]"
      />
    </div>
  );
}

function Callout({
  side,
  shown,
  copy,
  delay = 0,
  className,
}: {
  /** Which side of the capsule — the rule grows out from the capsule end */
  side: "left" | "right";
  shown: boolean;
  copy: Copy;
  delay?: number;
  className: string;
}) {
  const fromCapsule = side === "left" ? "lg:origin-right" : "lg:origin-left";
  const ease = "var(--ease-quiet)";

  return (
    <div className={className}>
      {/* The rule, and the dot where it meets the capsule */}
      <div className="relative h-px">
        <span
          aria-hidden="true"
          className={`absolute inset-0 origin-left bg-[rgb(252,252,247)] ${fromCapsule}`}
          style={{
            transform: shown ? "scaleX(1)" : "scaleX(0)",
            opacity: shown ? 1 : 0,
            transition: `transform 1s ${ease} ${delay}ms, opacity 0.75s ${delay}ms`,
          }}
        />
        <span
          aria-hidden="true"
          className={`absolute top-1/2 hidden h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[rgb(252,252,247)] lg:block ${
            side === "left" ? "-right-[2.5px]" : "-left-[2.5px]"
          }`}
          style={{
            opacity: shown ? 1 : 0,
            transition: `opacity 0.25s ${shown ? 750 + delay : 0}ms`,
          }}
        />
      </div>

      <div
        // The right-hand copy sits at the far end of its rule, clear of the
        // burst the placeholder capsule throws out to that side
        className={`pt-3 lg:w-[200px] ${side === "right" ? "lg:ml-auto" : ""}`}
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "none" : "translateY(14px)",
          transition: `opacity 0.75s ${ease} ${delay + 150}ms, transform 1s ${ease} ${delay + 150}ms`,
        }}
      >
        <h3 className="text-xs font-medium uppercase leading-[1.1]">{copy.title}</h3>
        <p className="mt-1 text-xs font-[350] leading-[1.4] tracking-[-0.003em]">{copy.body}</p>
      </div>
    </div>
  );
}
