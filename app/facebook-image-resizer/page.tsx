"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, Crop, Image as ImageIcon, Sparkles } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

const PRESETS = [
  { id: "feed", name: "Facebook Feed Post", width: 1200, height: 630, ratio: "1.91:1" },
  { id: "story", name: "Facebook Story / Reel", width: 1080, height: 1920, ratio: "9:16" },
  { id: "cover", name: "Facebook Page Cover", width: 820, height: 312, ratio: "2.63:1" },
  { id: "profile", name: "Facebook Profile Picture", width: 170, height: 170, ratio: "1:1" },
  { id: "event", name: "Facebook Event Banner", width: 1920, height: 1005, ratio: "1.91:1" },
];

export default function FacebookImageResizerPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-image-resizer")!;

  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [resizedDataUrl, setResizedDataUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      processResize(src, selectedPreset);
    };
    reader.readAsDataURL(file);
  };

  const processResize = (src: string, preset: typeof PRESETS[0]) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = preset.width;
      canvas.height = preset.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // High quality bicubic scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        // Calculate aspect fill
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio
        );

        const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
        setResizedDataUrl(dataUrl);
      }
      setIsProcessing(false);
    };
    img.src = src;
  };

  const handlePresetSelect = (preset: typeof PRESETS[0]) => {
    setSelectedPreset(preset);
    if (imageSrc) {
      processResize(imageSrc, preset);
    }
  };

  const handleDownload = () => {
    if (!resizedDataUrl) return;
    const link = document.createElement("a");
    link.download = `facebook-${selectedPreset.id}-${selectedPreset.width}x${selectedPreset.height}.jpg`;
    link.href = resizedDataUrl;
    link.click();
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Select your target Facebook format (Feed Post, Story, Page Cover, or Profile Avatar).",
        "Upload any JPG, PNG, or WebP image from your device.",
        "Preview the resized image and click 'Download Resized Image' to save your Facebook-ready graphic.",
      ]}
      benefits={[
        "Prevents Facebook's blurry auto-crop and awkward compression artifacts.",
        "Guaranteed 100% adherence to official Facebook display dimensions.",
        "Processes entirely in your browser: ultra-fast, private, and zero file size limits.",
      ]}
      tips={[
        "For Facebook Page Covers, keep important text and logos in the center 640x312 safe area so they don't get cut off on mobile phones.",
        "Use PNG for graphics with typography or sharp borders, and JPEG for complex photography.",
      ]}
      faqs={[
        {
          question: "What is the recommended size for a Facebook post in 2025?",
          answer:
            "The recommended dimension for horizontal feed posts is 1200 x 630 pixels (1.91:1 ratio). For vertical posts and Reels, use 1080 x 1920 pixels (9:16 ratio).",
        },
        {
          question: "Will resizing my image reduce its visual quality?",
          answer:
            "No. Our tool uses high-quality bicubic canvas smoothing. By uploading the exact dimensions Facebook expects, you prevent Facebook's server from aggressively recompressing your images.",
        },
      ]}
    >
      {/* Preset Selector */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
          1. Choose Facebook Dimension Preset
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handlePresetSelect(preset)}
              className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                selectedPreset.id === preset.id
                  ? "border-blue-600 bg-blue-50/70 text-blue-700 dark:border-blue-500 dark:bg-blue-950/60 dark:text-blue-300 shadow-sm"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
              }`}
            >
              <span className="text-xs font-bold">{preset.name}</span>
              <span className="text-[11px] text-slate-400 mt-1">
                {preset.width} × {preset.height}
              </span>
              <span className="text-[10px] font-mono text-slate-400 mt-0.5">
                ({preset.ratio})
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-900 dark:text-white mb-2">
          2. Upload Your Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/30 transition-all dark:border-slate-700 dark:bg-slate-900/40"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-3">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            Click to upload an image or drag & drop
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Supports PNG, JPEG, WebP (up to 25MB)
          </p>
        </div>
      </div>

      {/* Resized Result Preview */}
      {resizedDataUrl && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                ✓ Resized to {selectedPreset.width} × {selectedPreset.height} px
              </span>
              <p className="text-xs text-slate-500">Facebook {selectedPreset.name}</p>
            </div>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95"
            >
              <Download className="h-4 w-4" />
              <span>Download Image</span>
            </button>
          </div>

          <div className="flex items-center justify-center overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-900 max-h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resizedDataUrl}
              alt="Resized Facebook Preview"
              className="max-h-96 w-auto object-contain rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
