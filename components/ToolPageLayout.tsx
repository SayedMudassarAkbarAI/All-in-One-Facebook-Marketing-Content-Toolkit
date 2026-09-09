import React from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, HelpCircle, Sparkles, ArrowRight } from "lucide-react";
import { TOOLS, ToolDefinition } from "@/data/tools";

interface FAQItem {
  question: string;
  answer: string;
}

interface ToolPageLayoutProps {
  tool: ToolDefinition;
  children: React.ReactNode;
  howToUse: string[];
  benefits: string[];
  tips?: string[];
  faqs: FAQItem[];
}

export function ToolPageLayout({
  tool,
  children,
  howToUse,
  benefits,
  tips = [],
  faqs,
}: ToolPageLayoutProps) {
  // Find 3 related tools in the same or complementary category
  const relatedTools = TOOLS.filter(
    (t) => t.id !== tool.id && (t.category === tool.category || t.isPopular)
  ).slice(0, 3);

  return (
    <div className="py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Facebook Tools</span>
        </Link>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{tool.categoryLabel}</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {tool.name}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Interactive Tool Area */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          {children}
        </div>

        {/* How to Use Section */}
        <div className="mt-16 rounded-3xl border border-slate-200/80 bg-slate-50/50 p-8 dark:border-slate-800 dark:bg-slate-900/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            How to Use the {tool.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {howToUse.map((step, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white mb-3">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Tips Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Why Use This Tool?
            </h3>
            <ul className="mt-4 space-y-3">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {tips.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Pro Optimization Tips
              </h3>
              <ul className="mt-4 space-y-3">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                    <Sparkles className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mt-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
            Related Facebook Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((related) => (
              <Link
                key={related.id}
                href={`/${related.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                  {related.name}
                </h4>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {related.description}
                </p>
                <span className="mt-3 inline-flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400">
                  Use Tool <ArrowRight className="ml-1 h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
