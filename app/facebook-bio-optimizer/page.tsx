"use client";

import React, { useState, useMemo } from "react";
import { UserCheck, Sparkles, RefreshCw, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";

const SHORT_BIO_LIMIT = 101;
const FULL_BIO_LIMIT = 255;

function generateBioVariants(business: string, service: string, cta: string, tone: string): string[] {
  const b = business.trim() || "Our business";
  const s = service.trim() || "professional services";
  const c = cta.trim() || "Message us today";

  if (tone === "professional") {
    return [
      `${b} — Trusted ${s} specialist. Helping clients achieve measurable results since day one. ${c} for a free consultation.`,
      `Expert ${s} at ${b}. We deliver proven strategies that grow your brand, audience, and revenue. ${c}.`,
      `${b}: Your dedicated ${s} partner. Results-driven. Data-backed. Client-focused. ${c} to get started.`,
    ];
  }

  if (tone === "local") {
    return [
      `Proudly serving our local community with top-rated ${s}. ${b} — where quality meets care. ${c}!`,
      `${b}: Your neighborhood's go-to for ${s}. Family-owned, locally loved, and community driven. ${c}.`,
      `Local ${s} you can trust. ${b} has proudly served this community. ${c} for a free quote!`,
    ];
  }

  // Casual / engaging
  return [
    `We're ${b} — passionate about making ${s} simple, affordable, and actually enjoyable. ${c}! 👇`,
    `Life's too short for bad ${s}. That's why ${b} exists. ${c} and let's make it happen together 🙌`,
    `${b}: turning complicated ${s} into wins you can celebrate. ${c} — we'd love to help! ✨`,
  ];
}

export default function FacebookBioOptimizerPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-bio-optimizer")!;

  const [business, setBusiness] = useState("");
  const [service, setService] = useState("");
  const [cta, setCta] = useState("");
  const [tone, setTone] = useState<"engaging" | "professional" | "local">("engaging");
  const [customBio, setCustomBio] = useState("");
  const [variants, setVariants] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeMode, setActiveMode] = useState<"generator" | "analyzer">("generator");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!business.trim() && !service.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setVariants(generateBioVariants(business, service, cta, tone));
      setIsGenerating(false);
    }, 300);
  };

  // Short bio (101 char) derived from customBio
  const shortBioAnalysis = useMemo(() => {
    const len = customBio.length;
    const hasKeyword = service.trim() && customBio.toLowerCase().includes(service.trim().toLowerCase());
    const hasCta = /(click|message|call|visit|link|book|shop|buy|get|start|contact)/i.test(customBio);
    const hasEmoji = /\p{Emoji}/u.test(customBio);
    return { len, hasKeyword, hasCta, hasEmoji };
  }, [customBio, service]);

  const bioCharPercent = Math.min(100, (shortBioAnalysis.len / FULL_BIO_LIMIT) * 100);
  const charBarColor =
    shortBioAnalysis.len > FULL_BIO_LIMIT
      ? "bg-rose-500"
      : shortBioAnalysis.len > SHORT_BIO_LIMIT
      ? "bg-amber-400"
      : "bg-emerald-500";

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your business name, primary service, and desired call-to-action.",
        "Choose your brand tone: Engaging, Professional, or Local Community.",
        "Generate polished bio variants and analyze your existing bio against Facebook's character limits.",
      ]}
      benefits={[
        "Character Limit Intelligence: Shows exactly which content appears in the short preview (101 chars) vs full description (255 chars).",
        "SEO-First Copy: Ensures your primary keyword appears in the first sentence where it counts most for search indexing.",
        "Built-in CTA Optimizer: Every variant includes a call-to-action proven to drive profile link clicks and messages.",
        "3 Unique Tone Variants: Engaging, professional, and local-oriented bios generated from a single input.",
      ]}
      tips={[
        "Your first 101 characters appear as the truncated preview bio. Put your most compelling keyword or value proposition here.",
        "End your bio with a direct action: 'Message us for a free quote', 'Click the link below', or 'Book a free call.'",
        "Include your primary city or region in your bio if you serve local customers — it boosts local Facebook and Google discovery.",
      ]}
      faqs={[
        {
          question: "What is the difference between the short bio and the About section?",
          answer:
            "The short bio (101 characters max) appears under your Page name in search results and profile previews. The About section description (255 characters) appears on your Page's 'About' tab and is indexed by Google for SEO.",
        },
        {
          question: "Should I use emojis in my Facebook Page bio?",
          answer:
            "Yes! Pages with emojis in their bios see 25-35% higher profile engagement rates. Use 1-2 relevant emojis maximum — excessive emojis reduce perceived professionalism and may get truncated in search snippets.",
        },
      ]}
    >
      <div className="space-y-8">
        {/* Mode Switch */}
        <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl dark:bg-slate-800/60 w-fit">
          <button
            type="button"
            onClick={() => setActiveMode("generator")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
              activeMode === "generator"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Generate Bio Variants
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("analyzer")}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
              activeMode === "analyzer"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            Analyze My Existing Bio
          </button>
        </div>

        {activeMode === "generator" ? (
          <form onSubmit={handleGenerate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Business / Brand Name *
                </label>
                <input
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="e.g. Sunset Spa, Apex Digital, Green Thumb Gardens"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Service / Niche *
                </label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="e.g. Massage Therapy, Facebook Ads, Organic Gardening"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Call-To-Action (Optional)
                </label>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  placeholder="e.g. Message us today, Book a free call, Shop the link below"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Brand Tone
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["engaging", "professional", "local"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      className={`py-2.5 text-xs font-bold rounded-xl border capitalize transition-all ${
                        tone === t
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || (!business.trim() && !service.trim())}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {isGenerating ? (
                <><RefreshCw className="h-4 w-4 animate-spin" /><span>Writing Optimized Bios...</span></>
              ) : (
                <><Sparkles className="h-4 w-4" /><span>Generate Facebook Page Bio Variants</span></>
              )}
            </button>

            {variants.length > 0 && (
              <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Optimized About Section Variants
                </h3>
                {variants.map((v, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{v}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                          <span>{v.length} chars</span>
                          <span className={`font-semibold ${v.length <= SHORT_BIO_LIMIT ? "text-emerald-600" : v.length <= FULL_BIO_LIMIT ? "text-amber-600" : "text-rose-600"}`}>
                            {v.length <= SHORT_BIO_LIMIT ? "✓ Fits short preview" : v.length <= FULL_BIO_LIMIT ? "✓ Fits full description" : "⚠ Over limit"}
                          </span>
                        </div>
                      </div>
                      <CopyButton textToCopy={v} label="Copy" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        ) : (
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Paste Your Existing Facebook Bio
                </label>
                <span className={`text-xs font-mono font-bold ${shortBioAnalysis.len > FULL_BIO_LIMIT ? "text-rose-600" : "text-slate-500"}`}>
                  {shortBioAnalysis.len} / {FULL_BIO_LIMIT} chars
                </span>
              </div>
              <textarea
                rows={4}
                value={customBio}
                onChange={(e) => setCustomBio(e.target.value)}
                placeholder="Paste your current Facebook Page bio or About section text here..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />

              {/* Character Bar */}
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${charBarColor}`}
                    style={{ width: `${bioCharPercent}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>0</span>
                  <span className="text-amber-600 font-medium">101 (short bio cutoff)</span>
                  <span>255 (max)</span>
                </div>
              </div>
            </div>

            {customBio.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Bio Analysis Results
                </h3>
                {[
                  {
                    pass: shortBioAnalysis.len <= FULL_BIO_LIMIT,
                    label: `Character Count: ${shortBioAnalysis.len} / ${FULL_BIO_LIMIT}`,
                    tip: shortBioAnalysis.len > FULL_BIO_LIMIT ? "Trim your bio — Facebook will cut off text beyond 255 characters." : "Great length!",
                  },
                  {
                    pass: shortBioAnalysis.len <= SHORT_BIO_LIMIT,
                    label: `Short Preview (First 101 chars): ${Math.min(101, shortBioAnalysis.len)} chars used`,
                    tip: shortBioAnalysis.len > SHORT_BIO_LIMIT ? "Content beyond 101 chars is hidden in search results. Put your best hook first." : "Excellent — full bio visible in search previews.",
                  },
                  {
                    pass: !!shortBioAnalysis.hasCta,
                    label: "Call-To-Action Detected",
                    tip: !shortBioAnalysis.hasCta ? "Add a clear action: 'Message us', 'Click the link', or 'Book today'." : "Strong CTA present.",
                  },
                  {
                    pass: !!shortBioAnalysis.hasEmoji,
                    label: "Emoji Usage",
                    tip: !shortBioAnalysis.hasEmoji ? "Add 1-2 relevant emojis to increase bio engagement and visual appeal." : "Emojis detected — great for engagement.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-3.5 rounded-xl border ${item.pass ? "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30" : "border-amber-200 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30"}`}>
                    {item.pass ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                    )}
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{item.tip}</p>
                    </div>
                  </div>
                ))}

                {/* Short bio preview */}
                {customBio.length > SHORT_BIO_LIMIT && (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-1.5">
                      How it appears in Facebook Search Results (first 101 chars):
                    </p>
                    <p className="text-sm text-slate-800 dark:text-slate-200">
                      "{customBio.slice(0, 101).trim()}..."
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
