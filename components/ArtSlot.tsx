/**
 * Photography placeholder.
 *
 * Every image on this page is a slot, not a decision. Each one renders an
 * art-directed colour field in the brand palette and states, quietly, what
 * photograph belongs there — so the page reads as intended at review and
 * the shoot has a brief.
 *
 * To drop in a real image: replace the body of this component with
 * <Image src={...} alt={...} fill className="object-cover" />.
 */
import { Mark } from "./Mark";

type Variant = "sun" | "field" | "dusk" | "macro" | "still";

const FIELDS: Record<Variant, (tint: string) => string> = {
  // Hero: a low sun rising, sky falling away above it
  sun: (tint) =>
    `radial-gradient(115% 82% at 50% 112%, color-mix(in srgb, #FF9052 62%, ${tint}) 0%, transparent 64%), ` +
    `linear-gradient(180deg, color-mix(in srgb, #16130F 28%, ${tint}) 0%, ${tint} 68%)`,

  // Category cards: the colour stays the colour. Only a warm bloom at the
  // foot of the frame, so five cards side by side still read as five
  // saturated blocks rather than five gradients.
  field: (tint) =>
    `radial-gradient(105% 70% at 50% 114%, color-mix(in srgb, #FF9052 42%, ${tint}) 0%, transparent 58%), ` +
    `linear-gradient(180deg, color-mix(in srgb, #16130F 10%, ${tint}) 0%, ${tint} 46%)`,
  // Indigo falling into amber at the horizon
  dusk: (tint) =>
    `linear-gradient(178deg, color-mix(in srgb, #16130F 45%, ${tint}) 0%, ${tint} 46%, color-mix(in srgb, #FF9052 62%, ${tint}) 100%)`,
  // Close, bright, clinical — a strip against bone
  macro: (tint) =>
    `radial-gradient(75% 60% at 62% 42%, color-mix(in srgb, #F7F4EF 88%, ${tint}) 0%, color-mix(in srgb, #F7F4EF 55%, ${tint}) 55%, color-mix(in srgb, #EFE9E0 90%, ${tint}) 100%)`,
  // Raking daylight across a surface
  still: (tint) =>
    `linear-gradient(104deg, color-mix(in srgb, #EFE9E0 92%, ${tint}) 0%, color-mix(in srgb, #F7F4EF 96%, ${tint}) 42%, color-mix(in srgb, #16130F 22%, ${tint}) 100%)`,
};

export function ArtSlot({
  variant = "sun",
  tint = "#3D34C9",
  brief,
  className = "",
  onDark = true,
}: {
  variant?: Variant;
  /** Hex of the category colour this slot belongs to */
  tint?: string;
  /** What should be photographed here */
  brief: string;
  className?: string;
  /** Whether the caption should read light or dark */
  onDark?: boolean;
}) {
  return (
    <div
      className={`relative isolate overflow-hidden ${className}`}
      style={{ background: FIELDS[variant](tint) }}
      role="img"
      aria-label={`Photography placeholder — ${brief}`}
    >
      {/* Grain, so the field reads as film rather than CSS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.35]"
        style={{ backgroundImage: "var(--grain)" }}
      />

      {/* The mark itself, rising out of the bottom edge */}
      {(variant === "sun" || variant === "field" || variant === "dusk") && (
        <Mark
          className={`pointer-events-none absolute bottom-[-26%] left-1/2 aspect-square w-[62%] -translate-x-1/2 ${
            onDark ? "text-bone/15" : "text-ink/12"
          }`}
        />
      )}

      <span
        className={`micro absolute bottom-5 left-5 right-5 ${
          onDark ? "text-bone/55" : "text-ink/45"
        }`}
      >
        Photography to follow — {brief}
      </span>
    </div>
  );
}
