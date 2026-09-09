import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Sale & Discount Post Generator - Flash Sales & Offers",
  description:
    "Generate urgency-driven flash sale, holiday discount, and clearance announcement posts for your Facebook Page.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
