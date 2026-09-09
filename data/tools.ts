export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  category: "content" | "image" | "video" | "seo" | "ads" | "business";
  categoryLabel: string;
  description: string;
  icon: string;
  badge?: string;
  isPopular?: boolean;
}

export const TOOLS: ToolDefinition[] = [
  // Content Tools
  {
    id: "post-generator",
    name: "Facebook Post Generator",
    slug: "facebook-post-generator",
    category: "content",
    categoryLabel: "Content & Copy",
    description: "Generate engaging, viral-ready Facebook posts with hooks, storytelling, and questions in seconds.",
    icon: "FileText",
    isPopular: true,
  },
  {
    id: "caption-generator",
    name: "Facebook Caption Generator",
    slug: "facebook-caption-generator",
    category: "content",
    categoryLabel: "Content & Copy",
    description: "Create punchy, thumb-stopping captions tailored for Facebook feed photos, reels, and videos.",
    icon: "MessageSquare",
    isPopular: true,
  },
  {
    id: "hashtag-generator",
    name: "Facebook Hashtag Generator",
    slug: "facebook-hashtag-generator",
    category: "content",
    categoryLabel: "Content & Copy",
    description: "Find the best trending, high-engagement Facebook hashtags grouped by topic and competition.",
    icon: "Hash",
  },
  {
    id: "post-ideas",
    name: "Facebook Post Ideas Generator",
    slug: "facebook-post-ideas-generator",
    category: "content",
    categoryLabel: "Content & Copy",
    description: "End writer's block with unlimited high-engagement post concepts, viral questions, and polls.",
    icon: "Lightbulb",
  },
  {
    id: "ad-copy-generator",
    name: "Facebook Ad Copy Generator",
    slug: "facebook-ad-copy-generator",
    category: "content",
    categoryLabel: "Content & Copy",
    description: "Generate high-converting Facebook ad headlines, primary texts, and CTAs using AIDA & PAS frameworks.",
    icon: "Megaphone",
    isPopular: true,
  },
  {
    id: "content-calendar",
    name: "Facebook Content Calendar Generator",
    slug: "facebook-content-calendar-generator",
    category: "content",
    categoryLabel: "Content & Copy",
    description: "Generate a complete 7-day or 30-day Facebook posting schedule with strategic content pillars.",
    icon: "Calendar",
  },

  // Image Tools
  {
    id: "image-resizer",
    name: "Facebook Image Resizer",
    slug: "facebook-image-resizer",
    category: "image",
    categoryLabel: "Images & Design",
    description: "Resize images to exact Facebook dimensions for Feed (1200x630), Stories (1080x1920), and Covers.",
    icon: "Crop",
    isPopular: true,
  },
  {
    id: "image-converter",
    name: "Facebook Image Converter",
    slug: "facebook-image-converter",
    category: "image",
    categoryLabel: "Images & Design",
    description: "Convert images to WebP, PNG, or high-quality JPEG optimized for Facebook compression algorithms.",
    icon: "RefreshCw",
  },
  {
    id: "text-on-image",
    name: "Facebook Text On Image Tool",
    slug: "facebook-text-on-image",
    category: "image",
    categoryLabel: "Images & Design",
    description: "Add clean, contrast-compliant typography and graphic banners to your Facebook graphics.",
    icon: "Type",
  },
  {
    id: "thumbnail-maker",
    name: "Facebook Thumbnail Maker",
    slug: "facebook-thumbnail-maker",
    category: "image",
    categoryLabel: "Images & Design",
    description: "Design click-worthy Facebook video and link preview thumbnails that command attention in the feed.",
    icon: "Image",
  },

  // Video Tools
  {
    id: "video-cutter",
    name: "Facebook Video Cutter & Trimmer",
    slug: "facebook-video-cutter",
    category: "video",
    categoryLabel: "Video & Reels",
    description: "Trim and slice video clips instantly in your browser without uploading to a server.",
    icon: "Scissors",
    isPopular: true,
  },
  {
    id: "video-thumbnail",
    name: "Facebook Video Thumbnail Generator",
    slug: "facebook-video-thumbnail-generator",
    category: "video",
    categoryLabel: "Video & Reels",
    description: "Extract high-resolution preview frames from any video clip to use as the cover image.",
    icon: "Film",
  },
  {
    id: "remove-audio",
    name: "Facebook Remove Audio from Video",
    slug: "facebook-remove-audio",
    category: "video",
    categoryLabel: "Video & Reels",
    description: "Instantly mute and strip audio tracks from video files for Facebook silent autoplay.",
    icon: "VolumeX",
  },

  // SEO Tools
  {
    id: "seo-analyzer",
    name: "Facebook Page & Post SEO Analyzer",
    slug: "facebook-seo-analyzer",
    category: "seo",
    categoryLabel: "SEO & Growth",
    description: "Analyze post readability, keyword density, and search discoverability for maximum reach.",
    icon: "Search",
    isPopular: true,
  },
  {
    id: "page-name-optimizer",
    name: "Facebook Page Name Optimizer",
    slug: "facebook-page-name-optimizer",
    category: "seo",
    categoryLabel: "SEO & Growth",
    description: "Craft keyword-rich Facebook Page names that rank higher in Meta search and Google SERPs.",
    icon: "Sparkles",
  },
  {
    id: "bio-optimizer",
    name: "Facebook Bio & About Optimizer",
    slug: "facebook-bio-optimizer",
    category: "seo",
    categoryLabel: "SEO & Growth",
    description: "Write compelling, keyword-optimized Facebook Page bios that convert casual visitors into followers.",
    icon: "UserCheck",
  },

  // Ads Calculators
  {
    id: "budget-calculator",
    name: "Facebook Ads Budget Calculator",
    slug: "facebook-budget-calculator",
    category: "ads",
    categoryLabel: "Ads & Calculators",
    description: "Calculate how much ad spend you need to hit your revenue, lead, and sales targets.",
    icon: "DollarSign",
    isPopular: true,
  },
  {
    id: "roas-calculator",
    name: "Facebook ROAS Calculator",
    slug: "facebook-roas-calculator",
    category: "ads",
    categoryLabel: "Ads & Calculators",
    description: "Determine your return on ad spend and find your exact break-even ROAS threshold.",
    icon: "TrendingUp",
  },
  {
    id: "cpc-cpm-ctr-calculator",
    name: "Facebook CPC / CPM / CTR Calculator",
    slug: "facebook-cpc-cpm-ctr-calculator",
    category: "ads",
    categoryLabel: "Ads & Calculators",
    description: "Compute and benchmark cost-per-click, cost-per-mille, and click-through rates effortlessly.",
    icon: "PieChart",
  },

  // Business Tools
  {
    id: "product-post",
    name: "Facebook Product Promotion Post Maker",
    slug: "facebook-product-promotion-post",
    category: "business",
    categoryLabel: "Business & Commerce",
    description: "Turn e-commerce products into persuasive feature-benefit-offer promotional posts.",
    icon: "ShoppingBag",
  },
  {
    id: "sale-post",
    name: "Facebook Sale & Discount Post Generator",
    slug: "facebook-sale-post-generator",
    category: "business",
    categoryLabel: "Business & Commerce",
    description: "Generate urgency-driven flash sale, holiday discount, and clearance announcements.",
    icon: "Tag",
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Tools" },
  { id: "content", label: "Content & AI" },
  { id: "image", label: "Image Tools" },
  { id: "video", label: "Video Tools" },
  { id: "seo", label: "SEO & Optimization" },
  { id: "ads", label: "Ads & Calculators" },
  { id: "business", label: "Business & Commerce" },
];
