"use client";

import React, { useState } from "react";
import { Search, CheckCircle2, AlertCircle, Sparkles, TrendingUp } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

export default function FacebookSeoAnalyzerPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-seo-analyzer")!;

  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  // Analysis metrics
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;
  const hasQuestion = /[?？]/.test(content);
  const hasHashtags = /#[a-zA-Z0-9_]+/.test(content);
  const hashtagCount = (content.match(/#[a-zA-Z0-9_]+/g) || []).length;
  const hasCallToAction = /(comment|share|like|save|link|below|click|visit|tag)/i.test(content);
  const keywordIncluded = keyword.trim()
    ? content.toLowerCase().includes(keyword.trim().toLowerCase())
    : true;

  // Overall SEO score calculation
  let score = 0;
  if (wordCount >= 20 && wordCount <= 120) score += 25;
  else if (wordCount > 0) score += 15;

  if (hasQuestion) score += 20;
  if (hasCallToAction) score += 25;
  if (hashtagCount >= 2 && hashtagCount <= 5) score += 15;
  else if (hashtagCount > 0) score += 10;
  if (keyword.trim() && keywordIncluded) score += 15;
  else if (!keyword.trim()) score += 15;

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setAnalyzed(true);
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Paste your draft Facebook post, Page bio, or description in the text box.",
        "Optionally enter your target search keyword (e.g. 'Austin Real Estate' or 'Vegan Bakery').",
        "Click Analyze Content to see your SEO score, algorithmic reach factors, and recommendations.",
      ]}
      benefits={[
        "Ensure your posts match how the Facebook Search algorithm indexes content.",
        "Catch missing engagement triggers like questions and calls-to-action before publishing.",
        "Avoid algorithmic penalties from keyword stuffing or excessive hashtags.",
      ]}
      tips={[
        "Place your primary keyword naturally within the first 10-15 words of your post.",
        "Aim for 2 to 4 focused hashtags rather than 10+ spammy tags.",
      ]}
      faqs={[
        {
          question: "Does Facebook have an SEO algorithm like Google?",
          answer:
            "Yes! Meta uses AI-driven semantic search to recommend relevant content to users in Facebook Search, Explore, and Feed recommendations based on keywords, post engagement, and topical authority.",
        },
        {
          question: "What is the best post length for Facebook engagement?",
          answer:
            "For general feed posts, 40 to 80 words strikes the ideal balance between mobile scannability and context. For educational carousels or story posts, 150+ words with spaced paragraphs performs well.",
        },
      ]}
    >
      <form onSubmit={handleAnalyze} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
            Draft Post or Page Content to Audit
          </label>
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your draft Facebook post or copy here..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Target Focus Keyword (Optional)
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. digital marketing tips, organic skincare, small business advice"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={!content.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          <Search className="h-4 w-4" />
          <span>Audit Facebook Post SEO</span>
        </button>
      </form>

      {analyzed && (
        <div className="mt-8 space-y-6 border-t border-slate-200 pt-6 dark:border-slate-800">
          {/* Score Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-slate-50 p-6 dark:bg-slate-950">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Facebook SEO Score
              </span>
              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={`text-4xl font-black ${
                    score >= 80
                      ? "text-emerald-600 dark:text-emerald-400"
                      : score >= 50
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {score}/100
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {score >= 80 ? "Excellent Optimization" : score >= 50 ? "Good — A few tweaks needed" : "Needs Optimization"}
                </span>
              </div>
            </div>

            <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="font-bold text-slate-900 dark:text-white">{wordCount}</span> words
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">{charCount}</span> characters
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white">{hashtagCount}</span> hashtags
              </div>
            </div>
          </div>

          {/* Checklist Audits */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Algorithmic Factors Checklist
            </h4>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5">
                {hasQuestion ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Conversational Question Included
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {hasQuestion ? "Yes (Increases comments)" : "Missing (Add a question)"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-2.5">
                {hasCallToAction ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  Clear Call-to-Action (CTA)
                </span>
              </div>
              <span className="text-xs text-slate-500">
                {hasCallToAction ? "Detected" : "Missing (Add comment/share prompt)"}
              </span>
            </div>

            {keyword.trim() && (
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2.5">
                  {keywordIncluded ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-rose-500" />
                  )}
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    Target Keyword: &quot;{keyword}&quot;
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {keywordIncluded ? "Found in content" : "Not found in text"}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
