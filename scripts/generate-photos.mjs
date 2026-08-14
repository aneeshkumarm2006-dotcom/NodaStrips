/**
 * Generates the placeholder photography for the NODA site.
 *
 *   node --env-file=.env.local scripts/generate-photos.mjs           # all missing
 *   node --env-file=.env.local scripts/generate-photos.mjs box strip # only matching
 *   FORCE=1 node --env-file=.env.local scripts/generate-photos.mjs box-front
 *
 * Provider defaults to Cloudflare Workers AI (FLUX-1-schnell, Apache-2.0, so
 * the output is commercially usable). Set PROVIDER=gemini to use Gemini
 * instead — that path needs billing enabled on the Google project, since
 * image generation is not on their free tier.
 *
 * Credentials come from the environment and are never printed or committed.
 *
 * FLUX-1-schnell returns 1024×1024. That is fine for every slot: ArtSlot
 * renders with object-cover, so each image is cropped to its slot's aspect
 * at render time, and lib/photos.ts can nudge the crop with `position`.
 *
 * Output lands in public/photos/ as JPEG. Wire each file into lib/photos.ts
 * to make the matching ArtSlot render it.
 */

import { writeFile, mkdir, access, rm } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const PROVIDER = process.env.PROVIDER ?? "cloudflare";
const OUT = "public/photos";

/** Shared art direction, so twenty-three shots read as one campaign. */
const STYLE = [
  "Premium editorial photography for a quiet luxury wellness brand.",
  "Soft directional daylight, gentle falloff, no hard flash.",
  "Restrained palette: deep teal, warm bone, oatmeal, soft shadow.",
  "Generous negative space, calm composition, matte finish, fine film grain.",
  "The restraint of Aesop and Loewe. Nothing loud, nothing glossy, no clutter.",
  "No text, no lettering, no logos, no labels, no watermarks, no packaging typography.",
].join(" ");

/** The product, described identically every time so it stays consistent. */
const BOX =
  "a slim matte carton box in deep teal, the size of a pack of playing cards, uncoated matte finish, completely blank with no printing";
const STRIP =
  "an ultra-thin translucent dissolvable film strip about 2cm by 3cm, faintly iridescent, delicate as a petal";

