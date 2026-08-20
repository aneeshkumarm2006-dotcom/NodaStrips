# The canonical product description

Every generated image must describe the product with **these exact words**.
Paste them verbatim into the prompt — do not paraphrase, and do not invent new
proportions, finishes or closures.

Why this file exists: earlier shots were each prompted freehand, so every
generation invented its own packaging. The site ended up with a tall
rectangular box in the hero, a small flat carton in the shop gallery and a
third shape in the comparison tiles. Nobody notices on one screen; they sit
side by side on the product page.

## The box

> a slim flat matte carton in deep teal, about the size of a pack of playing
> cards, uncoated matte board, softly rounded corners, completely blank with
> no printing of any kind

## The strip

> an ultra-thin translucent film square about 2cm by 3cm, frosted and matte
> like fine rice paper, softly opaque

**Never say "iridescent", "opalescent" or "prismatic".** Those words produce a
thick holographic card that reads as a novelty item, not a dissolvable film.
An early hero was rejected for exactly this. Append "absolutely no rainbow and
no holographic effect" when the strip is the subject.

## Always append

> No text, no lettering, no logos, no labels, no packaging typography, no
> hands, no people.

`no text` matters: given a front-facing box face the model invents brand
typography, and it once produced a mangled competitor name on the carton.
`no hands` matters because hands come back malformed — see the note at the top
of `lib/photos.ts`.

Also ask for **sharp focus** explicitly when the product is the subject. Left
to itself the model throws the packaging out of focus and the shot ends up
with no subject at all.

## Where this is applied

- `scripts/generate-photos.mjs` — the `BOX` and `STRIP` constants
- Higgsfield prompts — paste from here each time; there is no shared constant
  because those calls are made ad hoc rather than from a script

## What this cannot fix

Images generated before this file existed still disagree with each other.
They are placeholders and will be replaced by a real shoot; this only stops
the drift getting worse.

---

## The hero

`public/photos/hero-night.jpg` — ChatGPT, iterated. What finally worked, in
order, because each step fixed a specific failure:

1. **A real room, never a void.** Seamless-background macros of the strip
   read as frosted glass or soap. The reference site never floats anything —
   there is always a table, a window, a room behind it.
2. **A known object for scale.** Telling the model "8cm tall" does nothing;
   it has no ruler. Putting a ceramic mug in frame forced the cartons down
   from hardback-book size to something you would put in a pocket.
3. **Construction detail.** "Visible fold line, tuck-flap seam, uncoated
   matte board" is what stops a carton reading as a solid painted block.
4. **The room has to wrap.** A flat empty wall on one side reads as a set.
   Bed, headboard, curtain, window, all softly out of focus, reads as a home.
5. **Move the camera, don't scale the product.** When the group was too small
   in frame, enlarging the boxes broke the scale illusion; moving the camera
   closer kept it.
6. **Night.** The obvious one, missed for several rounds: the strip is taken
   half an hour before bed. Bright daylight was arguing against the product.
   One warm lamp against cool blue dusk in the window — the warm/cool pair is
   what stops a night interior going muddy brown.

Watch for: "a faint ring mark" comes back as a raised glassy ring sitting on
the table rather than a stain in it, and surface texture requests come back
as embossed damask. Both had to be explicitly removed.

## Video — cut, deliberately

A 5s Seedance push-in was generated, encoded and shipped, then pulled. It was
technically fine and creatively empty: a slow zoom on a static object is not
motion design, and five seconds gives the eye time to study surfaces that an
invented carton does not have. Motion raises the resolution bar; the asset
could not take it.

If motion returns, the idea worth doing is **the strip dissolving** — macro,
locked off, backlit, the film going glassy and vanishing. It is the product's
one genuinely cinematic property and no competitor format has it.
