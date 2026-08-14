# NODA — website, first pass

The main page, built to `NODA Website Direction.pdf`. Next.js 16 (App Router) ·
TypeScript · Tailwind v4.

```bash
npm install
npm run dev     # http://localhost:3000
```

---

## What's here

A **single-product store** — Sleep only. Structurally modelled on seed.com,
which is also a one-product brand, so its long editorial homepage is the right
shape rather than a borrowed one.

| | Section | File |
| --- | --- | --- |
| 01 | Hero — the product in full aubergine, big wordmark, one CTA | [Hero.tsx](components/sections/Hero.tsx) |
| 02 | The strip — what it is, and add-to-cart | [Strip.tsx](components/sections/Strip.tsx) |
| 03 | What's inside — the formula listed with doses | [Inside.tsx](components/sections/Inside.tsx) |
| 04 | How it works — three steps | [HowItWorks.tsx](components/sections/HowItWorks.tsx) |
| 05 | How it compares — bar chart with a dataset toggle | [Compare.tsx](components/sections/Compare.tsx) |
| 06 | The ritual — when and how | [Ritual.tsx](components/sections/Ritual.tsx) |
| 07 | Reviews — quiet pull quotes | [Reviews.tsx](components/sections/Reviews.tsx) |
| 08 | Questions — accordion | [Faq.tsx](components/sections/Faq.tsx) |
| 09 | Sleep Journal — editorial teaser | [Journal.tsx](components/sections/Journal.tsx) |
| — | Header (no search) and Footer | [Header.tsx](components/Header.tsx), [Footer.tsx](components/Footer.tsx) |

Nav destinations plus Account and Cart exist as stub pages so nothing
dead-ends during review. Everything beyond the main page is intentionally empty.

### The comparison section

Built to match the davidprotein.com section the client shared: wide
gradient-filled bars for ours, outlined bars for the comparators, a
tick-marked axis with a rotated label, product tiles beneath, and the
methodology footnote centred underneath. Two datasets behind a toggle.

Two decisions worth keeping when this moves to Liquid:

- **Comparators are formats, not brands** — oral strip vs powder, gummy,
  capsule, tablet. Naming competitors requires substantiation and legal
  review; the argument works without it.
- **Every figure is direct-labelled, each bar has a hover and focus readout,
  and a screen-reader table carries all the values**, so nothing is locked
  behind colour or hover.

No chart library — the bars are CSS heights with a transition, which is also
what makes this straightforward to rebuild as a Liquid section.

## Where the brand lives

- **Colours, categories, nav, copy constants** — [lib/brand.ts](lib/brand.ts).
  Adding a sixth outcome is one entry in `CATEGORIES`; the grid and the footer
  pick it up with no layout change.
- **Tokens, type classes, motion** — [app/globals.css](app/globals.css).
- **The mark** — [components/Mark.tsx](components/Mark.tsx). The supplied
  sunburst.
- **The wordmark** — [components/Wordmark.tsx](components/Wordmark.tsx). The
  supplied serif lockup, sunburst in the O. Size it by height (`h-6`); the
  width follows the artwork's aspect ratio.

## Brand assets

Originals are in [Logos/](Logos/) plus `1.png` / `2.png`. Web-ready versions
are in [public/brand/](public/brand/).

The logo ships as flattened PNG, which can neither recolour nor sit on a dark
background. So the artwork is applied as a **CSS mask filled with
`currentColor`** — the supplied geometry exactly as drawn, in any colour, on
any ground, from one file. The lockup is split into two registered masks
(`lockup-text-mask.png`, `lockup-burst-mask.png`) so the letters and the
sunburst can be coloured independently — one-colour lockup via `mono`,
letters-plus-coral-burst by default.

`mark.png` is the neutral mask; the five fixed colourways
(`mark-indigo-dusk.png` and friends) are there for anywhere a flat image is
wanted. `app/icon.png` is the favicon.

**Vector, please.** These are raster masks from a flattened source, so they
soften at very large sizes. An SVG of the mark and the lockup would remove the
masking layer entirely and should replace them when available.

## Two things in the assets that need a ruling

