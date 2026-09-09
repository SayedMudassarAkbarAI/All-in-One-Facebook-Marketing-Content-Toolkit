"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Menu, 
  X, 
  Search, 
  Facebook, 
  Layers, 
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { CATEGORIES } from "@/data/tools";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Facebook className="h-6 w-6 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                FB Toolkit
              </span>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Marketing & Content Suite
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            All Tools
          </Link>
          <Link
            href="/#content"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Content & AI
          </Link>
          <Link
            href="/#image"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Images
          </Link>
          <Link
            href="/#video"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Video
          </Link>
          <Link
            href="/#seo"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            SEO
          </Link>
          <Link
            href="/#ads"
            className="rounded-lg px-3 py-2 transition-colors hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800 dark:hover:text-blue-400"
          >
            Ads
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/auth/facebook"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-500/30 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-500/40 active:scale-95"
          >
            <Facebook className="h-4 w-4 fill-current" />
            <span>Connect Page</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="inline-flex md:hidden items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 dark:border-slate-800 dark:bg-slate-900 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-2 text-base font-medium">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Explore All Tools
            </Link>
            {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
              <Link
                key={cat.id}
                href={`/#${cat.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <span>{cat.label}</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}

            <div className="pt-4">
              <Link
                href="/auth/facebook"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                <Facebook className="h-4 w-4 fill-current" />
                <span>Connect Facebook Page</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
