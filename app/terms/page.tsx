import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for All-in-One Facebook Marketing & Content Toolkit.",
};

export default function TermsPage() {
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
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white m-0">
              Terms of Service
            </h1>
          </div>

          <p className="text-xs text-slate-500">Last updated: September 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the All-in-One Facebook Marketing & Content Toolkit, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>

          <h2>2. Acceptable Use Policy</h2>
          <p>You agree not to use the service to:</p>
          <ul>
            <li>Publish spam, defamatory content, or violate Meta Platform Community Standards.</li>
            <li>Attempt to bypass rate limits, serverless security controls, or private IP networks (anti-SSRF policy).</li>
            <li>Download or redistribute copyrighted media without proper authorization.</li>
          </ul>

          <h2>3. Intellectual Property</h2>
          <p>
            All generated copy and edited media created using our free tools belong entirely to you. You retain full ownership and rights over your creative assets.
          </p>
        </div>
      </div>
    </div>
  );
}
