# Technical Requirements Document (TRD)

## 1. Technical Overview

### Product
**All-in-One Facebook Marketing & Content Toolkit**

### Recommended Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma — **required for this product** (unlike the no-DB Pinterest MVP), because scheduling, multi-Page management, and analytics all require persistent state and encrypted token storage.
- Redis — job queue (scheduled posts, video processing) + caching + rate limiting
- BullMQ (or equivalent) — background jobs for scheduled publishing and media processing
- FFmpeg — server-side video processing (cut, convert, resize, compress, extract audio, thumbnails)
- Meta Graph API + Marketing API — Page management, publishing, analytics, ads
- Vercel (web) + a worker-capable host (Vercel functions have execution-time limits unsuitable for video transcoding — plan a separate worker service, e.g., Fly.io/Render/AWS, for FFmpeg jobs)
- GitHub — source control / CI

No-login tools (content/image generation, SEO helpers, calculators) can run entirely in Next.js route handlers without touching the database.

---

## 2. Architecture

```text
User
  │
  ▼
Next.js Frontend
  │
  ├── SEO Pages (no-login tools)
  ├── Connected Dashboard (post-auth)
  └── Company Pages
  │
  ▼
Next.js Server Layer (API Routes)
  │
  ├── Content/AI APIs ─────────────► AI Provider
  ├── Image APIs ──────────────────► Image processing (sharp / bg-removal model)
  ├── Video APIs ───────────────────► Job Queue ──► Worker Service (FFmpeg)
  ├── SEO/Keyword APIs
  ├── Facebook OAuth + Graph API ───► Meta Graph API / Marketing API
  ├── Scheduler APIs ───────────────► Job Queue ──► Publish Worker ──► Graph API
  ├── Analytics APIs ───────────────► Graph API (Insights) + Postgres cache
  └── Rate Limiting / Validation (all routes)
  │
  ▼
PostgreSQL (Prisma) + Redis (queue/cache)
```

---

## 3. Project Structure

