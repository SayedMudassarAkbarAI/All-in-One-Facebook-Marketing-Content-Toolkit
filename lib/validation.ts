import { z } from "zod";

export const ContentGenSchema = z.object({
  topic: z.string().min(2, "Topic must be at least 2 characters").max(500, "Topic too long"),
  tone: z.enum(["professional", "casual", "engaging", "humorous", "urgent", "storytelling"]).default("engaging"),
  niche: z.string().optional(),
  targetAudience: z.string().optional(),
  count: z.number().int().min(1).max(10).default(3),
  includeEmojis: z.boolean().default(true),
  includeHashtags: z.boolean().default(true),
  callToAction: z.string().optional(),
});

export const SeoAnalyzerSchema = z.object({
  text: z.string().min(5, "Content to analyze must be at least 5 characters").max(5000),
  focusKeyword: z.string().optional(),
});

export const AdsCalculatorSchema = z.object({
  revenueGoal: z.number().positive("Revenue goal must be greater than 0"),
  averageOrderValue: z.number().positive("Average order value must be greater than 0"),
  conversionRatePercent: z.number().min(0.01).max(100),
  estimatedCpc: z.number().positive("Estimated CPC must be greater than 0"),
});

export const RoasCalculatorSchema = z.object({
  adSpend: z.number().positive("Ad spend must be greater than 0"),
  revenue: z.number().min(0, "Revenue cannot be negative"),
  profitMarginPercent: z.number().min(1).max(100).optional(),
});

export const CpcCpmCtrSchema = z.object({
  impressions: z.number().int().positive().optional(),
  clicks: z.number().int().positive().optional(),
  spend: z.number().positive().optional(),
});
