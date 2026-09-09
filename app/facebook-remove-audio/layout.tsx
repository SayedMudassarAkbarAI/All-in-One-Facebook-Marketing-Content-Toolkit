import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Remove Audio from Video - Silent Autoplay Ready",
  description:
    "Instantly mute and strip audio tracks from video files for Facebook silent autoplay. 100% browser-based, zero uploads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
