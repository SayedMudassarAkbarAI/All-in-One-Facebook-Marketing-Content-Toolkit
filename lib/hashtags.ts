export interface HashtagItem {
  tag: string;
  volume: "High" | "Medium" | "Niche";
  postsEstimate: string;
  category: "trending" | "niche" | "industry" | "branded";
}

export interface HashtagResult {
  highVolume: string[];
  niche: string[];
  industry: string[];
  branded: string[];
  recommendedMix: string[];
  items: HashtagItem[];
}

export interface NichePreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  keywords: string[];
  tags: {
    trending: Array<{ tag: string; volume: "High"; postsEstimate: string }>;
    niche: Array<{ tag: string; volume: "Medium"; postsEstimate: string }>;
    industry: Array<{ tag: string; volume: "Niche"; postsEstimate: string }>;
    branded: Array<{ tag: string; volume: "Niche"; postsEstimate: string }>;
  };
}

export const NICHE_PRESETS: NichePreset[] = [
  {
    id: "marketing",
    name: "Marketing & Growth",
    icon: "Megaphone",
    description: "Social media marketing, Facebook Ads, digital growth & content strategy",
    keywords: ["marketing", "social media", "growth", "facebook", "ads", "digital marketing", "seo", "branding"],
    tags: {
      trending: [
        { tag: "#FacebookMarketing", volume: "High", postsEstimate: "4.8M" },
        { tag: "#DigitalMarketing", volume: "High", postsEstimate: "12.4M" },
        { tag: "#SocialMediaTips", volume: "High", postsEstimate: "3.2M" },
        { tag: "#ContentCreator", volume: "High", postsEstimate: "8.9M" },
        { tag: "#MarketingStrategy", volume: "High", postsEstimate: "2.7M" },
      ],
      niche: [
        { tag: "#FacebookPageGrowth", volume: "Medium", postsEstimate: "420K" },
        { tag: "#MetaAdsTips", volume: "Medium", postsEstimate: "310K" },
        { tag: "#SocialMediaManagerLife", volume: "Medium", postsEstimate: "280K" },
        { tag: "#OrganicReachHacks", volume: "Medium", postsEstimate: "190K" },
        { tag: "#FacebookReelsTips", volume: "Medium", postsEstimate: "360K" },
      ],
      industry: [
        { tag: "#B2BMarketingTips", volume: "Niche", postsEstimate: "95K" },
        { tag: "#SmallBizMarketingHacks", volume: "Niche", postsEstimate: "115K" },
        { tag: "#FacebookCommunityBuilding", volume: "Niche", postsEstimate: "78K" },
        { tag: "#AudienceEngagement", volume: "Niche", postsEstimate: "140K" },
      ],
      branded: [
        { tag: "#FacebookMarketingToolkit", volume: "Niche", postsEstimate: "Campaign" },
        { tag: "#GrowthMastery", volume: "Niche", postsEstimate: "Community" },
        { tag: "#ContentHustle", volume: "Niche", postsEstimate: "Challenge" },
      ],
    },
  },
  {
    id: "ecommerce",
    name: "E-Commerce & Retail",
    icon: "ShoppingBag",
    description: "Online store, retail products, handmade items & special offers",
    keywords: ["ecommerce", "shop", "store", "product", "boutique", "retail", "sale", "handmade"],
    tags: {
      trending: [
        { tag: "#ShopSmall", volume: "High", postsEstimate: "7.2M" },
        { tag: "#OnlineBoutique", volume: "High", postsEstimate: "5.1M" },
        { tag: "#SupportSmallBusiness", volume: "High", postsEstimate: "9.4M" },
        { tag: "#RetailTherapy", volume: "High", postsEstimate: "4.3M" },
        { tag: "#ProductLaunch", volume: "High", postsEstimate: "2.1M" },
      ],
      niche: [
        { tag: "#ShopLocalMovement", volume: "Medium", postsEstimate: "580K" },
        { tag: "#HandmadeWithCare", volume: "Medium", postsEstimate: "390K" },
        { tag: "#NewArrivalsDaily", volume: "Medium", postsEstimate: "620K" },
        { tag: "#BoutiqueFashionFinds", volume: "Medium", postsEstimate: "240K" },
        { tag: "#OrderPacking", volume: "Medium", postsEstimate: "410K" },
      ],
      industry: [
        { tag: "#ShopifySellerCommunity", volume: "Niche", postsEstimate: "130K" },
        { tag: "#EcomBrandBuilding", volume: "Niche", postsEstimate: "88K" },
        { tag: "#SmallBusinessOwnerLife", volume: "Niche", postsEstimate: "165K" },
        { tag: "#UnboxingExperience", volume: "Niche", postsEstimate: "92K" },
      ],
      branded: [
        { tag: "#ExclusiveDrop", volume: "Niche", postsEstimate: "Campaign" },
        { tag: "#CustomerFavorites", volume: "Niche", postsEstimate: "Community" },
        { tag: "#FlashSaleFriday", volume: "Niche", postsEstimate: "Weekly" },
      ],
    },
  },
  {
    id: "realestate",
    name: "Real Estate & Homes",
    icon: "Home",
    description: "Realtors, property listings, home staging & mortgage advice",
    keywords: ["real estate", "realtor", "home", "property", "house", "mortgage", "listing", "interior"],
    tags: {
      trending: [
        { tag: "#RealEstate", volume: "High", postsEstimate: "11.2M" },
        { tag: "#RealtorLife", volume: "High", postsEstimate: "4.6M" },
        { tag: "#DreamHome", volume: "High", postsEstimate: "6.8M" },
        { tag: "#HouseHunting", volume: "High", postsEstimate: "3.5M" },
        { tag: "#HomeForSale", volume: "High", postsEstimate: "4.9M" },
      ],
      niche: [
        { tag: "#JustListedProperty", volume: "Medium", postsEstimate: "680K" },
        { tag: "#OpenHouseWeekend", volume: "Medium", postsEstimate: "520K" },
        { tag: "#FirstTimeHomeBuyerTips", volume: "Medium", postsEstimate: "340K" },
        { tag: "#LuxuryRealEstateMarket", volume: "Medium", postsEstimate: "490K" },
        { tag: "#RealEstateInvesting101", volume: "Medium", postsEstimate: "380K" },
      ],
      industry: [
        { tag: "#LocalNeighborhoodGuide", volume: "Niche", postsEstimate: "110K" },
        { tag: "#MortgageRateUpdate", volume: "Niche", postsEstimate: "95K" },
        { tag: "#HomeStagingInspiration", volume: "Niche", postsEstimate: "145K" },
        { tag: "#RealtorAdvice", volume: "Niche", postsEstimate: "82K" },
      ],
      branded: [
        { tag: "#FeaturedListingOfTheWeek", volume: "Niche", postsEstimate: "Series" },
        { tag: "#SoldByTheBest", volume: "Niche", postsEstimate: "Branded" },
        { tag: "#TourWithMe", volume: "Niche", postsEstimate: "Video" },
      ],
    },
  },
  {
    id: "fitness",
    name: "Fitness & Health",
    icon: "Dumbbell",
    description: "Personal training, workouts, nutrition, wellness & gym motivation",
    keywords: ["fitness", "gym", "workout", "health", "nutrition", "wellness", "training", "diet"],
    tags: {
      trending: [
        { tag: "#FitnessMotivation", volume: "High", postsEstimate: "14.1M" },
        { tag: "#WorkoutRoutine", volume: "High", postsEstimate: "5.7M" },
        { tag: "#HealthyLifestyle", volume: "High", postsEstimate: "9.3M" },
        { tag: "#FitnessJourney", volume: "High", postsEstimate: "7.4M" },
        { tag: "#GymMotivation", volume: "High", postsEstimate: "6.1M" },
      ],
      niche: [
        { tag: "#PersonalTrainerTips", volume: "Medium", postsEstimate: "470K" },
        { tag: "#HomeWorkoutChallenge", volume: "Medium", postsEstimate: "590K" },
        { tag: "#StrengthTrainingForBeginners", volume: "Medium", postsEstimate: "320K" },
        { tag: "#HealthyMealPrepIdeas", volume: "Medium", postsEstimate: "640K" },
        { tag: "#DailyFitnessHabits", volume: "Medium", postsEstimate: "280K" },
      ],
      industry: [
        { tag: "#OnlineFitnessCoach", volume: "Niche", postsEstimate: "175K" },
        { tag: "#WeightLossSupportGroup", volume: "Niche", postsEstimate: "140K" },
        { tag: "#FunctionalTraining101", volume: "Niche", postsEstimate: "92K" },
        { tag: "#MindfulNutrition", volume: "Niche", postsEstimate: "115K" },
      ],
      branded: [
        { tag: "#FitChallenge30", volume: "Niche", postsEstimate: "Challenge" },
        { tag: "#TransformationTuesdayFB", volume: "Niche", postsEstimate: "Weekly" },
        { tag: "#TeamFitnessGoals", volume: "Niche", postsEstimate: "Community" },
      ],
    },
  },
  {
    id: "food",
    name: "Food & Restaurants",
    icon: "Utensils",
    description: "Foodies, recipes, dining, culinary tips & local restaurants",
    keywords: ["food", "recipe", "cooking", "restaurant", "chef", "baking", "foodie", "eat", "cafe"],
    tags: {
      trending: [
        { tag: "#FoodieLife", volume: "High", postsEstimate: "8.5M" },
        { tag: "#EasyRecipes", volume: "High", postsEstimate: "6.2M" },
        { tag: "#HomeCooking", volume: "High", postsEstimate: "5.4M" },
        { tag: "#LocalEats", volume: "High", postsEstimate: "3.9M" },
        { tag: "#FoodLoversClub", volume: "High", postsEstimate: "4.7M" },
      ],
      niche: [
        { tag: "#QuickDinnerIdeas", volume: "Medium", postsEstimate: "510K" },
        { tag: "#BakingFromScratch", volume: "Medium", postsEstimate: "430K" },
        { tag: "#ChefSpecialMenu", volume: "Medium", postsEstimate: "290K" },
        { tag: "#ComfortFoodFix", volume: "Medium", postsEstimate: "360K" },
        { tag: "#WeekendBrunchVibes", volume: "Medium", postsEstimate: "480K" },
      ],
      industry: [
        { tag: "#RestaurantOwnerCommunity", volume: "Niche", postsEstimate: "98K" },
        { tag: "#CulinaryInspiration", volume: "Niche", postsEstimate: "135K" },
        { tag: "#FarmToTableMovement", volume: "Niche", postsEstimate: "120K" },
        { tag: "#BehindTheKitchen", volume: "Niche", postsEstimate: "84K" },
      ],
      branded: [
        { tag: "#RecipeOfTheDay", volume: "Niche", postsEstimate: "Daily" },
        { tag: "#TastyBitesClub", volume: "Niche", postsEstimate: "Community" },
        { tag: "#SecretRecipeRevealed", volume: "Niche", postsEstimate: "Series" },
      ],
    },
  },
  {
    id: "tech",
    name: "Tech & AI",
    icon: "Cpu",
    description: "Artificial intelligence, software, gadgets, coding & productivity",
    keywords: ["tech", "ai", "software", "coding", "saas", "gadgets", "developer", "technology"],
    tags: {
      trending: [
        { tag: "#ArtificialIntelligence", volume: "High", postsEstimate: "7.8M" },
        { tag: "#TechTrends", volume: "High", postsEstimate: "4.5M" },
        { tag: "#Innovation", volume: "High", postsEstimate: "6.3M" },
        { tag: "#TechNews", volume: "High", postsEstimate: "3.9M" },
        { tag: "#FutureOfWork", volume: "High", postsEstimate: "2.8M" },
      ],
      niche: [
        { tag: "#AIToolsForBusiness", volume: "Medium", postsEstimate: "460K" },
        { tag: "#ProductivityHacksDaily", volume: "Medium", postsEstimate: "380K" },
        { tag: "#SaaSGrowthTips", volume: "Medium", postsEstimate: "210K" },
        { tag: "#WebDevelopmentLife", volume: "Medium", postsEstimate: "520K" },
        { tag: "#TechStartupsCommunity", volume: "Medium", postsEstimate: "340K" },
      ],
      industry: [
        { tag: "#PromptEngineeringTips", volume: "Niche", postsEstimate: "160K" },
        { tag: "#SoftwareArchitectureDaily", volume: "Niche", postsEstimate: "95K" },
        { tag: "#WorkflowAutomation", volume: "Niche", postsEstimate: "130K" },
        { tag: "#IndieHackerJourney", volume: "Niche", postsEstimate: "105K" },
      ],
      branded: [
        { tag: "#TechTipTuesday", volume: "Niche", postsEstimate: "Weekly" },
        { tag: "#FutureTechInsights", volume: "Niche", postsEstimate: "Series" },
        { tag: "#BuildInPublicMeta", volume: "Niche", postsEstimate: "Community" },
      ],
    },
  },
  {
    id: "finance",
    name: "Finance & Investing",
    icon: "DollarSign",
    description: "Personal finance, budgeting, wealth building, side hustles & crypto",
    keywords: ["finance", "money", "investing", "budget", "wealth", "crypto", "savings", "stocks"],
    tags: {
      trending: [
        { tag: "#PersonalFinance", volume: "High", postsEstimate: "5.6M" },
        { tag: "#FinancialFreedom", volume: "High", postsEstimate: "6.2M" },
        { tag: "#MoneyTips", volume: "High", postsEstimate: "4.1M" },
        { tag: "#Investing101", volume: "High", postsEstimate: "3.7M" },
        { tag: "#WealthBuilding", volume: "High", postsEstimate: "3.3M" },
      ],
      niche: [
        { tag: "#SmartMoneyHabits", volume: "Medium", postsEstimate: "420K" },
        { tag: "#PassiveIncomeStreams", volume: "Medium", postsEstimate: "530K" },
        { tag: "#BudgetingTipsForBeginners", volume: "Medium", postsEstimate: "370K" },
        { tag: "#DebtFreeJourneyCommunity", volume: "Medium", postsEstimate: "490K" },
        { tag: "#SideHustleIdeas2025", volume: "Medium", postsEstimate: "310K" },
      ],
      industry: [
        { tag: "#CompoundInterestMagic", volume: "Niche", postsEstimate: "92K" },
        { tag: "#EmergencyFundGoals", volume: "Niche", postsEstimate: "85K" },
        { tag: "#FinancialLiteracyMatters", volume: "Niche", postsEstimate: "140K" },
        { tag: "#RetirementPlanningTips", volume: "Niche", postsEstimate: "115K" },
      ],
      branded: [
        { tag: "#MoneyMindsetMonday", volume: "Niche", postsEstimate: "Weekly" },
        { tag: "#WealthWisdomSeries", volume: "Niche", postsEstimate: "Series" },
        { tag: "#SaveSmartLiveWell", volume: "Niche", postsEstimate: "Branded" },
      ],
    },
  },
  {
    id: "fashion",
    name: "Fashion & Beauty",
    icon: "Sparkles",
    description: "Outfits, skincare, styling, cosmetics, trends & beauty tutorials",
    keywords: ["fashion", "beauty", "style", "outfit", "skincare", "makeup", "clothing", "hair"],
    tags: {
      trending: [
        { tag: "#StyleInspiration", volume: "High", postsEstimate: "9.6M" },
        { tag: "#OOTD", volume: "High", postsEstimate: "15.4M" },
        { tag: "#FashionTrends", volume: "High", postsEstimate: "7.1M" },
        { tag: "#BeautyHacks", volume: "High", postsEstimate: "4.8M" },
        { tag: "#SkincareRoutine", volume: "High", postsEstimate: "5.2M" },
      ],
      niche: [
        { tag: "#CapsuleWardrobeTips", volume: "Medium", postsEstimate: "380K" },
        { tag: "#CasualChicStyle", volume: "Medium", postsEstimate: "490K" },
        { tag: "#CleanBeautyFavorites", volume: "Medium", postsEstimate: "320K" },
        { tag: "#AffordableFashionFinds", volume: "Medium", postsEstimate: "540K" },
        { tag: "#StreetStyleInspo", volume: "Medium", postsEstimate: "410K" },
      ],
      industry: [
        { tag: "#WardrobeEssentials101", volume: "Niche", postsEstimate: "125K" },
        { tag: "#GlowUpTipsDaily", volume: "Niche", postsEstimate: "160K" },
        { tag: "#SustainableFashionMovement", volume: "Niche", postsEstimate: "145K" },
        { tag: "#MakeupForBeginners", volume: "Niche", postsEstimate: "110K" },
      ],
      branded: [
        { tag: "#StyleOfTheWeek", volume: "Niche", postsEstimate: "Weekly" },
        { tag: "#GlowWithUs", volume: "Niche", postsEstimate: "Community" },
        { tag: "#BeautyFavoritesList", volume: "Niche", postsEstimate: "Monthly" },
      ],
    },
  },
  {
    id: "travel",
    name: "Travel & Hospitality",
    icon: "Compass",
    description: "Vacations, hidden gems, hotels, flights, itineraries & adventure",
    keywords: ["travel", "vacation", "trip", "hotel", "adventure", "wanderlust", "explore", "tourism"],
    tags: {
      trending: [
        { tag: "#TravelGram", volume: "High", postsEstimate: "11.7M" },
        { tag: "#Wanderlust", volume: "High", postsEstimate: "13.2M" },
        { tag: "#TravelTips", volume: "High", postsEstimate: "6.4M" },
        { tag: "#VacationVibes", volume: "High", postsEstimate: "5.8M" },
        { tag: "#ExploreTheWorld", volume: "High", postsEstimate: "4.9M" },
      ],
      niche: [
        { tag: "#HiddenGemsTravel", volume: "Medium", postsEstimate: "450K" },
        { tag: "#BudgetTravelHacks", volume: "Medium", postsEstimate: "530K" },
        { tag: "#WeekendGetawayInspo", volume: "Medium", postsEstimate: "480K" },
        { tag: "#SoloTravelStories", volume: "Medium", postsEstimate: "390K" },
        { tag: "#RoadTripAdventures", volume: "Medium", postsEstimate: "410K" },
      ],
      industry: [
        { tag: "#TravelBucketListGuide", volume: "Niche", postsEstimate: "170K" },
        { tag: "#BoutiqueHotelStays", volume: "Niche", postsEstimate: "95K" },
        { tag: "#LocalTravelGuides", volume: "Niche", postsEstimate: "120K" },
        { tag: "#FamilyTravelTips", volume: "Niche", postsEstimate: "145K" },
      ],
      branded: [
        { tag: "#WanderlustWednesday", volume: "Niche", postsEstimate: "Weekly" },
        { tag: "#TravelGuideSeries", volume: "Niche", postsEstimate: "Series" },
        { tag: "#PostcardsFromEverywhere", volume: "Niche", postsEstimate: "Community" },
      ],
    },
  },
];

