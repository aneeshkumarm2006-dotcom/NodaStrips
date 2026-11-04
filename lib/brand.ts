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

/**
 * The header carries exactly the two product links from the client's
 * mockup, nothing else. Science and the journal live in the mobile drawer
 * and the footer.
 *
 * "Energy" is "Energy & Focus" wherever it names the product (client,
 * Nov 2026: "wherever you see Energy add focus next to it as well").
 *
 * The standalone subscription page is still hidden; subscribe-and-save
 * now lives in each product's purchase box instead. Rename
 * app/_subscription back to app/subscription to bring the page back.
 */
export const NAV = [
  { label: "Sleep strips", href: "/shop/sleep" },
  { label: "Energy & Focus strips", href: "/shop/energy" },
] as const;

/** The journal's public name. The route stays /sleep-journal. */
export const JOURNAL_NAME = "Noda Journal";

export const SECONDARY_NAV = [
  { label: "Shop all", href: "/shop" },
  { label: "Science", href: "/science" },
  { label: JOURNAL_NAME, href: "/sleep-journal" },
] as const;

/** The header's currency selector, per the mockup. Display only for now. */
export const CURRENCIES = ["CAD", "USD"] as const;

export type Currency = (typeof CURRENCIES)[number];

/* ----------------------------------------------------------------- 01
   Hero. The copy is the client's; the type follows the Ralf reference —
   the tagline in the face of "The Comfort of Home…", the headline built
   like "BIENVENUE", only smaller.                                        */

export const HERO = {
  tagline: "Not a pill. Not a gummy.",
  title: ["Wellness takes", "a new form"],
  cta: "Shop our products",
  eyebrow: "Wellness in a strip",
  more: "Discover more",
} as const;

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
  bars: { format: string; value: number; ours?: boolean; fill: string }[];
};

export const COMPARISON: Dataset[] = [
  {
    id: "absorption",
    label: "Absorption",
    axis: "Absorbed within 30 minutes",
    unit: "%",
    bars: [
      { format: "Oral strip", value: 92, ours: true, fill: "format fill — oral strip" },
      { format: "Powder", value: 68, fill: "format fill — powder" },
      { format: "Gummy", value: 54, fill: "format fill — gummy" },
      { format: "Capsule", value: 41, fill: "format fill — capsule" },
      { format: "Tablet", value: 35, fill: "format fill — tablet" },
    ],
  },
  {
    id: "adherence",
    label: "Kept up nightly",
    axis: "Still taken as directed after 60 nights",
    unit: "%",
    bars: [
      { format: "Oral strip", value: 88, ours: true, fill: "format fill — oral strip" },
      { format: "Gummy", value: 71, fill: "format fill — gummy" },
      { format: "Capsule", value: 62, fill: "format fill — capsule" },
      { format: "Tablet", value: 58, fill: "format fill — tablet" },
      { format: "Powder", value: 46, fill: "format fill — powder" },
    ],
  },
];

/** The same chart for Energy — only the adherence measure is reworded for daytime. */
export const COMPARISON_ENERGY: Dataset[] = COMPARISON.map((set) =>
  set.id === "adherence"
    ? { ...set, label: "Kept up daily", axis: "Still taken as directed after 60 days" }
    : set,
);

export type Claim = {
  icon: "tongue" | "nowater" | "moon" | "sun";
  title: string;
  body: string;
};

export const COMPARISON_CLAIMS: Claim[] = [
  {
    icon: "tongue",
    title: "It absorbs where you put it",
    body: "A film dissolves on the tongue. There is no shell to break down and nothing to survive first.",
  },
  {
    icon: "nowater",
    title: "No water, no swallowing",
    body: "Which means it works at the bedside, on a plane, or anywhere a glass isn’t.",
  },
  {
    icon: "moon",
    title: "A ritual you’ll actually keep",
    body: "Fast, simple, and effective — because the best wellness fits your life.",
  },
];

export const COMPARISON_CLAIMS_ENERGY: Claim[] = [
  COMPARISON_CLAIMS[0],
  {
    icon: "nowater",
    title: "No water, no swallowing",
    body: "Which means it works at your desk, on a commute, or anywhere a glass isn’t.",
  },
  {
    icon: "sun",
    title: "A ritual you’ll actually keep",
    body: "Fast, simple, and effective — because the best wellness fits your day.",
  },
];

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

