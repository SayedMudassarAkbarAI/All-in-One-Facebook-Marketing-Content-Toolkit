# Product Requirements Document (PRD)

## 0. Note on Scope & Assumptions

This PRD mirrors the structure of your Pinterest Toolkit PRD/TRD so the two products stay consistent in planning style. Two assumptions are made — flag if either should change:

1. **Branding**: Drafted as a standalone product ("All-in-One Facebook Marketing & Content Toolkit"). If this should carry **SPManchester** attribution like the Pinterest product (e.g., "Facebook Post Generator by SPManchester"), that pattern can be applied identically — Section 9 shows how.
2. **Meta Platform dependency**: Roughly a third of the requested tools (scheduling, page management, comments, Messenger, analytics, ads) require **Facebook Login + Meta Graph API** access, which means **Meta App Review**, a **Business Verification**, and ongoing **Platform Terms compliance**. This is a materially different (and slower/riskier) approval path than the Pinterest toolkit, which needed no OAuth. The MVP phasing in Section 19 separates "no-login" tools (content/image/video generation, SEO helpers, ad-copy/calculators) from "Meta-connected" tools so the product can ship and get traffic before API approval lands.

---

## 1. Product Overview

### Product Name
**All-in-One Facebook Marketing & Content Toolkit**

### Product Positioning
> Free content creation, image & video tools, scheduling, SEO, analytics, and AI tools for Facebook Pages — all in one place.

### Brand Line
> **Create faster. Post smarter. Grow your Page.**

The product should feel like a single, fast utility hub: some tools work instantly with no login (content/image/video generation, calculators, SEO helpers), while a connected suite (scheduling, page management, analytics, ads, comments/Messenger) requires linking a Facebook Page via Meta Login.

---

## 2. Problem Statement

Facebook Page owners, social media managers, small businesses, and agencies currently need many disconnected tools to:

- Write posts, captions, hashtags, and ad copy.
- Create and edit images and videos for Feed, Stories, and Reels.
- Download and repurpose their own public media.
- Schedule and bulk-publish content across one or more Pages.
- Manage comments, Messenger, and reviews.
- Track reach, engagement, and video performance.
- Plan, budget, and report on Facebook Ads.
- Turn products (for e-commerce sellers) into ready-to-post content.

This toolkit consolidates those workflows into one platform, with AI assistance throughout, so a single person can run a Facebook Page's content operation without stitching together five different apps.

---

## 3. Goals

### Primary Goals
1. Provide free, fast, no-login content/image/video generation tools that drive organic search traffic (same SEO-first playbook as the Pinterest toolkit).
2. Provide a connected suite (via Facebook Login) for scheduling, page management, analytics, and ads for users who want deeper functionality.
3. Build dedicated SEO landing pages per tool.
4. Establish topical authority around "Facebook Page growth / Facebook marketing tools."
5. Create an extensible foundation for AI-generated content, bulk operations, and premium tiers.

### Secondary Goals
- Generate leads for broader digital-agency services (if applicable to the operating company).
- Build an email/user list via free account creation.
- Support future monetization: ads, premium AI credits, Pro/Agency subscriptions, API access.

---

## 4. Target Audience

### Primary
- Facebook Page admins (small business, personal brand)
- Social media managers / freelancers
- Marketing agencies managing multiple Pages
- E-commerce sellers posting products to Facebook
- Content creators repurposing video/image content

### Secondary
- Ad buyers / performance marketers
- Community managers (comments/Messenger heavy)
- Non-profits and local businesses with limited budgets

---

## 5. Core User Journeys

### Journey A — Content Creation (no login required)
Google Search → Tool page (e.g., Caption Generator) → Enter topic/product/URL → Generate post/caption/hashtags → Copy → Post manually on Facebook.

### Journey B — Media Tools (no login required)
Upload or paste public post/video URL → Tool detects media → Edit/convert/resize/download → Use in Facebook post.