/** file → the brief it satisfies in lib/photos.ts */
const SHOTS = [
  // ---- Hero -----------------------------------------------------------
  // The box is deliberately turned away and kept small here: given a
  // front-facing box face, the model invents brand typography on it.
  { file: "hero-table.jpg", brief: "the strips on a bedside table, low evening light",
    prompt: `Photographed on a 50mm lens at f/1.8, very shallow depth of field. Low camera angle at table height. Four slim boxes in solid deep teal, of two heights, grouped close together on a warm walnut table that fills the lower right of the frame in sharp focus — each box is one flat unbroken colour, smooth and entirely unmarked with no printing of any kind. Behind them a window with green garden foliage thrown far out of focus into soft bokeh, and a pale linen armchair. Warm natural morning light, lived-in and inviting. The left third of the frame is soft, bright and empty. Rich realistic photography, not a render. ${STYLE}` },

  // ---- Product --------------------------------------------------------
  { file: "box-front.jpg", brief: "the box, straight on",
    prompt: `${BOX} standing upright, photographed straight on, centred on a seamless deep teal backdrop, soft shadow beneath. Studio still life. ${STYLE}` },
  { file: "box-pair.jpg", brief: "two boxes, straight on, bone ground",
    prompt: `Two of ${BOX}, one standing and one lying flat beside it, on a seamless warm bone backdrop, long soft shadows raking right. ${STYLE}` },
  { file: "box-open.jpg", brief: "the box, opened",
    prompt: `${BOX} opened, a neat stack of ${STRIP} inside, seen from slightly above on a warm bone surface. ${STYLE}` },
  { file: "strip-single.jpg", brief: "a single strip on a pale surface",
    prompt: `A single ${STRIP} resting flat on a warm bone surface, one corner lifting slightly, soft daylight raking across so its translucency reads. Nothing else in frame. ${STYLE}` },
  { file: "bedside-lamp.jpg", brief: "bedside, lamp low",
    prompt: `A quiet bedside corner at night: a low warm lamp, a folded linen throw, ${BOX} at the edge of the light. Mostly shadow, calm and still. ${STYLE}` },
  { file: "product-teal.jpg", brief: "the product, deep brand",
    prompt: `${BOX} standing on a seamless deep teal backdrop, a soft pool of light rising behind it from below, long shadow. Dark, rich, quiet. ${STYLE}` },

  // ---- The format -----------------------------------------------------
  { file: "film-macro.jpg", brief: "macro of the film, backlit",
    prompt: `Extreme macro of ${STRIP} held up and backlit, edges dissolving into vapour, faint teal iridescence, very shallow depth of field, dark background. ${STYLE}` },
  // Reworded: the original phrasing tripped a false-positive content filter
  { file: "strip-section.jpg", brief: "cross-section of the strip",
    prompt: `A single translucent square of dissolvable film resting flat and centred on a pale warm bone surface, backlit so its edges glow, faint teal tint. Clean clinical laboratory still life, overhead view. ${STYLE}` },

  // ---- Science --------------------------------------------------------
  { file: "body-clock.jpg", brief: "illustration — the body clock, brand",
    prompt: `An abstract scientific illustration of a daily body clock: fine concentric rings in deep teal on a warm bone ground, one arc lit brighter than the rest, delicate hairline linework, generous space. Editorial and restrained, no numerals, no text. ${STYLE}` },

  // ---- Member stories (mood, not people) -------------------------------
  { file: "bed-first-light.jpg", brief: "a bed at first light",
    prompt: `An empty made bed in soft first light, oatmeal linen, one window casting a long pale rectangle across it. Nobody present. ${STYLE}` },
  { file: "linen-chair.jpg", brief: "folded linen on a chair",
    prompt: `A stack of neatly folded oatmeal linen on a pale wooden chair, soft morning light from one side, quiet empty room. ${STYLE}` },
  { file: "lamp-off.jpg", brief: "a bedside lamp switched off",
    prompt: `A bedside lamp just switched off in a dark room, the last warmth still in the shade, deep shadow filling the frame, a book and a glass barely visible. ${STYLE}` },
  { file: "curtains-sun.jpg", brief: "curtains and early sun",
    prompt: `Early sun through a linen curtain, the fabric glowing, soft folds, the rest of the room in shadow. Nobody present. ${STYLE}` },

  // ---- Mosaic ---------------------------------------------------------
  { file: "strip-edge.jpg", brief: "the strip, edge on, macro",
    prompt: `Extreme macro of ${STRIP} seen almost edge on, so it reads as a sliver of light against a soft bone ground, faint teal iridescence. Abstract and clinical. ${STYLE}` },
  { file: "box-lid.jpg", brief: "the box, lid lifted, from above",
    prompt: `${BOX} seen from directly above with its lid lifted and set beside it, a neat stack of film inside, on a warm bone table, soft daylight. Overhead flat lay, nobody present. ${STYLE}` },
  { file: "box-table.jpg", brief: "the box on a bedside table",
    prompt: `${BOX} on a pale oak bedside table beside a small glass of water, morning light raking from the left, long soft shadow. ${STYLE}` },
  { file: "strip-window.jpg", brief: "a strip against a bright window",
    prompt: `${STRIP} resting against a bright window sill, translucent and glowing, the window light blown out behind it, everything else pale and soft. Nobody present. ${STYLE}` },
  // Reworded: the original phrasing tripped a false-positive content filter
  { file: "linen-morning.jpg", brief: "morning light on linen",
    prompt: `Morning sunlight falling across folded oatmeal linen fabric on a pale surface, a sliver of window shadow across the folds. Quiet interior still life, empty room. ${STYLE}` },
  { file: "packaging-macro.jpg", brief: "packaging detail, macro",
    prompt: `Extreme macro of the corner and folded edge of ${BOX} — matte teal board, the crease, the faint tooth of uncoated card. Abstract, tactile, shallow depth of field. ${STYLE}` },
  { file: "water-glass.jpg", brief: "a glass of water, evening shadow",
    prompt: `A single clear glass of water on a warm bone surface, a long soft evening shadow stretching across the frame, deep teal tint in the shadow. Minimal, still. ${STYLE}` },
  { file: "linen-lamplight.jpg", brief: "linen and lamplight, wide",
    prompt: `A wide quiet interior detail: oatmeal linen lit by a single warm lamp just out of frame, deep shadow to one side, nobody present. ${STYLE}` },

  // ---- Closing cards --------------------------------------------------
  { file: "dusk-landscape.jpg", brief: "landscape, dusk, wide",
    prompt: `A wide empty landscape at dusk — a low ridge, still water, deep teal sky falling to a faint warm band at the horizon. Atmospheric, minimal, no people, no buildings. ${STYLE}` },
];

