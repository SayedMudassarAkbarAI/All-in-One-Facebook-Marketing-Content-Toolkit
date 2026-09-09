"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, Image as ImageIcon, Sparkles, Play, ShieldAlert, Award } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

export default function FacebookThumbnailMakerPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-thumbnail-maker")!;

  const [aspectRatio, setAspectRatio] = useState<"16:9" | "1:1">("16:9");
  const [headline, setHeadline] = useState("I Tested Facebook Ads for 30 Days");
  const [badgeText, setBadgeText] = useState("CASE STUDY");
  const [showPlayIcon, setShowPlayIcon] = useState(true);
  const [showBorder, setShowBorder] = useState(true);
  const [borderColor, setBorderColor] = useState("#FACC15"); // High CTR yellow
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [themeGradient, setThemeGradient] = useState<[string, string]>(["#1E3A8A", "#0F172A"]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    drawThumbnail();
  }, [aspectRatio, headline, badgeText, showPlayIcon, showBorder, borderColor, imageSrc, themeGradient]);

  const drawThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = aspectRatio === "16:9" ? 1280 : 1080;
    const height = aspectRatio === "16:9" ? 720 : 1080;
    canvas.width = width;
    canvas.height = height;

    const renderElements = () => {
      // 1. Draw Border if enabled
      if (showBorder) {
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 18;
        ctx.strokeRect(9, 9, width - 18, height - 18);
      }

      // 2. Draw Play Button Icon in Center or Top Right
      if (showPlayIcon) {
        const cx = width / 2;
        const cy = height / 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 54, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(24, 119, 242, 0.9)"; // Facebook Blue
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#FFFFFF";
        ctx.stroke();

        // White triangle
        ctx.beginPath();
        ctx.moveTo(cx - 14, cy - 22);
        ctx.lineTo(cx + 26, cy);
        ctx.lineTo(cx - 14, cy + 22);
        ctx.closePath();
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
      }

      // 3. Draw Badge Pill (Top Left)
      if (badgeText.trim()) {
        ctx.font = "bold 26px sans-serif";
        const badgeWidth = ctx.measureText(badgeText.toUpperCase()).width + 44;
        const badgeX = 50;
        const badgeY = 50;

        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeWidth, 52, 14);
        ctx.fillStyle = "#E11D48"; // Attention Red
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.fillText(badgeText.toUpperCase(), badgeX + badgeWidth / 2, badgeY + 36);
      }

      // 4. Draw Big Headline Banner at Bottom
      if (headline.trim()) {
        ctx.font = "900 48px sans-serif";
        ctx.textAlign = "left";

        const words = headline.split(" ");
        let line = "";
        const lines: string[] = [];
        const maxWidth = width - 120;

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            lines.push(line);
            line = words[n] + " ";
          } else {
            line = testLine;
          }
        }
        lines.push(line);

        const lineHeight = 60;
        const blockHeight = lines.length * lineHeight + 40;
        const boxY = height - blockHeight - 40;

        // Dark background plate for text
        ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
        ctx.beginPath();
        ctx.roundRect(40, boxY, width - 80, blockHeight, 18);
        ctx.fill();

        // Render lines with shadow
        lines.forEach((l, idx) => {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillText(l.trim(), 70, boxY + 50 + idx * lineHeight);
        });
      }
    };

    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const hRatio = width / img.width;
        const vRatio = height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const shiftX = (width - img.width * ratio) / 2;
        const shiftY = (height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);

        // Dark gradient vignette
        const vignette = ctx.createLinearGradient(0, height * 0.4, 0, height);
        vignette.addColorStop(0, "rgba(0,0,0,0)");
        vignette.addColorStop(1, "rgba(0,0,0,0.8)");
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, width, height);

        renderElements();
      };
      img.src = imageSrc;
    } else {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, themeGradient[0]);
      gradient.addColorStop(1, themeGradient[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      renderElements();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `facebook-thumbnail-${aspectRatio === "16:9" ? "1280x720" : "1080x1080"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Select your thumbnail aspect ratio: 16:9 for landscape videos & watch feed, or 1:1 for square feed posts.",
        "Enter your high-curiosity headline and attention badge (e.g. WATCH THIS, FULL GUIDE).",
        "Upload a video frame/photo or pick a background, and download your click-optimized thumbnail.",
      ]}
      benefits={[
        "Engineered for Click-Through Rate: High-contrast borders and badge pills stop feed scrolling instantly.",
        "Built-in Video Play Overlay: Signals immediate video content to users scanning their mobile feed.",
        "Exact Pixel Dimensions: 1280x720 (16:9) and 1080x1080 (1:1) Facebook standards.",
        "Zero Watermarks & 100% Free: Instant high-resolution PNG export.",
      ]}
      tips={[
        "Thumbnails with expressive human faces + bold 3-to-5 word text blocks achieve 34% higher play rates on Facebook.",
        "Vibrant high-contrast borders (Yellow, Cyan, or Red) act as a visual hook inside Facebook's dark/light interface.",
      ]}
      faqs={[
        {
          question: "Can I set a custom thumbnail on Facebook videos?",
          answer:
            "Yes! When uploading a video in Meta Business Suite or Facebook Page video editor, click 'Video Options' -> 'Change Thumbnail' -> 'Upload Image' and upload the PNG generated by this tool.",
        },
        {
          question: "What thumbnail size is best for Facebook video?",
          answer:
            "For standard horizontal videos, use 1280 x 720 (16:9). For Facebook Feed and Carousel videos, 1080 x 1080 (1:1) square thumbnails take up 78% more screen real estate on smartphones.",
        },
      ]}
    >
      <div className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Thumbnail Aspect Ratio
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAspectRatio("16:9")}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                    aspectRatio === "16:9"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  16:9 Landscape (1280x720)
                </button>
                <button
                  type="button"
                  onClick={() => setAspectRatio("1:1")}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all ${
                    aspectRatio === "1:1"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  1:1 Square Feed (1080x1080)
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Punchy Hook Title
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Stop Doing This On Facebook..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Curiosity Badge (Top-Left Pill)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  placeholder="e.g. NEW, FULL TUTORIAL, PRO TIP"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Background Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Background Image
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Upload className="h-3.5 w-3.5 text-blue-600" />
                  <span>{imageSrc ? "Change Image" : "Upload Video Frame / Photo"}</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                {imageSrc && (
                  <button
                    type="button"
                    onClick={() => setImageSrc(null)}
                    className="text-xs text-rose-600 hover:underline px-1"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPlayIcon}
                  onChange={(e) => setShowPlayIcon(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Include Central Play Icon Badge</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBorder}
                  onChange={(e) => setShowBorder(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Include High-CTR Vibrant Border</span>
              </label>
            </div>

            {showBorder && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-500">Border Color:</span>
                {["#FACC15", "#38BDF8", "#F43F5E", "#22C55E", "#FFFFFF"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setBorderColor(c)}
                    style={{ backgroundColor: c }}
                    className={`h-6 w-6 rounded-full border border-slate-300 transition-all ${
                      borderColor === c ? "ring-2 ring-blue-500 scale-110" : ""
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live Thumbnail Preview ({aspectRatio === "16:9" ? "1280 x 720" : "1080 x 1080"})
                </span>
                <span className="text-xs text-slate-400">High Resolution</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-300 shadow-lg bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
                <canvas ref={canvasRef} className="w-full h-auto block" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download Click-Worthy Thumbnail</span>
            </button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
