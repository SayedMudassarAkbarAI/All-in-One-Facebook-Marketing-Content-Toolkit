import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook ROAS Calculator - Return on Ad Spend & Break-Even",
  description:
    "Calculate your Facebook Ads ROAS, break-even threshold, net profit, and ROI. Know exactly when to scale or optimize.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
