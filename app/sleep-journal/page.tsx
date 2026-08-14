import type { Metadata } from "next";
import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SubscribeForm } from "@/components/SubscribeForm";
import { JOURNAL_POSTS } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Sleep Journal — NODA",
  description:
    "Notes on rest, ritual and the science of the night, from the people making the strip.",
};

export default function JournalIndexPage() {
  const [lead, ...rest] = JOURNAL_POSTS;

  return (
    <>
      <PageHeader
        index="Sleep Journal"
        title="Notes on the night"
        intro="What we are reading, testing and arguing about internally. Written for people who want the reasoning, not the headline."
      />

      {/* Lead article */}
      <section className="bg-bone pb-20 lg:pb-28" aria-label="Latest entry">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal>
            <Link
              href={`/sleep-journal/${lead.slug}`}
              className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
            >
              <ArtSlot
                variant="still"
                onDark={false}
                showCaption={false}
                brief={lead.brief}
                className="aspect-16/10 w-full rounded-2xl"
              />
              <div>
                <div className="flex items-center gap-3">
                  <span className="micro text-ink-soft">{lead.kicker}</span>
                  <span aria-hidden="true" className="text-ink-soft opacity-40">
                    ·
                  </span>
                  <span className="micro text-ink-soft">{lead.readTime}</span>
                </div>
                <h2 className="display mt-5 text-[clamp(2rem,4vw,3.25rem)]">
                  <span className="link-quiet">{lead.title}</span>
                </h2>
                <p className="prose-quiet mt-6 max-w-md text-ink-soft">
                  {lead.excerpt}
                </p>
                <span className="micro mt-8 inline-flex items-center gap-2.5">
                  Read the entry
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 [transition-timing-function:var(--ease-quiet)] group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The rest */}
      <section className="bg-bone pb-24 lg:pb-32" aria-label="All entries">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-14 border-t border-hairline pt-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 110}>
                <Link href={`/sleep-journal/${post.slug}`} className="group block">
                  <ArtSlot
                    variant={i % 2 === 0 ? "macro" : "field"}
                    onDark={i % 2 !== 0}
                    showCaption={false}
                    showMark={false}
                    brief={post.brief}
                    className="aspect-4/3 w-full rounded-2xl"
                  />
                  <div className="mt-6 flex items-center gap-3">
                    <span className="micro text-ink-soft">{post.kicker}</span>
                    <span aria-hidden="true" className="text-ink-soft opacity-40">
                      ·
                    </span>
                    <span className="micro text-ink-soft">{post.readTime}</span>
                  </div>
                  <h3 className="display mt-4 text-[1.6rem] leading-tight">
                    <span className="link-quiet">{post.title}</span>
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={250}>
            <p className="mt-14 max-w-2xl text-sm leading-relaxed text-ink-soft opacity-70">
              Placeholder entries. Every article on this page is unreviewed and
              written to hold the structure — nothing here is publishable copy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sign-up */}
      <section className="bg-brand-deep py-20 text-bone lg:py-24" aria-label="Newsletter">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-10 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
          <Reveal>
            <h2 className="display text-[clamp(1.75rem,3.2vw,2.75rem)]">
              A short letter, once a month.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:pt-2">
            <SubscribeForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
