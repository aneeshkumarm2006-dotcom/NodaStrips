import Link from "next/link";
import { NAV } from "@/lib/brand";

export default function NotFound() {
  return (
    <section className="bg-bone" aria-labelledby="nf-title">
      <div className="mx-auto flex min-h-[calc(100svh-7.25rem)] max-w-[1600px] flex-col justify-center px-6 py-24 lg:px-10">
        <p className="micro text-ink-soft">404</p>
        <h1 id="nf-title" className="display mt-7 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)]">
          This page is still asleep.
        </h1>
        <p className="prose-quiet mt-8 max-w-md text-ink-soft">
          The link is broken or the page hasn’t been built yet. Everything that
          does exist is below.
        </p>

        <nav aria-label="Site" className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="micro link-quiet">
              {item.label}
            </Link>
          ))}
          <Link href="/" className="micro link-quiet">
            Home
          </Link>
        </nav>
      </div>
    </section>
  );
}
