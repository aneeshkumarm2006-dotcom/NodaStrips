import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Cart — NODA" };

export default function CartPage() {
  return (
    <>
      <PageHeader index="Cart" title="Your cart" />
      <CartView />
    </>
  );
}