### Journey C — Connected Management (Facebook Login required)
Sign up / Connect Facebook Page → Grant permissions → Dashboard shows Page overview → Create/schedule post (with AI-generated copy + edited image) → Bulk-schedule a content calendar → Track performance in Analytics.

### Journey D — Ads Planning (mixed)
Ad Copy/Creative Generator (no login) → Budget/ROAS/CPM calculators (no login) → Connect Ad Account (login) → Campaign report generator (connected).

### Journey E — Downloader (own/public content only)
Paste a **public** Facebook post/video URL the user owns or has rights to → Preview detected media → Select format/quality → Download.

> The downloader must only handle publicly accessible content the requesting user is authorized to use, and must not bypass private access, DRM, authentication, or Meta's platform protections. This mirrors the Pinterest downloader's compliance stance and is a hard constraint, not a nice-to-have (see Section 11).

---

## 6. Product Architecture — Core Modules & Tools

Each numbered tool gets its own indexable URL under `/tools/...` (or flat slugs, TBD in TRD Section 3). "Login" column indicates whether Facebook Login is required.

### 6.1 Content Tools (`/facebook-post-generator`, etc.) — No login

| Tool | URL slug | Core Output |
|---|---|---|
| Facebook Post Generator | `/facebook-post-generator` | Full post draft from topic/keywords |
| Caption Generator | `/facebook-caption-generator` | Short/long caption variants |
| Hashtag Generator | `/facebook-hashtag-generator` | Broad + niche hashtag sets |
| Post Ideas Generator | `/facebook-post-ideas-generator` | Content angle/idea list |
| Ad Copy Generator | `/facebook-ad-copy-generator` | Headline + primary text + CTA variants |
| Product Post Generator | `/facebook-product-post-generator` | Post from product name/URL/specs |
| Story Content Generator | `/facebook-story-content-generator` | Short-form story text/prompts |
| Content Calendar Generator | `/facebook-content-calendar-generator` | Weekly/monthly themed calendar |
| Viral Post Ideas | `/facebook-viral-post-ideas` | Pattern-based high-engagement prompts |
| Emoji Suggestions | `/facebook-emoji-suggestions` | Contextual emoji sets for a caption |
| Urdu ⇄ English Post Converter | `/facebook-post-translator` | Two-way translation/localization of post text |

### 6.2 Image Tools (`/facebook-image-*`) — No login (client-side where possible)

| Tool | URL slug |
|---|---|
| Image Downloader | `/facebook-image-downloader` |
| Image Format Converter | `/facebook-image-converter` |
| Image Resize/Crop | `/facebook-image-resizer` |
| Background Remover | `/facebook-background-remover` |
| Image Enhancer | `/facebook-image-enhancer` |
| Watermark Add/Remove* | `/facebook-watermark-tool` |
| Text on Image | `/facebook-text-on-image` |
| Post Template Maker | `/facebook-post-template-maker` |
| Profile Picture Resizer | `/facebook-profile-picture-resizer` |
| Cover Photo Maker | `/facebook-cover-photo-maker` |
| Story Image Maker | `/facebook-story-image-maker` |
| Thumbnail Maker | `/facebook-thumbnail-maker` |

\* Watermark **removal** is restricted to images the user owns/uploads themselves; it is not offered as a way to strip attribution from third-party content (see Section 11).

### 6.3 Video Tools (`/facebook-video-*`) — No login for editing; downloader is public-URL only

| Tool | URL slug |
|---|---|
| Video Downloader | `/facebook-video-downloader` |
| Video Cutter | `/facebook-video-cutter` |
| Video Converter | `/facebook-video-converter` |
| Video Resize | `/facebook-video-resizer` |
| Video Compressor | `/facebook-video-compressor` |
| Auto Caption/Subtitle Generator | `/facebook-auto-captions` |
| Audio Extractor | `/facebook-audio-extractor` |
| Video Thumbnail Generator | `/facebook-video-thumbnail-generator` |
| Reels Maker | `/facebook-reels-maker` |
| Story Video Maker | `/facebook-story-video-maker` |
| Remove Audio | `/facebook-remove-audio` |
| Voice-over Generator | `/facebook-voiceover-generator` |