1. **Two different wordmarks.** `1.png` / `2.png` are lowercase **noda** with
   the tagline *Where Better Days Begin* and no sunburst. The `Logos/` lockups
   are uppercase **NODA** with the sunburst in the O, in both a serif and a
   sans cut. The site currently uses the **serif sunburst lockup**, since the
   direction document specifies the mark sitting inside the O. The lowercase
   card is used for the social share image.

2. **The logo colours don't match the deck palette.** Sampled from the supplied
   files against `NODA Website Direction.pdf`:

   | | Logo file | Deck |
   | --- | --- | --- |
   | Ignite Coral | `#FA0100` | `#FD4F42` |
   | Solar Amber | `#FC6509` | `#FF9052` |
   | Indigo Dusk | `#2B19E0` | `#3D34C9` |
   | Deep Teal | `#027D78` | `#128A7C` |
   | Volt Lime | `#CAF901` | `#C7E64B` |

   The logo files are consistently more saturated. The site uses the **deck**
   values, since those are the named brand spec — but one set has to win, and
   that is a brand decision, not a build one.

   The tagline *Where Better Days Begin* and *Estd. 2026 · Located in Canada*
   appear only in the assets, never in the deck. Both are now in the footer.

## Two swaps still to make

1. **TAN Ashiord.** Not licensed to us yet, so the display face is currently
   **Bodoni Moda** — a high-contrast serif in the same register. When the files
   arrive, replace the `next/font/google` call in
   [app/layout.tsx](app/layout.tsx) with `next/font/local`, keeping the
   `--font-tan-ashiord` variable name. Nothing else changes. Body type is
   **Archivo**, which is final.

2. **Photography.** Every image is an `<ArtSlot>` — an art-directed colour field
   that states, on the image itself, what should be photographed there. Swap the
   body of [components/ArtSlot.tsx](components/ArtSlot.tsx) for `next/image` and
   the whole page takes real photography at once. The shot list is the `brief`
   prop on each slot.

## The palette

Straight from the direction document. Indigo Dusk was rejected by the client,
so **Deep Teal** carries the page — it is the closest thing in the deck to the
deep green Seed builds on.

| | | |
| --- | --- | --- |
| Deep Teal | `#128A7C` | The brand colour — deck palette |
| Deep Teal, deep step | `#0A4A43` | Dark bands, header at rest, footer (derived) |
| Ignite Coral | `#FD4F42` | The only accent — deck palette, and the sunburst colour |
| Volt Lime | `#C7E64B` | Deck palette. The light source inside the image fields, never a surface |
| Warm Bone | `#F7F4EF` | Paper — most of the page lives here |
| Ink | `#16130F` | Type, and the filled buttons |

Two things worth knowing:

- **The token is named `brand`, not `teal`.** The colour has changed twice
  already, so `--color-brand` in [app/globals.css](app/globals.css) is the one
  edit that repaints the site. No component names a hue.
- **Ratio beats hex.** Teal is spent on the hero, the product band, the
  annotated card, the comparison and the footer; everything between them
  breathes on bone. A page drenched in brand colour reads as a supplement
  store, which is the failure mode the direction document warns about.

Inside the image placeholders, the glow mixes **Volt Lime** rather than coral —
coral mixed into teal goes muddy brown, lime keeps the greens clean.

## Decisions worth a second opinion

- **Everything in [lib/brand.ts](lib/brand.ts) is placeholder** — copy,
  ingredients, doses, prices, comparison figures, reviews and FAQ answers.
  None of it is approved and none of the numbers are substantiated. The file
  carries a warning at the top.
- **The formulation** (melatonin 0.5 mg, L-theanine, magnesium bisglycinate,
  lemon balm) is invented to make the ingredients section read correctly.
- **Prices** (£28 / £24 subscription) are placeholders so the section looks
  finished.
- **Any health claim on this page** needs regulatory review before launch —
  particularly the comparison section and the FAQ.

## House rules encoded here

Generous whitespace; large confident display type with tight tracking; slow
quiet motion (900ms, one easing curve, fade and a short lift only, disabled
under `prefers-reduced-motion`); hover effects gated behind
`(hover: hover)`. No discount badges, no countdown timers, no pop-ups, no
gradients across multiple brand colours, and no search bar.
