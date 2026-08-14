import Link from "next/link";
import { BRAND, FOOTER_COLUMNS, FOOTER_STATEMENT, LANGUAGES } from "@/lib/brand";
import { Mark } from "./Mark";
import { SubscribeForm } from "./SubscribeForm";

/**
 * Footer on Seed's model: brand statement and newsletter on the left, five
 * short link columns on the right, legal and locale along the bottom.
 */
export function Footer() {
  return (
    <footer className="bg-brand-deep text-bone">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="h-8 w-8 text-ignite" title="NODA" />
              <span className="display text-[1.5rem] tracking-tight">
                {BRAND.name}
              </span>
            </div>

            <p className="prose-quiet mt-8 max-w-md opacity-75">
              {FOOTER_STATEMENT}
            </p>

            <div className="mt-12 max-w-md border-t border-bone/15 pt-10">
              <SubscribeForm />
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5"
          >
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="micro opacity-45">{col.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        className="link-quiet text-sm opacity-80"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col gap-6 border-t border-bone/15 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="micro opacity-40">{BRAND.estd}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <LocaleSelect />
            <span className="micro opacity-40">
              © {new Date().getFullYear()} {BRAND.name}
            </span>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed opacity-35">
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
        className="micro cursor-pointer appearance-none bg-transparent pr-4 opacity-60 outline-none"
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
