import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Ad Copy Generator - Free AIDA & PAS Ad Maker",
  description:
    "Generate high-converting Facebook ad copy headlines, primary text, and calls-to-action using proven direct-response frameworks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
