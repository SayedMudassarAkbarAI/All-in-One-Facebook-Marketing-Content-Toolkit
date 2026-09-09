import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect Facebook Page | All-in-One Facebook Marketing Toolkit",
  description:
    "Connect your Facebook Page securely via the official Meta Graph API to schedule posts, manage published content, and access real-time page analytics.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthFacebookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
