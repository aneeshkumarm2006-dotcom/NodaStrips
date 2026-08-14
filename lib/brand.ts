/**
 * Single source of truth for the page.
 *
 * ⚠️  EVERYTHING IN THIS FILE IS PLACEHOLDER — copy, ingredients, doses,
 * prices, comparison figures, reviews and FAQ answers are written to hold
 * the structure and the tone at the right weight. None of it is approved,
 * and none of the numbers are substantiated. Replace before launch.
 *
 * Keep it flat and data-shaped: on Shopify each block below becomes a
 * section setting or a repeatable block, so the translation stays mechanical.
 */

export const BRAND = {
  name: "NODA",
  tagline: "Where better days begin",
  estd: "Estd. 2026 · Located in Canada",
} as const;

/** The one product. */
export const PRODUCT = {
  name: "Sleep",
  line: "Melt into rest",
  subtitle:
    "A fast-dissolving vegan strip for the end of the day. No water. No pills.",
  price: "£28",
  unit: "30 strips · one month",
  subscription: "£24 on subscription",
  slug: "sleep",
} as const;

export const NAV = [
  { label: "The strip", href: "/shop" },
  { label: "Science", href: "/science" },
  { label: "Sleep Journal", href: "/sleep-journal" },
  { label: "Subscription", href: "/subscription" },
] as const;

export const ANNOUNCEMENT = "Free shipping on every subscription";

export const PRIMARY_CTA = { label: "Shop the sleep strip", href: "/shop" } as const;

export const LANGUAGES = [
  { code: "EN", country: "Canada", flag: "🇨🇦" },
  { code: "FR", country: "Canada — Français", flag: "🇨🇦" },
  { code: "EN", country: "United States", flag: "🇺🇸" },
  { code: "EN", country: "United Kingdom", flag: "🇬🇧" },
] as const;

export type Language = (typeof LANGUAGES)[number];

/* ---------------------------------------------------------------- 02 */

export const STRIP_FACTS = [
  {
    label: "Thinner than a petal",
    body: "A film you place on the tongue. There is nothing to swallow and nothing to carry water for.",
  },
  {
    label: "Gone in seconds",
    body: "It dissolves on contact and releases its actives straight into the mouth.",
  },
  {
    label: "One a night",
    body: "A single strip, taken thirty minutes before bed. That is the whole ritual.",
  },
] as const;

/* ---------------------------------------------------------------- 03 */

export const INGREDIENTS = [
  {
    name: "Melatonin",
    dose: "0.5 mg",
    role: "A timing signal, not a sedative. Low dose, deliberately.",
  },
  {
    name: "L-Theanine",
    dose: "100 mg",
    role: "Quiets mental chatter without weighing you down.",
  },
  {
    name: "Magnesium bisglycinate",
    dose: "60 mg",
    role: "The gentle form. Supports muscle relaxation overnight.",
  },
  {
    name: "Lemon balm extract",
    dose: "80 mg",
    role: "Long used to settle the mind before rest.",
  },
  {
    name: "Vegan film base",
    dose: "—",
    role: "Plant cellulose. No gelatin, no sugar, no artificial colour.",
  },
] as const;

/* ---------------------------------------------------------------- 04 */

export const STEPS = [
  {
    n: "01",
    title: "Place it on your tongue",
    body: "No water, no swallowing, nothing to time around a glass.",
  },
  {
    n: "02",
    title: "It dissolves in seconds",
    body: "The film breaks down on contact and the actives are released.",
  },
  {
    n: "03",
    title: "Absorption begins immediately",
    body: "There is no tablet to break down first, so nothing waits in a queue.",
  },
] as const;

/* ---------------------------------------------------------------- 05
   The comparison.

   Formats, not brands — naming competitors needs substantiation and a
   lawyer, and the argument lands just as hard without it.
   Every figure below is invented.                                      */

export type Dataset = {
  id: string;
  /** Toggle label */
  label: string;
  /** What the axis measures */
  axis: string;
  unit: string;
  /** Higher is better in both datasets, so bar height always reads the same way */
  bars: { format: string; value: number; ours?: boolean }[];
};

