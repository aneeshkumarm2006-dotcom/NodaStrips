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
import Image from "next/image";
import { getPhoto } from "@/lib/photos";
import { Mark } from "./Mark";

type Variant = "sun" | "field" | "dusk" | "macro" | "still";

/** Deep Teal, from the direction document */
const BRAND = "#128A7C";
/** Volt Lime — the light source in these fields. Coral would go muddy
 *  mixed into teal; lime keeps the greens clean, the way Seed's do. */
const LIGHT = "#C7E64B";

const FIELDS: Record<Variant, (tint: string) => string> = {
  // Hero: a low light rising, the room falling away above it
  sun: (tint) =>
    `radial-gradient(115% 82% at 50% 112%, color-mix(in srgb, ${LIGHT} 40%, ${tint}) 0%, transparent 64%), ` +
    `linear-gradient(180deg, color-mix(in srgb, #16130F 55%, ${tint}) 0%, ${tint} 74%)`,

  // Product cards: the colour stays the colour, with a bloom at the foot
  field: (tint) =>
    `radial-gradient(105% 70% at 50% 114%, color-mix(in srgb, ${LIGHT} 28%, ${tint}) 0%, transparent 58%), ` +
    `linear-gradient(180deg, color-mix(in srgb, #16130F 14%, ${tint}) 0%, ${tint} 48%)`,

  // Night falling into a lit horizon
  dusk: (tint) =>
    `linear-gradient(178deg, color-mix(in srgb, #16130F 60%, ${tint}) 0%, ${tint} 48%, color-mix(in srgb, ${LIGHT} 38%, ${tint}) 100%)`,

  // Close, bright, clinical — a strip against bone
  macro: (tint) =>
    `radial-gradient(75% 60% at 62% 42%, color-mix(in srgb, #F5F5F5 90%, ${tint}) 0%, color-mix(in srgb, #F5F5F5 62%, ${tint}) 55%, color-mix(in srgb, #EBEBEB 88%, ${tint}) 100%)`,

  // Raking daylight across a surface
  still: (tint) =>
    `linear-gradient(104deg, color-mix(in srgb, #EBEBEB 92%, ${tint}) 0%, color-mix(in srgb, #F5F5F5 94%, ${tint}) 42%, color-mix(in srgb, ${tint} 55%, transparent) 100%)`,
};

export function ArtSlot({
  variant = "sun",
  tint = BRAND,
  brief,
  className = "",
  onDark = true,
  showCaption = true,
  showMark = true,
}: {
  variant?: Variant;
  tint?: string;
  /** What should be photographed here */
  brief: string;
  className?: string;
  /** Whether the caption should read light or dark */
  onDark?: boolean;
  /** Hide the caption where it would sit under overlaid copy */
  showCaption?: boolean;
  showMark?: boolean;
}) {
  const photo = getPhoto(brief);

  // Once a brief is mapped in lib/photos.ts the slot becomes a photograph.
  // The colour field stays behind it as the loading ground.
  if (photo) {
    return (
      <div
        className={`relative isolate overflow-hidden ${className}`}
        style={{ background: FIELDS[variant](tint) }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
          className="object-cover"
          style={{ objectPosition: photo.position ?? "center" }}
        />
      </div>
    );
  }

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

      {/* The mark, rising out of the bottom edge */}
      {showMark && (variant === "sun" || variant === "field" || variant === "dusk") && (
        <Mark
          className={`pointer-events-none absolute bottom-[-26%] left-1/2 aspect-square w-[62%] -translate-x-1/2 ${
            onDark ? "text-bone/15" : "text-ink/12"
          }`}
        />
      )}

      {showCaption && (
        <span
          className={`micro absolute bottom-5 left-5 right-5 ${
            onDark ? "text-bone/55" : "text-ink/45"
          }`}
        >
          Photography to follow — {brief}
        </span>
      )}
    </div>
  );
}
