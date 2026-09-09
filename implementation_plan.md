# All-in-One Facebook Marketing & Content Toolkit — Implementation Plan

Build and deploy a production-grade web application delivering the complete Facebook content creation, image/video processing, SEO optimization, ads calculators, and Meta-connected management suite as defined in the PRD and TRD. 

The architecture is specifically engineered to deploy on **Vercel** (Next.js 15 App Router + Serverless API routes) with source control, automated testing, and CI/CD pipelines managed via **GitHub**. Heavy or long-running video transcoding tasks utilize a hybrid architecture: fast in-browser WebAssembly processing (`@ffmpeg/ffmpeg`) for lightweight operations, alongside a dedicated containerized worker service for background batch jobs.

---

## User Review Required

> [!IMPORTANT]
> **Vercel Serverless Execution & Video Processing Architecture**:
> Standard Vercel Serverless Functions have payload limits (4.5 MB body limit) and timeout constraints (15s on Hobby, up to 60s–300s on Pro/Fluid). Heavy video transcoding (e.g. 1080p rendering, multi-minute audio extraction, video compression) cannot reliably run inside standard Vercel functions.
> **Solution**:
> 1. **Direct Uploads**: User uploads go directly to cloud storage (Vercel Blob or Cloudflare R2 / AWS S3 via presigned URLs) to bypass Vercel's 4.5 MB request body limit.
> 2. **Client-Side Wasm**: Lightweight video trims, mutes, and thumbnail captures run in-browser using `@ffmpeg/ffmpeg` WebAssembly for instant, zero-latency user results with zero server cost.
> 3. **Worker Service**: Heavy background jobs (e.g., auto-captions, high-res conversion) are dispatched via Redis (Upstash / BullMQ) to a containerized worker hosted on Fly.io, Railway, or Render, communicating status back to Vercel via webhooks.

> [!IMPORTANT]
> **Database & Redis on Vercel**:
> Vercel functions are stateless and ephemeral. Traditional long-lived database connections can exhaust pool limits. We will use:
> - **PostgreSQL**: Neon, Supabase, or Vercel Postgres with connection pooling (PgBouncer) via Prisma Accelerate / Driver Adapters.
> - **Redis**: Upstash Redis (HTTP-based edge client) for rate-limiting, session caching, and BullMQ/QStash for job scheduling.

> [!WARNING]
> **Meta App Review & Sandbox Testing**:
> Meta Graph API permissions (`pages_manage_posts`, `pages_read_engagement`, `ads_read`) require Facebook App Review and Business Verification. 
> To enable immediate launch, the implementation is decoupled into two tiers:
> - **Tier 1 (No-Login Public Tools)**: Shipped and live on Day 1 on Vercel for immediate organic SEO traffic.
> - **Tier 2 (Connected Dashboard & Scheduler)**: Developed and tested end-to-end using a Meta Sandbox/Test App and test users prior to public App Review submission.

---

## Open Questions

1. **Storage Provider**: Would you prefer using **Vercel Blob** for seamless 1-click Vercel dashboard management, or **Cloudflare R2 / AWS S3** for lower bandwidth/storage egress costs?
2. **AI Provider Strategy**: Should we start with the smart rule-based template engine (`lib/ai.ts`) with an optional OpenAI/Anthropic/Gemini API key override, or connect directly to a specific LLM provider from day one?
3. **Scheduled Post Dispatcher on Vercel**: Vercel Cron can ping `/api/cron/publish` every 1–5 minutes to dispatch scheduled posts, or we can use Upstash QStash for precise delayed message triggers. Is Vercel Cron preferred for simplicity?

---

## GitHub & Vercel DevOps Blueprint

### 1. GitHub Repository Setup
- **Repository Structure**:
  - `main` branch: Production branch automatically deployed to Vercel Production (`https://yourdomain.com`).
  - `develop` branch: Staging branch deployed to Vercel Preview environment.
  - Feature branches (`feat/*`, `fix/*`): Create instant ephemeral Vercel Preview URLs on pull requests.
