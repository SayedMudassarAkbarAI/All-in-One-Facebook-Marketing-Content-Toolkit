import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Video Thumbnail Generator - Extract Video Frames",
  description:
    "Extract high-resolution preview frames from any video clip to use as your Facebook video cover image.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
