import React from "react";
import Link from "next/link";
import { Facebook, Shield, Building2, Globe, Phone, Mail, Sparkles } from "lucide-react";

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
            <p className="mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Developed and operated by <strong className="text-slate-800 dark:text-slate-200 font-semibold">SPManchester Private Limited Company</strong>, an international technology and digital solutions firm.
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
              Company & Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
                  About SPManchester
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Contact Support
                </Link>
              </li>
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
                  Data Deletion
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

        {/* Corporate Entity Card */}
        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Building2 className="h-4 w-4 text-blue-600" />
                <span>SPManchester Private Limited Company</span>
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
                An international technology and digital solutions firm providing cutting-edge social media automation, enterprise web applications, and artificial intelligence software.
              </p>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-600 dark:text-slate-300">
                <a
                  href="https://spmanchester.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Globe className="h-3.5 w-3.5 text-slate-400" />
                  <span>spmanchester.com</span>
                </a>
                <a
                  href="tel:+923064350580"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>+92 306 4350580</span>
                </a>
                <a
                  href="mailto:info@spmanchester.com"
                  className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>info@spmanchester.com</span>
                </a>
              </div>
            </div>

            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-4 lg:pt-0 lg:pl-6 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Core Corporate Services:
              </span>
              <span>
                Web Development • Mobile Apps • Graphic Design • IT Consultancy • Ads Management • SEO • eCommerce • Artificial Intelligence
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="mt-8 border-t border-slate-200/80 pt-6 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
            <strong>Disclaimer:</strong> This website is an independent utility developed and operated by SPManchester Private Limited Company and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Meta Platforms, Inc., Facebook, or any of their subsidiaries or affiliates.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <p>© 2026 SPManchester Private Limited Company. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center gap-1">
              Built with Next.js 15 & deployed on Vercel
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
