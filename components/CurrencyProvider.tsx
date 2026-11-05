"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { CURRENCIES, FALLBACK_USD_PER_CAD, type Currency } from "@/lib/brand";

/**
 * The shopper's currency, and every price on the site through it.
 *
 * Prices are kept in CAD (lib/brand.ts). Choosing USD in the header
 * converts them at the day's CAD→USD reference rate — the European Central
 * Bank's, from frankfurter.dev (free, no key, CORS-open) — so the two
 * currencies no longer show the same figure (client, Nov 2026). The rate
 * is cached for twelve hours; until it loads, or if it can't be fetched,
 * FALLBACK_USD_PER_CAD stands in.
 *
 * The choice is remembered across visits. The server always renders CAD;
 * a remembered USD takes over on the client. On Shopify, Markets does all
 * of this, including rounding rules, and this provider goes away.
 */

type Money = (cad: number, opts?: { cents?: boolean }) => string;

type CurrencyApi = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  /** USD per CAD */
  rate: number;
  /** Converts a CAD amount into the chosen currency and formats it */
  money: Money;
};

const CurrencyContext = createContext<CurrencyApi | null>(null);

const CHOICE_KEY = "noda:currency";
const RATE_KEY = "noda:fx-cad-usd";
const RATE_TTL = 12 * 60 * 60 * 1000;
const RATE_URL = "https://api.frankfurter.dev/v1/latest?base=CAD&symbols=USD";

const FORMATS = {
  CAD: { locale: "en-CA", currency: "CAD" },
  USD: { locale: "en-US", currency: "USD" },
} as const;

/* ---------------------------------------------------- the little store
   Choice and rate live outside React, backed by localStorage, so the
   first client render can pick them up without a setState-in-effect. In
   memory too, for when storage is blocked (private browsing).          */

type CachedRate = { rate: number; at: number };

const listeners = new Set<() => void>();
let memoryChoice: Currency | null = null;
let memoryRate: CachedRate | null = null;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage blocked — the in-memory copy still holds for this visit */
  }
}

function notify() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CHOICE_KEY || e.key === RATE_KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

function getChoice(): Currency {
  if (memoryChoice) return memoryChoice;
  const saved = read<Currency>(CHOICE_KEY);
  return saved && CURRENCIES.includes(saved) ? saved : CURRENCIES[0];
}

function getCachedRate(): CachedRate | null {
  if (memoryRate) return memoryRate;
  const cached = read<CachedRate>(RATE_KEY);
  return cached && cached.rate > 0 ? cached : null;
}

function getRate(): number {
  return getCachedRate()?.rate ?? FALLBACK_USD_PER_CAD;
}

/* ---------------------------------------------------------- provider */

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = useSyncExternalStore(subscribe, getChoice, () => CURRENCIES[0]);
  const rate = useSyncExternalStore(subscribe, getRate, () => FALLBACK_USD_PER_CAD);

  // Fetch the day's rate once USD is wanted, unless the cached one is fresh
  useEffect(() => {
    if (currency !== "USD") return;
    const cached = getCachedRate();
    if (cached && Date.now() - cached.at < RATE_TTL) return;

    const ctrl = new AbortController();
    fetch(RATE_URL, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { rates?: { USD?: number } }) => {
        const usd = data.rates?.USD;
        if (typeof usd === "number" && usd > 0) {
          memoryRate = { rate: usd, at: Date.now() };
          write(RATE_KEY, memoryRate);
          notify();
        }
      })
      .catch(() => {
        /* keep the cached or fallback rate */
      });
    return () => ctrl.abort();
  }, [currency]);

  const setCurrency = useCallback((c: Currency) => {
    memoryChoice = c;
    write(CHOICE_KEY, c);
    notify();
  }, []);

  const money = useCallback<Money>(
    (cad, opts) => {
      const amount = currency === "CAD" ? cad : Math.round(cad * rate * 100) / 100;
      // Whole CAD prices keep their short form ("$72"); a converted price
      // almost never lands on a whole dollar, so it shows its cents.
      const whole = Number.isInteger(amount);
      const cents = opts?.cents || !whole;
      const f = FORMATS[currency];
      return new Intl.NumberFormat(f.locale, {
        style: "currency",
        currency: f.currency,
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: cents ? 2 : 0,
        maximumFractionDigits: 2,
      }).format(amount);
    },
    [currency, rate],
  );

  const value = useMemo<CurrencyApi>(
    () => ({ currency, setCurrency, rate, money }),
    [currency, setCurrency, rate, money],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside <CurrencyProvider>");
  return ctx;
}
