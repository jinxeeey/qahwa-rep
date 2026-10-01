import type { Metadata } from "next";
import { MenuExperience } from "@/components/menu-experience";

export const metadata: Metadata = {
  title: "Order",
  description: "Browse the QAHWA menu and build an order for dine in, pickup or delivery.",
};

type MenuPageProps = {
  searchParams: Promise<{ category?: string; zone?: string; service?: string }>;
};

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const params = await searchParams;
  return <MenuExperience initialCategory={params.category} zone={params.zone} service={params.service} />;
}
