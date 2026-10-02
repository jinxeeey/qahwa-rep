import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuExperience } from "@/components/menu-experience";
import { MenuQueryExperience } from "@/components/menu-query-experience";

export const metadata: Metadata = {
  title: "Order",
  description: "Browse the QAHWA menu and build an order for dine in, pickup or delivery.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<MenuExperience />}>
      <MenuQueryExperience />
    </Suspense>
  );
}
