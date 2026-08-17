import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { JOURNAL_POSTS } from "@/lib/brand";

/**
 * The closing blog row, on the model of the reference the client supplied:
 * a heading with a "View all" pill on the same line, then tall image cards
 * with the title set over the photograph and a read link beneath.
 *
 * Replaces the previous two-up cards.
 */
export function BlogRow() {
  return (
    <section
      className="bg-bone pb-24 lg:pb-32"
      aria-labelledby="blog-row-heading"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="rounded-3xl bg-bone-deep p-6 sm:p-8 lg:p-10">
          {/* Heading row */}
          <Reveal className="flex flex-wrap items-center justify-between gap-4">
            <h2
              id="blog-row-heading"
              className="display text-[clamp(1.6rem,3vw,2.25rem)]"
            >
              Get the scoop on the science
            </h2>
            <Link
              href="/sleep-journal"
              className="micro shrink-0 rounded-full bg-brand-deep px-5 py-2.5 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
            >
              View all
            </Link>
          </Reveal>

          {/* Cards */}
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {JOURNAL_POSTS.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 110}>
                <Link
                  href={`/sleep-journal/${post.slug}`}
                  className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-6 text-bone lg:min-h-[26rem]"
                >
                  <div className="absolute inset-0 -z-20">
                    <ArtSlot
                      variant={i === 1 ? "field" : "still"}
                      onDark={i === 1}
                      showCaption={false}
                      showMark={false}
                      brief={post.brief}
                      className="h-full w-full"
                    />
                  </div>
                  {/* Scrim so the title holds over any photograph */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent"
                  />

                  <p className="micro opacity-75">{post.kicker}</p>
                  <h3 className="display mt-3 text-[1.4rem] leading-tight">
                    {post.title}
                  </h3>
                  <span className="micro mt-6 inline-flex items-center gap-2">
                    Read blog post
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