### 6.4 Posting & Scheduling — **Facebook Login required**

| Feature | Notes |
|---|---|
| Post Scheduler | Single-post scheduling with preview |
| Auto Posting | Executes queued posts at scheduled time |
| Recurring Posts | Repeat on interval (daily/weekly/custom) |
| Bulk Image/Video/Caption Posting | CSV or in-app bulk queue |
| Bulk Upload | Multi-file upload mapped to a content calendar |
| Monthly Content Calendar view | Drag-and-drop calendar UI |
| Multiple Pages Management | Switch/manage several connected Pages |
| Cross-posting | Same content to multiple connected Pages |
| Scheduled Post Management | Edit/cancel/reorder queued posts |

### 6.5 Facebook Page Management — **Facebook Login required**

Dashboard, follower/engagement overview, comment management, Messenger management, notifications, reviews management, page growth tracking, best-performing posts, viral content tracking.

### 6.6 Facebook SEO — No login (URL/text analysis) 

| Tool | URL slug |
|---|---|
| Facebook SEO Analyzer | `/facebook-seo-analyzer` |
| Page Name Optimization | `/facebook-page-name-optimizer` |
| About/Bio Optimizer | `/facebook-bio-optimizer` |
| Keyword Generator | `/facebook-keyword-generator` |
| Hashtag SEO | `/facebook-hashtag-seo` |
| Post Keyword Analyzer | `/facebook-post-keyword-analyzer` |
| Engagement Score | `/facebook-engagement-score` |
| Audience Keyword Suggestions | `/facebook-audience-keywords` |
| URL/Link Preview Checker | `/facebook-link-preview-checker` |
| Image Alt Text Generator | `/facebook-alt-text-generator` |
| SEO Score | `/facebook-seo-score` |

### 6.7 Analytics — **Facebook Login required**

Reach, impressions, likes, comments, shares, follower growth, video views, watch time, engagement rate, top posts, best posting time, audience insights, export reports (PDF/Excel/CSV).

### 6.8 Facebook Ads Tools — Mixed

| Tool | Login? |
|---|---|
| Ad Campaign Planner | No |
| Ad Copy Generator | No (shared with 6.1) |
| Ad Creative Maker | No |
| Video Ad Maker | No |
| Budget Calculator | No |
| ROAS Calculator | No |
| CPC/CPM/CTR Calculator | No |
| Audience/Targeting Ideas | No |
| Competitor Ad Research | No (public Ad Library data only) |
| Campaign Report Generator | Yes — Marketing API |

### 6.9 AI Tools — No login (shared engine across 6.1/6.6/6.8)

AI Post Generator, AI Caption Generator, AI Ad Generator, AI Hashtag Generator, AI Content Rewriter, AI Image Generator, AI Video Script Generator, AI Product Description, AI Comment Reply Generator, AI Content Planner. These are largely the AI-assisted mode of tools already listed above, exposed as a distinct "AI Tools" hub for discoverability.

### 6.10 Business / E-commerce Tools — No login (input: product name, URL, or image)

Product Post Generator, Product Promotion Post, Sale Post Generator, Offer Post Generator, New Product Announcement, Review → Facebook Post, Order/Delivery Announcement, Discount Campaign Generator, Product Image → Facebook Creative, Product Video → Reel, Product URL → Complete Facebook Post.

---

## 7. Homepage Requirements

### H1
**All-in-One Facebook Marketing & Content Toolkit**

### Hero Copy
> Generate posts, captions, and ads, edit images and video, schedule content, and track performance — all in one free Facebook toolkit.

### Primary CTA
**Explore Free Tools**

### Secondary CTA
**Connect Your Page**

---

## 8. Homepage Sections

