import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Content Calendar Generator - Free 7 & 30-Day Plan",
  description:
    "Generate a complete 7-day or 30-day Facebook posting schedule with strategic content pillars and export to CSV.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
