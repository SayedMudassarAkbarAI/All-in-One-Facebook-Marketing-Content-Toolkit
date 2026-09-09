# All-in-One Facebook Marketing & Content Toolkit

[![CI Pipeline](https://github.com/SayedMudassarAkbarAI/All-in-One-Facebook-Marketing-Content-Toolkit/actions/workflows/ci.yml/badge.svg)](https://github.com/SayedMudassarAkbarAI/All-in-One-Facebook-Marketing-Content-Toolkit/actions/workflows/ci.yml)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20with-Vercel-black?logo=vercel)](https://vercel.com)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-black?logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> **Create faster. Post smarter. Grow your Page.**  
> A high-performance, SEO-optimized web application delivering free, instant content generation, image editing, video processing, SEO audit, and Meta Ads calculators, paired with a connected Facebook Page management suite (Scheduler, Insights, Analytics).

---

## 🌟 Features Overview

### 1. ✍️ Facebook Content & AI Tools (No Login Required)
- **Facebook Post Generator**: Engaging question-based, storytelling, and educational post formats.
- **Caption & Hook Generator**: Catchy hooks for feed posts, reels, and video descriptions.
- **Hashtag Generator**: Niche-targeted, clustered hashtag sets.
- **Post Ideas Generator**: Never run out of content with niche-specific viral prompts.
- **Ad Copy Generator**: High-converting copy frameworks (AIDA, PAS, BAB).
- **Product & E-Commerce Post Maker**: Instant feature-benefit-offer copy from product URLs.
- **Content Calendar Generator**: 7-day and 30-day Facebook content schedules.
- **Emoji Enhancer & Multilingual Translator**: Optimize posts for engagement and regional reach.

### 2. 🎨 Image & Media Suite (No Login Required)
- **Image Resizer**: Exact Facebook dimensions (Feed 1200x630, Stories 1080x1920, Covers 820x312, Avatars 170x170).
- **Format Converter**: Instant WebP, PNG, JPEG conversion with quality optimization.
- **Watermark & Logo Placer**: Protect your original brand assets.
- **Text on Image Tool**: Clean typography banners with contrast protection.
- **Thumbnail Generator**: High-CTR video and post thumbnail creator.
- **Background Remover**: Fast product and portrait isolation.

### 3. 🎬 Video Processing Suite (Hybrid Wasm + Worker)
- **In-Browser Video Trimmer**: Cut and slice clips instantly using WebAssembly (`@ffmpeg/ffmpeg`) with zero server latency.
- **Audio Remover & Muter**: Fast audio stream stripping.
- **Video Compressor & Converter**: Optimize video file size for smooth Facebook feed playback.
- **Video Thumbnail Extractor**: Capture high-res frames directly to image formats.
- **Auto-Captions & Reels Maker**: Vertical formatting and speech subtitle generation.

### 4. 🔍 Facebook SEO & Ads Calculators
- **Page & Post SEO Analyzer**: Audit keywords, readability, and engagement indicators.
- **Page Name & Bio Optimizer**: Optimize Facebook profile discoverability in Search.
- **Engagement Rate Calculator**: Benchmark Page engagement against industry averages.
- **Ads Budget & ROAS Calculator**: Calculate target revenue, required spend, and break-even points.
- **CPC / CPM / CTR Calculator**: Interlinked ad metric calculators.

### 5. ⚡ Connected Page Suite (Meta Graph API)
- **Multi-Page Management**: Manage multiple Pages under a single unified dashboard.
- **Smart Post Scheduler**: Compose with AI, attach media, and schedule across Pages.
- **Visual Content Calendar**: Monthly & weekly drag-and-drop planning view.
- **Page Analytics & Insights**: Track reach, impressions, follower growth, and top-performing posts.
- **Automated Vercel Publishing Engine**: Dispatches posts automatically on schedule.

---

## 🏗️ Architecture & Deployment

- **Frontend & APIs**: [Next.js 15 (App Router)](https://nextjs.org) deployed to [Vercel](https://vercel.com).
- **Source Control & CI/CD**: [GitHub](https://github.com/SayedMudassarAkbarAI/All-in-One-Facebook-Marketing-Content-Toolkit) with automated PR checks and Vercel preview environments.
- **Database**: PostgreSQL (Prisma ORM) with connection pooling (Neon / Supabase / Vercel Postgres).
- **Cache & Rate Limiting**: Upstash Redis for sliding-window request throttling.
- **Video Processing**: Hybrid WebAssembly (`@ffmpeg/ffmpeg`) for client-side speed + decoupled background worker for heavy jobs.
- **Meta Integration**: Meta Graph API v19.0 + Webhooks + Data Deletion compliance.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 20+
- npm 10+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/SayedMudassarAkbarAI/All-in-One-Facebook-Marketing-Content-Toolkit.git
cd All-in-One-Facebook-Marketing-Content-Toolkit

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🛡️ Meta Platform & Privacy Compliance

This product complies with Meta Platform Terms:
- All access tokens are encrypted with AES-256-GCM at rest.
- Webhook events are verified using `X-Hub-Signature-256`.
- Automated User Data Deletion Callback is implemented at `/api/facebook/data-deletion`.
- Downloader and scraping utilities strictly enforce SSRF protection against private IP ranges.

---

## 🏢 Corporate Entity

Developed and operated by **SPManchester Private Limited Company**, an international technology and digital solutions firm.

- **Website**: [spmanchester.com](https://spmanchester.com/)
- **Phone**: +92 306 4350580
- **Email**: [info@spmanchester.com](mailto:info@spmanchester.com)
- **Services**: Web Development, Mobile Apps, Graphic Design, IT Consultancy, Ads Management, SEO, eCommerce, Artificial Intelligence.

**Copyright**: © 2026 SPManchester Private Limited Company. All rights reserved.

---

## 📄 License
MIT License. Created and maintained by SPManchester Private Limited Company for modern social media creators and agencies.