/**
 * Generate comprehensive, niche-aware hashtags for Facebook.
 * Ensures compatibility with basic { highVolume, niche, branded } contract
 * while delivering rich volume insights and balanced 2-4 tag recommendation.
 */
export function generateSmartHashtags(query: string, customNicheId?: string): HashtagResult {
  const cleanInput = query.trim().toLowerCase();
  const pascalCase = query
    .trim()
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
  const simpleClean = query.replace(/[^a-zA-Z0-9]/g, "");

  // Match existing preset if applicable
  let matchedPreset = customNicheId
    ? NICHE_PRESETS.find((p) => p.id === customNicheId)
    : undefined;

  if (!matchedPreset && cleanInput) {
    matchedPreset = NICHE_PRESETS.find((preset) =>
      preset.keywords.some((kw) => cleanInput.includes(kw))
    );
  }

  // Base list of items
  const items: HashtagItem[] = [];

  if (matchedPreset) {
    matchedPreset.tags.trending.forEach((t) =>
      items.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "trending" })
    );
    matchedPreset.tags.niche.forEach((t) =>
      items.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "niche" })
    );
    matchedPreset.tags.industry.forEach((t) =>
      items.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "industry" })
    );
    matchedPreset.tags.branded.forEach((t) =>
      items.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "branded" })
    );
  }

  // Generate dynamic custom tags from topic
  if (pascalCase) {
    const dynamicTrending: HashtagItem = {
      tag: `#${pascalCase}`,
      volume: "High",
      postsEstimate: "Trending Topic",
      category: "trending",
    };
    const dynamicNiche1: HashtagItem = {
      tag: `#${pascalCase}Tips`,
      volume: "Medium",
      postsEstimate: "Targeted Niche",
      category: "niche",
    };
    const dynamicNiche2: HashtagItem = {
      tag: `#${pascalCase}Daily`,
      volume: "Medium",
      postsEstimate: "Community Tag",
      category: "niche",
    };
    const dynamicIndustry: HashtagItem = {
      tag: `#${pascalCase}Community`,
      volume: "Niche",
      postsEstimate: "High Engagement",
      category: "industry",
    };
    const dynamicBranded: HashtagItem = {
      tag: `#Mastering${pascalCase}`,
      volume: "Niche",
      postsEstimate: "Campaign Tag",
      category: "branded",
    };

    // Prepend dynamic tags to top of respective clusters
    items.unshift(dynamicTrending, dynamicNiche1, dynamicNiche2, dynamicIndustry, dynamicBranded);
  }

  // Deduplicate by tag name
  const uniqueItems: HashtagItem[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const normalized = item.tag.toLowerCase();
    if (!seen.has(normalized)) {
      seen.add(normalized);
      uniqueItems.push(item);
    }
  }

  // Ensure fallback if empty
  if (uniqueItems.length === 0) {
    const fallbackPreset = NICHE_PRESETS[0];
    fallbackPreset.tags.trending.forEach((t) =>
      uniqueItems.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "trending" })
    );
    fallbackPreset.tags.niche.forEach((t) =>
      uniqueItems.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "niche" })
    );
    fallbackPreset.tags.industry.forEach((t) =>
      uniqueItems.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "industry" })
    );
    fallbackPreset.tags.branded.forEach((t) =>
      uniqueItems.push({ tag: t.tag, volume: t.volume, postsEstimate: t.postsEstimate, category: "branded" })
    );
  }

  const highVolume = uniqueItems.filter((i) => i.volume === "High").map((i) => i.tag);
  const niche = uniqueItems.filter((i) => i.volume === "Medium").map((i) => i.tag);
  const industry = uniqueItems.filter((i) => i.category === "industry").map((i) => i.tag);
  const branded = uniqueItems.filter((i) => i.category === "branded").map((i) => i.tag);

  // Facebook algorithm sweet spot: 1 broad + 2 niche + 1 community (3-4 tags total)
  const recommendedMix = [
    highVolume[0] || `#${simpleClean || "FacebookMarketing"}`,
    niche[0] || `#${simpleClean || "ContentTips"}Tips`,
    niche[1] || `#${simpleClean || "PageGrowth"}Daily`,
    industry[0] || `#${simpleClean || "MetaGrowth"}Community`,
  ].filter(Boolean);

  return {
    highVolume,
    niche,
    industry,
    branded,
    recommendedMix: Array.from(new Set(recommendedMix)),
    items: uniqueItems,
  };
}
