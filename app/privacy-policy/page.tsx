import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for All-in-One Facebook Marketing & Content Toolkit.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900 prose dark:prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-6 not-prose">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Shield className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white m-0">
              Privacy Policy
            </h1>
          </div>

          <p className="text-xs text-slate-500">Last updated: September 2026</p>

          <h2>1. Overview</h2>
          <p>
            The All-in-One Facebook Marketing & Content Toolkit is developed and operated by <strong>SPManchester Private Limited Company</strong>, an international technology and digital solutions firm (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy. This Privacy Policy explains how our web application handles information when you use our free utility tools or connect your Facebook account.
          </p>

          <h2>2. Information We Collect</h2>
          <h3>A. Public Utility Tools (No-Login)</h3>
          <p>
            When using our content generators, image resizers, video tools, or calculators, no personal information, accounts, or cookies are stored. Any image or video processing performed client-side using WebAssembly remains entirely on your device.
          </p>

          <h3>B. Connected Facebook Page Management Suite</h3>
          <p>
            If you choose to authenticate using Facebook Login, we request permissions authorized by you (such as managing Page posts and reading insights). We store:
          </p>
          <ul>
            <li>Your Meta User ID and Page IDs.</li>
            <li>Encrypted Page Access Tokens using AES-256-GCM encryption.</li>
            <li>Drafted post content and scheduled timestamps.</li>
          </ul>

          <h2>3. Data Deletion & Token Revocation</h2>
          <p>
            You may request complete removal of your data at any time via our{" "}
            <Link href="/data-deletion" className="text-blue-600 font-semibold underline">
              Data Deletion Page
            </Link>{" "}
            or by removing our application from your Facebook account settings.
          </p>

          <h2>4. Corporate Entity & Contact Information</h2>
          <p>
            <strong>SPManchester Private Limited Company</strong><br />
            Website: <a href="https://spmanchester.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">spmanchester.com</a><br />
            Phone: <a href="tel:+923064350580" className="text-blue-600 underline">+92 306 4350580</a><br />
            Email: <a href="mailto:info@spmanchester.com" className="text-blue-600 underline">info@spmanchester.com</a><br />
            Services: Web Development, Mobile Apps, Graphic Design, IT Consultancy, Ads Management, SEO, eCommerce, Artificial Intelligence.
          </p>
          <p className="text-xs text-slate-500 mt-4">
            Copyright: © 2026 SPManchester Private Limited Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
