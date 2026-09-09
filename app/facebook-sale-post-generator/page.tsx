"use client";

import React, { useState } from "react";
import { Tag, Sparkles, RefreshCw, Flame, Clock, Gift, ShoppingCart } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { CopyButton } from "@/components/CopyButton";
import { TOOLS } from "@/data/tools";

type SaleType = "flash" | "seasonal" | "clearance" | "coupon" | "bundle";

interface SalePost {
  type: string;
  headline: string;
  body: string;
  cta: string;
}

function generateSalePosts(
  saleType: SaleType,
  productOrStore: string,
  discount: string,
  deadline: string,
  couponCode: string
): SalePost[] {
  const p = productOrStore.trim() || "our store";
  const d = discount.trim() || "up to 50%";
  const dl = deadline.trim();
  const cc = couponCode.trim();

  const urgency = dl ? `⏰ This offer expires ${dl}.` : "⏰ Limited time only — don't miss it.";
  const couponLine = cc ? `\n🎟️ Use code: **${cc}** at checkout.` : "";

  if (saleType === "flash") {
    return [
      {
        type: "Countdown Urgency",
        headline: `🔥 FLASH SALE ALERT: ${d} OFF at ${p} — Ends TONIGHT`,
        body: `This is NOT a drill.\n\nFor the next few hours only, you can save ${d} on everything at ${p}.\n\nWe're doing this because we want to make it impossible for you to say "maybe later."\n${couponLine}\n✅ Zero hoops to jump through\n✅ Instant checkout, fast shipping\n✅ Same quality you love — just way less expensive for today\n\n${urgency}\n\nSave this post as your reminder and share with a friend who deserves a deal! 🛒`,
        cta: `Shop the Flash Sale → Link in Bio. Grab yours before it's gone! ⚡`,
      },
      {
        type: "FOMO Quantity Alert",
        headline: `Only a Few Hours Left: ${p} Flash Sale (${d} Off)`,
        body: `Quick heads up to everyone who's been on the fence:\n\nThis ${d} Flash Sale at ${p} closes very soon.\n\nIf you've been waiting for the right time — this is it.\n${couponLine ? couponLine + "\n" : ""}\nDo yourself a favor and grab it before this disappears.\n\n${urgency}\n\nP.S. Tag a friend who needs to know about this deal 👇`,
        cta: `Don't wait — link in bio! ⏳`,
      },
    ];
  }

  if (saleType === "seasonal") {
    return [
      {
        type: "Holiday Celebration",
        headline: `🎉 Our Biggest Sale of the Season: ${d} Off Everything at ${p}`,
        body: `The moment you've been waiting for is officially here.\n\n${p} is celebrating with ${d} off storewide — the deepest discount we've ever offered.\n${couponLine}\nThis is your chance to:\n🎁 Treat yourself to something you've had your eye on\n🎁 Grab gifts for the people you love\n🎁 Stock up on your go-to favorites\n\n${urgency}\n\nNo fancy code needed (we keep it simple). Just head to the link in bio! 🛒`,
        cta: `Shop the Holiday Sale → Link in Bio 🎁`,
      },
      {
        type: "End of Season Clearance",
        headline: `Season's Finale Sale: Up to ${d} Off at ${p} 🏷️`,
        body: `Before we bring in fresh new arrivals, we're making room by slashing prices at ${p}.\n${couponLine}\nThis means incredible deals on everything in our current collection — some items won't be restocked after this.\n\nFavorites from last season + savings of up to ${d}.\n\n${urgency}\n\nSwipe, tap, shop! 🛍️`,
        cta: `Snag your favorites before they're gone → Link in Bio!`,
      },
    ];
  }

  if (saleType === "coupon") {
    return [
      {
        type: "Exclusive Discount Code Drop",
        headline: `🎟️ Secret Discount Code: Save ${d} at ${p} Right Now`,
        body: `Because you follow us, you get access to this exclusive discount before anyone else.\n\nHere's all you need:\n\n${cc ? `👉 CODE: **${cc}**\n👉 Discount: ${d} off\n` : `👉 Discount: ${d} off everything at ${p}\n`}👉 How: Tap the link in bio, add to cart, apply at checkout\n\n${urgency}\n\nShare this with someone who shops with us — they deserve the deal too! 💙`,
        cta: `Use code ${cc || "at link"} at checkout → Link in Bio! 🎉`,
      },
    ];
  }

  if (saleType === "bundle") {
    return [
      {
        type: "Value Bundle Deal",
        headline: `🧡 Get More, Pay Less: ${d} Off Bundles at ${p}`,
        body: `Why buy one when you can get the complete set for less?\n\n${p} is now offering ${d} off our top-selling bundles — handpicked combinations that deliver maximum value.\n${couponLine}\nHere's what's included in our most popular bundle:\n\n📦 [Item 1]\n📦 [Item 2]\n📦 [Item 3]\n\nTotal value: [Original Price] → You pay: [Bundle Price]\n\n${urgency}\n\nBundles are limited. First-come, first-served! 🛒`,
        cta: `Shop the Bundle → Link in Bio! Save ${d} today 💰`,
      },
    ];
  }

  // Clearance
  return [
    {
      type: "Clearance Stock Alert",
      headline: `🚨 Clearance Sale: ${d} Off at ${p} — Stock Won't Last`,
      body: `We're clearing shelves to make room for what's coming next.\n\nThat means ${d} off a huge selection at ${p} — but once it's gone, it's gone.\n${couponLine}\nThis is the lowest pricing we'll ever offer on these items. If you've been considering any of our products, now is genuinely the best time.\n\n${urgency}\n\nPlease share this with friends who shop with us — help them save too! 🙏`,
      cta: `Shop Clearance → Link in Bio while stock lasts! 🏷️`,
    },
    {
      type: "Last Chance Reminder",
      headline: `Last Chance: ${p} Clearance Ends Very Soon (${d} Off)`,
      body: `If you saw our clearance post and thought "I'll do it later" — later is now.\n\nItems are selling out quickly and ${urgency.toLowerCase()}\n${couponLine}\nDon't miss this:\n✅ ${d} off clearance items\n✅ Fast shipping\n✅ Same trusted quality\n\nTag a friend who needs to see this before it's over! 👇`,
      cta: `Tap Link in Bio to shop before it ends! ⏰`,
    },
  ];
}

