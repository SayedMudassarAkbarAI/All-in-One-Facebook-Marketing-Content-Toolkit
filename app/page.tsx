"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Facebook, 
  CheckCircle2, 
  Copy, 
  Check,
  ChevronDown,
  Layers,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  SearchCheck,
  DollarSign,
  ShoppingBag
} from "lucide-react";
import { TOOLS, CATEGORIES } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { aiEngine } from "@/lib/ai";

const CATEGORY_META: Record<string, { label: string; desc: string; icon: any }> = {
  content: {
    label: "Content & AI Copywriting",
    desc: "Generate viral posts, ad copy, captions, content calendars, and smart hashtags.",
    icon: FileText,
  },
  image: {
    label: "Image & Creative Design",
    desc: "Resize photos, convert file formats, overlay typography, and craft thumbnails.",
    icon: ImageIcon,
  },
  video: {
    label: "Video & Media Production",
    desc: "Trim video lengths, extract/remove audio, and generate custom video thumbnails.",
    icon: VideoIcon,
  },
  seo: {
    label: "SEO & Page Optimization",
    desc: "Optimize page names, bios, search presence, and complete Facebook audits.",
    icon: SearchCheck,
  },
  ads: {
    label: "Ads & ROI Calculators",
    desc: "Calculate ROAS, compute and benchmark CPC/CPM/CTR, and plan ad campaign budgets.",
    icon: DollarSign,
  },
  business: {
    label: "Business & E-Commerce",
    desc: "Create persuasive product promotions, flash sale announcements, and discount offers.",
    icon: ShoppingBag,
  },
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Sync anchor hash navigation (#content, #image, #video, #seo, #ads, #business)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["content", "image", "video", "seo", "ads", "business"].includes(hash)) {
        setSelectedCategory("all");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Hero Quick Generator State
  const [quickTopic, setQuickTopic] = useState("");
  const [quickTone, setQuickTone] = useState<"engaging" | "storytelling" | "urgent">("engaging");
  const [quickResult, setQuickResult] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const handleQuickGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickTopic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const posts = aiEngine.generatePosts({
        topic: quickTopic,
        tone: quickTone,
      });
      if (posts.length > 0) {
        const post = posts[0];
        setQuickResult(`${post.headline}\n\n${post.body}\n\n${post.callToAction}\n\n${post.hashtags.join(" ")}`);
      }
      setIsGenerating(false);
    }, 400);
  };

  const handleCopy = () => {
    if (!quickResult) return;
    navigator.clipboard.writeText(quickResult);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  // Filtered Tools for search or single category filter
  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-blue-700 shadow-sm backdrop-blur-sm dark:border-blue-900/50 dark:bg-blue-950/60 dark:text-blue-300 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>Free Forever • No Sign-Up Required for 20+ Core Tools</span>
            </div>

            {/* Main Headline */}
            <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white">
              Create Faster. Post Smarter.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Grow Your Facebook Page.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base text-slate-600 sm:text-lg dark:text-slate-300 leading-relaxed">
              The all-in-one free toolkit for creators, marketers, and businesses. Generate viral posts, optimize SEO, resize media for Facebook feeds, and calculate ad profitability in seconds.
            </p>

            {/* Interactive Live Mini-Generator Card */}
            <div className="mt-10 w-full max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900/90 backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Try Live Demo: Facebook Post Generator
                  </span>
                </div>
                <span className="text-xs text-slate-400">Instant generation</span>
              </div>

              <form onSubmit={handleQuickGenerate} className="mt-4 flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={quickTopic}
                    onChange={(e) => setQuickTopic(e.target.value)}
                    placeholder="Enter your topic (e.g. 5 tips for organic social growth, summer flash sale)..."
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  <select
                    value={quickTone}
                    onChange={(e) => setQuickTone(e.target.value as any)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    <option value="engaging">Engaging & Conversational</option>
                    <option value="storytelling">Storytelling Format</option>
                    <option value="urgent">Urgent & Value Checklist</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isGenerating || !quickTopic.trim()}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all"
                  >
                    {isGenerating ? "Generating..." : "Generate Post"}
                  </button>
                </div>
              </form>

              {/* Quick Result Preview */}
              {quickResult && (
                <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-4 text-left dark:border-blue-900/40 dark:bg-blue-950/30 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                      Generated Facebook Post
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                    >
                      {hasCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy Post</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap font-sans text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                    {quickResult}
                  </pre>
                </div>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-4xl w-full text-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">20+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Free Utility Tools</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">100%</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Zero Login Needed</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">Graph v19.0</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Meta API Standards</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 dark:text-white">&lt; 100ms</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Edge-Cached Speed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Directory Section */}
      <section id="tools" className="border-t border-slate-200/80 bg-slate-50/50 py-16 dark:border-slate-800 dark:bg-slate-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Explore All Marketing & Content Tools
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Select a category or search for any Facebook tool below.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                    : "bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tools Grid or Categorized Sections */}
          {searchQuery.trim() ? (
            /* Search Results View */
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Search results for &quot;{searchQuery}&quot; ({filteredTools.length} found)
                </span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Clear search
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ) : selectedCategory !== "all" ? (
            /* Single Category Filtered View */
            <div id={selectedCategory} className="mt-8 scroll-mt-24">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {CATEGORY_META[selectedCategory]?.label || CATEGORIES.find(c => c.id === selectedCategory)?.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {CATEGORY_META[selectedCategory]?.desc}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                >
                  Show All Tools
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </div>
          ) : (
            /* All Tools Grouped by Category with Anchor IDs */
            <div className="mt-6 flex flex-col gap-12">
              {CATEGORIES.filter((cat) => cat.id !== "all").map((cat) => {
                const categoryTools = TOOLS.filter((t) => t.category === cat.id);
                const meta = CATEGORY_META[cat.id];
                const IconComponent = meta?.icon || Layers;

                return (
                  <div
                    key={cat.id}
                    id={cat.id}
                    className="scroll-mt-24 pt-6 border-t first:border-0 first:pt-2 border-slate-200/80 dark:border-slate-800/80"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                              {meta?.label || cat.label}
                            </h3>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                              {categoryTools.length}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {meta?.desc}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 self-start sm:self-auto hover:underline"
                      >
                        Focus this category &rarr;
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {categoryTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredTools.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-base text-slate-500 dark:text-slate-400">
                No tools found matching &quot;{searchQuery}&quot;. Try clearing your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-4 inline-flex items-center text-sm font-semibold text-blue-600 hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Feature Comparison: Instant Free vs Connected Suite */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Two Powerful Ways to Use This Toolkit
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
              Whether you want fast instant generation without signing in, or an automated Page publishing command center, we have you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: Instant No-Login */}
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Instant No-Login Tools
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Always Free & Anonymous
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Generate posts, captions, hashtags, and viral ideas instantly</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Resize photos to exact Facebook feed and story dimensions</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>In-browser WebAssembly video cutter and audio stripper</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Free Ads budget, ROAS, and CPC/CPM/CTR calculators</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>No login, cookies, or account registration needed</span>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="#tools"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  Start Using Free Tools <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Connected Dashboard */}
            <div className="rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 p-8 shadow-md dark:border-blue-900/60 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                  <Facebook className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Connected Page Dashboard
                  </h3>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Powered by Meta Graph API
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Connect multiple Facebook Pages under one command center</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Schedule posts with automated publishing via Vercel Cron</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Monthly visual calendar view with drag-and-drop management</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Live Page Insights: Reach, impressions, and engagement graphs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>AES-256 encrypted token security and 1-click revocation</span>
                </li>
              </ul>

              <div className="mt-8">
                <Link
                  href="/auth/facebook"
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700"
                >
                  Connect Your Facebook Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO FAQ Section */}
      <section className="border-t border-slate-200 bg-slate-50/60 py-16 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Everything you need to know about the toolkit and Meta platform compliance.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Are these Facebook marketing tools completely free to use?
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes! All 20+ core content generators, image resizers, video tools, SEO analyzers, and ad calculators are 100% free and do not require you to create an account or provide credit card information.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                How does Facebook Post Scheduling work?
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                When you connect your Facebook Page via official Meta Login, you can compose posts and schedule them for any future time. Our automated Vercel Cron engine calls the official Meta Graph API to publish your content directly to your Page at the specified time.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Is my Facebook Page data and token secure?
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Yes. We strictly comply with Meta Platform Terms. All Page and User access tokens are encrypted at rest using industry-standard AES-256-GCM encryption. You can disconnect your Page or submit an automated Data Deletion request at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
