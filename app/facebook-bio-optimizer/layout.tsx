import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Bio & About Optimizer - Keyword-Optimized Page Bios",
  description:
    "Write compelling, keyword-optimized Facebook Page bios that convert visitors into followers with SEO analysis and character limit tracking.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