export default function FacebookSalePostGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-sale-post-generator")!;

  const [saleType, setSaleType] = useState<SaleType>("flash");
  const [productOrStore, setProductOrStore] = useState("");
  const [discount, setDiscount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [posts, setPosts] = useState<SalePost[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productOrStore.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setPosts(generateSalePosts(saleType, productOrStore, discount, deadline, couponCode));
      setIsGenerating(false);
    }, 300);
  };

  const saleTypes: { id: SaleType; label: string; icon: typeof Tag; desc: string }[] = [
    { id: "flash", label: "Flash Sale", icon: Flame, desc: "Urgency-driven time-limited offer" },
    { id: "seasonal", label: "Seasonal Sale", icon: Gift, desc: "Holiday, Black Friday, end-of-season" },
    { id: "coupon", label: "Coupon Drop", icon: Tag, desc: "Exclusive discount code for followers" },
    { id: "bundle", label: "Bundle Deal", icon: ShoppingCart, desc: "Bundled product value offer" },
    { id: "clearance", label: "Clearance", icon: Clock, desc: "Stock liquidation, limited availability" },
  ];

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Select your sale type: Flash Sale, Seasonal Discount, Coupon Drop, Bundle Deal, or Clearance.",
        "Enter your store or product name, discount amount, and optional deadline and coupon code.",
        "Generate urgency-optimized sale posts and copy them directly into your Facebook feed or stories.",
      ]}
      benefits={[
        "Urgency by Design: Every post uses proven scarcity and time-pressure triggers that push fence-sitters to buy.",
        "5 Sale Templates: Flash, Seasonal, Coupon, Bundle, and Clearance — each engineered for its unique buyer psychology.",
        "FOMO-Optimized CTAs: Comment hooks, tagging requests, and deadline reminders combine to maximise both reach and conversions.",
        "No Hard Sell Tone: Conversational, community-friendly language keeps posts feeling human, not like spam.",
      ]}
      tips={[
        "Run Flash Sale posts on Wednesday through Friday evenings (6-9 PM) for peak mobile browsing and impulse purchase timing.",
        "Always include a real deadline — 'ends Sunday at midnight' converts 3x better than 'limited time only'.",
        "Pair your sale post with a Facebook Story (same copy, 9:16 vertical asset) to catch users in the story feed.",
      ]}
      faqs={[
        {
          question: "How many sale posts should I run per promotion?",
          answer:
            "A 3-post sequence works best: Day 1 (Announcement), Day 3 (Reminder), Final Day (Last Chance). Spread these out to create an urgency arc without spamming your followers.",
        },
        {
          question: "Should I boost my Facebook sale posts with paid ads?",
          answer:
            "Yes! Sale posts are excellent candidates for boosting. Start with a $10-20 boost targeting your Page followers and their friends. Once you see strong organic engagement, expand to a warmer custom audience like 'Page Engagers in the past 30 days'.",
        },
      ]}
    >
      <div className="space-y-8">
        <form onSubmit={handleGenerate} className="space-y-5">
          {/* Sale Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Sale Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {saleTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSaleType(type.id)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    saleType === type.id
                      ? "border-blue-600 bg-blue-50/60 dark:border-blue-500 dark:bg-blue-950/40"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                  }`}
                >
                  <type.icon
                    className={`h-4 w-4 mb-1.5 ${saleType === type.id ? "text-blue-600" : "text-slate-500"}`}
                  />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{type.label}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Store / Product Name *
              </label>
              <input
                type="text"
                value={productOrStore}
                onChange={(e) => setProductOrStore(e.target.value)}
                placeholder="e.g. Urban Glow Boutique, ProFit Supplements, TechNest"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Discount Amount
              </label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="e.g. 40%, $20 off, Buy 1 Get 1 Free"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Deadline / Expiry (Optional)
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="e.g. Sunday midnight, September 15th, 11:59 PM EST"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Coupon Code (Optional)
              </label>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="e.g. SAVE40, FLASH20, BUNDLE15"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !productOrStore.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
          >
            {isGenerating ? (
              <><RefreshCw className="h-4 w-4 animate-spin" /><span>Generating Sale Posts...</span></>
            ) : (
              <><Sparkles className="h-4 w-4" /><span>Generate Facebook Sale Posts</span></>
            )}
          </button>
        </form>

        {/* Results */}
        {posts.length > 0 && (
          <div className="space-y-5 pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Sale Post Variants
            </h3>

            {posts.map((post, idx) => {
              const fullPost = `${post.headline}\n\n${post.body}\n\n${post.cta}`;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-700 dark:bg-rose-950/70 dark:text-rose-300">
                      {post.type}
                    </span>
                    <CopyButton textToCopy={fullPost} label="Copy Full Post" />
                  </div>

                  <p className="text-base font-bold text-slate-900 dark:text-white mb-3">{post.headline}</p>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 dark:bg-slate-950/50 dark:border-slate-800">
                    <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                      {post.body}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{post.cta}</p>
                    <CopyButton textToCopy={post.cta} label="Copy CTA" />
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
