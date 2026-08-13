import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { JOURNAL_POSTS } from "@/lib/brand";

const SLOT_VARIANTS = ["still", "macro", "dusk"] as const;
const SLOT_BRIEFS = [
  "morning light on linen",
  "glass of water, long evening shadow",
  "dusk gradient, indigo into amber",
];

/**
 * 05 — Sleep Journal. A teaser of the editorial; the subscription sign-up
 * and full navigation live in the footer directly below.
 */
export function Journal() {
  return (
    <section
      id="sleep-journal"
      className="bg-bone py-28 lg:py-40"
      aria-labelledby="journal-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="micro text-ink-soft">05 — Sleep Journal</p>
            <h2
              id="journal-heading"
              className="display mt-8 text-[clamp(2.75rem,6vw,4.75rem)]"
            >
              Notes on the night
            </h2>
          </div>

          <Link href="/sleep-journal" className="micro link-quiet pb-2">
            All entries →
          </Link>
        </Reveal>

        <ul className="mt-20 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-3">
          {JOURNAL_POSTS.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 110}>
              <article className="group">
                <Link href={`/sleep-journal/${post.slug}`} className="block">
                  <ArtSlot
                    variant={SLOT_VARIANTS[i]}
                    tint="#3D34C9"
                    onDark={SLOT_VARIANTS[i] === "dusk"}
                    brief={SLOT_BRIEFS[i]}
                    className="aspect-4/3 w-full"
                  />

                  <div className="mt-7 flex items-center gap-3">
                    <span className="micro text-ink-soft">{post.kicker}</span>
                    <span aria-hidden="true" className="text-ink-soft opacity-40">
                      ·
                    </span>
                    <span className="micro text-ink-soft">{post.readTime}</span>
                  </div>

                  <h3 className="display mt-4 text-[1.75rem] leading-tight">
                    <span className="link-quiet">{post.title}</span>
                  </h3>

                  <p className="mt-4 max-w-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
