"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Seed's ViaCap® scroll animation, for the FlashRelease® card (client, Nov
 * 2026: "FlashRelease® Technology section in the seed website has this
 * cool animation when you scroll down for that line. Can we have the
 * same?" — and, on the first pass, which only drew the callout rules in:
 * "not done"). Measured off seed.com, it is three things at once:
 *
 *   · the label decodes — its letters come up one at a time, 50ms apart,
 *     while the whole line shuffles its own characters every 75ms for the
 *     first ~0.5s and then settles on the real words (ScrambleLabel);
 *   · the stat counts up from zero, quick at first and easing in, ~2s,
 *     as its arrow rises 30px into place over ~1.1s (StatCount);
 *   · the callouts draw in (FlashCallouts).
 *
 * Each part replays whenever it comes back into view, as Seed's does.
 * Reduced motion shows the finished state.
 */

/* ------------------------------------------------------------------ */

const REDUCE = "(prefers-reduced-motion: reduce)";

function subscribeMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCE).matches,
    () => false,
  );
}

/**
 * True once `threshold` of the element is on screen (a little above the
 * bottom edge), false again once it has left entirely — so it replays.
 * `onLeave` resets whatever the caller animates, before the next showing.
 */
export function useReplayInView<T extends Element>(threshold = 0.6, onLeave?: () => void) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  const leave = useRef(onLeave);

  useEffect(() => {
    leave.current = onLeave;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= threshold) setShown(true);
        else if (!entry.isIntersecting) {
          setShown(false);
          leave.current?.();
        }
      },
      { threshold: [0, threshold], rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return [ref, shown] as const;
}

/* ------------------------------------------------------------------ */

const SHUFFLE_EVERY = 75; // ms
const SHUFFLES = 6; // ≈ 0.5s of shuffling, then the real words
const LETTER_STEP = 50; // ms between letters

function shuffled(chars: string[]) {
  const a = [...chars];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** "● FLASHRELEASE® TECHNOLOGY", decoding itself in */
export function ScrambleLabel({ text, className = "" }: { text: string; className?: string }) {
  const chars = [...text];
  const [scramble, setScramble] = useState<string[] | null>(null);
  const [ref, inView] = useReplayInView<HTMLParagraphElement>(0.6, () => setScramble(null));
  const reduced = useReducedMotion();
  const shown = inView || reduced;

  useEffect(() => {
    if (!inView || reduced) return;
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      if (n > SHUFFLES) {
        setScramble(null);
        window.clearInterval(id);
      } else {
        setScramble(shuffled([...text]));
      }
    }, SHUFFLE_EVERY);
    return () => window.clearInterval(id);
  }, [inView, reduced, text]);

  const shownChars = scramble ?? chars;

  return (
    <p ref={ref} className={className}>
      <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full bg-current" />
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="whitespace-pre">
        {shownChars.map((c, i) => (
          <span
            key={i}
            style={{
              opacity: shown ? 1 : 0,
              // Seed flips each letter on outright — no fade — one after
              // another
              transition: shown && !reduced ? `opacity 0s linear ${i * LETTER_STEP}ms` : "none",
            }}
          >
            {c}
          </span>
        ))}
      </span>
    </p>
  );
}

/* ------------------------------------------------------------------ */

const COUNT_FOR = 2000; // ms
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** The "↑ 10x" in the note box: the arrow rises, the figure counts up */
export function StatCount({
  to,
  unit,
  label,
}: {
  to: number;
  unit: string;
  /** Read out in place of the moving parts, e.g. "10x faster" */
  label: string;
}) {
  const [n, setN] = useState(0);
  const [ref, inView] = useReplayInView<HTMLParagraphElement>(0.6, () => setN(0));
  const reduced = useReducedMotion();
  const shown = inView || reduced;

  useEffect(() => {
    if (!inView || reduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / COUNT_FOR);
      setN(Math.round(to * easeOut(p)));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduced, to]);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  return (
    <p ref={ref} className="flex shrink-0 items-center gap-1.5 text-[2rem] font-light leading-[48px]">
      <span className="sr-only">{label}</span>
      <span
        aria-hidden="true"
        className="flex h-[1.95rem] w-[1.95rem] items-center justify-center rounded-full bg-[rgb(252,252,247)] text-[rgb(70,76,68)]"
        style={{
          opacity: shown ? 1 : 0,
          transform: shown ? "translateY(0)" : "translateY(30px)",
          transition: reduced ? "none" : `opacity 1.1s ${ease}, transform 1.1s ${ease}`,
        }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4">
          <path
            d="M8 13V3.4M3.8 7.4 8 3.2l4.2 4.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {/* Wide enough for the final figure, so the count doesn't jostle */}
      <span aria-hidden="true" className="tabular-nums">
        <span className="inline-block text-right" style={{ minWidth: `${String(to).length}ch` }}>
          {reduced ? to : n}
        </span>
        {unit}
      </span>
    </p>
  );
}
