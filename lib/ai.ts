export interface GeneratePostOptions {
  topic: string;
  tone?: "professional" | "casual" | "engaging" | "humorous" | "urgent" | "storytelling";
  niche?: string;
  targetAudience?: string;
  includeEmojis?: boolean;
  includeHashtags?: boolean;
  callToAction?: string;
}

export interface GeneratedPost {
  headline: string;
  body: string;
  hashtags: string[];
  callToAction: string;
  previewText: string;
}

/**
 * Smart template generation engine delivering instant, high-converting Facebook content
 * without requiring external LLM billing, with seamless plug-and-play LLM expansion.
 */
export const aiEngine = {
  generatePosts(opts: GeneratePostOptions): GeneratedPost[] {
    const topic = opts.topic.trim();
    const tone = opts.tone || "engaging";
    const cta = opts.callToAction || "What are your thoughts on this? Drop a comment below! 👇";

    const baseHashtags = [
      `#${topic.replace(/[^a-zA-Z0-9]/g, "").toLowerCase()}`,
      "#FacebookMarketing",
      "#ContentCreator",
      "#GrowYourPage",
      "#SocialMediaTips",
    ];

    if (tone === "storytelling") {
      return [
        {
          headline: `Honest truth about ${topic}...`,
          body: `A few months ago, I was completely stuck on how to handle ${topic}.\n\nEvery guide online gave the same generic advice. But when we tested things in the real world, everything changed.\n\nHere are 3 key lessons we discovered:\n\n1. Consistency beats intensity every single time.\n2. Understanding your audience's immediate pain point is 90% of the game.\n3. The simplest execution often outperforms complicated strategies.\n\nDon't let overthinking keep you from taking the first step today.`,
          hashtags: baseHashtags,
          callToAction: cta,
          previewText: `Honest truth about ${topic}... A few months ago, I was completely stuck...`,
        },
        {
          headline: `The mistake almost everyone makes with ${topic} 🛑`,
          body: `If you are currently working on ${topic}, stop for a second.\n\nMost people spend 80% of their energy on things that move the needle by 5%.\n\nInstead, focus on:\n👉 Clarifying your unique angle\n👉 Building genuine relationships with your readers\n👉 Showing up daily with high-value insights\n\nSave this post so you can come back to it whenever you feel overwhelmed! 📌`,
          hashtags: baseHashtags,
          callToAction: "Save this post for later and share it with someone who needs to see it! 💬",
          previewText: `The mistake almost everyone makes with ${topic} 🛑`,
        },
      ];
    }

    if (tone === "urgent" || tone === "professional") {
      return [
        {
          headline: `Why ${topic} Matters More Than Ever Right Now 🚀`,
          body: `The digital landscape moves fast, and staying ahead with ${topic} is no longer optional.\n\nKey takeaways industry leaders are paying attention to:\n\n• Efficiency: Streamline your processes before scaling.\n• Audience Trust: Prioritize authenticity over vanity metrics.\n• Actionable Value: Deliver tangible results with every update.\n\nHow is your team adapting to this shift?`,
          hashtags: baseHashtags,
          callToAction: cta,
          previewText: `Why ${topic} Matters More Than Ever Right Now 🚀`,
        },
        {
          headline: `Quick Checklist: Maximizing Your Results With ${topic} ✅`,
          body: `Before you publish your next campaign or update, run through this quick audit:\n\n☑️ Is the main value proposition clear in the first 2 seconds?\n☑️ Did you speak directly to your target audience's core goal?\n☑️ Is the call-to-action frictionless?\n\nKeep it simple. Keep it focused.`,
          hashtags: baseHashtags,
          callToAction: "Bookmark this checklist for your next review! 📑",
          previewText: `Quick Checklist: Maximizing Your Results With ${topic} ✅`,
        },
      ];
    }

    // Default engaging tone
    return [
      {
        headline: `Let's settle this debate: What is your #1 strategy for ${topic}? 🤔`,
        body: `We have been testing different methods all month, and one thing is crystal clear:\n\nThere is no one-size-fits-all formula, but these principles never fail:\n\n✨ Focus on solving a real problem\n✨ Keep your messaging ultra-clear\n✨ Ask questions that invite conversation\n\nIf you could give one piece of advice to a beginner starting with ${topic}, what would it be?`,
        hashtags: baseHashtags,
        callToAction: cta,
        previewText: `Let's settle this debate: What is your #1 strategy for ${topic}? 🤔`,
      },
      {
        headline: `3 Unpopular Truths About ${topic} Nobody Wants to Admit 👀`,
        body: `1. There are no overnight shortcuts — sustainable growth takes dedication.\n2. Fancy tools won't fix a weak core message.\n3. The accounts that succeed are the ones that listen more than they broadcast.\n\nAgree or disagree? Drop a 🔥 if you agree, or tell me why in the comments!`,
        hashtags: baseHashtags,
        callToAction: "Drop your honest reaction below! 👇",
        previewText: `3 Unpopular Truths About ${topic} Nobody Wants to Admit 👀`,
      },
      {
        headline: `The Ultimate Guide to ${topic} (In 60 Seconds) ⚡`,
        body: `Step 1: Define what success looks like for you.\nStep 2: Remove distractions and focus on your top 2 priorities.\nStep 3: Track your numbers every week.\nStep 4: Iterate based on real data, not guesswork.\n\nWhich step do you find the hardest? Let's discuss in the comments!`,
        hashtags: baseHashtags,
        callToAction: cta,
        previewText: `The Ultimate Guide to ${topic} (In 60 Seconds) ⚡`,
      },
    ];
  },

  generateCaptions(topic: string): string[] {
    return [
      `Everything you need to know about ${topic} in one place. 👇`,
      `Stop scrolling if you want to master ${topic} today! 🛑`,
      `The secret to ${topic}? It's simpler than you think. ✨`,
      `Real talk: Is ${topic} actually worth your time in 2025? Here's the breakdown. 💡`,
      `Tag someone who needs a reminder about this today! 👥`,
    ];
  },

  generateHashtags(topic: string): { highVolume: string[]; niche: string[]; branded: string[] } {
    const clean = topic.replace(/[^a-zA-Z0-9]/g, "");
    return {
      highVolume: ["#FacebookMarketing", "#SocialMediaTips", "#DigitalMarketing", "#GrowthHacking", "#Entrepreneur"],
      niche: [`#${clean}Tips`, `#${clean}Strategy`, `#${clean}Hacks`, `#${clean}Guide`, `#Mastering${clean}`],
      branded: ["#FacebookToolkit", "#PageGrowth", "#ContentStrategy2025"],
    };
  },

  generateAdCopy(productOrTopic: string, framework: "AIDA" | "PAS" | "BAB" = "PAS"): {
    framework: string;
    headline: string;
    primaryText: string;
    cta: string;
  }[] {
    if (framework === "AIDA") {
      return [
        {
          framework: "AIDA (Attention, Interest, Desire, Action)",
          headline: `Struggling With ${productOrTopic}? There's a Better Way.`,
          primaryText: `Attention: Stop wasting hours on manual guesswork.\n\nInterest: Leading brands and creators are already leveraging streamlined systems to achieve 3x faster results.\n\nDesire: Imagine saving 10+ hours every week while consistently growing your reach and customer engagement.\n\nAction: Claim your free access today and see the difference immediately!`,
          cta: "Get Started Free",
        },
      ];
    }

    // Default PAS
    return [
      {
        framework: "PAS (Problem, Agitate, Solution)",
        headline: `Tired of slow progress with ${productOrTopic}?`,
        primaryText: `Problem: Managing ${productOrTopic} without the right tools is exhausting and unpredictable.\n\nAgitate: Every hour spent doing manual tasks is an hour taken away from growing your actual business and engaging your community.\n\nSolution: Our all-in-one toolkit automates the tedious work, generates viral ideas, and gives you a proven blueprint for daily consistency.`,
        cta: "Try It Free Today",
      },
      {
        framework: "BAB (Before, After, Bridge)",
        headline: `Transform how you handle ${productOrTopic} forever.`,
        primaryText: `Before: Struggling with low engagement, writer's block, and scattered tools.\n\nAfter: Confidently posting high-converting content every single day with effortless scheduling.\n\nBridge: The All-in-One Facebook Toolkit gives you everything in one dashboard.`,
        cta: "Claim Your Free Access",
      },
    ];
  },
};
