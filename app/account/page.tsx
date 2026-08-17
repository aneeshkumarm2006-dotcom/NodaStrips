import type { Metadata } from "next";
import Link from "next/link";
import { ArtSlot } from "@/components/ArtSlot";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = { title: "Sign in — NODA" };

/**
 * Sign in. The form is presentational — accounts, sessions and password
 * resets are Shopify's, and building a fake one that looks real would be
 * the wrong thing to hand anyone.
 */
export default function AccountPage() {
  return (
    <section className="bg-bone" aria-labelledby="account-title">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-[1600px] grid-cols-1 items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-24 lg:px-10">
        <Reveal className="max-w-md">
          <p className="micro text-ink-soft">Account</p>
          <h1 id="account-title" className="display mt-7 text-[clamp(2.25rem,4.5vw,3.5rem)]">
            Sign in
          </h1>
          <p className="prose-quiet mt-6 text-ink-soft">
            See your orders and manage your details.
          </p>

          <form className="mt-11 flex flex-col gap-6">
            <div>
              <label htmlFor="email" className="micro text-ink-soft">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-3 w-full border-b border-hairline bg-transparent pb-3 text-[1.0625rem] outline-none transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] placeholder:text-ink-soft/50 focus:border-brand"
              />
            </div>

            <div>
              <label htmlFor="password" className="micro text-ink-soft">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="mt-3 w-full border-b border-hairline bg-transparent pb-3 text-[1.0625rem] outline-none transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] placeholder:text-ink-soft/50 focus:border-brand"
              />
            </div>

            <button
              type="button"
              className="micro mt-4 inline-flex h-14 items-center justify-center rounded-full bg-brand-deep px-9 text-bone transition-colors duration-500 [transition-timing-function:var(--ease-quiet)] hover:bg-ink"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-sm text-ink-soft">
            No account yet?{" "}
            <Link href="/shop" className="link-quiet">
              Start with the strip
            </Link>
            .
          </p>

          <p className="mt-10 border-t border-hairline pt-6 text-sm leading-relaxed text-ink-soft opacity-70">
            This form is presentational. Accounts, sessions and password resets
            belong to the commerce platform — nothing here is submitted or
            stored.
          </p>
        </Reveal>

        <Reveal delay={120} className="hidden lg:block">
          <ArtSlot
            variant="field"
            brief="the product, deep brand"
            showCaption={false}
            className="aspect-4/5 w-full rounded-2xl"
          />
        </Reveal>
      </div>
    </section>
  );
}
