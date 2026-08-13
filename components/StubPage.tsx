import Link from "next/link";

/**
 * Placeholder for the pages beyond the main page. Keeps the navigation
 * honest at review without pretending the content exists yet.
 */
export function StubPage({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note: string;
}) {
  return (
    <section className="bg-bone">
      <div className="mx-auto flex min-h-[70svh] max-w-[1600px] flex-col justify-center px-6 py-32 lg:px-10">
        <p className="micro text-ink-soft">{index}</p>
        <h1 className="display mt-8 max-w-3xl text-[clamp(3rem,8vw,6rem)]">{title}</h1>
        <p className="mt-9 max-w-md text-[1.0625rem] leading-relaxed text-ink-soft">
          {note}
        </p>
        <Link href="/" className="micro link-quiet mt-14 w-fit">
          ← Back to the main page
        </Link>
      </div>
    </section>
  );
}