```text
/
├── app/
│   ├── page.tsx
│   ├── (content-tools)/
│   │   ├── facebook-post-generator/
│   │   ├── facebook-caption-generator/
│   │   ├── facebook-hashtag-generator/
│   │   ├── facebook-post-ideas-generator/
│   │   ├── facebook-ad-copy-generator/
│   │   ├── facebook-product-post-generator/
│   │   ├── facebook-story-content-generator/
│   │   ├── facebook-content-calendar-generator/
│   │   ├── facebook-viral-post-ideas/
│   │   ├── facebook-emoji-suggestions/
│   │   └── facebook-post-translator/
│   ├── (image-tools)/
│   │   ├── facebook-image-downloader/
│   │   ├── facebook-image-converter/
│   │   ├── facebook-image-resizer/
│   │   ├── facebook-background-remover/
│   │   ├── facebook-image-enhancer/
│   │   ├── facebook-watermark-tool/
│   │   ├── facebook-text-on-image/
│   │   ├── facebook-post-template-maker/
│   │   ├── facebook-profile-picture-resizer/
│   │   ├── facebook-cover-photo-maker/
│   │   ├── facebook-story-image-maker/
│   │   └── facebook-thumbnail-maker/
│   ├── (video-tools)/
│   │   ├── facebook-video-downloader/
│   │   ├── facebook-video-cutter/
│   │   ├── facebook-video-converter/
│   │   ├── facebook-video-resizer/
│   │   ├── facebook-video-compressor/
│   │   ├── facebook-auto-captions/
│   │   ├── facebook-audio-extractor/
│   │   ├── facebook-video-thumbnail-generator/
│   │   ├── facebook-reels-maker/
│   │   ├── facebook-story-video-maker/
│   │   ├── facebook-remove-audio/
│   │   └── facebook-voiceover-generator/
│   ├── (seo-tools)/
│   │   ├── facebook-seo-analyzer/
│   │   ├── facebook-page-name-optimizer/
│   │   ├── facebook-bio-optimizer/
│   │   ├── facebook-keyword-generator/
│   │   ├── facebook-hashtag-seo/
│   │   ├── facebook-post-keyword-analyzer/
│   │   ├── facebook-engagement-score/
│   │   ├── facebook-audience-keywords/
│   │   ├── facebook-link-preview-checker/
│   │   ├── facebook-alt-text-generator/
│   │   └── facebook-seo-score/
│   ├── (ads-tools)/
│   │   ├── facebook-ad-campaign-planner/
│   │   ├── facebook-ad-creative-maker/
│   │   ├── facebook-video-ad-maker/
│   │   ├── facebook-budget-calculator/
│   │   ├── facebook-roas-calculator/
│   │   ├── facebook-cpc-cpm-ctr-calculator/
│   │   ├── facebook-audience-targeting-ideas/
│   │   └── facebook-competitor-ad-research/
│   ├── (business-tools)/
│   │   ├── facebook-product-promotion-post/
│   │   ├── facebook-sale-post-generator/
│   │   ├── facebook-offer-post-generator/
│   │   ├── facebook-new-product-announcement/
│   │   ├── facebook-review-to-post/
│   │   ├── facebook-order-delivery-announcement/
│   │   ├── facebook-discount-campaign-generator/
│   │   └── facebook-product-url-to-post/
│   ├── dashboard/                     # requires auth + connected Page
│   │   ├── page.tsx                   # Page overview
│   │   ├── scheduler/
│   │   ├── calendar/
│   │   ├── pages/                     # manage multiple connected Pages
│   │   ├── comments/
│   │   ├── messenger/
│   │   ├── analytics/
│   │   └── ads-reports/
│   ├── auth/
│   │   ├── facebook/route.ts          # OAuth start
│   │   └── facebook/callback/route.ts # OAuth callback
│   ├── data-deletion/page.tsx         # Meta-required callback + user-facing page
│   ├── about/ | contact/ | privacy-policy/ | terms/ | disclaimer/ | copyright/
│   └── api/
│       ├── ai/
│       ├── content/
│       ├── image/
│       ├── video/
│       ├── seo/
│       ├── ads/
│       ├── facebook/
│       │   ├── pages/route.ts
│       │   ├── posts/route.ts
│       │   ├── schedule/route.ts
│       │   ├── comments/route.ts
│       │   ├── messenger/route.ts
│       │   ├── insights/route.ts
│       │   └── data-deletion/route.ts # Meta callback endpoint
│       └── webhooks/
│           └── facebook/route.ts      # Meta webhooks (comments, messages)
│
├── workers/
│   ├── video-processing.worker.ts     # FFmpeg jobs (separate deployable service)
│   └── publish.worker.ts              # Scheduled post publishing
│
├── components/
│   ├── Header.tsx / Footer.tsx / ToolCard.tsx / ToolInput.tsx
│   ├── ResultCard.tsx / CopyButton.tsx / DownloadButton.tsx
│   ├── MediaUploader.tsx / MediaPreview.tsx
│   ├── FAQ.tsx / Breadcrumbs.tsx / RelatedTools.tsx / HowItWorks.tsx
│   ├── LoadingState.tsx
│   └── dashboard/ (PageSwitcher, CalendarView, InsightsChart, CommentThread, ...)
│
├── lib/
│   ├── seo.ts
│   ├── ai.ts                          # provider abstraction
│   ├── content/ (post.ts, caption.ts, hashtags.ts, ad-copy.ts, ...)
│   ├── image/ (resize.ts, convert.ts, bg-remove.ts, text-overlay.ts, watermark.ts)
│   ├── video/ (ffmpeg.ts, cut.ts, convert.ts, compress.ts, captions.ts)
│   ├── facebook/
│   │   ├── oauth.ts                   # token exchange, refresh
│   │   ├── graph-client.ts            # typed Graph API wrapper
│   │   ├── marketing-client.ts        # Marketing API wrapper
│   │   ├── webhook-verify.ts          # signature verification
│   │   └── token-crypto.ts            # encrypt/decrypt stored tokens
│   ├── queue.ts                       # BullMQ setup
│   ├── rate-limit.ts
│   └── validation.ts
│
├── data/
│   ├── tools.ts
│   └── faqs.ts
│
├── prisma/
│   └── schema.prisma
│
├── public/
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. Frontend Requirements

Next.js App Router, TypeScript, Tailwind CSS. No-login tool pages are statically rendered/ISR where possible; dashboard pages are client-rendered behind auth. Mobile-first; avoid heavy client JS on SEO pages — defer image/video editing libraries until the tool is actually opened.

---

## 5. Facebook / Meta Integration Architecture

### 5.1 OAuth Flow

```text
Dashboard "Connect Facebook" button
  ↓
