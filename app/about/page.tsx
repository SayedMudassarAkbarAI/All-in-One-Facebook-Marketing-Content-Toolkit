import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "About Us | SPManchester Private Limited Company",
  description: "About SPManchester Private Limited Company and the All-in-One Facebook Marketing & Content Toolkit.",
};

export default function AboutPage() {
  const services = [
    "Web Development",
    "Mobile Apps",
    "Graphic Design",
    "IT Consultancy",
    "Ads Management",
    "Search Engine Optimization (SEO)",
    "eCommerce Solutions",
    "Artificial Intelligence (AI)",
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Corporate Entity
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                SPManchester Private Limited Company
              </h1>
            </div>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            The <strong>All-in-One Facebook Marketing & Content Toolkit</strong> is developed and operated by <strong>SPManchester Private Limited Company</strong>, an international technology and digital solutions firm.
          </p>

          <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Our mission is to empower digital marketers, creators, entrepreneurs, and global brands with high-performance, accessible software tools. We engineer intelligent solutions that eliminate repetitive work, maximize creative output, and optimize digital marketing performance across international channels.
          </p>

          {/* Corporate Profile Card */}
          <div className="mt-8 rounded-2xl border border-slate-200/80 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950/60">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Corporate Information & Contacts
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-xs text-slate-400 block">Legal Entity Name</span>
                <strong className="text-slate-900 dark:text-white">
                  SPManchester Private Limited Company
                </strong>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Official Website</span>
                <a
                  href="https://spmanchester.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>spmanchester.com</span>
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Corporate Inquiries Email</span>
                <a
                  href="mailto:info@spmanchester.com"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>info@spmanchester.com</span>
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Corporate Phone Line</span>
                <a
                  href="tel:+923064350580"
                  className="font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>+92 306 4350580</span>
                </a>
              </div>
            </div>
          </div>

          {/* Services Portfolio */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              SPManchester Services Portfolio
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Copyright & Compliance */}
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <p>Copyright: © 2026 SPManchester Private Limited Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
