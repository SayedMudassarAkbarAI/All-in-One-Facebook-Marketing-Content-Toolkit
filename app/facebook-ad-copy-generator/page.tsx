"use client";

import React, { useState } from "react";
import { Megaphone, Sparkles, RefreshCw, Eye, Check, Globe, ThumbsUp, MessageSquare, Share2 } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";
import { aiEngine } from "@/lib/ai";

export default function FacebookAdCopyGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-ad-copy-generator")!;

  const [productName, setProductName] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [framework, setFramework] = useState<"PAS" | "AIDA" | "BAB">("PAS");
  const [adVariations, setAdVariations] = useState<
    Array<{ framework: string; headline: string; primaryText: string; cta: string }>
  >([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const copies = aiEngine.generateAdCopy(productName, framework);
      setAdVariations(copies);
      setIsGenerating(false);
    }, 350);
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your product, service, or offer name and key value proposition.",
        "Select your copywriting framework: PAS (Problem-Agitate-Solve), AIDA, or BAB.",
        "Click Generate Ad Copy, preview how it renders in the Facebook Feed mockup, and copy components instantly.",
      ]}
      benefits={[
        "Built on proven direct-response frameworks (PAS, AIDA, BAB) that consistently lower CPC.",
        "Generates thumb-stopping hooks that stop users from scrolling past your sponsored ad.",
        "Formatted specifically for Facebook Ad Manager character cutoffs and mobile screens.",
        "100% free with unlimited variations and zero prompt engineering required.",
      ]}
      tips={[
        "Keep your primary text hook in the first 125 characters before the 'See More' cutoff on mobile.",
        "Use high-contrast headlines (5 to 7 words) that promise a specific tangible outcome.",
        "Always match your CTA button with your landing page intent ('Shop Now', 'Learn More', 'Get Offer').",
      ]}
      faqs={[
        {
          question: "Which framework works best for cold traffic on Facebook?",
          answer:
            "PAS (Problem, Agitate, Solution) is generally best for cold audiences because it calls out their immediate pain point first. AIDA works wonderfully for new or visually appealing product launches.",
        },
        {
          question: "How long should Facebook Ad primary text be?",
          answer:
            "Both short copy (under 50 words) and long-form storytelling (150-250 words) work. Short copy tends to win on impulsive e-commerce products, while long-form copy excels for courses, B2B services, and high-ticket offers.",
        },
      ]}
    >
      <div className="space-y-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Product, Offer, or Service Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Ergonomic Office Chair, 1-on-1 Fitness Coaching, All-in-One CRM..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Target Audience or Core Pain Point (Optional)
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. remote workers suffering from back pain, busy moms, local homeowners..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Copywriting Framework
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "PAS", name: "PAS Framework", desc: "Problem • Agitate • Solution (High Conversion)" },
                { id: "AIDA", name: "AIDA Framework", desc: "Attention • Interest • Desire • Action" },
                { id: "BAB", name: "BAB Framework", desc: "Before • After • Bridge (Transformation)" },
              ].map((f) => (
                <div
                  key={f.id}
                  onClick={() => setFramework(f.id as any)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    framework === f.id
                      ? "border-blue-500 bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/40"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{f.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !productName.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating High-Converting Ad Copy...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Facebook Ad Copy</span>
              </>
            )}
          </button>
        </form>

        {/* Ad Mockup & Results */}
        {adVariations.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Generated Facebook Ad Copy Variations ({adVariations.length})
            </h3>

            <div className="space-y-6">
              {adVariations.map((ad, idx) => {
                const fullAdText = `PRIMARY TEXT:\n${ad.primaryText}\n\nHEADLINE: ${ad.headline}\nCTA: ${ad.cta}`;
                return (
                  <div
                    key={idx}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 rounded-2xl border border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/60"
                  >
                    {/* Copy Components Details */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {ad.framework}
                        </span>
                        <CopyButton textToCopy={fullAdText} label="Copy All Ad Copy" />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Primary Text
                          </label>
                          <CopyButton textToCopy={ad.primaryText} label="Copy Text" />
                        </div>
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-800 whitespace-pre-line dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                          {ad.primaryText}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              Headline
                            </label>
                            <CopyButton textToCopy={ad.headline} label="Copy" />
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 dark:bg-slate-950 dark:border-slate-800 dark:text-white truncate">
                            {ad.headline}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                              CTA Button
                            </label>
                            <CopyButton textToCopy={ad.cta} label="Copy" />
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-blue-600 dark:bg-slate-950 dark:border-slate-800 dark:text-blue-400">
                            {ad.cta}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Realistic Facebook Feed Ad Mockup */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <p className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                        <Eye className="h-3.5 w-3.5" />
                        <span>Live Facebook Feed Preview</span>
                      </p>
                      <div className="rounded-xl border border-slate-300 bg-white shadow-sm overflow-hidden text-xs dark:border-slate-700 dark:bg-slate-950">
                        {/* Page Header */}
                        <div className="p-3 flex items-center gap-2.5 border-b border-slate-100 dark:border-slate-800">
                          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                            FB
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 dark:text-white leading-tight">
                              Your Brand Name
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <span>Sponsored</span> • <Globe className="h-2.5 w-2.5 inline" />
                            </p>
                          </div>
                        </div>

                        {/* Ad Body */}
                        <div className="p-3 text-slate-800 dark:text-slate-200 whitespace-pre-line line-clamp-4 leading-relaxed">
                          {ad.primaryText}
                        </div>

                        {/* Media Placeholder */}
                        <div className="h-44 bg-gradient-to-tr from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-400 dark:text-slate-600 font-medium">
                          <span>1200 x 628 Ad Creative</span>
                        </div>

                        {/* Bottom Bar */}
                        <div className="p-3 bg-slate-50 dark:bg-slate-900 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                          <div className="truncate pr-2">
                            <p className="text-[10px] uppercase text-slate-500 tracking-wider">
                              YOURDOMAIN.COM
                            </p>
                            <p className="font-bold text-slate-900 dark:text-white text-xs truncate">
                              {ad.headline}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-lg bg-slate-200 px-3 py-1.5 font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                            {ad.cta}
                          </span>
                        </div>

                        {/* Social Stats */}
                        <div className="px-3 py-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-slate-500 text-[10px]">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3 text-blue-600" /> 142 Likes
                          </span>
                          <span>28 Comments • 14 Shares</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
