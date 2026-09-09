"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";
import { aiEngine } from "@/lib/ai";

export default function FacebookCaptionGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-caption-generator")!;

  const [topic, setTopic] = useState("");
  const [captions, setCaptions] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const results = aiEngine.generateCaptions(topic);
      setCaptions(results);
      setIsGenerating(false);
    }, 350);
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter what your photo, video, or reel is about.",
        "Click Generate Captions to produce punchy hooks and captions.",
        "Click Copy next to your favorite caption and paste it into Facebook.",
      ]}
      benefits={[
        "Stop readers from scrolling past your media with high-curiosity opening hooks.",
        "Pre-formatted with clean spacing and conversational tone.",
        "Designed specifically for Facebook Feed photos, carousels, and Reels descriptions.",
      ]}
      tips={[
        "The first 3 to 5 words of your caption determine whether a viewer clicks 'See More'.",
        "Include an emoji or directional arrow (👇) pointing towards your link or comments.",
      ]}
      faqs={[
        {
          question: "What makes a good Facebook caption?",
          answer:
            "A great Facebook caption triggers an emotional response or curiosity in the first sentence, provides immediate context, and invites readers to react or comment.",
        },
        {
          question: "Can I use these for Facebook Reels?",
          answer:
            "Yes! In fact, short 1-to-2 sentence punchy captions perform exceptionally well on Facebook Reels.",
        },
      ]}
    >
      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
            Describe your photo, video, or reel
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. behind the scenes of our packaging process, weekend team hiking trip, new product launch..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating || !topic.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Generating Captions...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Facebook Captions</span>
            </>
          )}
        </button>
      </form>

      {captions.length > 0 && (
        <div className="mt-8 space-y-4 border-t border-slate-200 pt-6 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Captions for Your Media ({captions.length})
          </h3>
          <div className="space-y-3">
            {captions.map((cap, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 pr-4">
                  {cap}
                </p>
                <CopyButton textToCopy={cap} label="Copy" />
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
