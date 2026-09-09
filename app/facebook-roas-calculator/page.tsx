"use client";

import React, { useState } from "react";
import { TrendingUp, DollarSign, Sparkles, Info } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

export default function FacebookRoasCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-roas-calculator")!;

  const [revenue, setRevenue] = useState<number>(5000);
  const [adSpend, setAdSpend] = useState<number>(1250);
  const [cogs, setCogs] = useState<number>(30); // % Cost of Goods Sold
  const [opex, setOpex] = useState<number>(15); // % Operating Expenses

  const roas = adSpend > 0 ? revenue / adSpend : 0;
  const grossProfit = revenue * (1 - cogs / 100);
  const netProfitFromAds = grossProfit - (revenue * (opex / 100)) - adSpend;
  const breakEvenRoas = adSpend > 0 ? adSpend / (revenue * ((100 - cogs - opex) / 100)) : 0;
  const roi = adSpend > 0 ? ((netProfitFromAds / adSpend) * 100) : 0;
  const mer = revenue > 0 ? (adSpend / revenue) * 100 : 0; // Media Efficiency Ratio

  const roasRating = roas >= 4 ? "Outstanding" : roas >= 3 ? "Profitable" : roas >= 2 ? "Break-Even Zone" : roas >= 1 ? "Losing Money" : "Critical";
  const roasColor = roas >= 4 ? "text-emerald-600 dark:text-emerald-400" : roas >= 3 ? "text-blue-600 dark:text-blue-400" : roas >= 2 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400";

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your total revenue generated from Facebook Ads campaigns.",
        "Enter your total Facebook Ad Spend for the same period.",
        "Add your Cost of Goods (COGS %) and operating expenses to get true profitability metrics.",
      ]}
      benefits={[
        "True Profitability: Goes beyond ROAS to calculate net profit after COGS and operating expenses.",
        "Break-Even ROAS: Know exactly the minimum ROAS needed to avoid losing money.",
        "Media Efficiency Ratio: Understand what percentage of your revenue goes back to ad spend.",
        "Instant Scaling Signals: Clear rating system tells you whether to scale, optimize, or pause.",
      ]}
      tips={[
        "A 3x ROAS only means profit if your product margins support it. A 2x ROAS on a 70% margin product is far more profitable than a 4x on a 15% margin product.",
        "Target a ROAS that's 1.5x your break-even ROAS before aggressively scaling budgets.",
        "Track ROAS weekly, not daily — Facebook's attribution window requires 7-day click / 1-day view data to stabilize.",
      ]}
      faqs={[
        {
          question: "What is a good ROAS for Facebook Ads?",
          answer:
            "A 'good' ROAS depends entirely on your profit margins. For physical e-commerce with 30-40% margins, a 3x-4x ROAS is generally profitable. For digital products with 80%+ margins, even a 1.5x-2x ROAS can be highly profitable.",
        },
        {
          question: "What is the difference between ROAS and ROI?",
          answer:
            "ROAS (Return on Ad Spend) measures revenue generated per dollar of ad spend. ROI (Return on Investment) accounts for ALL costs including product, shipping, and operations, giving you the true profit picture. This tool calculates both.",
        },
      ]}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              Campaign Metrics
            </h3>

            {[
              {
                label: "Total Revenue from Facebook Ads ($)",
                value: revenue,
                setter: setRevenue,
                hint: "All revenue attributed to your Facebook / Meta campaigns",
                prefix: "$",
              },
              {
                label: "Total Facebook Ad Spend ($)",
                value: adSpend,
                setter: setAdSpend,
                hint: "Total amount spent in Meta Ads Manager",
                prefix: "$",
              },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {field.label}
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-500">
                    {field.prefix}
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={field.value}
                    onChange={(e) => field.setter(Math.max(0, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-3 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{field.hint}</p>
              </div>
            ))}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                Profitability Inputs
              </h4>

              {[
                {
                  label: `Cost of Goods Sold (COGS): ${cogs}%`,
                  value: cogs,
                  setter: setCogs,
                  hint: "Includes product cost, packaging, and fulfillment",
                },
                {
                  label: `Operating Expenses (OPEX): ${opex}%`,
                  value: opex,
                  setter: setOpex,
                  hint: "Tools, salaries, software, overheads (% of revenue)",
                },
              ].map((field) => (
                <div key={field.label} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {field.label}
                    </label>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={field.value}
                    onChange={(e) => field.setter(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-400 mt-0.5">{field.hint}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Results Dashboard */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              ROAS & Profitability Dashboard
            </h3>

            {/* Primary ROAS Metric */}
            <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/60 p-6 text-center dark:border-blue-800 dark:bg-blue-950/30">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Your Current ROAS
              </p>
              <p className={`text-6xl font-black ${roasColor}`}>
                {roas.toFixed(2)}x
              </p>
              <p className={`text-sm font-bold mt-1 ${roasColor}`}>{roasRating}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                Every $1 spent on ads generated ${roas.toFixed(2)} in revenue
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Break-Even ROAS",
                  value: isFinite(breakEvenRoas) ? `${breakEvenRoas.toFixed(2)}x` : "N/A",
                  sub: "Minimum to not lose money",
                  color: "text-amber-600 dark:text-amber-400",
                },
                {
                  label: "Net Profit from Ads",
                  value: `$${netProfitFromAds.toLocaleString("en-US", { maximumFractionDigits: 0 })}`,
                  sub: "After COGS, OPEX & ad spend",
                  color: netProfitFromAds >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                },
                {
                  label: "ROI on Ad Spend",
                  value: `${roi.toFixed(1)}%`,
                  sub: "Net profit ÷ ad spend",
                  color: roi >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
                },
                {
                  label: "Media Efficiency Ratio",
                  value: `${mer.toFixed(1)}%`,
                  sub: "Ad spend as % of revenue",
                  color: mer <= 30 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400",
                },
              ].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{metric.label}</p>
                  <p className={`text-xl font-extrabold mt-1 ${metric.color}`}>{metric.value}</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{metric.sub}</p>
                </div>
              ))}
            </div>

            {/* Recommendation Box */}
            <div className={`rounded-2xl p-4 border ${
              roas >= 3
                ? "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800"
                : roas >= 2
                ? "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
                : "bg-rose-50 border-rose-200 dark:bg-rose-950/30 dark:border-rose-800"
            }`}>
              <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                Scaling Recommendation
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {roas >= 4
                  ? "🚀 Excellent! Scale your budget by 20-30% every 3-4 days while maintaining creative freshness. A/B test new audiences to find more profitable segments."
                  : roas >= 3
                  ? "✅ Profitable. You can scale incrementally. Test lookalike audiences based on your purchaser list to expand reach efficiently."
                  : roas >= 2
                  ? "⚠️ Near break-even. A/B test new creatives and tighten audience targeting before increasing budget."
                  : "🔴 Pause and optimize. Improve your landing page conversion rate, test different creatives, and narrow audience targeting before resuming spend."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
