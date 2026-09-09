import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facebook Text On Image Tool - Add Banners & Typography",
  description:
    "Add high-contrast typography, ribbons, and graphic banners to your Facebook photos and graphics in exact 1200x630 dimensions.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
