"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, RefreshCw, FileImage, Sparkles, Check, ArrowRight } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

type ImageFormat = "image/webp" | "image/png" | "image/jpeg";

export default function FacebookImageConverterPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-image-converter")!;

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalName, setOriginalName] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [convertedSize, setConvertedSize] = useState<number>(0);
  const [targetFormat, setTargetFormat] = useState<ImageFormat>("image/webp");
  const [quality, setQuality] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatLabels: Record<ImageFormat, { ext: string; name: string; desc: string }> = {
    "image/webp": { ext: "webp", name: "WebP", desc: "Fastest loading, smallest file size for Facebook Feeds & Ads" },
    "image/jpeg": { ext: "jpg", name: "JPEG", desc: "Best for photographic images with natural gradients" },
    "image/png": { ext: "png", name: "PNG", desc: "Lossless, ideal for graphics, screenshots, logos & transparent graphics" },
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalName(file.name);
    setOriginalSize(file.size);

    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);
      convertImage(src, targetFormat, quality);
    };
    reader.readAsDataURL(file);
  };

  const convertImage = (src: string, format: ImageFormat, qualityPct: number) => {
    setIsProcessing(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        // If converting transparent image to JPEG, fill white background
        if (format === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setConvertedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setConvertedUrl(url);
            }
            setIsProcessing(false);
          },
          format,
          qualityPct / 100
        );
      } else {
        setIsProcessing(false);
      }
    };
    img.src = src;
  };

  const handleFormatChange = (newFormat: ImageFormat) => {
    setTargetFormat(newFormat);
    if (imageSrc) {
      convertImage(imageSrc, newFormat, quality);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (imageSrc) {
      convertImage(imageSrc, targetFormat, newQuality);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const savingsPercent =
    originalSize > 0 && convertedSize > 0
      ? Math.round(((originalSize - convertedSize) / originalSize) * 100)
      : 0;

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Upload or drag-and-drop any image (PNG, JPEG, WebP, GIF, or BMP).",
        "Select your desired output format (WebP for speed, JPEG for photos, PNG for logos/crisp text).",
        "Adjust quality slider if needed and download your optimized image ready for Facebook.",
      ]}
      benefits={[
        "100% Client-Side: Your photos never leave your device or get uploaded to any server.",
        "Prevent Facebook Compression: Converting to optimized WebP or JPEG prevents Meta's aggressive compression from destroying photo clarity.",
        "Significant File Size Reduction: Save up to 80% on file size for faster mobile uploads.",
        "Instant & Unlimited: No file size caps, watermarks, or wait times.",
      ]}
      tips={[
        "Facebook compresses images over 100KB automatically. Converting to WebP at 85-90% quality gives you the sharpest feed results.",
        "For logos, infographics, and text banners, always use PNG to prevent blurry artifact halos.",
      ]}
      faqs={[
        {
          question: "Does Facebook support WebP images?",
          answer:
            "Yes! Facebook fully supports WebP format for Page feeds, Ads, and Marketplace listings. WebP offers 25-35% smaller file sizes than comparable JPEGs without visible loss in quality.",
        },
        {
          question: "Why do my photos look blurry after uploading to Facebook?",
          answer:
            "Facebook automatically recompresses large images to save CDN bandwidth. By pre-compressing and resizing your images to Facebook's native dimensions before uploading, you bypass Facebook's destructive automatic compression algorithms.",
        },
      ]}
    >
      <div className="space-y-8">
        {/* Upload Box */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-10 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50/30 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:border-blue-500"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-4 shadow-sm">
            <Upload className="h-6 w-6" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">
            {imageSrc ? "Click to Choose Another Image" : "Drop your image here or click to browse"}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Supports PNG, JPEG, WebP, GIF, and BMP (Processed securely in your browser)
          </p>
        </div>

        {/* Converter Controls & Comparison */}
        {imageSrc && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            {/* Format & Quality Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Select Target Output Format
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["image/webp", "image/jpeg", "image/png"] as ImageFormat[]).map((fmt) => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => handleFormatChange(fmt)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        targetFormat === fmt
                          ? "border-blue-600 bg-blue-50/80 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                      }`}
                    >
                      <span className="text-sm block">{formatLabels[fmt].name}</span>
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        .{formatLabels[fmt].ext}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  💡 {formatLabels[targetFormat].desc}
                </p>
              </div>

              {targetFormat !== "image/png" && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Compression Quality: {quality}%
                    </label>
                    <span className="text-xs text-slate-400">
                      {quality >= 85 ? "High Quality (Recommended)" : "Aggressive Compression"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={quality}
                    onChange={(e) => handleQualityChange(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>30% Smallest file</span>
                    <span>85-90% Sweet spot</span>
                    <span>100% Max fidelity</span>
                  </div>
                </div>
              )}
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Original Size</span>
                <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {formatBytes(originalSize)}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Converted Size</span>
                <p className="text-lg font-extrabold text-blue-600 dark:text-blue-400">
                  {formatBytes(convertedSize)}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Bandwidth Saved</span>
                <p
                  className={`text-lg font-extrabold ${
                    savingsPercent > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600"
                  }`}
                >
                  {savingsPercent > 0 ? `-${savingsPercent}% Smaller` : "Same size"}
                </p>
              </div>
            </div>

            {/* Image Preview & Download Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center gap-3">
                {convertedUrl && (
                  <img
                    src={convertedUrl}
                    alt="Converted preview"
                    className="h-16 w-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                )}
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    Ready to download: {originalName.replace(/\.[^/.]+$/, "")}.
                    {formatLabels[targetFormat].ext}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Optimized for Facebook feed upload & algorithms
                  </p>
                </div>
              </div>

              {convertedUrl && (
                <a
                  href={convertedUrl}
                  download={`${originalName.replace(/\.[^/.]+$/, "")}-converted.${
                    formatLabels[targetFormat].ext
                  }`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all w-full sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Converted Image</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
