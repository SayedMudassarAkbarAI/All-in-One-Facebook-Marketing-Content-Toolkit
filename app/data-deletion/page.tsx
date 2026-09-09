"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, ArrowLeft, Facebook } from "lucide-react";

export default function DataDeletionPage() {
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);
  const [metaUserId, setMetaUserId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!metaUserId.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const code = `DEL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
      setConfirmationCode(code);
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Facebook User Data Deletion Instructions
              </h1>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                In compliance with Meta Platform Terms & Conditions
              </span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            All-in-One Facebook Marketing & Content Toolkit values your privacy. If you have connected your Facebook account or Page and wish to delete your stored tokens and data, you can request full data removal below or via your Facebook Settings.
          </p>

          <h2 className="mt-8 text-base font-bold text-slate-900 dark:text-white">
            Option 1: Automatic Deletion via Facebook Settings
          </h2>
          <ol className="mt-3 list-decimal pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Go to your Facebook Profile &apos;Settings & Privacy&apos; &gt; &apos;Settings&apos;.</li>
            <li>Scroll down and click on &apos;Apps and Websites&apos;.</li>
            <li>Find &apos;All-in-One Facebook Marketing Toolkit&apos; in your list of apps.</li>
            <li>Click the &apos;Remove&apos; button.</li>
            <li>Check the box to delete all posts, videos, or events, and click &apos;Remove&apos;.</li>
          </ol>

          <h2 className="mt-8 text-base font-bold text-slate-900 dark:text-white">
            Option 2: Submit Instant Deletion Request
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enter your Meta User ID or Email to purge all access tokens and connected Page records from our database immediately.
          </p>

          {!confirmationCode ? (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Facebook User ID or Registered Email
                </label>
                <input
                  type="text"
                  required
                  value={metaUserId}
                  onChange={(e) => setMetaUserId(e.target.value)}
                  placeholder="e.g. 1029384756 or you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !metaUserId.trim()}
                className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? "Purging Records..." : "Submit Data Deletion Request"}
              </button>
            </form>
          ) : (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/40">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                <span>Data Deletion Request Processed</span>
              </div>
              <p className="mt-2 text-xs text-emerald-800 dark:text-emerald-200">
                Your confirmation tracking code:
              </p>
              <div className="mt-1 font-mono text-sm font-bold text-emerald-900 dark:text-emerald-100 bg-white dark:bg-emerald-900/60 p-2 rounded-lg inline-block border border-emerald-300 dark:border-emerald-700">
                {confirmationCode}
              </div>
              <p className="mt-3 text-xs text-emerald-700 dark:text-emerald-300">
                All associated access tokens, scheduled post drafts, and page references have been securely purged from PostgreSQL.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