1. **Hero** — H1, description, keyword/URL search bar, primary + secondary CTA.
2. **Popular Tools** — 8–10 cards spanning content, image, video, scheduling, SEO, analytics, ads, AI.
3. **How It Works** — 4 steps: Pick a tool → Enter topic/URL or connect Page → Generate/schedule → Copy, download, or publish.
4. **No-Login vs Connected** — clear visual split explaining which tools are instant and which need "Connect Facebook."
5. **Module Directory** — grouped by the 10 categories in Section 6, each linking to its tool cluster page.
6. **Facebook Growth Resources** — guides on Facebook SEO, algorithm changes, posting times, ad benchmarks.
7. **FAQ** — with FAQPage structured data.

---

## 9. Branding Requirements

Every tool page should carry a consistent product name, e.g. **"Facebook Caption Generator"** (or **"Facebook Caption Generator by SPManchester"** if this ships under the same company as the Pinterest toolkit — apply Section 9 of the Pinterest PRD verbatim in that case).

Brand attribution locations: H1, `<title>`, meta description, OG title, footer, About page, Organization schema, tool cards.

---

## 10. Company & Legal Pages

- `/about`
- `/contact`
- `/privacy-policy`
- `/terms`
- `/disclaimer`
- `/copyright`
- `/data-deletion` — **required by Meta Platform Terms** whenever Facebook Login is used; must describe how a user can request deletion of their data, plus a callback URL configured in the Meta App dashboard.
- `/become-a-partner` (optional, if agency-facing)

---

## 11. Meta Platform Compliance Requirements (new vs. Pinterest PRD)

Because roughly a third of the tool set uses Facebook Login/Graph API/Marketing API, the product must additionally commit to:

