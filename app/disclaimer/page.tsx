import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata = {
  title: "Platform Disclaimer",
  description: "Meta Platform and Trademark Disclaimer for Facebook Marketing Toolkit.",
};

export default function DisclaimerPage() {
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white m-0">
              Platform & Trademark Disclaimer
            </h1>
          </div>

          <p className="text-xs text-slate-500">Last updated: September 2026</p>

          <h2>Meta Trademark Attribution</h2>
          <p>
            Facebook®, Meta®, and their respective logos and marks are registered trademarks of Meta Platforms, Inc.
          </p>
          <p>
            This website, application, and its operators are independent entities and are <strong>not endorsed by, directly affiliated with, maintained, authorized, or sponsored by Meta Platforms, Inc. or Facebook</strong>.
          </p>
          <p>
            The use of any trade name or trademark is for identification and reference purposes only and does not imply any association with the trademark holder of their product brand.
          </p>
        </div>
      </div>
    </div>
  );
}
