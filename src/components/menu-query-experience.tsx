"use client";

import { useSearchParams } from "next/navigation";
import { MenuExperience } from "@/components/menu-experience";

export function MenuQueryExperience() {
  const searchParams = useSearchParams();

  return (
    <MenuExperience
      initialCategory={searchParams.get("category") ?? undefined}
      zone={searchParams.get("zone") ?? undefined}
      service={searchParams.get("service") ?? undefined}
    />
  );
}