/auth/facebook (redirect to Meta OAuth dialog, requested scopes)
  ↓
User approves on Facebook
  ↓
/auth/facebook/callback (exchange code → short-lived user token)
  ↓
Exchange short-lived → long-lived user token
  ↓
Fetch Pages the user manages (/me/accounts) → obtain Page access tokens
  ↓
Encrypt + store Page tokens (per-Page row) in Postgres
  ↓
Redirect to /dashboard
```

### 5.2 Required Scopes (request only what each feature needs, incrementally)

```text
pages_show_list
pages_manage_posts
pages_read_engagement
pages_manage_metadata
pages_messaging          (Messenger management)
pages_manage_engagement  (Comment management)
read_insights            (Analytics)
ads_read / ads_management (Ads reporting — Marketing API, separate review track)
```

### 5.3 App Review & Compliance

- Each advanced scope requires a **Meta App Review** submission with a screencast demonstrating the exact use case; budget multiple weeks per round, and expect resubmissions.
- App must complete **Business Verification** before advanced access is granted.
- Implement and register a **Data Deletion Request callback** (`/api/facebook/data-deletion`) per Meta's Platform Terms; the linked `/data-deletion` page must explain the manual deletion path too.
- Respect Meta's **Platform Rate Limits** (per-app and per-user call budgets) — track usage and back off before Meta throttles the app.
- **Webhooks** (comments, Messenger) must verify the `X-Hub-Signature-256` header against the App Secret before processing.

### 5.4 Token Storage

- Page access tokens encrypted at rest (AES-256-GCM) with a server-only key (`FB_TOKEN_ENC_KEY`), never logged, never sent to the client.
- Long-lived tokens refreshed proactively before expiry; a disconnect action revokes and deletes stored tokens (`DELETE /me/permissions` call to Meta + row deletion).

---

## 6. Tool Component Architecture

Same pattern for every no-login tool page:

```text
ToolPage
 ├── Breadcrumb
 ├── SEO Intro
 ├── ToolInput (text / URL / file upload, per tool)
 ├── GenerateButton
 ├── LoadingState
 ├── Results
 │    ├── ResultCard / MediaPreview
 │    └── CopyButton / DownloadButton
 ├── HowTo
 ├── FAQ
 └── RelatedTools
```

Connected-suite pages (`/dashboard/...`) additionally require: `PageSwitcher`, an auth guard, and optimistic UI for scheduling actions.

---

## 7. API Architecture (representative endpoints per module)

### Content
```http
POST /api/content/post          { topic, tone, platformGoal }
POST /api/content/caption       { topic, length }
POST /api/content/hashtags      { topic }
POST /api/content/ad-copy       { product, audience, goal }
POST /api/content/translate     { text, direction: "ur-en" | "en-ur" }
```

### Image
```http
POST /api/image/resize          multipart: file, { width, height, preset }
POST /api/image/convert         multipart: file, { targetFormat }
POST /api/image/bg-remove       multipart: file
POST /api/image/text-overlay    multipart: file, { text, style }
```

### Video (queued — returns a job id, client polls/streams status)
```http
POST /api/video/cut             { sourceUrl|upload, start, end } -> { jobId }
POST /api/video/convert         { sourceUrl|upload, targetFormat } -> { jobId }
GET  /api/video/jobs/:jobId     -> { status, resultUrl? }
```

### SEO
```http
GET  /api/seo/keywords?keyword=...
POST /api/seo/analyze           { pageUrl | bioText }
```

### Facebook (Connected)
```http
GET  /api/facebook/pages                     # list connected Pages
POST /api/facebook/posts                     # publish immediately
POST /api/facebook/schedule                  # queue a scheduled post
GET  /api/facebook/insights?pageId=&metric=
GET  /api/facebook/comments?pageId=&postId=
POST /api/facebook/comments/reply
POST /api/facebook/data-deletion             # Meta callback (signed request)
```

### Ads
```http
POST /api/ads/budget-calculator     { dailySpend, days, avgCpc }
GET  /api/facebook/ads/report?adAccountId=   # Marketing API, connected
```

All `POST` bodies follow the validation rules in Section 11; all responses use the structured success/error envelope from Section 23.

---

## 8. AI Architecture

Identical pattern to the Pinterest toolkit's `lib/ai.ts` abstraction:

```text
Browser → Next.js API → Validation → Rate Limit → AI Provider → Sanitized Response → Browser
```

- `AI_API_KEY` server-side only, never `NEXT_PUBLIC_`.
- Image generation (AI Image Generator) and voice-over (AI Voice-over Generator) are the two AI features with meaningful per-call cost — gate these behind stricter per-IP/per-user quotas from day one (Section 12).
- AI Comment Reply Generator, when used from the connected dashboard, must never auto-post without an explicit user confirm step (no fully autonomous replies at MVP).

---

## 9. Media Processing Architecture

### Images
- Use `sharp` for resize/convert/text-overlay/thumbnail generation (fast, in-process, works in serverless functions within size/time limits).
- Background removal uses a hosted model/API or a dedicated inference service; run it as an async job if it exceeds serverless time limits.

### Video
- FFmpeg-based operations (cut, convert, resize, compress, audio extraction/removal, thumbnail, auto-captions via speech-to-text) are **too heavy for standard serverless function limits** — run them on a separate worker service with a job queue:

```text
API enqueues job (BullMQ/Redis)
   ↓