export const COMPARISON: Dataset[] = [
  {
    id: "absorption",
    label: "Absorption",
    axis: "Absorbed within 30 minutes",
    unit: "%",
    bars: [
      { format: "Oral strip", value: 92, ours: true },
      { format: "Powder", value: 68 },
      { format: "Gummy", value: 54 },
      { format: "Capsule", value: 41 },
      { format: "Tablet", value: 35 },
    ],
  },
  {
    id: "adherence",
    label: "Kept up nightly",
    axis: "Still taken as directed after 60 nights",
    unit: "%",
    bars: [
      { format: "Oral strip", value: 88, ours: true },
      { format: "Gummy", value: 71, },
      { format: "Capsule", value: 62 },
      { format: "Tablet", value: 58 },
      { format: "Powder", value: 46 },
    ],
  },
];

export const COMPARISON_CLAIMS = [
  {
    title: "It absorbs where you put it",
    body: "A film dissolves on the tongue. There is no shell to break down and nothing to survive first.",
  },
  {
    title: "No water, no swallowing",
    body: "Which means it works at the bedside, on a plane, or anywhere a glass isn’t.",
  },
  {
    title: "A ritual you’ll actually keep",
    body: "The best formula is the one still in use in two months. Format decides that.",
  },
] as const;

export const COMPARISON_FOOTNOTE =
  "Placeholder figures for layout only. Nothing here has been measured, sourced or substantiated. Real claims require third-party testing and regulatory review before this section can go live.";

/* ----------------------------------------------------------------- 02
   The range.

   Seed's structure puts a four-product grid here. We have one product, so
   the cards are purchase options instead — the same visual furniture, an
   honest use of it. When a second outcome launches, swap these for products
   and nothing about the layout changes.                                  */

export const PURCHASE_OPTIONS = [
  {
    code: "SL-01",
    badge: "Most chosen",
    name: "Sleep, monthly",
    body: "30 strips delivered every month. Pause or cancel whenever.",
    from: "£24/mo",
    featured: true,
  },
  {
    code: "SL-01",
    badge: "Best value",
    name: "Sleep, quarterly",
    body: "Three months at a time. One delivery, one less thing to think about.",
    from: "£21/mo",
    featured: false,
  },
  {
    code: "SL-01",
    badge: null,
    name: "Sleep, one month",
    body: "A single box, no subscription. For trying it before committing.",
    from: "£28",
    featured: false,
  },
  {
    code: "GF-01",
    badge: "New",
    name: "Sleep, as a gift",
    body: "One month, wrapped, with a card. Shipped anywhere we deliver.",
    from: "£32",
    featured: false,
  },
] as const;

/* ---------------------------------------------------------------- 03 */

export const BUNDLE = {
  badge: "Subscribe · Save 25%",
  title: "The nightly ritual, handled.",
  body: "Thirty strips a month, delivered before you run out. Skip a month, change the date, or stop entirely — all from your account, no email required.",
  cta: "Start a subscription",
  href: "/subscription",
  thumbs: [
    "the box, opened",
    "a single strip on a pale surface",
    "bedside, lamp low",
  ],
} as const;

/* ----------------------------------------------------------------- 04
   The format. Seed's annotated DS-01 capsule diagram, adapted: an
   annotated cross-section of the strip.                                 */

export const FORMAT = {
  title: "Most sleep aids make you wait. A strip doesn’t.",
  stat: { figure: "30", unit: "sec", label: "to fully dissolve" },
  callouts: [
    {
      title: "Outer film",
      body: "Plant cellulose. Dissolves on contact with saliva — no shell, no coating.",
      side: "left",
    },
    {
      title: "Active layer",
      body: "Melatonin, L-theanine and magnesium held in a single even film.",
      side: "right",
    },
    {
      title: "No filler",
      body: "Nothing added to bulk out a tablet, because there is no tablet.",
      side: "left",
    },
  ],
} as const;

/* ---------------------------------------------------------------- 07 */

export const SCIENCE_TEASER = {
  label: "NODA 【01】",
  title: "You don’t have a sleep problem. You have a timing problem.",
  body: "Your body already knows how to fall asleep — it runs on a clock that light, screens and late evenings quietly push out of step. Take three minutes to learn what actually moves it back.",
  cta: "Discover",
  href: "/science",
  footLabel: "SCIENCE / Sleep 101",
} as const;

/* ---------------------------------------------------------------- 08 */

/**
 * Deliberately not portraits. A generated face beside an invented quote is
 * fabricated social proof on a health product — worse than an empty slot.
 * These are mood frames until there are real members to photograph.
 */
export const TESTIMONIALS = [
  { name: "Placeholder member", tag: "SL-01 Member Experiences", brief: "a bed at first light" },
  { name: "Placeholder member", tag: "On the first week", brief: "folded linen on a chair" },
  { name: "Placeholder member", tag: "Six months in", brief: "a bedside lamp switched off" },
  { name: "Placeholder member", tag: "On the format", brief: "curtains and early sun" },
] as const;

