import Link from "next/link";
import { BRAND, FOOTER_COLUMNS, FOOTER_STATEMENT, LANGUAGES, SIGNUP } from "@/lib/brand";
import { Emphasised } from "./Emphasised";
import { SubscribeForm } from "./SubscribeForm";
import { Wordmark } from "./Wordmark";

/**
 * Footer, laid out as Arrae's (measured off arrae.com) per the client's
 * Nov 2026 notes:
 *
 *   TOP      the full noda™ wordmark — the client's file, not the N alone —
 *            and the statement on the left; four link columns on the right:
 *            Shop, Learn (was About), Support (was Help), Social. The
 *            Legal column is gone.
 *   MIDDLE   "Sign up & get a mystery discount" in the serif on the left,
 *            Arrae's outlined form on the right (was "First access").
 *   BOTTOM   locale, copyright and the regulatory line.
 */
export function Footer() {
  return (
    <footer className="bg-brand-deep text-bone">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-24">
        {/* ------------------------------------------------------- top */}
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Link href="/" aria-label={`${BRAND.name} — home`} className="inline-block">
              <Wordmark className="h-12 lg:h-[58px]" label={BRAND.name} />
            </Link>
            <p className="prose-quiet mt-8 max-w-sm text-bone/75">{FOOTER_STATEMENT}</p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
          >
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="text-sm font-medium uppercase tracking-[0.06em]">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      <Link href={link.href} className="link-quiet text-[0.9375rem] font-light text-bone/85">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ---------------------------------------------------- sign-up */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-bone/15 pt-14 lg:mt-20 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto] md:gap-12">
            <div>
              <h2 className="display text-[clamp(2rem,3vw,2.5rem)] leading-[0.98]">
                <Emphasised text={SIGNUP.title} />
              </h2>
              <p className="mt-4 max-w-xs text-[0.9375rem] font-light leading-relaxed text-bone/75">
                {SIGNUP.body}
              </p>
            </div>
            <SubscribeForm className="w-full md:w-[27rem]" />
          </div>
        </div>

        {/* ----------------------------------------------------- bottom */}
        <div className="mt-16 flex flex-col gap-6 border-t border-bone/15 pt-8 lg:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LocaleSelect />
            <span className="micro opacity-50">
              © {new Date().getFullYear()} {BRAND.name}
            </span>
          </div>
        </div>

        <p className="mt-8 max-w-3xl text-xs font-light leading-relaxed opacity-45">
          Placeholder site. Nothing on this page has been reviewed by a
          regulator, and no statement here has been evaluated by any health
          authority. Not intended to diagnose, treat, cure or prevent any
          disease.
        </p>
      </div>
    </footer>
  );
}

/** Language option in the footer, mirroring the header utility. */
function LocaleSelect() {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="footer-locale" className="sr-only">
        Country and language
      </label>
      <select
        id="footer-locale"
        defaultValue={LANGUAGES[0].country}
        className="micro cursor-pointer appearance-none bg-transparent pr-4 opacity-70 outline-none"
      >
        {LANGUAGES.map((lang) => (
          <option
            key={`${lang.code}-${lang.country}`}
            value={lang.country}
            className="bg-brand-deep"
          >
            {lang.flag} {lang.country} — {lang.code}
          </option>
        ))}
      </select>
    </div>
  );
}
