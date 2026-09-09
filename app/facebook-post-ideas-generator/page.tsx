"use client";

import React, { useState } from "react";
import {
  Lightbulb,
  Sparkles,
  RefreshCw,
  MessageCircle,
  HelpCircle,
  BarChart2,
  BookOpen,
  Camera,
  Layers,
} from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";

interface PostIdea {
  category: "Question & Debate" | "Behind The Scenes" | "Poll & Choices" | "Value & Tips" | "Story & Lesson";
  title: string;
  prompt: string;
  format: "Text Only" | "Photo + Caption" | "Carousel" | "Reel / Video";
  bestTimeToPost: string;
}

const PRESET_TOPICS = [
  "Small Business Growth",
  "Fitness & Wellness",
  "Real Estate & Homes",
  "E-Commerce Products",
  "Tech & AI Tools",
  "Personal Finance",
  "Food & Cooking",
  "Digital Marketing",
];

function generateIdeas(topic: string): PostIdea[] {
  const t = topic.trim() || "your niche";
  return [
    {
      category: "Question & Debate",
      title: "The Unpopular Opinion Debate",
      prompt: `What is one commonly accepted belief about ${t} that you completely disagree with? Drop your most controversial take below 👇 (Let's keep it friendly!)`,
      format: "Text Only",
      bestTimeToPost: "Tuesday or Thursday afternoon (peak comment hours)",
    },
    {
      category: "Poll & Choices",
      title: "This or That Community Decision",
      prompt: `Quick vote for the community: If you had to choose only ONE when dealing with ${t} in 2025:\n\nOption A: Focus 100% on speed & quick results\nOption B: Focus 100% on long-term perfection\n\nDrop an 'A' or 'B' below!`,
      format: "Photo + Caption",
      bestTimeToPost: "Sunday evening (high mobile feed browsing)",
    },
    {
      category: "Behind The Scenes",
      title: "Raw Truth & Work-in-Progress",
      prompt: `Behind every milestone in ${t}, there are 10 things that didn't go as planned.\n\nHere is a real look at what we're currently building behind the scenes and the biggest lesson this week taught us: [share a quick honest detail].\n\nWhat is one challenge you're navigating right now?`,
      format: "Photo + Caption",
      bestTimeToPost: "Wednesday morning (high authenticity engagement)",
    },
    {
      category: "Value & Tips",
      title: "3 Things I Wish I Knew Sooner",
      prompt: `3 things I wish someone told me before I started with ${t}:\n\n1. [Mistake #1 and how to avoid it]\n2. [Simplification hack that saved hours]\n3. [Mindset shift that made the difference]\n\nBookmark this post so you have it next time you need it! 🔖`,
      format: "Carousel",
      bestTimeToPost: "Monday morning (action-oriented mindset)",
    },
    {
      category: "Story & Lesson",
      title: "The Before-and-After Journey",
      prompt: `12 months ago vs Today with ${t}.\n\nWhere we started: [Describe initial struggle]\nWhat we changed: [The one key shift]\nWhere we are now: [The outcome]\n\nIf you're currently in stage 1, keep going. Consistency is undefeated. Share this with someone who needs a reminder today. ✨`,
      format: "Reel / Video",
      bestTimeToPost: "Friday afternoon (inspirational weekend read)",
    },
    {
      category: "Question & Debate",
      title: "Fill-in-the-Blank Hook",
      prompt: `Complete this sentence in the comments:\n\n"The absolute best advice I ever received regarding ${t} was: _______."\n\nReading and replying to every single response today! 👇`,
      format: "Text Only",
      bestTimeToPost: "Saturday morning (relaxed conversational hours)",
    },
  ];
}

export default function FacebookPostIdeasGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-post-ideas-generator")!;

  const [topic, setTopic] = useState("");
  const [ideas, setIdeas] = useState<PostIdea[]>(generateIdeas("Digital Marketing"));
  const [isGenerating, setIsGenerating] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIdeas(generateIdeas(topic));
      setIsGenerating(false);
    }, 300);
  };

  const handlePresetSelect = (preset: string) => {
    setTopic(preset);
    setIsGenerating(true);
    setTimeout(() => {
      setIdeas(generateIdeas(preset));
      setIsGenerating(false);
    }, 250);
  };

  const filteredIdeas = filterCategory === "all"
    ? ideas
    : ideas.filter((i) => i.category === filterCategory);

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your topic, industry, or business niche, or click one of the quick presets.",
        "Choose an angle filter: Questions, Behind-The-Scenes, Polls, Value Tips, or Stories.",
        "Click Copy next to your favorite post idea and customize the bracketed placeholders.",
      ]}
      benefits={[
        "Never run out of Facebook post concepts again with algorithmic engagement hooks.",
        "Categorized by psychological triggers (curiosity, debate, identity, guidance).",
        "Includes recommended media formats (Text-only colored cards, Photos, Reels, Carousels).",
        "Generates ideas designed specifically to trigger comments—the #1 metric for Facebook feed ranking.",
      ]}
      tips={[
        "Text-only posts on Facebook colored background cards frequently get 2-4x higher comment counts than standard photo posts.",
        "When asking a debate question, respond to the first 5 comments within 15 minutes to trigger the Facebook algorithmic boost.",
        "Use 'Fill in the blank' or 1-word reply prompts for low-friction mobile user engagement.",
      ]}
      faqs={[
        {
          question: "How often should I post on my Facebook business page?",
          answer:
            "1 to 2 high-quality posts per day is optimal for most Facebook Pages. Consistency matters far more than volume: posting once daily with high engagement beats posting 5 times with zero comments.",
        },
        {
          question: "Why do question posts perform so well on Facebook?",
          answer:
            "Facebook's news feed algorithm assigns highest ranking weight to 'meaningful social interactions'—specifically comments and comment replies. Questions invite readers to express their opinion, naturally triggering multiple conversation threads.",
        },
      ]}
    >
      <div className="space-y-8">
        {/* Search Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
              What topic or business do you want post ideas for?
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Lightbulb className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. coffee brewing, real estate investing, boutique clothing, fitness training..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isGenerating}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all shrink-0"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Brainstorming...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Ideas</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Popular Niches:
            </span>
            {PRESET_TOPICS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </form>

        {/* Ideas Grid Section */}
        <div>
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-4 mb-6 border-b border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setFilterCategory("all")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterCategory === "all"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              All Angles ({ideas.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("Question & Debate")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterCategory === "Question & Debate"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              Questions & Debates
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("Poll & Choices")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterCategory === "Poll & Choices"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              Polls & Votes
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("Behind The Scenes")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterCategory === "Behind The Scenes"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              Behind The Scenes
            </button>
            <button
              type="button"
              onClick={() => setFilterCategory("Value & Tips")}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                filterCategory === "Value & Tips"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              Value Lists
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredIdeas.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Camera className="h-3 w-3" />
                      <span>{item.format}</span>
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>

                  <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-100 dark:bg-slate-950/60 dark:border-slate-800/80">
                    <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-mono text-[13px]">
                      {item.prompt}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    🕒 {item.bestTimeToPost}
                  </span>
                  <CopyButton textToCopy={item.prompt} label="Copy Post" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
