import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Page Name Optimizer - Rank Higher in Search",
  description:
    "Craft keyword-rich Facebook Page names that rank higher in Meta search and Google SERPs with our SEO scoring system.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
