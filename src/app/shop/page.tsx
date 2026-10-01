import type { Metadata } from "next";
import { ShopExperience } from "@/components/shop-experience";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop QAHWA cups, coffee, matcha kits and everyday goods.",
};

export default function ShopPage() {
  return <ShopExperience />;
}
