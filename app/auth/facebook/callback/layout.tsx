import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connecting Facebook Page... | All-in-One Facebook Marketing Toolkit",
  description: "Meta OAuth callback handler",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AuthFacebookCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
