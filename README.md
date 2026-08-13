# NODA — website, first pass

The main page, built to `NODA Website Direction.pdf`. Next.js 16 (App Router) ·
TypeScript · Tailwind v4.

```bash
npm install
npm run dev     # http://localhost:3000
```

---

## What's here

| Brief | Built | File |
| --- | --- | --- |
| §04 Header | Announcement bar, wordmark, 5-item nav, country/language, account, cart. **No search.** | [components/Header.tsx](components/Header.tsx) |
| §05.01 Hero | Sleep in full Indigo Dusk, big wordmark, primary CTA | [components/sections/Hero.tsx](components/sections/Hero.tsx) |
| §05.02 The range + Combo | Five category cards, one colour each, plus the Combo bundle | [components/sections/Range.tsx](components/sections/Range.tsx) |
| §05.03 How it works / Science | Three steps, calm and editorial | [components/sections/Science.tsx](components/sections/Science.tsx) |
| §05.04 Take the quiz | Personalization teaser supporting the hero CTA | [components/sections/Quiz.tsx](components/sections/Quiz.tsx) |
| §05.05 Sleep Journal + footer | Editorial teaser; subscription sign-up, language and full nav in the footer | [components/sections/Journal.tsx](components/sections/Journal.tsx), [components/Footer.tsx](components/Footer.tsx) |

The five nav destinations plus Account and Cart exist as stub pages so nothing
dead-ends during review. Everything beyond the main page is intentionally empty.

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

## Decisions worth a second opinion

- **Sleep is Indigo Dusk.** The direction assigns five colours and names only
  Sleep. Indigo read as the obvious fit; the other four mappings are a guess.
- **Category names.** Energy, Immunity, Focus and Greens are placeholders —
  rename in `lib/brand.ts`.
- **Prices** (£28 / £72) are placeholders purely so the cards look finished.
- **Editorial copy** — headlines, the three science steps, the three quiz
  questions and the three journal posts — is written to hold the structure at
  the right tone, not to ship.

## House rules encoded here

Generous whitespace; large confident display type with tight tracking; slow
quiet motion (900ms, one easing curve, fade and a short lift only, disabled
under `prefers-reduced-motion`); hover effects gated behind
`(hover: hover)`. No discount badges, no countdown timers, no pop-ups, no
gradients across multiple brand colours, and no search bar.