- **App Review**: `pages_manage_posts`, `pages_read_engagement`, `pages_show_list`, `pages_messaging`, `ads_read`/`ads_management`, etc. each require Meta's App Review before general availability — plan for a multi-week approval cycle per permission, and for Meta requesting a screencast/demo of each use case.
- **Business Verification** on the Meta App, and (for ads permissions) **Advanced Access**.
- **Data Deletion Callback** and a published **Data Use** disclosure.
- **No storage of Page access tokens beyond what's needed**, encrypted at rest, with clear revoke/disconnect flow.
- **Rate limits** imposed by Meta (Graph API call count per app/user) — the product must implement its own client-side throttling on top of Meta's.
- **Downloader/legal**: only a user's own Pages/posts, or content already public and permitted for reuse, are eligible for download; no scraping of other Pages, no DRM/private-content bypass, no watermark-stripping of third-party media.
- **Ad Library** is the only allowed source for "Competitor Ad Research" (Meta's own public, sanctioned dataset) — no scraping competitor Pages directly.

These items should sit in the same place a legal/security checklist sits in the Pinterest TRD (see TRD Section 29), but are called out here because they affect **product scope and phasing**, not just implementation detail.

---

## 12. SEO Strategy

### Primary Topic Cluster
Facebook marketing tools

### Supporting Clusters
Facebook captions & posts, Facebook hashtags, Facebook image tools, Facebook video tools, Facebook scheduling, Facebook SEO, Facebook analytics, Facebook ads, Facebook AI tools, Facebook for e-commerce.

### SEO Landing Pages
Each tool gets a dedicated, indexable page following the content template in TRD Section 31 (H1, intro, tool, how-to, benefits, examples, FAQ, related tools) — never a bare tool UI with no supporting content.

---

## 13. Programmatic SEO

Future niche variants, introduced only after traffic/demand evidence (same discipline as Pinterest PRD Section 13):

```
/facebook-post-ideas/real-estate
/facebook-post-ideas/restaurants
/facebook-caption-generator/fitness
/facebook-hashtag-generator/fashion
```

Initial target: 10–30 high-quality pages; expand based on Search Console data and tool-usage volume, not speculatively.

---

## 14. Internal Linking

Every tool links to its cluster siblings (e.g., Caption Generator → Hashtag Generator → Post Ideas → Content Calendar). Connected-suite pages (Scheduler, Analytics) link back to the no-login content tools that feed them, and vice versa, to pull free-tool traffic toward account creation.

---

## 15. Facebook/Organic Traffic Strategy

Publish native Facebook posts and short-form video demoing tool use cases (e.g., "60-second caption in 3 clicks"), driving Facebook users back to the toolkit, mirroring the Pinterest→Article→Tool loop:

**Facebook/Search → Tool → Tool Usage → Related Tool → Sign-up (connected suite) → Return Traffic**

---

## 16. Monetization

MVP remains free for the no-login tool set. Potential revenue:

1. Display advertising on SEO pages.
2. Pro subscription: higher AI limits, bulk scheduling, more connected Pages, advanced analytics export.
3. Agency plan: multi-Page/team access, white-label reports.
4. API access for bulk generation.
5. Paid AI image/video generation credits (compute-intensive tools).
6. Lead generation for a parent agency's services, if applicable.

---

## 17. Analytics (Product Telemetry)

Anonymous product-usage events (distinct from the Facebook Page analytics *feature* in 6.7):

```
page_view, tool_open, content_generated, hashtag_generated,
image_edited, video_edited, download_started, copy_clicked,
facebook_connected, post_scheduled, post_published,
ad_copy_generated, report_exported
```

No unnecessary personal data; Page access tokens and Facebook user data are never sent to product-analytics pipelines.

---

## 18. Performance Requirements

Same bar as the Pinterest toolkit:

- Lighthouse Performance 90+, Accessibility 90+, Best Practices 90+, SEO 95+.
- Mobile-first; heavy media processing (video transcoding, background removal) runs server-side/queued, never blocking the main thread.
- Client-side image/video previews use lazy loading and compressed thumbnails.

---

## 19. MVP Priority

### Phase 1 — No-login Content & SEO Tools (fastest to ship, no Meta approval needed)
Homepage, Facebook Post Generator, Caption Generator, Hashtag Generator, Post Ideas Generator, Ad Copy Generator, Facebook SEO Analyzer, Keyword Generator.

### Phase 2 — No-login Image & Video Tools
Image Resizer, Background Remover, Text on Image, Thumbnail Maker, Video Cutter, Video Converter, Video Compressor, Video Thumbnail Generator.

### Phase 3 — No-login AI, Ads Calculators & Business/E-commerce Tools
AI Content Rewriter, AI Product Description, Budget/ROAS/CPC calculators, Product Post Generator, Offer/Sale/Announcement generators.

### Phase 4 — Meta-Connected Suite (gated on App Review approval)
Facebook Login, Page connection, Post Scheduler, Bulk Posting, Content Calendar, Multiple Pages Management.

### Phase 5 — Analytics, Comments/Messenger, Ads Reporting (deeper permissions)
Analytics dashboard, Comment/Messenger management, Campaign Report Generator (Marketing API), Competitor Ad Research (Ad Library).

### Phase 6 — Premium & Scale
Pro/Agency plans, bulk/API access, saved projects, white-label reporting.

---

## 20. Success Metrics

### SEO
Indexed pages, organic impressions/clicks, average ranking, non-branded traffic share.

### Product
Tool usage per module, generation count, downloads, copy actions, Facebook connections, posts scheduled, returning users.

### Business
Sign-ups, Pro conversions, agency leads, ad-revenue RPM (if applicable), partner-page visits (if applicable).

---

## 21. Definition of Done

MVP (Phases 1–3) is complete when:

- All no-login tools work and are indexable with unique SEO content.
- Mobile UX is polished; Core Web Vitals pass.
- Metadata + structured data implemented site-wide.
- Sitemap/robots configured.
- Internal linking across modules works.
- Product analytics events fire correctly.
- Legal/company pages (including `/data-deletion`) exist ahead of any Meta App submission.
- No secrets exposed client-side.
- Vercel/GitHub production pipeline is green.

Connected suite (Phases 4–5) is additionally complete when:

- Meta App Review is approved for the required permission set.
- Facebook Login, token storage/encryption, and disconnect flow are implemented and tested.
- Scheduling, analytics, and ads reporting operate within Meta's Graph/Marketing API rate limits.