/* ---------------------------------------------------------------- 09 */

export const PRESS_QUOTE = {
  quote:
    "Placeholder pull quote from a publication, sitting in the mosaic exactly where Seed places theirs.",
  source: "PUBLICATION",
} as const;

/**
 * Mosaic tiles. `shape` drives the crop, `span` the grid footprint — an
 * irregular collage rather than a tidy grid.
 */
export const STORIES = [
  { brief: "the strip, edge on, macro", shape: "circle", span: "tall" },
  { brief: "the box, lid lifted, from above", shape: "rect", span: "wide" },
  { brief: "a glass of water, evening shadow", shape: "rect", span: "normal" },
  { brief: "the box on a bedside table", shape: "circle", span: "normal" },
  { brief: "a strip against a bright window", shape: "rect", span: "tall" },
  { brief: "morning light on linen", shape: "rect", span: "normal" },
  { brief: "packaging detail, macro", shape: "circle", span: "normal" },
  { brief: "linen and lamplight, wide", shape: "rect", span: "wide" },
] as const;

/* ---------------------------------------------------------------- 10 */

export const TWO_UP = [
  {
    eyebrow: "NODA 【Labs】",
    title: "What we’re testing next",
    cta: "Read more",
    href: "/science",
    brief: "landscape, dusk, wide",
    tone: "ink" as const,
  },
  {
    eyebrow: null,
    title: "Better nights, starting tonight.",
    cta: "Shop the strip",
    href: "/shop",
    brief: "the product, deep brand",
    tone: "brand" as const,
  },
] as const;

/* ------------------------------------------------------------- footer */

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "The strip", href: "/shop" },
      { label: "Subscription", href: "/subscription" },
      { label: "Ingredients", href: "/#ingredients" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Science", href: "/science" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "NODA Labs", href: "/labs" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Help centre", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "My account", href: "/account" },
      { label: "Shipping", href: "/shipping" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "Instagram", href: "/social" },
      { label: "TikTok", href: "/social" },
      { label: "LinkedIn", href: "/social" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
] as const;

export const FOOTER_STATEMENT =
  "Vegan oral strips for rest, made for people who would rather not swallow anything. Canada, since 2026.";

/* ---------------------------------------------------------------- 07 */

export const REVIEWS = [
  {
    quote:
      "I stopped noticing the moment I fell asleep, which is exactly what I wanted from it.",
    name: "Placeholder name",
    detail: "Verified · placeholder",
  },
  {
    quote:
      "The format is the thing. I never remembered the capsules. I never forget this.",
    name: "Placeholder name",
    detail: "Verified · placeholder",
  },
  {
    quote: "No morning fog, which is where everything else lost me.",
    name: "Placeholder name",
    detail: "Verified · placeholder",
  },
] as const;

/* ---------------------------------------------------------------- 08 */

export const FAQS = [
  {
    q: "Will I feel groggy in the morning?",
    a: "Placeholder answer. The dose is deliberately low — 0.5 mg rather than the 5–10 mg found in most products — because melatonin is a timing signal and more of it does not mean more sleep.",
  },
  {
    q: "When should I take it?",
    a: "Placeholder answer. About thirty minutes before you intend to be asleep, at roughly the same time each night.",
  },
  {
    q: "Can I take it every night?",
    a: "Placeholder answer. Pending regulatory and medical review — this answer cannot be written until the formulation is final.",
  },
  {
    q: "Is it vegan?",
    a: "Placeholder answer. The film base is plant cellulose, with no gelatin, sugar or artificial colour.",
  },
  {
    q: "How is this different from a melatonin gummy?",
    a: "Placeholder answer. A gummy is chewed and swallowed, so it takes the same route as a tablet. A strip dissolves on the tongue.",
  },
] as const;

/* ---------------------------------------------------------------- 09 */