Worker picks up job → downloads source → runs FFmpeg → uploads result to object storage
   ↓
API/DB job status updated → client polls or receives a webhook/SSE update
```

- Enforce: max input file size, max output duration, max concurrent jobs per user, and a hard job timeout — all environment-configurable (mirrors Pinterest TRD Section 13's download-limit pattern).
- Store processed media in object storage (e.g., S3-compatible) with signed, expiring download URLs — never serve raw files from the app server long-term.

---

## 10. Scheduling & Publishing Architecture

```text
User schedules post (dashboard)
   ↓
Row written to `ScheduledPost` (status = "pending")
   ↓
Cron/queue worker polls due posts every minute
   ↓
Worker calls Graph API (/{page-id}/feed or /{page-id}/photos|videos) with the Page access token
   ↓
On success: status = "published", store returned post id
On failure: status = "failed", store error, expose retry action in UI
```

- Recurring posts materialize as multiple `ScheduledPost` rows generated ahead of time (not resolved dynamically at publish time), so the calendar UI can show them all.
- Cross-posting to multiple Pages creates one `ScheduledPost` row per Page, linked by a `campaignId` for grouped editing/cancellation.

---

## 11. Input Validation

Every API validates: input length, required fields, MIME type and magic-byte check (not just file extension) for uploads, URL format/HTTPS-only for downloader inputs, and max request size. Example limits:

```text
topic/caption text: 2–500 characters
uploaded image: ≤ 10 MB, jpg/png/webp only
uploaded video: ≤ 200 MB (configurable), mp4/mov only
Facebook post/video URL: must match facebook.com / fb.watch host allowlist, HTTPS only
```

Malformed requests return `400 Bad Request` with the structured error envelope (Section 23).

---

## 12. Rate Limiting

```text
Anonymous (no-login tools):        10 requests/hour/IP (text tools)
                                    5 requests/hour/IP (image/video processing — heavier cost)
Authenticated (connected suite):   Configurable per plan (Free/Pro/Agency)
AI image/voice generation:         Stricter dedicated quota regardless of plan tier
Facebook Graph/Marketing API calls: Tracked separately against Meta's own app-level budget
```

Backed by Redis (`lib/rate-limit.ts`), same normalized-key approach as the Pinterest toolkit.

---

## 13. Caching

Normalize text inputs (trim, lowercase, collapse whitespace) into cache keys, e.g. `content:caption:summer sale`. Cache AI text-generation results for identical inputs briefly to reduce provider cost; **never cache** Facebook Insights/analytics data beyond a short TTL (a few minutes) since it must reflect near-real-time performance.

---

## 14. Downloader Architecture & Security

Same SSRF discipline as the Pinterest downloader, applied to Facebook/`fb.watch` URLs:

```text
Facebook post/video URL
     ↓
URL validation (HTTPS, allowlisted facebook.com/fb.watch hosts)
     ↓
Reject localhost / private IP ranges / redirects off-allowlist
     ↓
Fetch public resource only (no session cookies, no login bypass)
     ↓
Media detection (image/video/GIF) + content-type validation
     ↓
File-size limit + request timeout enforced
     ↓
