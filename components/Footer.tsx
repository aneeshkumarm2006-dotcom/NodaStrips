import Link from "next/link";
import { CATEGORIES, LANGUAGES, NAV } from "@/lib/brand";
import { Mark } from "./Mark";
import { SubscribeForm } from "./SubscribeForm";
import { Wordmark } from "./Wordmark";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Ingredients", href: "/ingredients" },
  { label: "Contact", href: "/contact" },
  { label: "Account", href: "/account" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Shipping & returns", href: "/shipping" },
];

/** Subscription sign-up, language option, and the full navigation. */
export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-[1600px] px-6 py-24 lg:px-10 lg:py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <div>
            <Mark className="h-12 w-12 text-ignite" title="NODA" />
            <p className="display mt-10 max-w-sm text-[clamp(1.75rem,3vw,2.5rem)]">
              Where better days begin.
            </p>
            <p className="mt-6 max-w-sm leading-relaxed opacity-60">
              One strip, straight into your system. No water, no pills.
            </p>
            <div className="mt-12">
              <SubscribeForm />
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3"
          >
            <FooterColumn title="Shop">
              {CATEGORIES.map((cat) => (
                <FooterLink key={cat.slug} href={`/shop/${cat.slug}`}>
                  {cat.name}
                </FooterLink>
              ))}
              <FooterLink href="/shop/combo">Combo</FooterLink>
            </FooterColumn>

            <FooterColumn title="Explore">
              {NAV.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn title="Company">
              {COMPANY.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>
          </nav>
        </div>

        <div className="mt-24 flex flex-col gap-8 border-t border-bone/15 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Wordmark className="h-6" />
            <span className="micro opacity-40">Estd. 2026 · Located in Canada</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <LocaleSelect />
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="micro link-quiet opacity-60">
                {item.label}
              </Link>
            ))}
            <span className="micro opacity-40">
              © {new Date().getFullYear()} NODA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="micro opacity-50">{title}</h2>
      <ul className="mt-6 flex flex-col gap-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="link-quiet text-[0.9375rem] opacity-80">
        {children}
      </Link>
    </li>
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
            className="bg-ink"
          >
            {lang.flag} {lang.country} — {lang.code}
          </option>
        ))}
      </select>
    </div>
  );
}
