"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Sparkles,
  RefreshCw,
  Clock,
  Download,
  Share2,
  Layers,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";

interface CalendarItem {
  day: string;
  pillar: "Authority & Tips" | "Engagement & Debate" | "Behind The Scenes" | "Social Proof" | "Offer & Promo";
  hook: string;
  captionIdea: string;
  mediaType: "Reel / Short Video" | "Single Photo" | "Carousel" | "Text Card";
  time: string;
}

const PILLAR_COLORS: Record<string, string> = {
  "Authority & Tips": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
  "Engagement & Debate": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
  "Behind The Scenes": "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
  "Social Proof": "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
  "Offer & Promo": "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800",
};

function generateCalendar(niche: string, duration: 7 | 30): CalendarItem[] {
  const n = niche.trim() || "business";
  const days7: CalendarItem[] = [
    {
      day: "Day 1 (Monday)",
      pillar: "Authority & Tips",
      hook: `3 common mistakes people make when starting with ${n}`,
      captionIdea: `Break down 3 frequent pitfalls and give 1 actionable fix for each. Position yourself as the trusted expert.`,
      mediaType: "Carousel",
      time: "8:30 AM",
    },
    {
      day: "Day 2 (Tuesday)",
      pillar: "Engagement & Debate",
      hook: `What is the #1 misconception about ${n}?`,
      captionIdea: `Ask a provocative or conversational question. Ask readers to pick between two common methods.`,
      mediaType: "Text Card",
      time: "1:00 PM",
    },
    {
      day: "Day 3 (Wednesday)",
      pillar: "Behind The Scenes",
      hook: `How we handle [routine task] behind the scenes`,
      captionIdea: `Show the human side of your process. A messy desk, team meeting, or candid work-in-progress photo.`,
      mediaType: "Single Photo",
      time: "11:45 AM",
    },
    {
      day: "Day 4 (Thursday)",
      pillar: "Social Proof",
      hook: `How [client / customer] achieved [desirable result] in 30 days`,
      captionIdea: `Share a mini case study or screenshot of a rave customer review with heartfelt appreciation.`,
      mediaType: "Single Photo",
      time: "2:15 PM",
    },
    {
      day: "Day 5 (Friday)",
      pillar: "Offer & Promo",
      hook: `Ready to get started with ${n} this weekend?`,
      captionIdea: `Highlight your main product, service, or lead magnet. Keep CTA clear: 'Drop a COMMENT or click link below!'`,
      mediaType: "Single Photo",
      time: "10:30 AM",
    },
    {
      day: "Day 6 (Saturday)",
      pillar: "Engagement & Debate",
      hook: `Weekend check-in: Rate your progress this week from 1 to 10`,
      captionIdea: `Casual, low-stress community post. Congratulate people for showing up and resting.`,
      mediaType: "Text Card",
      time: "9:00 AM",
    },
    {
      day: "Day 7 (Sunday)",
      pillar: "Authority & Tips",
      hook: `Weekly Reset: 3 priorities for mastering ${n} this upcoming week`,
      captionIdea: `Inspiring mindset checklist to help your followers plan their upcoming week with clarity.`,
      mediaType: "Reel / Short Video",
      time: "7:30 PM",
    },
  ];

  if (duration === 7) return days7;

  // Generate 30 days by repeating strategic cycles with varied hooks
  const full30: CalendarItem[] = [];
  const cycleCount = Math.ceil(30 / 7);
  for (let i = 0; i < 30; i++) {
    const template = days7[i % 7];
    const weekNum = Math.floor(i / 7) + 1;
    full30.push({
      ...template,
      day: `Day ${i + 1} (Week ${weekNum})`,
      hook: `[Week ${weekNum}] ${template.hook}`,
    });
  }
  return full30;
}

