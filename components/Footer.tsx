import React from "react";
import Link from "next/link";
import { Facebook, Shield, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand & Mission Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                <Facebook className="h-5 w-5 fill-current" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                Facebook Marketing Toolkit
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-400">
              The premier free toolkit for creators, agencies, and small businesses to craft viral posts, resize media, optimize SEO, and automate Facebook growth.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Compliant with Meta Platform Terms & Graph API v19.0</span>
            </div>
          </div>

          {/* Column 1: Content Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Content & Copy
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/facebook-post-generator" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Post Generator
                </Link>
              </li>
              <li>
                <Link href="/facebook-caption-generator" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Caption Generator
                </Link>
              </li>
              <li>
                <Link href="/facebook-hashtag-generator" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Hashtag Finder
                </Link>
              </li>
              <li>
                <Link href="/facebook-ad-copy-generator" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Ad Copy Maker
                </Link>
              </li>
              <li>
                <Link href="/facebook-content-calendar-generator" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Content Calendar
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Media & SEO */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Media & SEO
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/facebook-image-resizer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Image Resizer
                </Link>
              </li>
              <li>
                <Link href="/facebook-video-cutter" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Video Cutter
                </Link>
              </li>
              <li>
                <Link href="/facebook-seo-analyzer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  SEO Analyzer
                </Link>
              </li>
              <li>
                <Link href="/facebook-page-name-optimizer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Page Name Optimizer
                </Link>
              </li>
              <li>
                <Link href="/facebook-budget-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Ads Budget Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Trust
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/data-deletion" className="hover:text-blue-600 dark:hover:text-blue-400 font-medium text-blue-600 dark:text-blue-400">
                  Data Deletion Request
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Platform Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-10 border-t border-slate-200/80 pt-6 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> This website is an independent utility and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Meta Platforms, Inc., Facebook, or any of their subsidiaries or affiliates. The official Meta website can be found at <a href="https://about.meta.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700 dark:hover:text-slate-300">meta.com</a>.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <p>© {new Date().getFullYear()} All-in-One Facebook Marketing & Content Toolkit. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center gap-1">
              Built with Next.js 15 & deployed on Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