- **GitHub Actions (`.github/workflows/ci.yml`)**:
  - Step 1: Checkout repository & setup Node.js 20.x
  - Step 2: Install dependencies with `npm ci`
  - Step 3: Run ESLint (`npm run lint`)
  - Step 4: Run TypeScript strict check (`npx tsc --noEmit`)
  - Step 5: Run Prisma validation (`npx prisma validate`)
  - Step 6: Run Unit & Integration tests (`npm run test`)
  - Step 7: Run Next.js build verification (`npm run build`)

### 2. Vercel Configuration & Optimizations
- **File**: `vercel.json`
  - Configure function regions, memory allocation, and Cron jobs (`/api/cron/publish`).
  - Configure Security Headers (`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`).
- **Environment Variables**:
  - Grouped into Development, Preview, and Production in the Vercel Project Settings.
  - Variables include: `DATABASE_URL`, `DIRECT_URL`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `META_APP_ID`, `META_APP_SECRET`, `META_WEBHOOK_VERIFY_TOKEN`, `ENCRYPTION_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN`, `AI_API_KEY`.

---

## Proposed Changes

### Phase 1 — Foundation, GitHub Repo & Vercel Project Setup

#### [NEW] Next.js 15 Project Scaffolding
- Initialize Next.js 15 with TypeScript, App Router, Tailwind CSS, and ESLint.
- Configure `next.config.ts`:
  - Remote image patterns for Facebook CDN, User Avatars, and Object Storage.
  - Headers config for security and performance.
  - Server external packages for `sharp` and `@prisma/client`.
- Configure `tsconfig.json` with strict type checking and `@/*` path aliases.

#### [NEW] [.github/workflows/ci.yml](file:///c:/Users/lenovo/Desktop/Facebook/.github/workflows/ci.yml)
- Automated CI pipeline executing linting, type-checking, schema validation, and test suite on every PR.

#### [NEW] [vercel.json](file:///c:/Users/lenovo/Desktop/Facebook/vercel.json)
- Vercel deployment configuration, cron job definitions, and header rules.

#### [NEW] [.env.example](file:///c:/Users/lenovo/Desktop/Facebook/.env.example)
- Complete environment variable template with documentation for Vercel, Meta Developer Console, Neon/Supabase, and Upstash.

---

### Phase 2 — Database, Storage, Security & Queue Layer

#### [NEW] [prisma/schema.prisma](file:///c:/Users/lenovo/Desktop/Facebook/prisma/schema.prisma)
- PostgreSQL schema models:
  - `User`: User profile, authentication state.
  - `FacebookAccount`: Long-lived User Access Token (AES-256 encrypted), Meta User ID.
  - `Page`: Managed Facebook Pages, encrypted Page Access Tokens, categories, fan count.
  - `ScheduledPost`: Post copy, media URLs, scheduled publish timestamp, status (`SCHEDULED`, `PUBLISHING`, `PUBLISHED`, `FAILED`), error log.
  - `MediaAsset`: Uploaded image/video metadata, storage URL, thumbnail URL.
  - `VideoJob`: Background video processing job tracking (`QUEUED`, `PROCESSING`, `COMPLETED`, `FAILED`), progress percentage.
  - `InsightSnapshot`: Cached analytics metrics (reach, impressions, engagement, views).
  - `AdAccount`: Meta Ad Account metadata and cached campaign snapshots.
  - `DataDeletionLog`: Meta compliance audit trail.

#### [NEW] [lib/db.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/db.ts)
- Prisma Client singleton optimized for Vercel serverless connection pooling with Neon/PgBouncer adapter.

#### [NEW] [lib/redis.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/redis.ts)
- Upstash Redis client with Edge/Serverless compatibility for rate limiting and fast key-value caching.

#### [NEW] [lib/crypto.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/crypto.ts)
- High-security AES-256-GCM encryption and decryption routines for Facebook User and Page access tokens.

