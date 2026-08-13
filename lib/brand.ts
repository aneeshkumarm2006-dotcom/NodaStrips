/**
 * Single source of truth for the things the brief pins down:
 * the palette, the range, the navigation and the utilities.
 *
 * Category names other than Sleep are placeholders — the direction
 * document names only Sleep and assigns five colours. Rename here.
 */

export type Category = {
  slug: string;
  name: string;
  /** The promise, in the brand's voice */
  line: string;
  /** Tailwind token name — see app/globals.css @theme */
  color: string;
  hex: string;
  /** Text colour that sits on the category colour */
  on: "bone" | "ink";
  available: boolean;
};

export const CATEGORIES: Category[] = [
  {
    slug: "sleep",
    name: "Sleep",
    line: "Melt into rest",
    color: "indigo",
    hex: "#3D34C9",
    on: "bone",
    available: true,
  },
  {
    slug: "energy",
    name: "Energy",
    line: "A clean lift",
    color: "solar",
    hex: "#FF9052",
    on: "ink",
    available: false,
  },
  {
    slug: "immunity",
    name: "Immunity",
    line: "Hold the line",
    color: "ignite",
    hex: "#FD4F42",
    on: "bone",
    available: false,
  },
  {
    slug: "focus",
    name: "Focus",
    line: "Quiet the noise",
    color: "teal",
    hex: "#128A7C",
    on: "bone",
    available: false,
  },
  {
    slug: "greens",
    name: "Greens",
    line: "Everyday green",
    color: "volt",
    hex: "#C7E64B",
    on: "ink",
    available: false,
  },
];

export const HERO_CATEGORY = CATEGORIES[0];

export const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "Science", href: "/science" },
  { label: "Sleep Journal", href: "/sleep-journal" },
  { label: "Subscription", href: "/subscription" },
  { label: "Take the quiz", href: "/quiz" },
] as const;

export const ANNOUNCEMENT = "Get first access to personalized sleep strips";

export const PRIMARY_CTA = {
  label: "Get first access to personalized sleep strips",
  href: "/quiz",
} as const;

/** Header utilities. Note: no search — this is deliberate. */
export const LANGUAGES = [
  { code: "EN", country: "United Kingdom", flag: "🇬🇧" },
  { code: "EN", country: "United States", flag: "🇺🇸" },
  { code: "DE", country: "Deutschland", flag: "🇩🇪" },
  { code: "FR", country: "France", flag: "🇫🇷" },
  { code: "AE", country: "United Arab Emirates", flag: "🇦🇪" },
] as const;

export type Language = (typeof LANGUAGES)[number];

export const JOURNAL_POSTS = [
  {
    slug: "the-hour-before-bed",
    kicker: "Ritual",
    title: "The hour before bed",
    excerpt:
      "What the last sixty minutes of the day are actually doing to the first eight hours of your sleep.",
    readTime: "5 min",
  },
  {
    slug: "why-a-strip-not-a-pill",
    kicker: "Format",
    title: "Why a strip, not a pill",
    excerpt:
      "Swallowing is a bottleneck. A film that dissolves on the tongue skips the queue entirely.",
    readTime: "4 min",
  },
  {
    slug: "melatonin-is-not-a-sedative",
    kicker: "Science",
    title: "Melatonin is not a sedative",
    excerpt:
      "It is a timing signal. Understanding the difference changes how — and when — you take it.",
    readTime: "6 min",
  },
] as const;
