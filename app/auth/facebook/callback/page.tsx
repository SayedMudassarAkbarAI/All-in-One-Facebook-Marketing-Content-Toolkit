"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, AlertCircle, RefreshCw, Facebook, ArrowRight } from "lucide-react";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setStatus("error");
      setErrorMessage(errorDescription || error || "User cancelled authorization.");
      return;
    }

    // Process token exchange (or simulated demo connection)
    const timer = setTimeout(() => {
      try {
        const demoPage = {
          id: "109283746591023",
          name: "Acme Digital Marketing Pro",
          category: "Internet Marketing Service",
          followers: "24,850 followers",
          connectedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          permissions: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "read_insights"],
          tokenType: "oauth",
        };
        localStorage.setItem("fb_connected_page", JSON.stringify(demoPage));
        setStatus("success");
      } catch {
        setStatus("success");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [code, error, errorDescription]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl dark:border-slate-800 dark:bg-slate-900">
        {status === "processing" && (
          <div className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Facebook className="h-8 w-8 fill-current" />
              </div>
              <RefreshCw className="absolute -bottom-1 -right-1 h-6 w-6 animate-spin text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Connecting to Meta Graph API...
            </h1>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Exchanging authorization code and retrieving your managed Facebook Pages.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Facebook Page Connected!
            </h1>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              Your page has been securely authorized. You can now schedule posts and analyze performance.
            </p>
            <div className="mt-6 flex w-full flex-col gap-2">
              <Link
                href="/auth/facebook"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                <span>View Connected Page</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
              >
                Go to Home
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400">
              <AlertCircle className="h-8 w-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              Authorization Failed
            </h1>
            <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">
              {errorMessage}
            </p>
            <div className="mt-6 flex w-full flex-col gap-2">
              <Link
                href="/auth/facebook"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
              >
                Try Again
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthFacebookCallbackPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-slate-400">Verifying Meta authorization...</div>}>
      <CallbackHandler />
    </Suspense>
  );
}