#### [NEW] [lib/storage.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/storage.ts)
- File storage abstraction supporting Vercel Blob and AWS S3 / Cloudflare R2 presigned upload URLs.

#### [NEW] [lib/rate-limit.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/rate-limit.ts)
- Sliding-window rate limiter powered by Upstash Redis with distinct tiers (anonymous IP vs. authenticated user).

#### [NEW] [lib/validation.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/validation.ts) & [lib/ssrf.ts](file:///c:/Users/lenovo/Desktop/Facebook/lib/ssrf.ts)
- Input validation (Zod schemas) and strict SSRF protections: IP address allowlist/denylist, protocol checks, private IP filtering (rejecting RFC1918, localhost, loopbacks).

---

### Phase 3 — Design System & Shared UI Components

#### [NEW] [app/globals.css](file:///c:/Users/lenovo/Desktop/Facebook/app/globals.css) & Tailwind Configuration
- Design system: Rich, modern Facebook-blue accented aesthetic (`#1877F2`, modern dark mode `#0B1120`, glassmorphic cards, crisp typography via `next/font/google` Inter).

#### [NEW] [components/Header.tsx](file:///c:/Users/lenovo/Desktop/Facebook/components/Header.tsx) & [components/Footer.tsx](file:///c:/Users/lenovo/Desktop/Facebook/components/Footer.tsx)
- Responsive Header: Category navigation (Content, Images, Video, SEO, Ads, Business), Quick Search modal, "Connect Facebook" CTA.
- Comprehensive Footer: 6-column directory with all tool categories, legal compliance links, Meta Data Deletion link, and disclaimer.

#### [NEW] Core Tool Layout Components
- `components/ToolCard.tsx`: Standard card wrapper with category badge and icon.
- `components/ToolInput.tsx`: Input form with tone selectors, audience target, character counters, and action triggers.
- `components/ResultCard.tsx`: Output presentation card with formatting, preview, and feedback triggers.
- `components/CopyButton.tsx`: One-click copy with toast confirmation and analytics trigger.
- `components/DownloadButton.tsx`: File download handler for generated images, texts, and exported CSVs.
- `components/MediaUploader.tsx`: Drag-and-drop zone with client-side MIME check, size validation, and direct presigned upload.
- `components/FAQAccordion.tsx`: SEO-friendly accessible schema-ready FAQ component.
- `components/Breadcrumbs.tsx`: Schema.org BreadcrumbList navigation.

---

### Phase 4 — No-Login Content & AI Generation Suite (APIs & Pages)

#### [NEW] Engine & Logic Layer
- `lib/ai.ts`: Smart template generation engine with deterministic, high-converting copy patterns, plus OpenAI/Anthropic/Gemini provider adapter.
- `lib/content/*.ts`:
  - `post.ts`: Facebook post generator (engaging, question-based, storytelling, educational).
  - `caption.ts`: Concise, punchy feed and reel captions.
  - `hashtags.ts`: Topic-clustered Facebook hashtag recommendations.
  - `post-ideas.ts`: Content brainstormer categorized by niche and goal.
  - `ad-copy.ts`: High-CTR ad headlines, primary texts, and CTAs (PAS, AIDA, BAB frameworks).
  - `product-post.ts`: E-commerce product feature-benefit-offer converter.
  - `story-content.ts`: Interactive poll, question, and behind-the-scenes story outlines.
  - `content-calendar.ts`: 7-day and 30-day Facebook content schedule planner.
  - `viral-ideas.ts`: Contrarian and trending debate topic generator.
  - `emoji-suggestions.ts`: Contextual emoji enhancer.
  - `translator.ts`: Multilingual post translator with localized phrasing.

#### [NEW] API Route Handlers
- `app/api/content/[tool]/route.ts`: Rate-limited, Zod-validated serverless endpoints for each generator.

