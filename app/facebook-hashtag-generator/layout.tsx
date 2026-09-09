import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Hashtag Generator - Free Trending & Niche Tags",
  description:
    "Generate high-converting, trending Facebook hashtags grouped by topic and competition. Optimized for the Meta EdgeRank algorithm with smart 2-5 tag limits.",
  openGraph: {
    title: "Facebook Hashtag Generator - Free Trending & Niche Tags",
    description:
      "Generate high-converting, trending Facebook hashtags grouped by topic and competition.",
  },
  keywords: [
    "Facebook hashtag generator",
    "Facebook hashtags 2025",
    "trending Facebook hashtags",
    "Facebook post reach hashtags",
    "Meta algorithm hashtags",
    "free social media hashtags",
  ],
};

export default function FacebookHashtagGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