/* ----------------------------------------------------------------- 03
   FlashRelease® — built to Seed's ViaCap® section, element for element,
   with the client's copy. The ViaCap label, the DS-01 badge and the
   probiotic wording are gone; the stat is 10x.                          */

export const FLASH_RELEASE = {
  label: "FlashRelease® Technology",
  title: "Most sleep, energy and focus supplements make you wait. We don’t.",
  stat: { label: "Faster absorption for effective support", figure: "10", unit: "x" },
  footnote: "°Placeholder figure — requires third-party testing before launch.",
  outer: {
    title: "Outer strip",
    body: "Designed to minimize exposure to stomach acid through oral absorption, while delivering a consistent, precise dose of active ingredients in a fast-dissolving strip.",
  },
  inner: {
    title: "Inner strip",
    body: "Contains precisely dosed active ingredients formulated to deliver targeted wellness benefits.",
  },
} as const;

/* ----------------------------------------------------------------------
   The Right Format — was "04 — The science of the strip". Renamed, the
   section number dropped (the main page carries no numbering now), and
   every line below is the client's copy from the Nov 2026 doc, verbatim.
   The headline is unchanged; the doc gives no replacement for it.       */

export type FormatItem = {
  icon: "clock" | "layers" | "feather" | "pill" | "gummy" | "cup";
  title: string;
  /** One paragraph, or — for the other formats — what the format works
      well for and its trade-off, set as a ✓ row and a – row */
  body: string | { works: string; tradeoff: string };
};

export const WHY_STRIPS: {
  eyebrow: string;
  title: string;
  body: string;
  moments: readonly {
    kicker: string;
    title: string;
    body: string;
    brief: string;
    href: string;
  }[];
  tabs: readonly { id: string; label: string; items: readonly FormatItem[] }[];
} = {
  eyebrow: "The Right Format",
  /** Words marked with ** are set in the italic */
  title: "Not every wellness **need calls** for the same format.",
  body: "For sleep and energy, timing is everything. When you need support to kick in quickly, the format matters. That’s why we chose dissolvable strips: fast to take, easy to carry, and ready in the moment you need them.",
  moments: [
    {
      kicker: "Sleep",
      title: "When it’s time to slow down.",
      body: "Everything good starts with a good night’s sleep. It’s the foundation for how you feel, how you show up, and how confident you are. A fast-dissolving strip, so support starts when you’re ready to wind down, not an hour later. Made for your nightly wind-down, long travel days, and the night before a big exam.",
      brief: "sleep — dusk dunes",
      href: "/shop/sleep",
    },
    {
      kicker: "Energy & Focus",
      title: "When it’s time to power up.",
      body: "No chugging, no waiting on digestion. One measured dose that dissolves and gets to work. Made for active people and long days, from morning workouts to marathon exam sessions.",
      brief: "energy — golden dunes",
      href: "/shop/energy",
    },
  ],
  tabs: [
    {
      id: "strips",
      label: "Why strips",
      items: [
        {
          // A clock, not a bolt — "use a clock or time symbol" (Nov 2026)
          icon: "clock",
          title: "Built for when timing matters.",
          body: "Formulated for needs where you want support fast.",
        },
        {
          icon: "layers",
          title: "Absorbed where it dissolves.",
          body: "A thin oral film dissolves in your mouth and starts releasing its ingredients right away, instead of waiting on a pill or gummy to break down in your stomach.",
        },
        {
          // A feather, for lightweight — replaces the bag (Nov 2026)
          icon: "feather",
          title: "Easy by design.",
          body: "One measured dose, individually portioned, portable, and easy to incorporate into your routine. No leak, no mess.",
        },
      ],
    },
    {
      // Reworked to the client's reference (Nov 2026): each format gets a
      // "works well for" and a "the trade-off", so the contrast reads at
      // a glance. The copy is the reference's.
      id: "other",
      label: "Other formats",
      items: [
        {
          icon: "pill",
          title: "Pills and capsules",
          body: {
            works: "Higher doses and steady daily support, such as magnesium supplements.",
            tradeoff: "May require water and swallowing, making them less convenient in certain moments.",
          },
        },
        {
          icon: "gummy",
          title: "Gummies",
          body: {
            works: "A familiar, enjoyable way to take daily supplements.",
            tradeoff: "Some contain added sugar or fillers, and serving sizes can limit ingredient quantities.",
          },
        },
        {
          icon: "cup",
          title: "Powders",
          body: {
            works: "Larger servings, such as protein and daily nutrition supplements.",
            tradeoff: "Requires mixing, water, and a little more preparation.",
          },
        },
      ],
    },
  ],
};

