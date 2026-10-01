import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Operations demo",
  description: "QAHWA operations dashboard concept.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