export const JOURNAL_POSTS = [
  {
    slug: "the-hour-before-bed",
    kicker: "Ritual",
    title: "The hour before bed",
    excerpt:
      "What the last sixty minutes of the day are doing to the first eight hours of your sleep.",
    readTime: "5 min",
    brief: "a bedside lamp switched off",
    body: [
      "Placeholder article. The hour before bed does more to decide the shape of your night than anything you take, and almost nobody treats it as part of the routine.",
      "Light is the loudest signal. A bright room at eleven at night tells a body clock that has been running since morning that the day is not over, and the clock believes it — which is why the same person can be exhausted and wide awake at the same time.",
      "The second signal is temperature. Core temperature has to fall for sleep to begin, which is why a warm bath an hour beforehand helps rather than hinders: the heat leaves afterwards, and the fall is the cue.",
      "The third is simply repetition. A sequence performed in the same order every night becomes a signal in itself, regardless of what the steps are. That is the part a strip is good at — it is short enough to survive a bad week.",
    ],
  },
  {
    slug: "why-a-strip-not-a-pill",
    kicker: "Format",
    title: "Why a strip, not a pill",
    excerpt:
      "Swallowing is a bottleneck. A film that dissolves on the tongue skips the queue.",
    readTime: "4 min",
    brief: "the strip, edge on, macro",
    body: [
      "Placeholder article. A tablet has to be swallowed, then broken down, before anything in it can begin working. Every step is a place for the dose to be delayed or lost.",
      "A film does none of that. It dissolves where you put it, and there is no shell to survive first.",
      "The less obvious argument is adherence. The best formulation is the one still being taken in two months, and format decides that more than chemistry does. A capsule needs water, a surface and a moment of attention. A strip needs none of the three.",
      "That is the whole case for the format, and it is worth being honest that it is a case about delivery rather than about ingredients.",
    ],
  },
  {
    slug: "melatonin-is-not-a-sedative",
    kicker: "Science",
    title: "Melatonin is not a sedative",
    excerpt:
      "It is a timing signal. Understanding the difference changes when you take it.",
    readTime: "6 min",
    brief: "illustration — the body clock, brand",
    body: [
      "Placeholder article. Melatonin does not make you sleep. It tells the body that night has arrived, and the body decides what to do about it.",
      "This is why more of it does not work better. Past a low dose, the extra does not deepen the signal; it lingers, and lingering into the morning is where the grogginess people complain about comes from.",
      "Timing matters far more than quantity. Taken half an hour before you intend to be asleep, at the same time each night, a small dose moves the clock. Taken at midnight after a variable week, it mostly adds noise.",
      "Everything above requires review by a qualified professional before it can be published as a claim.",
    ],
  },
] as const;

export type JournalPost = (typeof JOURNAL_POSTS)[number];

/* --------------------------------------------------------- product page */

export const PRODUCT_GALLERY = [
  "the box, straight on",
  "the box, lid lifted, from above",
  "a single strip on a pale surface",
  "the box on a bedside table",
] as const;

export const PRODUCT_FACTS = [
  { label: "Format", value: "Dissolvable oral film" },
  { label: "Count", value: "30 strips, one month" },
  { label: "Take", value: "One strip, 30 minutes before bed" },
  { label: "Suitable for", value: "Vegan. No gelatin, sugar or dye" },
] as const;

/* -------------------------------------------------------- subscription */

export const SUBSCRIPTION_STEPS = [
  {
    n: "01",
    title: "Choose how often",
    body: "Monthly or every three months. Change it later without asking anyone.",
  },
  {
    n: "02",
    title: "It arrives before you run out",
    body: "Timed to land a few days before your last strip, so the ritual never breaks.",
  },
  {
    n: "03",
    title: "Skip, pause or stop",
    body: "All of it from your account, in a couple of clicks. No email, no phone call.",
  },
] as const;

export const PLANS = [
  {
    id: "monthly",
    name: "Monthly",
    price: "£24",
    cadence: "per month",
    note: "30 strips, every month",
    perks: ["Free shipping", "Skip or pause anytime", "Cancel in two clicks"],
    featured: true,
  },
  {
    id: "quarterly",
    name: "Quarterly",
    price: "£21",
    cadence: "per month",
    note: "90 strips, every three months",
    perks: ["Free shipping", "Best price per strip", "One delivery a quarter"],
    featured: false,
  },
  {
    id: "once",
    name: "One time",
    price: "£28",
    cadence: "one box",
    note: "30 strips, no subscription",
    perks: ["No commitment", "Standard shipping", "For trying it first"],
    featured: false,
  },
] as const;

export const SUBSCRIPTION_FAQS = [
  {
    q: "Can I change the delivery date?",
    a: "Placeholder answer. Yes — move it forward or back from your account at any time.",
  },
  {
    q: "What happens if I skip a month?",
    a: "Placeholder answer. Nothing is charged and the schedule resumes the following month.",
  },
  {
    q: "Is there a minimum term?",
    a: "Placeholder answer. No. Cancel whenever, including before the first renewal.",
  },
] as const;