const exists = (p) => access(p).then(() => true).catch(() => false);

async function cloudflare(prompt) {
  const { CLOUDFLARE_ACCOUNT_ID: acct, CLOUDFLARE_API_TOKEN: token } = process.env;
  if (!acct || !token) throw new Error("CLOUDFLARE_ACCOUNT_ID / CLOUDFLARE_API_TOKEN not set");

  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${acct}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
    {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ prompt, steps: 8 }),
    },
  );
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.errors?.map((e) => e.message).join("; ") ?? `http ${res.status}`);
  }
  return Buffer.from(json.result.image, "base64");
}

async function gemini(prompt) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("GEMINI_API_KEY not set");
  const model = process.env.GEMINI_IMAGE_MODEL ?? "gemini-3-pro-image";

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: { "content-type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    },
  );
  const json = await res.json();
  if (!res.ok) throw new Error(`${json?.error?.status}: ${json?.error?.message}`);
  const part = (json?.candidates?.[0]?.content?.parts ?? []).find((p) => p.inlineData?.data);
  if (!part) throw new Error(json?.candidates?.[0]?.finishReason ?? "no image returned");
  return Buffer.from(part.inlineData.data, "base64");
}

const PROVIDERS = { cloudflare, gemini };

async function generate(shot) {
  const dest = path.join(OUT, shot.file);
  if (!process.env.FORCE && (await exists(dest))) {
    console.log(`· skip   ${shot.file}`);
    return "skipped";
  }

  try {
    const png = await PROVIDERS[PROVIDER](shot.prompt);
    const tmp = path.join(OUT, `${shot.file}.png`);
    await writeFile(tmp, png);
    // JPEG at 82 keeps these ~150 KB rather than ~350 KB, which matters for
    // a repo that will hold two dozen of them.
    await run("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "82", tmp, "--out", dest]);
    await rm(tmp);
    console.log(`✓ wrote  ${shot.file}`);
    return "written";
  } catch (err) {
    console.error(`✗ fail   ${shot.file}: ${err.message}`);
    return "failed";
  }
}

const filters = process.argv.slice(2);
const wanted = filters.length
  ? SHOTS.filter((s) => filters.some((f) => s.file.includes(f) || s.brief.includes(f)))
  : SHOTS;

await mkdir(OUT, { recursive: true });
console.log(`provider: ${PROVIDER} · ${wanted.length} shot(s)\n`);

const tally = { written: 0, skipped: 0, failed: 0 };
// Serial on purpose — free tiers rate-limit concurrent requests hard.
for (const shot of wanted) tally[await generate(shot)]++;

console.log(`\n${tally.written} written · ${tally.skipped} skipped · ${tally.failed} failed`);
if (tally.failed) process.exitCode = 1;
