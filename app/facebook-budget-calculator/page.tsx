"use client";

import React, { useState } from "react";
import { DollarSign, TrendingUp, Calculator, PieChart, Sparkles } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

export default function FacebookBudgetCalculatorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-budget-calculator")!;

  const [revenueGoal, setRevenueGoal] = useState<number>(5000);
  const [aov, setAov] = useState<number>(75);
  const [conversionRate, setConversionRate] = useState<number>(2.5);
  const [cpc, setCpc] = useState<number>(1.2);

  // Computed Metrics
  const ordersNeeded = Math.ceil(revenueGoal / (aov || 1));
  const clicksNeeded = Math.ceil(ordersNeeded / ((conversionRate || 1) / 100));
  const estimatedAdSpend = Math.round(clicksNeeded * cpc);
  const estimatedRoas = estimatedAdSpend > 0 ? (revenueGoal / estimatedAdSpend).toFixed(2) : "0";
  const costPerAcquisition = ordersNeeded > 0 ? (estimatedAdSpend / ordersNeeded).toFixed(2) : "0";

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Input your Target Revenue Goal and your Average Order Value (AOV).",
        "Set your estimated Website Conversion Rate (typical e-commerce is 1.5% to 3.5%).",
        "Enter your average Cost Per Click (CPC) to see the exact recommended Facebook Ads budget.",
      ]}
      benefits={[
        "Eliminate guesswork from your Meta Ads planning and campaign budgeting.",
        "Quickly discover how many link clicks and sales you need to hit your revenue targets.",
        "Calculate your target ROAS and maximum acceptable Cost Per Acquisition (CPA).",
      ]}
      tips={[
        "If your calculated budget is too high for your current cash flow, focus on improving your landing page conversion rate or increasing your average order value with bundles.",
        "Test with conservative conversion rates first (e.g. 1.5% - 2%) so you don't underestimate required ad spend.",
      ]}
      faqs={[
        {
          question: "What is an average Facebook Ads CPC in 2025?",
          answer:
            "Average Facebook cost per click typically ranges between $0.80 and $2.50 across most retail, lifestyle, and e-commerce niches. High-ticket B2B and finance niches can exceed $4.00 per click.",
        },
        {
          question: "What is a good target ROAS for Facebook Ads?",
          answer:
            "A ROAS of 3.0x to 4.0x is generally considered healthy for physical e-commerce products (accounting for cost of goods sold and operating expenses). For digital products with higher gross margins, a 2.0x to 2.5x ROAS can be highly profitable.",
        },
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Parameters */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span>Campaign Target Parameters</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Revenue ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="number"
                min={100}
                value={revenueGoal}
                onChange={(e) => setRevenueGoal(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Average Order Value (AOV) ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="number"
                min={1}
                value={aov}
                onChange={(e) => setAov(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Website Conversion Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min={0.1}
                max={100}
                value={conversionRate}
                onChange={(e) => setConversionRate(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Estimated Cost Per Click (CPC) ($)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">$</span>
              <input
                type="number"
                step="0.05"
                min={0.05}
                value={cpc}
                onChange={(e) => setCpc(parseFloat(e.target.value) || 0)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-8 pr-4 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-6 dark:border-blue-900/40 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Recommended Campaign Budget
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                ${estimatedAdSpend.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">total budget</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ~${Math.round(estimatedAdSpend / 30).toLocaleString()} / day (for a 30-day campaign)
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 pt-6 border-t border-blue-200/60 dark:border-slate-800">
            <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Target ROAS</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {estimatedRoas}x
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Cost Per Sale (CPA)</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                ${costPerAcquisition}
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Orders Needed</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {ordersNeeded}
              </p>
            </div>
            <div className="rounded-xl bg-white p-3.5 shadow-sm dark:bg-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Clicks Needed</span>
              <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {clicksNeeded.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
