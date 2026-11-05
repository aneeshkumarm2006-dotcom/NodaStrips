"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { getProduct, type Product, type ProductPlan } from "@/lib/brand";

/**
 * The in-memory cart. A line is one product on one purchase option, so
 * the same strip as a one-time box and as a subscription are two lines.
 *
 * Lines can be added to, re-quantified, removed, and moved onto another
 * purchase option — which is how the subscribe pop-up turns a one-time
 * box into a subscription (Nov 2026).
 */

export type PlanId = ProductPlan["id"];

export type CartLine = {
  key: string;
  slug: Product["slug"];
  plan: PlanId;
  qty: number;
};

/** A line with its product and option looked up */
export type ResolvedLine = CartLine & { product: Product; option: ProductPlan };

type CartApi = {
  lines: ResolvedLine[];
  count: number;
  /** CAD */
  subtotal: number;
  add: (item: { slug: Product["slug"]; plan: PlanId; qty?: number }) => string;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  /** Moves a line onto another option, merging with any line already there */
  changePlan: (key: string, plan: PlanId) => string;
};

export const MAX_QTY = 10;

const keyOf = (slug: string, plan: string) => `${slug}-${plan}`;

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback<CartApi["add"]>(({ slug, plan, qty = 1 }) => {
    const key = keyOf(slug, plan);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        );
      }
      return [...prev, { key, slug, plan, qty: Math.min(MAX_QTY, qty) }];
    });
    return key;
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const changePlan = useCallback<CartApi["changePlan"]>((key, plan) => {
    const slug = key.slice(0, key.lastIndexOf("-")) as Product["slug"];
    const next = keyOf(slug, plan);
    if (next === key) return key;
    setLines((prev) => {
      const line = prev.find((l) => l.key === key);
      if (!line) return prev;
      const target = prev.find((l) => l.key === next);
      if (target) {
        return prev
          .filter((l) => l.key !== key)
          .map((l) =>
            l.key === next ? { ...l, qty: Math.min(MAX_QTY, l.qty + line.qty) } : l,
          );
      }
      // Keep its place in the list
      return prev.map((l) => (l.key === key ? { ...l, key: next, plan } : l));
    });
    return next;
  }, []);

  const value = useMemo<CartApi>(() => {
    const resolved: ResolvedLine[] = [];
    for (const l of lines) {
      const product = getProduct(l.slug);
      const option = product?.plans.find((p) => p.id === l.plan);
      if (product && option) resolved.push({ ...l, product, option });
    }
    return {
      lines: resolved,
      count: resolved.reduce((n, l) => n + l.qty, 0),
      subtotal: resolved.reduce((n, l) => n + l.qty * l.option.price, 0),
      add,
      setQty,
      remove,
      changePlan,
    };
  }, [lines, add, setQty, remove, changePlan]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
