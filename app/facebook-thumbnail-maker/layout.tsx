import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Thumbnail Maker - Click-Worthy Video Cover Images",
  description:
    "Design click-worthy Facebook video and link preview thumbnails with play icons, bold headlines, and vibrant borders in exact 1280x720 or 1080x1080 dimensions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
