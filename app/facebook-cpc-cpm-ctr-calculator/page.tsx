"use client";

import React, { useState, useMemo } from "react";
import { PieChart, DollarSign, MousePointer, Eye, Info } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

type InputMode = "spend-clicks" | "spend-impressions" | "clicks-impressions";

export default function FacebookCpcCpmCtrCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-cpc-cpm-ctr-calculator")!;

  const [spend, setSpend] = useState<number | "">(500);
  const [clicks, setClicks] = useState<number | "">(400);
  const [impressions, setImpressions] = useState<number | "">(50000);
  const [inputMode, setInputMode] = useState<InputMode>("spend-clicks");

  const metrics = useMemo(() => {
    const s = Number(spend) || 0;
    const cl = Number(clicks) || 0;
    const im = Number(impressions) || 0;

    const cpc = cl > 0 ? s / cl : 0; // Cost Per Click
    const cpm = im > 0 ? (s / im) * 1000 : 0; // Cost Per Mille
    const ctr = im > 0 ? (cl / im) * 100 : 0; // Click-Through Rate
    const cpa = cl > 0 ? s / cl : 0; // placeholder CPA
    const rpc = s > 0 && cl > 0 ? cl / s : 0; // Clicks per dollar

    // Benchmark comparisons (Facebook 2025 averages)
    const avgCpc = 1.25;
    const avgCpm = 8.5;
    const avgCtr = 0.9;

    return {
      cpc,
      cpm,
      ctr,
      rpc,
      cpcVsAvg: cpc > 0 ? ((cpc - avgCpc) / avgCpc) * 100 : null,
      cpmVsAvg: cpm > 0 ? ((cpm - avgCpm) / avgCpm) * 100 : null,
      ctrVsAvg: ctr > 0 ? ((ctr - avgCtr) / avgCtr) * 100 : null,
    };
  }, [spend, clicks, impressions]);

  const benchmarkLabel = (vsAvg: number | null, lowerIsBetter = true) => {
    if (vsAvg === null) return null;
    const better = lowerIsBetter ? vsAvg < 0 : vsAvg > 0;
    const pct = Math.abs(vsAvg).toFixed(0);
    if (better) return { text: `${pct}% better than average`, color: "text-emerald-600 dark:text-emerald-400" };
    return { text: `${pct}% worse than average`, color: "text-rose-600 dark:text-rose-400" };
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter any two known metrics: Ad Spend, Clicks, or Impressions.",
        "The calculator instantly computes CPC, CPM, and CTR with benchmark comparisons.",
        "Use the results to identify if your campaign is above or below Facebook's industry averages.",
      ]}
      benefits={[
        "Bidirectional Calculation: Input any combination of Spend, Clicks, or Impressions to derive the third metric.",
        "Live Industry Benchmarks: Compare your CPC, CPM, and CTR against Facebook's 2025 average baselines.",
        "Campaign Health Signals: Instant color-coded ratings show whether your metrics signal a healthy or struggling campaign.",
        "No Signup Required: Unlimited calculations, zero data stored.",
      ]}
      tips={[
        "A CTR below 0.5% typically signals weak creative or poor audience targeting. Test new ad visuals before increasing budget.",
        "If your CPM is consistently above $15-20, try broadening your audience — overly narrow audiences drive up competition costs.",
        "Target a CPC under $1.00 for top-of-funnel awareness campaigns and under $2.50 for conversion-focused campaigns.",
      ]}
      faqs={[
        {
          question: "What is the average CPC for Facebook Ads in 2025?",
          answer:
            "The average Facebook CPC across all industries in 2025 is approximately $1.00 to $1.50. High-ticket B2B niches and finance verticals can see CPCs of $3.00 to $5.00+, while broad consumer products often stay under $0.80.",
        },
        {
          question: "What is a good CTR for Facebook Ads?",
          answer:
            "A CTR above 1.0% is considered good for Facebook Feed ads. Top-performing creatives frequently achieve 2-4% CTR. CTRs below 0.5% are a clear signal to refresh your creative or refine your audience.",
        },
        {
          question: "What does CPM tell you about your Facebook campaign?",
          answer:
            "CPM (Cost Per 1,000 Impressions) reflects your auction competitiveness. High CPM ($15+) indicates you are in a competitive audience with many advertisers bidding on the same users. Lower CPM ($4-8) usually means you have found an underserved audience.",
        },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-5">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="h-4 w-4 text-blue-600" />
            Enter Your Campaign Data
          </h3>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-800">
            <p className="text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              Enter any known values. All three fields are optional — the calculator derives missing metrics automatically.
            </p>
          </div>

          {[
            {
              label: "Total Ad Spend ($)",
              value: spend,
              setter: setSpend,
              icon: DollarSign,
              prefix: "$",
              hint: "From Meta Ads Manager → Campaigns → Amount Spent",
            },
            {
              label: "Total Clicks (Link Clicks)",
              value: clicks,
              setter: setClicks,
              icon: MousePointer,
              prefix: "#",
              hint: "Use 'Link Clicks' metric for accuracy (not 'All Clicks')",
            },
            {
              label: "Total Impressions",
              value: impressions,
              setter: setImpressions,
              icon: Eye,
              prefix: "#",
              hint: "Number of times your ad was shown",
            },
          ].map((field) => (
            <div key={field.label}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                {field.label}
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <field.icon className="h-4 w-4" />
                </span>
                <input
                  type="number"
                  min="0"
                  value={field.value}
                  onChange={(e) => field.setter(e.target.value === "" ? "" : Math.max(0, Number(e.target.value)))}
                  placeholder="Enter value..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{field.hint}</p>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <PieChart className="h-4 w-4 text-blue-600" />
            Calculated Metrics
          </h3>

          {[
            {
              label: "Cost Per Click (CPC)",
              value: metrics.cpc > 0 ? `$${metrics.cpc.toFixed(3)}` : "—",
              benchmark: benchmarkLabel(metrics.cpcVsAvg, true),
              avgLabel: "Avg $1.25",
              desc: "Average cost paid each time someone clicks your ad",
              goodRange: "< $1.25",
              color: metrics.cpc > 0 && metrics.cpc <= 1.25 ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30" : metrics.cpc > 2.5 ? "border-rose-300 bg-rose-50/60 dark:border-rose-800 dark:bg-rose-950/30" : "border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30",
              valueColor: metrics.cpc > 0 && metrics.cpc <= 1.25 ? "text-emerald-700 dark:text-emerald-300" : metrics.cpc > 2.5 ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300",
            },
            {
              label: "Cost Per Mille (CPM)",
              value: metrics.cpm > 0 ? `$${metrics.cpm.toFixed(2)}` : "—",
              benchmark: benchmarkLabel(metrics.cpmVsAvg, true),
              avgLabel: "Avg $8.50",
              desc: "Cost per 1,000 ad impressions — indicates auction competitiveness",
              goodRange: "$5 – $12",
              color: metrics.cpm > 0 && metrics.cpm <= 12 ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30" : metrics.cpm > 20 ? "border-rose-300 bg-rose-50/60 dark:border-rose-800 dark:bg-rose-950/30" : "border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30",
              valueColor: metrics.cpm > 0 && metrics.cpm <= 12 ? "text-emerald-700 dark:text-emerald-300" : metrics.cpm > 20 ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300",
            },
            {
              label: "Click-Through Rate (CTR)",
              value: metrics.ctr > 0 ? `${metrics.ctr.toFixed(3)}%` : "—",
              benchmark: benchmarkLabel(metrics.ctrVsAvg, false),
              avgLabel: "Avg 0.9%",
              desc: "Percentage of impressions that resulted in a click",
              goodRange: "> 1.0%",
              color: metrics.ctr > 0 && metrics.ctr >= 1.0 ? "border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/30" : metrics.ctr > 0 && metrics.ctr < 0.5 ? "border-rose-300 bg-rose-50/60 dark:border-rose-800 dark:bg-rose-950/30" : "border-amber-300 bg-amber-50/60 dark:border-amber-800 dark:bg-amber-950/30",
              valueColor: metrics.ctr >= 1.0 ? "text-emerald-700 dark:text-emerald-300" : metrics.ctr > 0 && metrics.ctr < 0.5 ? "text-rose-700 dark:text-rose-300" : "text-amber-700 dark:text-amber-300",
            },
          ].map((metric) => (
            <div key={metric.label} className={`rounded-2xl border p-5 ${metric.color}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    {metric.label}
                  </p>
                  <p className={`text-3xl font-extrabold mt-1 ${metric.valueColor}`}>{metric.value}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{metric.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400">Facebook avg</span>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{metric.avgLabel}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Good: {metric.goodRange}</p>
                </div>
              </div>
              {metric.benchmark && (
                <div className={`mt-2 text-xs font-semibold ${metric.benchmark.color}`}>
                  {metric.benchmark.text}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ToolPageLayout>
  );
}
