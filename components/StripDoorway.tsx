"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Mark } from "./Mark";

/**
 * The hero CTA, with Ralf's "See our rooms" doorway transition re-drawn
 * for a strip.
 *
 * Ralf opens an illustrated doorway when you click through. Here the
 * doorway is square — the shape of the strip itself — drawn as two nested
 * outlines (the outer and inner strip of FlashRelease) with a pair of
 * doors inside. On click:
 *
 *   1. a cream veil rises and the strip draws itself in      0–900ms
 *   2. the doors swing open onto a sunrise                  900–1700ms
 *   3. we push through the opening                         1700–2300ms
 *   4. the page has scrolled to the products underneath; the veil lifts
 *
 * Reduced motion skips straight to a plain scroll.
 */

type Phase = "idle" | "veil" | "draw" | "open" | "through" | "out";

const TIMELINE: [Phase, number][] = [
  ["veil", 0],
  // One frame later, so the outlines mount undrawn and then animate
  ["draw", 60],
  ["open", 1050],
  ["through", 1850],
  ["out", 2350],
  ["idle", 3050],
];

export function StripDoorway({
  targetId,
  className = "",
  children,
}: {
  /** Element to land on once through the door */
  targetId: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const land = useCallback(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    // Instant: the veil is covering the jump
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "instant" as ScrollBehavior });
  }, [targetId]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (phase !== "idle") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    timers.current.forEach(clearTimeout);
    timers.current = TIMELINE.map(([p, at]) =>
      window.setTimeout(() => {
        setPhase(p);
        if (p === "out") land();
      }, at),
    );
  };

  const active = phase !== "idle";

  return (
    <>
      <a href={`#${targetId}`} onClick={go} className={className}>
        {children}
      </a>

      {/* Portalled to <body>: the hero is `isolate`, which would otherwise
          trap the veil beneath the fixed header. */}
      {active && createPortal(<Veil phase={phase} />, document.body)}
    </>
  );
}

function Veil({ phase }: { phase: Phase }) {
  return (
    <div
      aria-hidden="true"
      className={[
        "fixed inset-0 z-[70] flex items-center justify-center bg-oat",
        "transition-opacity duration-500 [transition-timing-function:var(--ease-quiet)]",
        phase === "veil" || phase === "out" ? "opacity-0" : "opacity-100",
      ].join(" ")}
      style={phase === "out" ? { transitionDuration: "650ms" } : undefined}
    >
      <Doorway phase={phase} />
    </div>
  );
}

function Doorway({ phase }: { phase: Phase }) {
  const drawn = phase !== "veil";
  const open = phase === "open" || phase === "through" || phase === "out";
  const through = phase === "through" || phase === "out";

  return (
    <div className="flex flex-col items-center text-cocoa">
      <div
        className="relative aspect-square w-[min(58vmin,400px)] transition-transform duration-[650ms] ease-[cubic-bezier(0.7,0,0.84,0)]"
        style={{ transform: through ? "scale(7)" : "scale(1)" }}
      >
        {/* Behind the doors: first light, seen through the strip */}
        <div className="absolute inset-[11%] overflow-hidden rounded-[14px]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 100%, #fbe2b6 0%, #f3c98b 32%, #e9b98c 52%, #d9b8a3 70%, #efe4d6 100%)",
            }}
          />
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" fill="none">
            {/* The sun, rising on the threshold */}
            <circle cx="50" cy="78" r="13" fill="#fff6e4" />
            {[-62, -38, -14, 14, 38, 62].map((a) => (
              <line
                key={a}
                x1="50"
                y1="78"
                x2={50 + Math.sin((a * Math.PI) / 180) * 46}
                y2={78 - Math.cos((a * Math.PI) / 180) * 46}
                stroke="#fff6e4"
                strokeWidth="0.5"
                strokeLinecap="round"
                opacity="0.8"
              />
            ))}
            {/* Horizon and a far ridge */}
            <path d="M0 78 H100" stroke="#b98a6a" strokeWidth="0.45" />
            <path d="M0 84 C18 80 30 81 46 85 S78 89 100 83 V100 H0Z" fill="#e7c9a7" />
          </svg>
        </div>

        {/* The doors — one per half of the inner strip, hinged outward */}
        <div className="absolute inset-[11%] flex [perspective:900px]">
          {(["left", "right"] as const).map((side) => (
            <div
              key={side}
              className="relative h-full w-1/2 transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                transformOrigin: side === "left" ? "left center" : "right center",
                transform: open
                  ? `rotateY(${side === "left" ? -112 : 112}deg)`
                  : "rotateY(0deg)",
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className={`absolute inset-0 border border-cocoa/70 bg-oat ${
                  side === "left" ? "rounded-l-[14px] border-r-[0.5px]" : "rounded-r-[14px] border-l-[0.5px]"
                }`}
              >
                <svg
                  viewBox="0 0 50 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.35"
                  vectorEffect="non-scaling-stroke"
                >
                  {/* Two raised panels, like a door, ruled like a film */}
                  <rect x="9" y="8" width="32" height="40" rx="2.5" opacity="0.55" />
                  <rect x="9" y="54" width="32" height="38" rx="2.5" opacity="0.55" />
                  {[16, 22, 28, 34, 40].map((y) => (
                    <line key={y} x1="13" x2="37" y1={y} y2={y} opacity="0.18" />
                  ))}
                </svg>
                {/* Handle, toward the meeting edge */}
                <span
                  className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-cocoa/70 ${
                    side === "left" ? "right-[10%]" : "left-[10%]"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* The strip itself: outer and inner outline, drawing in */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" fill="none">
          <rect
            x="8"
            y="8"
            width="384"
            height="384"
            rx="34"
            stroke="currentColor"
            strokeWidth="1.4"
            pathLength={1}
            strokeDasharray="1"
            style={{
              strokeDashoffset: drawn ? 0 : 1,
              transition: "stroke-dashoffset 900ms cubic-bezier(0.65,0,0.35,1)",
            }}
          />
          <rect
            x="44"
            y="44"
            width="312"
            height="312"
            rx="16"
            stroke="currentColor"
            strokeWidth="0.9"
            pathLength={1}
            strokeDasharray="1"
            opacity="0.8"
            style={{
              strokeDashoffset: drawn ? 0 : 1,
              transition: "stroke-dashoffset 900ms 120ms cubic-bezier(0.65,0,0.35,1)",
            }}
          />
          {/* The threshold step */}
          <path
            d="M120 392 v14 h160 v-14"
            stroke="currentColor"
            strokeWidth="1"
            opacity={drawn ? 0.6 : 0}
            style={{ transition: "opacity 600ms 500ms" }}
          />
        </svg>

        {/* The N, set in the top rail like a house name */}
        <Mark
          className={`absolute left-1/2 top-[2.6%] h-[5%] -translate-x-1/2 transition-opacity duration-700 ${
            drawn ? "opacity-80" : "opacity-0"
          }`}
        />
      </div>

      <p
        className={`caps-wide mt-12 transition-opacity duration-500 ${
          drawn && !through ? "opacity-80" : "opacity-0"
        }`}
      >
        Wellness in a strip
      </p>
    </div>
  );
}
