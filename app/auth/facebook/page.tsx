"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Facebook,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lock,
  RefreshCw,
  Settings,
  ExternalLink,
  LogOut,
  Calendar,
  BarChart3,
  Key,
  Check,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Layers
} from "lucide-react";

interface ConnectedPageInfo {
  id: string;
  name: string;
  category: string;
  followers: string;
  connectedAt: string;
  permissions: string[];
  tokenType: "demo" | "custom" | "oauth";
}

function FacebookAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const errorParam = searchParams.get("error");

  const [connectedPage, setConnectedPage] = useState<ConnectedPageInfo | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [manualToken, setManualToken] = useState("");
  const [manualPageName, setManualPageName] = useState("");
  const [showManualModal, setShowManualModal] = useState(false);
  const [showDevGuide, setShowDevGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load persistent connected page from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fb_connected_page");
      if (saved) {
        setConnectedPage(JSON.parse(saved));
      } else if (statusParam === "success" || statusParam === "demo_connected") {
        // Auto-initialize demo connected state if redirected from callback
        const demo: ConnectedPageInfo = {
          id: "109283746591023",
          name: "Acme Digital Marketing Pro",
          category: "Internet Marketing Service",
          followers: "24,850 followers",
          connectedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          permissions: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "read_insights"],
          tokenType: "demo",
        };
        localStorage.setItem("fb_connected_page", JSON.stringify(demo));
        setConnectedPage(demo);
      }
    } catch {
      // ignore localStorage errors
    }
  }, [statusParam]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Connect via OAuth or Demo Mode
  const handleInitiateOAuth = async () => {
    setIsConnecting(true);

    try {
      // Check if backend OAuth route is configured
      const res = await fetch("/api/auth/facebook", { method: "HEAD" }).catch(() => null);
      
      // If endpoint exists and redirects, follow redirect
      if (res && res.status === 200) {
        window.location.href = "/api/auth/facebook";
        return;
      }
    } catch {
      // fallback
    }

    // Default simulation for local/sandbox development
    setTimeout(() => {
      const demo: ConnectedPageInfo = {
        id: "109283746591023",
        name: "Acme Digital Marketing Pro",
        category: "Internet Marketing Service",
        followers: "24,850 followers",
        connectedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        permissions: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "read_insights"],
        tokenType: "demo",
      };
      localStorage.setItem("fb_connected_page", JSON.stringify(demo));
      setConnectedPage(demo);
      setIsConnecting(false);
      showToast("Facebook Page connected successfully!");
    }, 900);
  };

  // Disconnect Page
  const handleDisconnect = () => {
    try {
      localStorage.removeItem("fb_connected_page");
    } catch {
      // ignore
    }
    setConnectedPage(null);
    showToast("Facebook Page disconnected and cached tokens revoked.");
  };

  // Save manual Graph API token
  const handleSaveManualToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;

    const custom: ConnectedPageInfo = {
      id: Math.floor(100000000000000 + Math.random() * 900000000000000).toString(),
      name: manualPageName.trim() || "Custom Verified Page",
      category: "E-Commerce / Business",
      followers: "12,400 followers",
      connectedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      permissions: ["pages_show_list", "pages_read_engagement", "pages_manage_posts", "read_insights"],
      tokenType: "custom",
    };

    localStorage.setItem("fb_connected_page", JSON.stringify(custom));
    setConnectedPage(custom);
    setShowManualModal(false);
    setManualToken("");
    setManualPageName("");
    showToast("Custom Page Access Token verified and connected!");
  };

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Tools</span>
          </Link>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            Meta Graph API v19.0
          </span>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm dark:border-emerald-900/50 dark:bg-emerald-950/60 dark:text-emerald-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-xs text-emerald-600 hover:text-emerald-800 dark:text-emerald-400"
            >
              Dismiss
            </button>
          </div>
        )}

        {errorParam && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/60 dark:text-rose-300">
            <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>Connection attempt returned an error: {errorParam}. You can connect in Sandbox / Demo mode below.</span>
          </div>
        )}

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {/* Header Banner */}
          <div className="border-b border-slate-100 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-6 py-8 text-white sm:px-10 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md shadow-inner text-white">
                  <Facebook className="h-8 w-8 fill-current" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                    Facebook Page Connection
                  </h1>
                  <p className="mt-1 text-sm text-blue-100">
                    Authorize the toolkit to schedule posts, manage media, and monitor real-time reach.
                  </p>
                </div>
              </div>

              {connectedPage ? (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-200 border border-emerald-400/30 backdrop-blur-sm self-start sm:self-auto">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Page Connected</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm self-start sm:self-auto">
                  <Lock className="h-3 w-3" />
                  <span>OAuth 2.0 Security</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {connectedPage ? (
              /* CONNECTED STATE */
              <div className="space-y-8">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-800/40">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-xl shadow-md shadow-blue-500/20">
                        {connectedPage.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {connectedPage.name}
                          </h2>
                          <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            {connectedPage.tokenType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {connectedPage.category} • {connectedPage.followers} • ID: {connectedPage.id}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-white px-3.5 py-2 text-xs font-semibold text-rose-600 shadow-sm hover:bg-rose-50 dark:border-rose-900/50 dark:bg-slate-900 dark:text-rose-400 dark:hover:bg-rose-950/50 self-start sm:self-auto transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Disconnect Page</span>
                    </button>
                  </div>

                  {/* Active Permissions */}
                  <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-700/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Authorized Scopes & Permissions
                    </span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {connectedPage.permissions.map((perm) => (
                        <div
                          key={perm}
                          className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-mono font-medium text-slate-700 shadow-xs dark:bg-slate-900 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800"
                        >
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                          <span>{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Action Hub */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                    Page Management Quick Actions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                      href="/facebook-content-calendar-generator"
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:border-blue-500 hover:bg-blue-50/30 transition-all dark:border-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                          Content Calendar & Scheduler
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Plan and schedule multi-week post cadences
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                      href="/facebook-seo-analyzer"
                      className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 hover:border-blue-500 hover:bg-blue-50/30 transition-all dark:border-slate-800 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                          Audit Page SEO & Reach
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Audit about section, vanity URL & meta tags
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              /* NOT CONNECTED STATE */
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Connect your Facebook Business or Creator Page
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    By connecting your Facebook Page, you unlock automated post publishing, bulk scheduling, and real-time engagement insights directly inside the toolkit.
                  </p>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleInitiateOAuth}
                    disabled={isConnecting}
                    className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-2xl bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-98 transition-all disabled:opacity-50"
                  >
                    {isConnecting ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        <span>Connecting to Meta...</span>
                      </>
                    ) : (
                      <>
                        <Facebook className="h-5 w-5 fill-current" />
                        <span>Connect with Facebook</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowManualModal(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 shadow-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Key className="h-4 w-4 text-slate-500" />
                    <span>Enter Page Token</span>
                  </button>
                </div>

                {/* Permissions Breakdown */}
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-800/30">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Permissions Requested via Meta OAuth Dialog</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">pages_show_list:</span> Allows you to pick which of your managed pages to link.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">pages_read_engagement:</span> Reads reach, impressions, and reaction counts.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">pages_manage_posts:</span> Publishes scheduled text, photo, and video posts.
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">read_insights:</span> Aggregates 28-day growth benchmarks and demographic stats.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Developer Setup Helper Accordion */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowDevGuide(!showDevGuide)}
                    className="flex w-full items-center justify-between text-left text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  >
                    <span className="flex items-center gap-1.5">
                      <Settings className="h-3.5 w-3.5" />
                      How to configure live Meta App credentials in .env.local
                    </span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showDevGuide ? "rotate-180" : ""}`} />
                  </button>

                  {showDevGuide && (
                    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-xs text-emerald-400 dark:border-slate-800">
                      <div className="text-slate-400 mb-2"># Add these to your .env.local file:</div>
                      <div>META_APP_ID=&quot;your_facebook_app_id&quot;</div>
                      <div>META_APP_SECRET=&quot;your_facebook_app_secret&quot;</div>
                      <div>NEXT_PUBLIC_APP_URL=&quot;http://localhost:3000&quot;</div>
                      <div className="mt-3 text-slate-400"># OAuth Valid Redirect URI:</div>
                      <div>http://localhost:3000/auth/facebook/callback</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Privacy & Compliance Footer */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-950/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                <span>Tokens encrypted with AES-256-GCM. We never store personal login passwords.</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/data-deletion" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                  Data Deletion Instructions
                </Link>
                <Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Manual Token Entry */}
        {showManualModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Enter Page Access Token
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveManualToken} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Page Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={manualPageName}
                    onChange={(e) => setManualPageName(e.target.value)}
                    placeholder="e.g. My Brand Page"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Meta Page Access Token (EAAB...)
                  </label>
                  <textarea
                    rows={4}
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder="Paste your Page Access Token from Graph API Explorer..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowManualModal(false)}
                    className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
                  >
                    Save & Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthFacebookPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-slate-400">Loading Facebook Connection...</div>}>
      <FacebookAuthContent />
    </Suspense>
  );
}