#### [NEW] SEO Tool Landing Pages
- Follows the PRD Section 31 SEO template (H1, Intro, Tool UI, How to Use, Benefits, Examples, Tips, Related Tools, FAQ, CTA):
  - `app/(content-tools)/facebook-post-generator/page.tsx`
  - `app/(content-tools)/facebook-caption-generator/page.tsx`
  - `app/(content-tools)/facebook-hashtag-generator/page.tsx`
  - `app/(content-tools)/facebook-post-ideas-generator/page.tsx`
  - `app/(content-tools)/facebook-ad-copy-generator/page.tsx`
  - `app/(content-tools)/facebook-product-post-generator/page.tsx`
  - `app/(content-tools)/facebook-story-content-generator/page.tsx`
  - `app/(content-tools)/facebook-content-calendar-generator/page.tsx`
  - `app/(content-tools)/facebook-viral-post-ideas/page.tsx`
  - `app/(content-tools)/facebook-emoji-suggestions/page.tsx`
  - `app/(content-tools)/facebook-post-translator/page.tsx`

---

### Phase 5 — No-Login Image Processing Tools (APIs & Pages)

#### [NEW] Image Processing Engine
- `lib/image/*.ts`: Built on `sharp` for high-performance serverless image manipulation:
  - `resize.ts`: Facebook presets (Feed 1200x630, Story/Reel 1080x1920, Profile 170x170, Cover 820x312).
  - `convert.ts`: Fast WebP, PNG, JPEG, and AVIF conversion.
  - `watermark.ts`: Logo/text watermark placement with opacity and positioning.
  - `text-overlay.ts`: Typography overlays with font rendering and contrast background banners.
  - `thumbnail.ts`: Facebook video thumbnail canvas generator.
  - `bg-remove.ts`: Background removal pipeline integration.

#### [NEW] API Route Handlers
- `app/api/image/[tool]/route.ts`: Streaming image endpoints with memory limits and cache headers.

#### [NEW] Tool Landing Pages
- `app/(image-tools)/facebook-image-resizer/page.tsx`
- `app/(image-tools)/facebook-image-converter/page.tsx`
- `app/(image-tools)/facebook-background-remover/page.tsx`
- `app/(image-tools)/facebook-image-enhancer/page.tsx`
- `app/(image-tools)/facebook-watermark-tool/page.tsx`
- `app/(image-tools)/facebook-text-on-image/page.tsx`
- `app/(image-tools)/facebook-post-template-maker/page.tsx`
- `app/(image-tools)/facebook-profile-picture-resizer/page.tsx`
- `app/(image-tools)/facebook-cover-photo-maker/page.tsx`
- `app/(image-tools)/facebook-story-image-maker/page.tsx`
- `app/(image-tools)/facebook-thumbnail-maker/page.tsx`

---

### Phase 6 — Video Tools & Hybrid Processing Architecture

#### [NEW] Client-Side WebAssembly Video Processor
- `lib/video/wasm-processor.ts`: Uses `@ffmpeg/ffmpeg` inside the browser for client-side operations:
  - Video Trimming / Cutting: instant trim without server uploads.
  - Audio Removal / Muting: instantaneous stream copy.
  - Thumbnail Extraction: instant frame capture directly into Canvas.
  - Client-side format transcoding for short clips (< 60s).

#### [NEW] Asynchronous Video Worker (Heavy Tasks)
- `workers/video-processor.ts`: Dedicated Docker/Node.js worker container for heavy jobs (Reels conversion, 1080p compression, Whisper AI auto-captions):
  - Consumes jobs from Redis queue.
  - Pulls source video from cloud storage.
  - Processes via native FFmpeg CLI.
  - Uploads result back to storage and notifies Vercel webhook `/api/video/callback`.

