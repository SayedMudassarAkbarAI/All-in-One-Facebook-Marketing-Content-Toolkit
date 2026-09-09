import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook CPC / CPM / CTR Calculator - Free Ads Metric Tool",
  description:
    "Calculate and benchmark your Facebook Ads cost-per-click, cost-per-mille, and click-through rates against 2025 industry averages.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
