"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type CartLine = { slug: string; name: string; qty: number };

type CartApi = {
  lines: CartLine[];
  count: number;
  add: (item: { slug: string; name: string }) => void;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const add = useCallback((item: { slug: string; name: string }) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === item.slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === item.slug ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const value = useMemo<CartApi>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      add,
    }),
    [lines, add],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
