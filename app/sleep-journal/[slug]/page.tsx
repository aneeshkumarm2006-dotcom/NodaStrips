import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";
import { JOURNAL_POSTS } from "@/lib/brand";

/** Static routes for the placeholder entries. */
export function generateStaticParams() {
  return JOURNAL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/sleep-journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Not found — NODA" };
  return { title: `${post.title} — NODA`, description: post.excerpt };
}

export default async function JournalEntryPage({
  params,
}: PageProps<"/sleep-journal/[slug]">) {
  const { slug } = await params;
  const post = JOURNAL_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const more = JOURNAL_POSTS.filter((p) => p.slug !== post.slug);

  return (
    <article className="bg-bone">
      {/* Header */}
      <header className="mx-auto max-w-[1600px] px-6 pb-14 pt-20 lg:px-10 lg:pt-28">
        <Reveal className="mx-auto max-w-3xl">
          <Link href="/sleep-journal" className="micro link-quiet text-ink-soft">
            ← Sleep Journal
          </Link>

          <div className="mt-10 flex items-center gap-3">
            <span className="micro text-ink-soft">{post.kicker}</span>
            <span aria-hidden="true" className="text-ink-soft opacity-40">
              ·
            </span>
            <span className="micro text-ink-soft">{post.readTime}</span>
          </div>

          <h1 className="display mt-5 text-[clamp(2.25rem,5vw,4rem)]">
            {post.title}
          </h1>
          <p className="prose-quiet mt-7 text-ink-soft">{post.excerpt}</p>
        </Reveal>
      </header>

      <Reveal className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <ArtSlot
          variant="still"
          onDark={false}
          showCaption={false}
          brief={post.brief}
          className="aspect-16/9 w-full rounded-2xl"
        />
      </Reveal>

      {/* Body */}
      <div className="mx-auto max-w-[1600px] px-6 pb-24 pt-16 lg:px-10 lg:pb-32">
        <Reveal className="mx-auto max-w-2xl">
          {post.body.map((para, i) => (
            <p
              key={para.slice(0, 32)}
              className={`text-[1.0625rem] leading-[1.8] text-ink-soft ${
                i === 0 ? "" : "mt-6"
              }`}
            >
              {para}
            </p>
          ))}

          <p className="mt-12 border-t border-hairline pt-8 text-sm leading-relaxed text-ink-soft opacity-70">
            Placeholder article. Unreviewed, unsourced, and not publishable as
            written — it exists to hold the layout and the tone.
          </p>
        </Reveal>
      </div>

      {/* More */}
      <section className="border-t border-hairline bg-bone py-20 lg:py-24" aria-label="More entries">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal>
            <h2 className="display text-[clamp(1.6rem,3vw,2.25rem)]">Keep reading</h2>
          </Reveal>

          <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            {more.map((other, i) => (
              <Reveal as="li" key={other.slug} delay={i * 110}>
                <Link href={`/sleep-journal/${other.slug}`} className="group block">
                  <ArtSlot
                    variant={i % 2 === 0 ? "field" : "macro"}
                    onDark={i % 2 === 0}
                    showCaption={false}
                    showMark={false}
                    brief={other.brief}
                    className="aspect-16/10 w-full rounded-2xl"
                  />
                  <h3 className="display mt-6 text-[1.5rem] leading-tight">
                    <span className="link-quiet">{other.title}</span>
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-ink-soft">
                    {other.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
