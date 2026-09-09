"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Check, Star, AlertCircle } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";

interface PageNameResult {
  name: string;
  score: number;
  rationale: string;
  searchability: "Excellent" | "Good" | "Average";
}

function generatePageNames(brand: string, keyword: string, location: string): PageNameResult[] {
  const b = brand.trim();
  const k = keyword.trim();
  const l = location.trim();

  const results: PageNameResult[] = [];

  if (b && k) {
    results.push({
      name: `${b} | ${k}`,
      score: 95,
      rationale: "Pipe separator clearly delineates brand from keyword. Optimal for Google SERP snippet display.",
      searchability: "Excellent",
    });
    results.push({
      name: `${b} – ${k}${l ? " in " + l : ""}`,
      score: 92,
      rationale: "Em dash creates visual hierarchy. Location modifier adds local SEO benefit.",
      searchability: "Excellent",
    });
    results.push({
      name: `${k} by ${b}`,
      score: 88,
      rationale: "Keyword-first formula ranks higher for service/category searches in Facebook Graph Search.",
      searchability: "Excellent",
    });
    if (l) {
      results.push({
        name: `${b} ${k} ${l}`,
        score: 85,
        rationale: "Full keyword phrase approach. Most likely to match local search intent queries.",
        searchability: "Good",
      });
      results.push({
        name: `${l}'s Best ${k} – ${b}`,
        score: 80,
        rationale: "Hyper-local superlative format drives trust and search clicks.",
        searchability: "Good",
      });
    }
    results.push({
      name: `${b} ${k} Tips & Community`,
      score: 75,
      rationale: "Community signal encourages follows. Good for educational/content pages.",
      searchability: "Good",
    });
    results.push({
      name: `${b} Official`,
      score: 65,
      rationale: "Clean brand-only format. Best if brand name is already a widely-searched keyword.",
      searchability: "Average",
    });
  } else {
    results.push({
      name: `${b || k} Page`,
      score: 60,
      rationale: "Add a primary keyword and/or location to significantly improve searchability.",
      searchability: "Average",
    });
  }

  return results.slice(0, 8);
}

export default function FacebookPageNameOptimizerPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-page-name-optimizer")!;

  const [brand, setBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<PageNameResult[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim() && !keyword.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setResults(generatePageNames(brand, keyword, location));
      setIsGenerating(false);
    }, 300);
  };

  const scoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 75) return "text-blue-600 dark:text-blue-400";
    return "text-amber-600 dark:text-amber-400";
  };

  const searchabilityBadge = (s: string) => {
    if (s === "Excellent") return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800";
    if (s === "Good") return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800";
    return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800";
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your brand or business name and primary service/product keyword.",
        "Optionally add a city or region for local SEO optimization.",
        "Review the ranked Page name suggestions and copy your favorite to use in Facebook Page settings.",
      ]}
      benefits={[
        "Facebook Graph Search: Keyword-rich Page names appear directly in Facebook's internal search suggestions.",
        "Google SERPs: Facebook Pages rank on Google when names match high-volume search queries.",
        "Competitive Edge: Most businesses use brand-only names — adding a keyword puts you ahead of 90% of competitors.",
        "SEO Score System: Every suggestion is ranked with a searchability score and strategic rationale.",
      ]}
      tips={[
        "Your Facebook Page name is a permanent ranking signal — unlike posts, it is indexed by both Facebook and Google at the domain level.",
        "Use the pipe character ( | ) or an em dash ( – ) to cleanly separate brand name from keyword.",
        "Adding a city name dramatically increases local discovery by people searching for services in your area.",
      ]}
      faqs={[
        {
          question: "Can I change my Facebook Page name after it's created?",
          answer:
            "Yes, but Facebook restricts frequent name changes and requires re-approval for Pages with large followings. Pages with fewer than 200 likes can change names freely. Pages above this threshold require Facebook admin review (typically 1-3 days).",
        },
        {
          question: "Does my Facebook Page name affect Google rankings?",
          answer:
            "Yes! Facebook Pages consistently rank on Google's first page for local and brand keyword searches. Including your primary service keyword in your Page name is one of the highest-ROI local SEO actions you can take.",
        },
      ]}
    >
      <div className="space-y-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Brand / Business Name *
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Sunrise Dental, TechFlow, Maria's Bakery"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Keyword / Service *
              </label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Dentist, Web Design, Cupcakes, Plumbing"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                City / Location (Optional)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Austin TX, London, Dubai"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || (!brand.trim() && !keyword.trim())}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Optimizing Page Names...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate Optimized Page Names</span>
              </>
            )}
          </button>
        </form>

        {results.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Ranked Page Name Suggestions (Best to Good)
            </h3>

            <div className="space-y-3">
              {results.map((result, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 p-5 rounded-2xl border ${
                    idx === 0
                      ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30"
                      : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
                  } shadow-sm`}
                >
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    {/* Score Badge */}
                    <div className="shrink-0 flex flex-col items-center">
                      <span className={`text-2xl font-extrabold ${scoreColor(result.score)}`}>
                        {result.score}
                      </span>
                      <span className="text-[10px] text-slate-400">score</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {idx === 0 && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            <Star className="h-2.5 w-2.5" />
                            Top Pick
                          </span>
                        )}
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${searchabilityBadge(result.searchability)}`}>
                          {result.searchability} Searchability
                        </span>
                      </div>

                      <p className="text-base font-bold text-slate-900 dark:text-white truncate">
                        {result.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {result.rationale}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-center sm:self-start pt-1">
                    <CopyButton textToCopy={result.name} label="Copy Name" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