#### [NEW] Tool Landing Pages
- `app/(video-tools)/facebook-video-cutter/page.tsx`
- `app/(video-tools)/facebook-video-converter/page.tsx`
- `app/(video-tools)/facebook-video-resizer/page.tsx`
- `app/(video-tools)/facebook-video-compressor/page.tsx`
- `app/(video-tools)/facebook-auto-captions/page.tsx`
- `app/(video-tools)/facebook-audio-extractor/page.tsx`
- `app/(video-tools)/facebook-video-thumbnail-generator/page.tsx`
- `app/(video-tools)/facebook-reels-maker/page.tsx`
- `app/(video-tools)/facebook-story-video-maker/page.tsx`
- `app/(video-tools)/facebook-remove-audio/page.tsx`
- `app/(video-tools)/facebook-voiceover-generator/page.tsx`

---

### Phase 7 — SEO Tools, Ads Calculators & Business E-Commerce Suite

#### [NEW] Business & SEO Logic
- `lib/seo-tools/*.ts`:
  - `analyzer.ts`: Facebook Page & Post SEO auditor.
  - `page-name-optimizer.ts`: Keyword-rich brand and page title generator.
  - `bio-optimizer.ts`: High-converting Facebook bio and description optimizer.
  - `keyword-generator.ts`: Facebook search intent keywords.
  - `engagement-score.ts`: Engagement rate calculator based on reach/followers.
  - `link-preview-checker.ts`: OpenGraph meta inspector for Facebook share debugging.
- `lib/ads/*.ts`:
  - `budget-calculator.ts`: Lead/sale goal to required budget calculator.
  - `roas-calculator.ts`: Return on Ad Spend and break-even ROAS calculator.
  - `cpc-cpm-ctr-calculator.ts`: Real-time ad metric relationship calculator.
  - `targeting-ideas.ts`: Interest and behavioral audience suggestions by industry.
- `lib/business/*.ts`:
  - `product-url-scraper.ts`: Scrapes public product title, price, images with SSRF protection.
  - `sale-post.ts` & `offer-post.ts`: Limited-time discount and promotion post generator.

#### [NEW] Tool Landing Pages
- `app/(seo-tools)/...` (10 SEO tools)
- `app/(ads-tools)/...` (8 Ads tools)
- `app/(business-tools)/...` (8 Business & E-Commerce tools)

---

### Phase 8 — Meta OAuth & Connected Dashboard Suite

#### [NEW] Authentication & Graph API Client
- `app/auth/facebook/route.ts`: Initiates Meta OAuth flow with requested scopes (`pages_show_list`, `pages_read_engagement`, `pages_manage_posts`, `read_insights`).
- `app/auth/facebook/callback/route.ts`: Exchanges temporary code for 60-day long-lived User Access Token, queries `/me/accounts`, encrypts tokens with AES-256-GCM, and persists to PostgreSQL.
- `lib/facebook/graph-client.ts`: Typed Meta Graph API client with automatic token refreshing and exponential backoff retry.

#### [NEW] Dashboard Pages
- `app/dashboard/page.tsx`: Central control room with connected Pages overview, quick stats, and quick post action.
- `app/dashboard/pages/page.tsx`: Connect/disconnect Pages, sync status, permission check.
- `app/dashboard/scheduler/page.tsx`: Post composer with AI copy assistant, image selector, date/time picker, and multi-page target selector.
- `app/dashboard/calendar/page.tsx`: Interactive monthly/weekly visual calendar with drag-and-drop rescheduling.
- `app/dashboard/analytics/page.tsx`: Page growth, impressions, reach, top-performing posts, best posting times, and CSV/PDF export.

#### [NEW] Automated Publishing Engine on Vercel
- `app/api/cron/publish/route.ts`: Triggered via Vercel Cron (`* * * * *`). Queries due `ScheduledPost` records, calls Meta Graph API `/v19.0/{page-id}/feed`, marks as `PUBLISHED`, or records error logs.

---

### Phase 9 — Meta Webhooks, Data Deletion Compliance & Legal Pages