Preview → Download
```

The system must not access private posts, bypass authentication or DRM, circumvent Meta's protections, or strip attribution/watermarks from content the requesting user does not own.

---

## 15. Database Schema (Prisma — new vs. Pinterest MVP)

```text
User            (id, email, passwordHash|oauthId, plan, createdAt)
FacebookAccount (id, userId, fbUserId, longLivedTokenEnc, expiresAt)
Page            (id, facebookAccountId, pageId, name, pageTokenEnc, connectedAt)
ScheduledPost   (id, pageId, campaignId?, content, mediaUrl?, scheduledAt, status, publishedPostId?, error?)
MediaAsset      (id, userId, type[image|video], sourceUrl?, storageUrl, sizeBytes, createdAt)
VideoJob        (id, userId, type[cut|convert|compress|...], status, inputUrl, outputUrl?, error?)
Comment         (id, pageId, postId, fbCommentId, message, repliedAt?)
InsightSnapshot (id, pageId, metric, value, capturedAt)
AdAccount       (id, userId, adAccountId, tokenRef)
Subscription    (id, userId, planTier, status, renewsAt)
Usage           (id, userId|ipHash, tool, count, windowStart)
```

Token fields (`*TokenEnc`) are always encrypted at the application layer before insert; the encryption key is never stored in the database.

---

## 16. SEO Technical Requirements

Identical baseline to the Pinterest toolkit: every indexable page ships `<title>`, meta description, canonical, Open Graph, Twitter/X card metadata. Example:

```text
Title: Facebook Caption Generator — Free AI Captions for Facebook Posts
Description: Generate scroll-stopping Facebook captions in seconds with the free Facebook Caption Generator. No login required.
```

Dashboard/auth-gated routes (`/dashboard/**`, `/auth/**`, `/api/**`) are `noindex` and excluded from the sitemap.

---

## 17. Structured Data

- `Organization` + `WebSite` on all pages.
- `SoftwareApplication` / `WebApplication` on tool pages.
- `BreadcrumbList` on all indexable pages.
- `FAQPage` only where visible FAQ content exists.

---

## 18. Navigation

### Header
```text
Logo | Tools ▾ | Facebook SEO | Scheduler | Ads | Analytics | Resources | About | [Connect Facebook]
```

### Footer
```text
Content Tools | Image Tools | Video Tools | SEO Tools | Ads Tools
Company: About | Contact | Become a Partner
Legal: Privacy Policy | Terms | Disclaimer | Copyright | Data Deletion
```

---

## 19. Environment Variables

```env
NEXT_PUBLIC_SITE_URL=

AI_API_KEY=

DATABASE_URL=
REDIS_URL=

FB_APP_ID=
FB_APP_SECRET=
FB_TOKEN_ENC_KEY=
FB_WEBHOOK_VERIFY_TOKEN=

OBJECT_STORAGE_BUCKET=
OBJECT_STORAGE_KEY=
OBJECT_STORAGE_SECRET=

RATE_LIMIT_URL=
RATE_LIMIT_SECRET=

VIDEO_WORKER_URL=
VIDEO_WORKER_SECRET=
```

Only `NEXT_PUBLIC_SITE_URL` is exposed client-side; everything else stays server/worker-only.

---

## 20. Analytics Architecture (Product Telemetry)

Same privacy-conscious anonymous-event pattern as the Pinterest toolkit (Section 22 there):

```json
{ "event": "post_scheduled", "tool": "dashboard-scheduler", "timestamp": "..." }
```

Never pipe Facebook user data, Page tokens, or private message/comment content into the product-analytics store.

---

## 21. Sitemap & Robots

Sitemap includes homepage, all no-login tool pages, SEO landing pages, and company pages. Excludes `/api/`, `/auth/`, `/dashboard/`, `/data-deletion` callback route (the human-readable `/data-deletion` info page can be included). Robots disallows `/api/`, `/auth/`, `/dashboard/`.

---

## 22. Canonicalization

Every tool page has exactly one canonical URL; no duplicate indexable versions via query parameters (e.g., `?ref=`, `?utm_*` must canonicalize back to the clean path).

---

## 23. Error Handling

```json
{ "success": false, "error": "Invalid Facebook URL" }
```

Never expose stack traces, Meta API error internals beyond a sanitized message, provider credentials, or internal file paths. Facebook Graph API errors are mapped to a small set of user-facing messages (e.g., "This post isn't public," "Your Facebook connection expired — please reconnect").

---

## 24. Loading States

All generation, upload, video-processing, and publishing actions require: loading indicator, disabled submit, progress/status (video jobs show percentage where FFmpeg reports it), error state, retry where appropriate.

---

## 25. Accessibility

Semantic HTML, keyboard navigation, visible focus states, proper labels, ARIA only when necessary, sufficient contrast, accessible buttons/forms/errors — same bar as the Pinterest toolkit.

---

## 26. Responsive Design

Mobile, tablet, desktop, large desktop. Core tool interactions (generate/copy/download) must work on a phone without horizontal scroll; the dashboard calendar view may offer a simplified mobile layout (list view instead of grid).

---

## 27. Deployment

- **Web app**: Vercel (Next.js).
- **Video worker**: separate deployable service (container-based host) since FFmpeg jobs exceed typical serverless execution limits.
- **Database**: managed PostgreSQL; **Redis**: managed instance for queue/cache/rate-limit.
- Environments: Development, Preview, Production.

```text
Developer → GitHub → Vercel (web) + Worker host (video) → Production
```

---

## 28. CI/CD

On every pull request: TypeScript check, ESLint, build, Prisma schema validation, unit tests. Production deploy only after checks pass. Worker service has its own CI pipeline (build + FFmpeg smoke test).

---

## 29. Security Checklist

- [ ] No secrets in GitHub
- [ ] Environment variables configured per environment
- [ ] API validation on every route
- [ ] Rate limiting (anonymous + authenticated tiers)
- [ ] SSRF protection on downloader and any URL-fetching tool
- [ ] File-size limits + request/job timeouts
- [ ] HTTPS everywhere + secure headers (CSP, HSTS, etc.)
- [ ] Dependency audit in CI
- [ ] Error sanitization (no internals leaked)
- [ ] Facebook token encryption at rest + secure disconnect/revoke flow
- [ ] Webhook signature verification (`X-Hub-Signature-256`)
- [ ] Data Deletion callback implemented and reachable
- [ ] Meta App Review + Business Verification completed before enabling each gated permission in production
- [ ] Abuse protection (bulk-posting/spam prevention on the scheduler)

---

## 30. Testing

### Unit
Input validation, URL validation, SEO metadata generation, AI response parsing, token encryption/decryption, FFmpeg command construction.

### Integration
Content/AI APIs, image/video processing pipeline, downloader validation, rate limiter, Facebook OAuth token exchange, Graph API wrapper (mocked), scheduler job execution.

### E2E
```text
Homepage → Tool → Generate → Copy
Homepage → Video Tool → Upload → Process → Download
Connect Facebook → Compose Post → Schedule → Verify appears in Calendar
Dashboard → Analytics → Export Report
```

---

## 31. SEO Content Template

Every tool page follows:

```text
H1 — Tool Name

Intro

Tool UI

How to Use

Benefits

Example

Tips

Related Tools

FAQ

CTA
```

---

## 32. Future API Expansion

```text
/api/content/bulk-posts
/api/content/bulk-captions
/api/ai/content-planner
/api/facebook/ads/bulk-report
/api/facebook/audience-insights
/api/webhooks/facebook/lead-ads
```

---

## 33. Future Premium Architecture

### Free
Basic content/image/video tools, limited AI generations, 1 connected Page, basic scheduling.

### Pro
Higher AI limits, bulk generation/scheduling, up to N connected Pages, advanced analytics export, priority video processing queue.

### Agency
Multiple team members, unlimited Pages (or high cap), white-label reports, API access, dedicated ads reporting.

---

## 34. Technical Definition of Done

- Next.js application builds successfully; worker service builds/deploys independently.
- All Phase 1–3 (no-login) routes exist and are indexable with unique content.
- APIs validated; AI/Facebook/object-storage keys remain server-side only.
- Downloader and any URL-fetching tool has SSRF protections.
- Rate limiting active across anonymous and authenticated tiers.
- Metadata + JSON-LD implemented where applicable; sitemap/robots active; canonicals correct.
- Mobile layout and accessibility checks pass.
- Facebook OAuth flow, token encryption, and disconnect flow implemented and tested end-to-end in a Meta sandbox app before requesting App Review.
- Data Deletion callback live and verified against Meta's test tool.
- Scheduler correctly publishes to a test Page within the polling interval's tolerance.
- GitHub repository clean; Vercel + worker-host deployments succeed; production environment variables configured.
