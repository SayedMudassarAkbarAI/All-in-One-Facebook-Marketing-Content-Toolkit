import React from "react";
import Link from "next/link";
import { 
  FileText, 
  MessageSquare, 
  Hash, 
  Lightbulb, 
  Megaphone, 
  Calendar, 
  Crop, 
  RefreshCw, 
  Type, 
  Image as ImageIcon, 
  Scissors, 
  Film, 
  VolumeX, 
  Search, 
  Sparkles, 
  UserCheck, 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  ShoppingBag, 
  Tag, 
  ArrowUpRight 
} from "lucide-react";
import { ToolDefinition } from "@/data/tools";

const ICON_MAP: Record<string, React.ElementType> = {
  FileText,
  MessageSquare,
  Hash,
  Lightbulb,
  Megaphone,
  Calendar,
  Crop,
  RefreshCw,
  Type,
  Image: ImageIcon,
  Scissors,
  Film,
  VolumeX,
  Search,
  Sparkles,
  UserCheck,
  DollarSign,
  TrendingUp,
  PieChart,
  ShoppingBag,
  Tag,
};

interface ToolCardProps {
  tool: ToolDefinition;
}

export function ToolCard({ tool }: ToolCardProps) {
  const IconComponent = ICON_MAP[tool.icon] || Sparkles;

  return (
    <Link
      href={`/${tool.slug}`}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-blue-700/60"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors dark:bg-blue-950/60 dark:text-blue-400">
            <IconComponent className="h-6 w-6" />
          </div>
          {tool.isPopular && (
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50">
              Popular
            </span>
          )}
        </div>

        <h3 className="mt-4 text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {tool.categoryLabel}
        </span>
        <span className="flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
          Try Tool <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