/* ----------------------------------------------------------------------
   Science teaser — moved from the main page to the Sleep page. */

export const SCIENCE_TEASER = {
  label: "NODA",
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

/* ----------------------------------------------------------------------
   Noda Community — replaces the "Stories from scientists…" mosaic, on
   Arrae's "Trusted by Millions of Women Worldwide" structure: a row of
   creator videos with a quote and a handle under each.

   There are no creator videos yet, so every post below is a placeholder:
   a product still where the video goes, and a quote that says it is one.
   Writing invented quotes under invented handles would be fabricated
   social proof on a health product. Give a post a `video` (an .mp4 in
   /public) and its card and lightbox play it, with sound controls.

   The fourth card is the creator call-out, per the client: "something
   like 'this could be you' so content creators… can contact us".       */

export type CommunityPost = {
  id: string;
  /** A photo brief from lib/photos.ts — the poster frame */
  brief: string;
  /** Optional video file, e.g. "/videos/creator-1.mp4" */
  video?: string;
  quote: string;
  handle: string;
};

export const COMMUNITY: {
  title: { plain: string; italic: string };
  note: string;
  posts: readonly CommunityPost[];
  /** Index in the row at which the creator card sits (0-based) */
  ctaAt: number;
  /** `{name}` in the body is set as the wordmark, without the ™ */
  cta: { title: string; body: string; action: string; href: string };
} = {
  title: { plain: "Noda", italic: "Community" },
  note: "Placeholder content — creator videos to follow.",
  posts: [
    {
      id: "post-1",
      brief: "the sleep carton at the bedside",
      quote: "A creator’s first night with the strip, in their own words.",
      handle: "@creator — placeholder",
    },
    {
      id: "post-2",
      brief: "the energy carton on a desk, morning",
      quote: "How the strip fits a morning workout, or a long day at the desk.",
      handle: "@creator — placeholder",
    },
    {
      id: "post-3",
      brief: "the box, opened",
      quote: "Unboxing, and a first impression of the format.",
      handle: "@creator — placeholder",
    },
    {
      id: "post-4",
      brief: "a strip against a bright window",
      quote: "Taking it on the go — travel days, flights, early starts.",
      handle: "@creator — placeholder",
    },
    {
      id: "post-5",
      brief: "the box on a bedside table",
      quote: "Thirty nights in: what changed, and what didn’t.",
      handle: "@creator — placeholder",
    },
    {
      id: "post-6",
      brief: "bedside, lamp low",
      quote: "The wind-down routine the strip slots into.",
      handle: "@creator — placeholder",
    },
  ],
  ctaAt: 3,
  /** Copy from the client's concept; only the look was to be elevated */
  cta: {
    title: "This could be you.",
    body: "Share your {name} experience and receive a free gift to be featured on our page.",
    action: "Contact us",
    href: "/contact?topic=creators#contact-form",
  },
};

/* ----------------------------------------------------------------------
   Contact — the page behind "Contact us" on the creator card and the
   footer's "Contact" link (client, Nov 2026: "insert a contact us
   section — currently it does not take anywhere"). The creator card
   opens it with "Creators" chosen.                                      */

export const CONTACT = {
  eyebrow: "Contact",
  /** Words marked with ** are set in the italic */
  title: "Get in **touch.**",
  intro: "Questions about an order, the strips, or working together — send us a note and we’ll come back to you.",
  topics: [
    { id: "creators", label: "Creators" },
    { id: "orders", label: "Orders & shipping" },
    { id: "product", label: "The strips" },
    { id: "wholesale", label: "Wholesale" },
    { id: "other", label: "Something else" },
  ],
  creators: {
    title: "This could be you.",
    body: "Share your {name} experience and receive a free gift to be featured on our page. Tell us where you post and a little about your audience.",
  },
  fields: {
    name: "Name",
    email: "Email address",
    handle: "Instagram or TikTok handle",
    message: "Message",
  },
  action: "Send message",
  done: "Thank you — we’ll be in touch soon.",
} as const;

export type ContactTopic = (typeof CONTACT.topics)[number]["id"];

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

/* ------------------------------------------------------------- footer
   Per the Nov 2026 doc: About → Learn (Sustainability and NODA Labs
   removed), Help → Support, and the Legal column removed completely. */

export const FOOTER_COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Sleep strips", href: "/shop/sleep" },
      { label: "Energy & Focus strips", href: "/shop/energy" },
      { label: "Shop all", href: "/shop" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Science", href: "/science" },
      { label: JOURNAL_NAME, href: "/sleep-journal" },
    ],
  },
  {
    title: "Support",
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
] as const;

