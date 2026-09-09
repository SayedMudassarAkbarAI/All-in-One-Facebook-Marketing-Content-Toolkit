import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Image Converter - WebP, PNG & JPEG Optimizer",
  description:
    "Convert images to WebP, PNG, or JPEG optimized for Facebook compression algorithms and faster feed loading.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