#### [NEW] [app/api/webhooks/facebook/route.ts](file:///c:/Users/lenovo/Desktop/Facebook/app/api/webhooks/facebook/route.ts)
- Handles Meta Webhook verification (`hub.mode`, `hub.verify_token`, `hub.challenge`).
- Validates payload signatures with HMAC-SHA256 using `X-Hub-Signature-256`.
- Ingests real-time Page comment and message events.

#### [NEW] [app/data-deletion/page.tsx](file:///c:/Users/lenovo/Desktop/Facebook/app/data-deletion/page.tsx) & [app/api/facebook/data-deletion/route.ts](file:///c:/Users/lenovo/Desktop/Facebook/app/api/facebook/data-deletion/route.ts)
- Mandatory Meta User Data Deletion Callback endpoint.
- Validates signed request, purges user Facebook tokens and associated data from PostgreSQL, generates unique confirmation code, and returns JSON status tracking URL.

#### [NEW] Company & Legal Pages
- `app/privacy-policy/page.tsx`: Comprehensive GDPR, CCPA, and Meta Platform Terms compliant policy.
- `app/terms/page.tsx`: Terms of Service.
- `app/disclaimer/page.tsx`: Meta trademark disclaimer ("Not affiliated with Meta Platforms, Inc.").
- `app/about/page.tsx` & `app/contact/page.tsx`.

---

### Phase 10 — SEO Infrastructure, Homepage & Production Launch

#### [NEW] [app/page.tsx](file:///c:/Users/lenovo/Desktop/Facebook/app/page.tsx) — Main Portal
- Hero section with instant search across all 40+ tools.
- Module Directory with filterable categories (Content, Media, Video, SEO, Ads, Business).
- Live interactive demo tool.
- Feature comparison: Instant No-Login Tools vs. Connected Page Management Suite.
- FAQ, testimonials, and SEO copy.

#### [NEW] [app/sitemap.ts](file:///c:/Users/lenovo/Desktop/Facebook/app/sitemap.ts) & [app/robots.ts](file:///c:/Users/lenovo/Desktop/Facebook/app/robots.ts)
- Dynamically generated sitemap indexing all public tool routes, category hubs, and legal pages.
- Robots.txt permitting Googlebot indexing while disallowing `/api/`, `/dashboard/`, and `/auth/`.

---

## Verification Plan

### Automated CI Checks (GitHub Actions)
```bash
# 1. Type Safety
npx tsc --noEmit

# 2. Code Quality & Linting
npm run lint

# 3. Database Schema Verification
npx prisma validate

# 4. Unit & Integration Tests
npm run test

# 5. Production Build Verification
npm run build
```

### Manual & Functional Verification
1. **No-Login Tool Suite**:
   - Access each category page on mobile and desktop viewports.
   - Test text generation, copy-to-clipboard, and export.
   - Verify image resizing against official Facebook aspect ratio guidelines.
   - Confirm Wasm video trimming functions directly in the browser without server errors.
2. **Vercel Serverless Performance & Limits**:
   - Direct-to-storage presigned upload verification for files > 10MB (ensuring Vercel 4.5MB limit is never triggered).
   - Verify rate-limiting: exceed 30 requests/minute and verify HTTP 429 response.
   - Confirm edge caching headers on static tool assets.
3. **Facebook Meta Integration (Sandbox Environment)**:
   - Perform full OAuth 2.0 connection using Meta Test Users and Test Pages.
   - Verify access tokens are stored encrypted (AES-256-GCM) in PostgreSQL.
   - Schedule a test post 2 minutes in the future; verify Vercel Cron triggers `/api/cron/publish` and post appears on the Facebook Test Page.
   - Disconnect Facebook account; verify tokens are purged and revoked.
   - Test Meta Data Deletion callback using Meta's developer test payload and confirm HTTP 200 with tracking URL.
4. **SEO & Lighthouse Validation**:
   - Run Google Lighthouse on Homepage and Tool Landing Pages: target 90+ Performance, 95+ SEO, 100 Accessibility.
   - Verify JSON-LD Structured Data with Google Rich Results Test.
