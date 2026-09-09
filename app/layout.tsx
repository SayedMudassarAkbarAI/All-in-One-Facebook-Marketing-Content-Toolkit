import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://facebook-toolkit.vercel.app"),
  title: {
    default: "All-in-One Facebook Marketing & Content Toolkit",
    template: "%s | Facebook Marketing Toolkit",
  },
  description:
    "Free Facebook content creation, image & video tools, post scheduling, SEO analyzers, and Ads calculators. Everything you need to grow your Facebook Page in one place.",
  keywords: [
    "Facebook post generator",
    "Facebook caption generator",
    "Facebook marketing tools",
    "Facebook scheduler",
    "Facebook image resizer",
    "Facebook video cutter",
    "Facebook SEO analyzer",
    "Facebook ads calculator",
  ],
  authors: [{ name: "Facebook Marketing Toolkit Team" }],
  creator: "Facebook Marketing Toolkit",
  publisher: "Facebook Marketing Toolkit",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://facebook-toolkit.vercel.app",
    title: "All-in-One Facebook Marketing & Content Toolkit",
    description: "Free tools to create viral Facebook posts, resize media, optimize SEO, and manage Pages.",
    siteName: "Facebook Marketing Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "All-in-One Facebook Marketing & Content Toolkit",
    description: "Free tools to create viral Facebook posts, resize media, optimize SEO, and manage Pages.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "All-in-One Facebook Marketing & Content Toolkit",
    url: "https://facebook-toolkit.vercel.app",
    description: "Comprehensive suite of free tools for Facebook Page management, content generation, and media editing.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col antialiased selection:bg-blue-500 selection:text-white`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
