"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, Send } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";
import { aiEngine, GeneratedPost } from "@/lib/ai";

export default function FacebookPostGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-post-generator")!;

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<"engaging" | "storytelling" | "urgent" | "professional">("engaging");
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [posts, setPosts] = useState<GeneratedPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const generated = aiEngine.generatePosts({
        topic,
        tone,
        includeEmojis,
        includeHashtags,
      });
      setPosts(generated);
      setIsGenerating(false);
    }, 400);
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your post topic, niche, or idea in the text input above.",
        "Choose your desired post tone (Engaging, Storytelling, Urgent Checklist, or Professional).",
        "Click Generate, preview the formatted Facebook posts, and click Copy to publish immediately.",
      ]}
      benefits={[
        "Break through writer's block with battle-tested social copy formulas.",
        "Engineered specifically for the Facebook algorithm: hooks that stop scrolling and questions that spark comment debates.",
        "Includes optimized formatting with spacing, emojis, and relevant hashtags.",
        "100% free with unlimited generations and zero registration required.",
      ]}
      tips={[
        "Keep the first sentence (the hook) under 100 characters so it appears above the 'See More' cutoff.",
        "Always finish with a clear conversational question to increase post comments.",
        "Posts published with native photos or video consistently receive 2-3x higher reach.",
      ]}
      faqs={[
        {
          question: "How long should a Facebook post be for maximum reach?",
          answer:
            "Short posts (1 to 80 words) tend to receive higher engagement rates on mobile devices. However, long-form storytelling posts (150 to 300 words) generate high dwell time and comments, which the Facebook algorithm strongly rewards.",
        },
        {
          question: "Can I use these posts directly on business pages and groups?",
          answer:
            "Yes! The generated content is completely original and suitable for Facebook Pages, Groups, Personal Profiles, and even paid Ad copy.",
        },
        {
          question: "Do hashtags still work on Facebook?",
          answer:
            "Yes, but moderation is key. Unlike Instagram where 10-20 hashtags are common, Facebook posts perform best with 2 to 4 highly relevant, topical hashtags.",
        },
      ]}
    >
      {/* Input Form */}
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
            What is your Facebook post about?
          </label>
          <textarea
            rows={3}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. 5 mindset shifts for new entrepreneurs, announcing our new organic coffee blend, why consistency beats talent..."
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="engaging">Conversational & Engaging (Debates/Questions)</option>
              <option value="storytelling">Storytelling (Before/After & Lessons)</option>
              <option value="urgent">Urgent & Value Checklist</option>
              <option value="professional">Professional & Industry Thought Leader</option>
            </select>
          </div>

          <div className="flex items-center gap-6 pt-5">
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeEmojis}
                onChange={(e) => setIncludeEmojis(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Include Emojis</span>
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Include Hashtags</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !topic.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-50 transition-all"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Crafting Facebook Posts...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Viral Facebook Posts</span>
            </>
          )}
        </button>
      </form>

      {/* Results Display */}
      {posts.length > 0 && (
        <div className="mt-10 space-y-6 border-t border-slate-200 pt-8 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Generated Facebook Posts ({posts.length})
            </h3>
            <span className="text-xs text-slate-400">Ready to copy and publish</span>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {posts.map((post, idx) => {
              const fullCopy = `${post.headline}\n\n${post.body}\n\n${post.callToAction}\n\n${post.hashtags.join(" ")}`;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-200/80 dark:border-slate-800">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Option {idx + 1}
                    </span>
                    <CopyButton textToCopy={fullCopy} label="Copy Post" />
                  </div>

                  <p className="font-bold text-slate-900 dark:text-white text-base">
                    {post.headline}
                  </p>

                  <div className="mt-3 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {post.body}
                  </div>

                  <p className="mt-4 text-sm font-medium text-blue-600 dark:text-blue-400">
                    {post.callToAction}
                  </p>

                  {includeHashtags && (
                    <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                      {post.hashtags.map((h, hIdx) => (
                        <span
                          key={hIdx}
                          className="rounded-lg bg-blue-50 px-2 py-0.5 text-xs text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
