"use client";

import React, { useState } from "react";
import { ShoppingBag, Sparkles, RefreshCw, Package, Star, CheckCircle2 } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";

interface ProductPost {
  headline: string;
  body: string;
  cta: string;
}

function generateProductPosts(productName: string, feature: string, benefit: string, price: string, guarantee: string): ProductPost[] {
  const p = productName.trim() || "our product";
  const f = feature.trim() || "premium quality";
  const b = benefit.trim() || "saves you time and money";
  const pr = price.trim();
  const g = guarantee.trim();

  return [
    {
      headline: `✨ Introducing ${p} — The Last Thing You'll Ever Need for ${f}`,
      body: `If you've been looking for a solution that actually works for ${b}, look no further.\n\n${p} was designed from the ground up to deliver exactly that.\n\n🔥 What makes it different:\n✅ ${f}\n✅ ${b}\n✅ No learning curve — start seeing results immediately\n${g ? `\n💪 Backed by our ${g} — absolutely zero risk to you.\n` : ""}${pr ? `\n📦 Now available starting at ${pr}.` : ""}\n\nDrop a "TELL ME MORE" in the comments and we'll send you all the details! 👇`,
      cta: "Comment 'TELL ME MORE' or tap the link below to shop now! 🛒",
    },
    {
      headline: `Stop Settling for Less — ${p} Does What Others Only Promise`,
      body: `Let's be direct: most products in this space overpromise and underdeliver.\n\n${p} was built differently.\n\nHere's what our customers are saying:\n\n⭐ "It literally ${b}. Game changer!" — Sarah M.\n⭐ "The ${f} alone was worth every penny." — James K.\n⭐ "I wish I found this sooner." — Priya D.\n${pr ? `\nInvest in yourself today — starting at just ${pr}.` : ""}\n${g ? `\nAnd if for ANY reason it doesn't work for you? ${g}. That's how confident we are.` : ""}`,
      cta: `Shop ${p} now → Link in bio! 🔗`,
    },
    {
      headline: `The ${f} Problem Is Solved. Meet ${p}.`,
      body: `Quick question: How much time and money have you spent trying to ${b}?\n\nIf the answer is "too much," you're exactly who ${p} was built for.\n\nHere's the 3-step transformation:\n\n1️⃣ [Start using ${p}]\n2️⃣ Experience the ${f} difference immediately\n3️⃣ Enjoy the result: ${b}\n${pr ? `\nAll this starting at just ${pr}.\n` : ""}${g ? `\nRisk-free. ${g}.\n` : ""}\nTag a friend who needs this! 👇`,
      cta: `Limited stock. Shop now before it sells out → [Link in Bio]`,
    },
  ];
}

export default function FacebookProductPromotionPostPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-product-promotion-post")!;

  const [productName, setProductName] = useState("");
  const [feature, setFeature] = useState("");
  const [benefit, setBenefit] = useState("");
  const [price, setPrice] = useState("");
  const [guarantee, setGuarantee] = useState("");
  const [posts, setPosts] = useState<ProductPost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setPosts(generateProductPosts(productName, feature, benefit, price, guarantee));
      setIsGenerating(false);
    }, 350);
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Enter your product name, key feature, and the main benefit it delivers to customers.",
        "Optionally add your price and guarantee offer to strengthen the persuasive hook.",
        "Choose your favorite post variant, customize it, and copy it directly into Facebook.",
      ]}
      benefits={[
        "Feature-Benefit-Offer Framework: Every post follows the proven direct-response sequence that drives purchases.",
        "3 Unique Angles: Review-based social proof, direct value hook, and 3-step transformation narrative.",
        "Guarantee Integration: Automatically weaves your risk reversal into the post body for maximum trust.",
        "Zero Selling Pressure: Posts are conversational, not pushy — perfect for organic Facebook algorithms.",
      ]}
      tips={[
        "Pin your best-performing product post to the top of your Facebook Page for 24/7 storefront visibility.",
        "Add a real customer photo or video with your post — user-generated content increases product post engagement by 68%.",
        "Use 'Comment TELL ME MORE' CTAs to boost comments (Facebook's top ranking signal) before sending the offer link.",
      ]}
      faqs={[
        {
          question: "How often should I post product promotions on Facebook?",
          answer:
            "Follow the 80/20 rule: 80% of your content should educate, entertain, or engage — only 20% should directly promote products. If you post daily, run 1-2 product posts per week to avoid audience fatigue.",
        },
        {
          question: "Should I use Facebook Ads or organic posts for product promotion?",
          answer:
            "Both! Organic product posts build trust and warm audiences. Use the organic version first to gauge natural engagement. When a post gets strong likes and comments, boost it with $5-20/day in paid spend to amplify what's already working.",
        },
      ]}
    >
      <div className="space-y-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. The ProGrip Stand Desk Mat, SkinGlow Vitamin C Serum"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Key Feature (What It Does)
              </label>
              <input
                type="text"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
                placeholder="e.g. anti-slip grip, 48-hour hydration formula"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Benefit (What It Solves)
              </label>
              <input
                type="text"
                value={benefit}
                onChange={(e) => setBenefit(e.target.value)}
                placeholder="e.g. eliminates wrist pain, gives you a dewy glow in 7 days"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Price (Optional)
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. $29, from $49.99, £35"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Guarantee or Risk-Reversal (Optional)
              </label>
              <input
                type="text"
                value={guarantee}
                onChange={(e) => setGuarantee(e.target.value)}
                placeholder="e.g. 30-day full money-back guarantee, free return, lifetime warranty"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !productName.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <><RefreshCw className="h-4 w-4 animate-spin" /><span>Crafting Product Posts...</span></>
            ) : (
              <><Sparkles className="h-4 w-4" /><span>Generate 3 Facebook Product Posts</span></>
            )}
          </button>
        </form>

        {posts.length > 0 && (
          <div className="space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Product Post Variants (Copy & Customize)
            </h3>

            {posts.map((post, idx) => {
              const fullPost = `${post.headline}\n\n${post.body}\n\n${post.cta}`;
              const labels = ["Social Proof & Credibility", "Direct Value Hook", "3-Step Transformation"];
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
                      Variant {idx + 1}: {labels[idx]}
                    </span>
                    <CopyButton textToCopy={fullPost} label="Copy Post" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Headline</p>
                      <p className="text-base font-bold text-slate-900 dark:text-white">{post.headline}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800">
                      <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                        {post.body}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{post.cta}</p>
                      <CopyButton textToCopy={post.cta} label="Copy CTA" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
