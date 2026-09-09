"use client";

import React, { useState, useMemo } from "react";
import {
  Hash,
  Sparkles,
  RefreshCw,
  Flame,
  Check,
  Plus,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Layers,
  Copy,
  SlidersHorizontal,
  BookmarkCheck,
} from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";
import { generateSmartHashtags, NICHE_PRESETS, HashtagItem } from "@/lib/hashtags";

export default function FacebookHashtagGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-hashtag-generator")!;

  const [topic, setTopic] = useState("");
  const [selectedNiche, setSelectedNiche] = useState<string>("marketing");
  const [activeTab, setActiveTab] = useState<"all" | "trending" | "niche" | "industry" | "branded">("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([
    "#FacebookMarketing",
    "#DigitalMarketing",
    "#FacebookPageGrowth",
    "#MetaAdsTips",
  ]);
  const [customTagInput, setCustomTagInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyFormat, setCopyFormat] = useState<"space" | "newline" | "clean-dots">("space");
  const [customAddedTags, setCustomAddedTags] = useState<HashtagItem[]>([]);

  // Generated hashtags based on topic and selected niche
  const hashtagData = useMemo(() => {
    const res = generateSmartHashtags(topic || selectedNiche, selectedNiche);
    return {
      ...res,
      items: [...customAddedTags, ...res.items],
    };
  }, [topic, selectedNiche, customAddedTags]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const res = generateSmartHashtags(topic, selectedNiche);
      setSelectedTags(res.recommendedMix);
      setIsGenerating(false);
    }, 300);
  };

  const handleNicheSelect = (nicheId: string) => {
    setSelectedNiche(nicheId);
    setTopic("");
    const res = generateSmartHashtags("", nicheId);
    setSelectedTags(res.recommendedMix);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleAddCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTagInput.trim()) return;
    let formatted = customTagInput.trim();
    if (!formatted.startsWith("#")) formatted = `#${formatted}`;
    formatted = formatted.replace(/[^a-zA-Z0-9#_]/g, "");

    if (formatted.length > 1 && !selectedTags.includes(formatted)) {
      const newItem: HashtagItem = {
        tag: formatted,
        volume: "Niche",
        postsEstimate: "Custom Tag",
        category: "branded",
      };
      setCustomAddedTags((prev) => [newItem, ...prev]);
      setSelectedTags((prev) => [...prev, formatted]);
      setCustomTagInput("");
    }
  };

  const handleSelectAllVisible = () => {
    const visibleTags = filteredItems.map((i) => i.tag);
    setSelectedTags((prev) => Array.from(new Set([...prev, ...visibleTags])));
  };

  const handleClearSelection = () => {
    setSelectedTags([]);
  };

  const handleApplyRecommended = () => {
    setSelectedTags(hashtagData.recommendedMix);
  };

  const triggerConfetti = () => {
    if (typeof window !== "undefined") {
      import("canvas-confetti")
        .then((module) => {
          module.default({
            particleCount: 40,
            spread: 55,
            origin: { y: 0.8 },
          });
        })
        .catch(() => {});
    }
  };

  const filteredItems = useMemo(() => {
    if (activeTab === "all") return hashtagData.items;
    return hashtagData.items.filter((i) => i.category === activeTab);
  }, [activeTab, hashtagData.items]);

  // Formatted string to copy
  const formattedOutput = useMemo(() => {
    if (selectedTags.length === 0) return "";
    if (copyFormat === "newline") {
      return selectedTags.join("\n");
    }
    if (copyFormat === "clean-dots") {
      return `.\n.\n${selectedTags.join(" ")}`;
    }
    return selectedTags.join(" ");
  }, [selectedTags, copyFormat]);

  // Facebook Algorithm health indicator for tag count
  const tagCount = selectedTags.length;
  const countFeedback = useMemo(() => {
    if (tagCount === 0) {
      return {
        level: "empty",
        text: "Select hashtags below to craft your post block.",
        badge: "0 Tags Selected",
        badgeColor: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
      };
    }
    if (tagCount >= 2 && tagCount <= 5) {
      return {
        level: "optimal",
        text: "✨ Optimal Facebook Range! Meta's algorithm heavily favors 2 to 5 highly relevant hashtags without spam penalties.",
        badge: `${tagCount} Tags (Optimal)`,
        badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
      };
    }
    if (tagCount === 1) {
      return {
        level: "low",
        text: "Add 1 to 3 more niche hashtags to broaden your post discoverability.",
        badge: "1 Tag (Add More)",
        badgeColor: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
      };
    }
    if (tagCount <= 8) {
      return {
        level: "warning",
        text: "⚠️ Slightly high for Facebook. While not blocked, 6+ tags may reduce feed click-through rates.",
        badge: `${tagCount} Tags (Borderline)`,
        badgeColor: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
      };
    }
    return {
      level: "danger",
      text: "🚫 Excessive hashtags! Over 8 tags triggers Facebook spam filtering and suppresses post reach. Trim back down to 3-5 tags.",
      badge: `${tagCount} Tags (Too Many)`,
      badgeColor: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800",
    };
  }, [tagCount]);

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Type your post topic or select one of our curated high-converting industry niches.",
        "Filter by Trending (High reach), Niche (Targeted groups), or use our 1-Click Balanced Mix.",
        "Click tags to select, check your live Facebook algorithm health score, and copy directly into your post.",
      ]}
      benefits={[
        "Algorithm-Tuned: Specifically calibrated for Meta's 2025/2026 EdgeRank algorithm rules.",
        "Curated Niche Presets: Instant access to pre-vetted hashtags across 9 top business categories.",
        "Anti-Spam Meter: Real-time warnings prevent reach suppression caused by Instagram-style hashtag stuffing.",
        "Multi-Format Copy: Export as clean inline tags, spaced caption footers, or vertical lists.",
      ]}
      tips={[
        "The 2025 Meta Sweet Spot: 2 to 4 hyper-focused hashtags deliver 23% higher organic reach than posts with 10+ tags.",
        "Placement: Place hashtags at the very bottom of your post body after 2 blank lines, or in the first pinned comment.",
        "Graph Search: Facebook uses hashtags as semantic search filters. Always include at least one broad category tag and one hyper-specific tag.",
      ]}
      faqs={[
        {
          question: "Do hashtags still work on Facebook in 2025?",
          answer:
            "Yes, but they function differently than on Instagram or TikTok. Facebook uses hashtags primarily for topic categorization, search indexing, and grouping public discussions. Moderation is vital: posts with 2 to 5 relevant tags outperform posts with no tags or 10+ spam tags.",
        },
        {
          question: "Why should I avoid using 20-30 hashtags on Facebook?",
          answer:
            "Facebook's news feed ranking algorithm explicitly penalizes spam-like patterns. Unlike Instagram where 10-20 tags were once standard practice, Facebook considers more than 6-8 hashtags as clutter and low-quality engagement bait, resulting in reduced organic impressions.",
        },
        {
          question: "Should I put Facebook hashtags in the post or the first comment?",
          answer:
            "Both strategies work. Putting 2-3 clean hashtags at the very end of your post text helps Facebook index the post immediately upon publication. However, if your caption is already long, dropping them into the first comment keeps your post visually pristine while retaining indexing benefits.",
        },
        {
          question: "What is the recommended hashtag mix for maximum Facebook reach?",
          answer:
            "Our recommended formula is: 1 high-volume broad tag (e.g. #FacebookMarketing) + 2 targeted niche tags (e.g. #SmallBizTips, #ContentStrategy) + 1 brand or community tag. This gives you discovery in broad searches plus high dwell time in targeted feeds.",
        },
      ]}
    >
      <div className="space-y-8">
        {/* Search & Topic Form */}
        <div>
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-sm font-bold text-slate-900 dark:text-white">
              Enter Post Topic, Keyword, or Business Type
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. real estate tips, handmade jewelry, coffee shop, workout routine..."
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
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Generate Hashtags</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Niche Presets */}
          <div className="mt-4">
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Or Explore Popular Industry Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {NICHE_PRESETS.map((preset) => {
                const isActive = selectedNiche === preset.id && !topic;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleNicheSelect(preset.id)}
                    className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span>{preset.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Algorithm Health Meter Banner */}
        <div
          className={`rounded-2xl p-4 transition-all ${
            countFeedback.level === "optimal"
              ? "bg-emerald-50/80 border border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60"
              : countFeedback.level === "danger"
              ? "bg-rose-50/80 border border-rose-200 dark:bg-rose-950/30 dark:border-rose-800/60"
              : countFeedback.level === "warning"
              ? "bg-amber-50/80 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/60"
              : "bg-slate-50 border border-slate-200 dark:bg-slate-800/40 dark:border-slate-800"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              {countFeedback.level === "optimal" ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
              ) : countFeedback.level === "danger" || countFeedback.level === "warning" ? (
                <AlertTriangle
                  className={`h-5 w-5 mt-0.5 shrink-0 ${
                    countFeedback.level === "danger" ? "text-rose-600" : "text-amber-600"
                  }`}
                />
              ) : (
                <Hash className="h-5 w-5 text-slate-400 mt-0.5 shrink-0" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Facebook Algorithm Recommendation
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${countFeedback.badgeColor}`}
                  >
                    {countFeedback.badge}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {countFeedback.text}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={handleApplyRecommended}
                className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 shadow-sm hover:bg-blue-50 dark:border-blue-900 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700"
              >
                <BookmarkCheck className="h-3.5 w-3.5" />
                <span>Apply Optimal 4 Mix</span>
              </button>
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Selected Hashtags Box & Copy Output */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="h-4 w-4 text-blue-600" />
                <span>Selected Post Hashtags ({selectedTags.length})</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Click any tag below to add or remove it from your copy tray.
              </p>
            </div>

            {/* Copy Format Controls */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setCopyFormat("space")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  copyFormat === "space"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Inline Spaced
              </button>
              <button
                type="button"
                onClick={() => setCopyFormat("clean-dots")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  copyFormat === "clean-dots"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Post Footer (..#)
              </button>
              <button
                type="button"
                onClick={() => setCopyFormat("newline")}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${
                  copyFormat === "newline"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Lines
              </button>
            </div>
          </div>

          {/* Selected Chips */}
          {selectedTags.length > 0 ? (
            <div className="flex flex-wrap gap-2 p-3 bg-white rounded-xl border border-slate-200/80 min-h-[58px] items-center dark:bg-slate-900 dark:border-slate-800">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="group inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 hover:bg-rose-50 hover:text-rose-700 cursor-pointer transition-all border border-blue-100 dark:bg-blue-950/60 dark:border-blue-900 dark:text-blue-300 dark:hover:bg-rose-950/60 dark:hover:text-rose-300"
                  title="Click to remove"
                >
                  <span>{tag}</span>
                  <span className="text-blue-400 group-hover:text-rose-500 font-bold ml-0.5">×</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-dashed border-slate-300 dark:bg-slate-900 dark:border-slate-800">
              <p className="text-xs text-slate-400 dark:text-slate-500">
                No hashtags selected. Click any tag from the clusters below to add it.
              </p>
            </div>
          )}

          {/* Copy CTA Action */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Ready to paste into your Facebook post, Reel caption, or comment.
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div onClick={triggerConfetti} className="w-full sm:w-auto">
                <CopyButton
                  textToCopy={formattedOutput}
                  label={selectedTags.length > 0 ? `Copy ${selectedTags.length} Hashtags` : "Copy Tags"}
                  className="w-full sm:w-auto justify-center !bg-blue-600 !text-white !border-blue-600 hover:!bg-blue-700 py-2.5 px-4 font-semibold text-sm shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hashtags Clusters & Filter Tabs */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                All Clusters ({hashtagData.items.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("trending")}
                className={`inline-flex items-center gap-1 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "trending"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                <Flame className="h-3 w-3 text-amber-400" />
                <span>High Volume ({hashtagData.highVolume.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("niche")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "niche"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                Niche & Community ({hashtagData.niche.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("industry")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "industry"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                Authority ({hashtagData.industry.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("branded")}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === "branded"
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
                }`}
              >
                Campaign & Branded
              </button>
            </div>

            {/* Bulk Visible Selection */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAllVisible}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                + Select Visible ({filteredItems.length})
              </button>
            </div>
          </div>

          {/* Hashtag Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredItems.map((item) => {
              const isSelected = selectedTags.includes(item.tag);
              return (
                <div
                  key={item.tag}
                  onClick={() => toggleTag(item.tag)}
                  className={`group relative flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/50 dark:border-blue-500/80 dark:bg-blue-950/40 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3 pr-2 min-w-0">
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-500"
                      }`}
                    >
                      {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </div>
                    <div className="truncate">
                      <p
                        className={`text-sm font-semibold truncate ${
                          isSelected
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-slate-800 dark:text-slate-200"
                        }`}
                      >
                        {item.tag}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span>{item.postsEstimate}</span>
                        <span>•</span>
                        <span className="capitalize">{item.category}</span>
                      </p>
                    </div>
                  </div>

                  {/* Volume Tier Pill */}
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      item.volume === "High"
                        ? "bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300"
                        : item.volume === "Medium"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300"
                        : "bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300"
                    }`}
                  >
                    {item.volume}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Add Custom Tag Form */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={handleAddCustomTag} className="flex flex-col sm:flex-row gap-2.5 max-w-md">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={customTagInput}
                  onChange={(e) => setCustomTagInput(e.target.value)}
                  placeholder="Add custom brand tag (e.g. #MyBrandName)"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={!customTagInput.trim()}
                className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all shrink-0"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Tag</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