export default function FacebookContentCalendarGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-content-calendar-generator")!;

  const [niche, setNiche] = useState("Social Media Marketing");
  const [duration, setDuration] = useState<7 | 30>(7);
  const [calendar, setCalendar] = useState<CalendarItem[]>(generateCalendar("Social Media Marketing", 7));
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setCalendar(generateCalendar(niche, duration));
      setIsGenerating(false);
    }, 300);
  };

  const handleExportCSV = () => {
    const headers = "Day,Content Pillar,Hook,Caption Idea,Media Format,Best Time\n";
    const rows = calendar
      .map(
        (c) =>
          `"${c.day}","${c.pillar}","${c.hook.replace(/"/g, '""')}","${c.captionIdea.replace(
            /"/g,
            '""'
          )}","${c.mediaType}","${c.time}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `facebook-content-calendar-${duration}days.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fullScheduleText = calendar
    .map((c) => `📅 ${c.day} [${c.pillar}] @ ${c.time}\nFormat: ${c.mediaType}\nHook: ${c.hook}\nAction: ${c.captionIdea}\n`)
    .join("\n");

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your niche, industry, or business model.",
        "Choose between a focused 7-Day sprint or a complete 30-Day monthly strategy.",
        "Generate your schedule, copy individual post concepts, or export the entire plan as a CSV.",
      ]}
      benefits={[
        "Follows the 80/20 Rule: 80% value, education & community engagement, 20% direct promotional offers.",
        "Eliminates guesswork with precise posting times and optimal Facebook media formats.",
        "CSV export allows effortless import into Google Sheets, Notion, or Meta Business Suite.",
        "Balanced content pillars prevent audience fatigue and maximize organic feed ranking.",
      ]}
      tips={[
        "Batch-create your educational carousel and video posts on Sunday so your week runs on autopilot.",
        "Keep Tuesday and Saturday dedicated to questions or polls to keep your Page comment rate high.",
        "Save promotional posts for Thursdays and Fridays when user shopping intent is statistically higher.",
      ]}
      faqs={[
        {
          question: "What are the 5 essential Facebook content pillars?",
          answer:
            "A healthy Facebook marketing strategy rotates between: 1) Authority/Educational, 2) Engagement/Conversational, 3) Behind-The-Scenes, 4) Social Proof/Reviews, and 5) Direct Promotional Offers.",
        },
        {
          question: "Can I import this calendar into Meta Business Suite?",
          answer:
            "Yes! You can export your generated schedule as a CSV or copy post hooks directly into Meta Business Suite to schedule drafts up to 75 days in advance.",
        },
      ]}
    >
      <div className="space-y-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Your Niche, Industry, or Product
              </label>
              <input
                type="text"
                value={niche}
                onChange={(e) => setNiche(e.target.value)}
                placeholder="e.g. Real Estate, Fitness Coaching, Boutique Bakery, SaaS..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                Calendar Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDuration(7)}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                    duration === 7
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  7-Day Sprint
                </button>
                <button
                  type="button"
                  onClick={() => setDuration(30)}
                  className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                    duration === 30
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  30-Day Master
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !niche.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating Strategic Schedule...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Generate {duration}-Day Content Calendar</span>
              </>
            )}
          </button>
        </form>

        {/* Calendar Results */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-blue-600" />
                <span>{duration}-Day Strategic Posting Schedule</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calibrated with high-engagement timing and balanced pillar ratios.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <Download className="h-3.5 w-3.5 text-blue-600" />
                <span>Export CSV</span>
              </button>
              <CopyButton textToCopy={fullScheduleText} label="Copy Full Schedule" />
            </div>
          </div>

          {/* Calendar Day Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calendar.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:border-slate-800 dark:bg-slate-900 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {item.day}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                        PILLAR_COLORS[item.pillar] || "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.pillar}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-2 leading-snug">
                    "{item.hook}"
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 dark:bg-slate-950 dark:border-slate-800/60 mb-3">
                    {item.captionIdea}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-blue-600" />
                    <span>{item.time}</span>
                    <span>•</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{item.mediaType}</span>
                  </div>
                  <CopyButton textToCopy={`[${item.day}] ${item.hook}\n${item.captionIdea}`} label="Copy" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