export const FOOTER_STATEMENT =
  "Vegan oral strips for sleep, and for energy & focus, made for people who would rather not swallow anything. Canada, since 2026.";

/**
 * The sign-up, replacing "First access" — "sign up & get a mystery
 * discount", with the structure of information the client supplied from
 * Arrae: first name, email and phone in an outlined box, a pill Subscribe,
 * then the consent line and the privacy link. Arrae's wording throughout,
 * with NODA's name in it — have it checked against Canadian (CASL) rules
 * before launch.
 */
export const SIGNUP = {
  /** Words marked with ** are set in the italic */
  title: "Sign up & get a **mystery** discount.",
  body: "Enter your email and phone number to get your mystery code.",
  fields: { name: "First Name", email: "Email Address", phone: "Phone Number" },
  action: "Subscribe",
  done: "Thank you — your code is on its way.",
  consent:
    "By submitting, you agree to receive informational and marketing texts from NODA (incl. autodialer). Consent isn’t required for purchase. Msg & data rates may apply. Reply STOP to unsubscribe.",
  privacy: { label: "Privacy Policy", href: "/privacy" },
} as const;

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
  {
    slug: "the-case-against-more",
    kicker: "Dose",
    title: "The case against more",
    excerpt:
      "Why a smaller dose of the right thing beats a larger dose of nearly the right thing.",
    readTime: "5 min",
    brief: "morning light on linen",
    body: [
      "Placeholder article. Supplement labels compete on quantity because quantity is easy to print. It is a poor proxy for whether anything works.",
      "Melatonin is the clearest case: the useful range is far below what most products contain, and the excess does not deepen the effect — it outlasts the night.",
      "The harder claim to make, and the one worth making, is that a formulation was designed around absorption and timing rather than around a number on a box.",
      "None of the above is approved copy, and every figure it implies needs substantiating first.",
    ],
  },
] as const;

export type JournalPost = (typeof JOURNAL_POSTS)[number];

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

/**
 * Pack sizes, not billing cadences — subscription is not offered yet, so
 * both of these are one-off purchases. When subscription launches these
 * become selling plans on the same product.
 */
