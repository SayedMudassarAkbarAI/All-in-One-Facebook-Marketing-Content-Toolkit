import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Post Ideas Generator - Viral Concepts & Polls",
  description:
    "Generate viral Facebook post ideas, engaging questions, polls, and debate topics to boost comments and reach.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
