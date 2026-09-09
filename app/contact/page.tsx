import React from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Globe, Phone, Mail, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Contact Us | SPManchester Private Limited Company",
  description: "Contact SPManchester Private Limited Company for support, partnerships, and inquiries.",
};

export default function ContactPage() {
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
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Support & Inquiries
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Contact SPManchester
              </h1>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Have a question about the Facebook Marketing Toolkit, technical assistance, or bespoke enterprise development? Reach out directly to our corporate team.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <Mail className="h-6 w-6 text-blue-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Email Us</h3>
              <p className="text-xs text-slate-500 mt-1">For general & support inquiries</p>
              <a
                href="mailto:info@spmanchester.com"
                className="mt-3 block text-sm font-semibold text-blue-600 hover:underline"
              >
                info@spmanchester.com
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <Phone className="h-6 w-6 text-blue-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Call Direct</h3>
              <p className="text-xs text-slate-500 mt-1">Monday to Friday 9am - 6pm</p>
              <a
                href="tel:+923064350580"
                className="mt-3 block text-sm font-semibold text-blue-600 hover:underline"
              >
                +92 306 4350580
              </a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
              <Globe className="h-6 w-6 text-blue-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Corporate Portal</h3>
              <p className="text-xs text-slate-500 mt-1">Explore all digital services</p>
              <a
                href="https://spmanchester.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm font-semibold text-blue-600 hover:underline"
              >
                spmanchester.com
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
            <p>
              <strong>SPManchester Private Limited Company</strong> — An international technology and digital solutions firm.
            </p>
            <p className="mt-1">Copyright: © 2026 SPManchester Private Limited Company. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