export const PLANS = [
  {
    id: "trial",
    name: "3 Days Strip",
    price: "$9",
    cadence: "one pack",
    note: "3 strips, to try it",
    perks: ["No commitment", "Standard shipping", "For a first night"],
    featured: false,
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "$34",
    cadence: "one box",
    note: "30 strips, one month",
    perks: ["Free shipping", "Best price per strip", "The full ritual"],
    featured: true,
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


/* -------------------------------------------------------------- products
   Two products now — Sleep and Energy. Each carries its own card,
   gallery, plans, and its own "Science in a strip" formula, which moved
   from the main page onto each product page on the client's instruction.

   Every dose, price and claim is placeholder and needs regulatory review. */

export type BadgeIcon = "leaf" | "nowater" | "nosugar" | "dose" | "sun";

export type Ingredient = {
  name: string;
  dose: string;
  tags: readonly string[];
  body: string;
  brief: string;
};

/**
 * One purchase option, on Arrae's model (arrae.com/products/mb-1-45):
 * three options — a three-month subscription flagged "Best value", a
 * monthly subscription, and a one-time purchase — each with a struck
 * compare-at price and a per-month figure where it saves.
 *
 * ⚠️ The subscription prices and discounts are placeholders worked from
 * the $34 box at Arrae's ratios (−20% monthly, −30% quarterly). Not
 * approved.
 */
export type ProductPlan = {
  id: "quarterly" | "monthly" | "once";
  name: string;
  note: string;
  price: string;
  /** Struck through beside the price */
  compareAt?: string;
  /** "$24 / Month" under the price */
  perMonth?: string;
  /** The dark bar across the top of the card */
  banner?: { strong: string; rest: string };
  /** The small chip under the price */
  save?: string;
  subscription: boolean;
};

export type Product = {
  slug: "sleep" | "energy";
  code: string;
  name: string;
  title: string;
  /** One line under the title on the card, as Arrae sets it */
  subtitle: string;
  line: string;
  description: string;
  flavour: { name: string; swatch: string };
  /** The one-time price, shown on the product cards */
  price: string;
  unit: string;
  /**
   * The carton's colour, sampled off the product photograph. The purchase
   * box uses it where it used to use brand green — the selected option,
   * the "Best value" bar and Add to cart (client: "change it to the
   * colour of the box"). White type passes AA on both.
   */
  accent: string;
  card: string;
  gallery: readonly string[];
  plans: readonly ProductPlan[];
  /** Which option the purchase box opens on */
  defaultPlan: ProductPlan["id"];
  facts: readonly { label: string; value: string }[];
  science: {
    intro: string;
    badges: readonly { label: string; icon: BadgeIcon }[];
    ingredients: readonly Ingredient[];
  };
};

/** Arrae lists these under whichever subscription is selected. Placeholder. */
export const SUBSCRIPTION_BENEFITS = [
  "Free shipping on every order",
  "Skip, pause or cancel anytime",
  "Arrives before you run out",
  "Early access to new formulas and perks",
] as const;

const PLANS_34: readonly ProductPlan[] = [
  {
    id: "quarterly",
    name: "3 Month Delivery",
    note: "3 month supply, delivered every 3 months",
    price: "$72",
    compareAt: "$102",
    perMonth: "$24 / Month",
    banner: { strong: "Best value", rest: "Save 30%" },
    subscription: true,
  },
  {
    id: "monthly",
    name: "1 Month Delivery",
    note: "1 month supply, delivered every 1 month",
    price: "$27",
    compareAt: "$34",
    perMonth: "$27 / Month",
    save: "Save 20%",
    subscription: true,
  },
  {
    id: "once",
    name: "1 Time Purchase",
    note: "1 month supply, delivered once",
    price: "$34",
    subscription: false,
  },
];

const FILM_BASE: Ingredient = {
  name: "Vegan film base",
  dose: "—",
  tags: ["Delivery", "Absorption"],
  body: "Plant cellulose that dissolves on contact. No gelatin, no sugar, no artificial colour.",
  brief: "ingredient — the film",
};

export const PRODUCTS: readonly Product[] = [
  {
    slug: "sleep",
    code: "SL-01",
    name: "Sleep",
    title: "Sleep Strips",
    subtitle: "Fast-dissolving support for winding down*",
    line: "Melt into rest",
    description:
      "A fast-dissolving vegan strip for the end of the day. No water, no pills — one strip thirty minutes before bed, and the night takes it from there.",
    flavour: { name: "Mint", swatch: "#9ccfbd" },
    price: "$34.00",
    unit: "30 strips · one month",
    accent: "#212d49",
    card: "product card — sleep",
    gallery: [
      "product card — sleep",
      "the sleep carton at the bedside",
      "a single strip on a pale surface",
      "macro of the film, backlit",
    ],
    plans: PLANS_34,
    defaultPlan: "quarterly",
    facts: [
      { label: "Format", value: "Dissolvable oral film" },
      { label: "Count", value: "30 strips, one month" },
      { label: "Take", value: "One strip, 30 minutes before bed" },
      { label: "Suitable for", value: "Vegan. No gelatin, sugar or dye" },
    ],
    science: {
      intro:
        "One thin film on the tongue, dissolved in under a minute — a low-dose sleep formula that starts absorbing where you put it, with nothing to swallow.",
      badges: [
        { label: "Vegan formula", icon: "leaf" },
        { label: "No water needed", icon: "nowater" },
        { label: "Zero sugar", icon: "nosugar" },
        { label: "Low-dose melatonin", icon: "dose" },
      ],
      ingredients: [
        {
          name: "Melatonin",
          dose: "0.5 mg",
          tags: ["Timing", "Onset"],
          body: "A timing signal rather than a sedative. Deliberately low, because past a small dose the extra lingers into the morning.",
          brief: "ingredient — tart cherry",
        },
        {
          name: "L-Theanine",
          dose: "100 mg",
          tags: ["Calm", "Quiet mind"],
          body: "Promotes alpha wave activity, easing mental chatter without the weight of a sedative.",
          brief: "ingredient — green tea leaf",
        },
        {
          name: "Magnesium bisglycinate",
          dose: "60 mg",
          tags: ["Relaxation", "Recovery"],
          body: "The gentle, well-absorbed form. Supports muscle relaxation through the night.",
          brief: "ingredient — magnesium mineral",
        },
        {
          name: "Lemon balm extract",
          dose: "80 mg",
          tags: ["Settling", "Mood"],
          body: "Long used before rest to settle the mind, with a mild calming action.",
          brief: "ingredient — lemon balm",
        },
        FILM_BASE,
      ],
    },
  },
  {
    slug: "energy",
    code: "EN-01",
    name: "Energy & Focus",
    title: "Energy & Focus Strips",
    subtitle: "Clean, focused energy without the crash*",
    line: "Power up, gently",
    description:
      "A fast-dissolving vegan strip for the middle of the day. No mixing, no can, no crash — one strip whenever you need to switch on.",
    flavour: { name: "Citrus", swatch: "#f2b544" },
    price: "$34.00",
    unit: "30 strips · one month",
    accent: "#a15719",
    card: "product card — energy",
    gallery: [
      "product card — energy",
      "the energy carton on a desk, morning",
      "a single strip on a pale surface",
      "macro of the film, backlit",
    ],
    plans: PLANS_34,
    defaultPlan: "quarterly",
    facts: [
      { label: "Format", value: "Dissolvable oral film" },
      { label: "Count", value: "30 strips, one month" },
      { label: "Take", value: "One strip, when you need a lift" },
      { label: "Suitable for", value: "Vegan. No gelatin, sugar or dye" },
    ],
    science: {
      intro:
        "One thin film on the tongue, dissolved in under a minute — a measured energy & focus formula that starts absorbing where you put it, with no can, no mixing and no crash.",
      badges: [
        { label: "Vegan formula", icon: "leaf" },
        { label: "No water needed", icon: "nowater" },
        { label: "Zero sugar", icon: "nosugar" },
        { label: "Measured caffeine", icon: "sun" },
      ],
      ingredients: [
        {
          name: "Natural caffeine",
          dose: "50 mg",
          tags: ["Alertness", "Focus"],
          body: "From green coffee beans. A measured dose — about half a cup — so the lift arrives without the jitters.",
          brief: "ingredient — green coffee bean",
        },
        {
          name: "L-Theanine",
          dose: "100 mg",
          tags: ["Smooth", "Calm focus"],
          body: "Paired with caffeine to round off its edges, for steady attention rather than a spike.",
          brief: "ingredient — green tea leaf",
        },
        {
          name: "Panax ginseng",
          dose: "100 mg",
          tags: ["Stamina", "Clarity"],
          body: "A traditional adaptogen, long used to support mental performance and resilience to fatigue.",
          brief: "ingredient — ginseng root",
        },
        {
          name: "Vitamin B12",
          dose: "250 mcg",
          tags: ["Energy", "Metabolism"],
          body: "Contributes to normal energy-yielding metabolism and the reduction of tiredness.",
          brief: "ingredient — vitamin b12",
        },
        FILM_BASE,
      ],
    },
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
