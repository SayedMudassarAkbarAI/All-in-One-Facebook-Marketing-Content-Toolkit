import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Product Promotion Post Maker - E-Commerce Copy",
  description:
    "Turn e-commerce products into persuasive feature-benefit-offer Facebook posts using proven direct-response copywriting formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
