"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Download, Type, RefreshCw, Sparkles, Palette, AlignCenter, Layout } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

const PRESET_GRADIENTS = [
  { id: "meta", name: "Meta Blue", colors: ["#1877F2", "#0052CC"] },
  { id: "dark", name: "Midnight Onyx", colors: ["#0F172A", "#1E293B"] },
  { id: "sunset", name: "Sunset Blaze", colors: ["#F97316", "#DC2626"] },
  { id: "emerald", name: "Emerald Growth", colors: ["#059669", "#064E3B"] },
  { id: "purple", name: "Electric Violet", colors: ["#7C3AED", "#4C1D95"] },
];

export default function FacebookTextOnImagePage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-text-on-image")!;

  const [headline, setHeadline] = useState("5 Secrets to Mastering Facebook Ads in 2025");
  const [subtitle, setSubtitle] = useState("Save this post and implement step #3 today 👇");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [bannerStyle, setBannerStyle] = useState<"banner" | "shadow" | "box" | "none">("banner");
  const [fontSize, setFontSize] = useState<number>(48);
  const [position, setPosition] = useState<"center" | "bottom" | "top">("center");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeGradient, setActiveGradient] = useState(PRESET_GRADIENTS[0]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Redraw canvas whenever inputs change
  useEffect(() => {
    drawCanvas();
  }, [headline, subtitle, textColor, bannerStyle, fontSize, position, imageSrc, activeGradient]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Standard Facebook Feed Post resolution (1200 x 630)
    canvas.width = 1200;
    canvas.height = 630;

    const renderText = () => {
      ctx.textAlign = "center";

      // Position calculations
      let startY = 315;
      if (position === "top") startY = 160;
      if (position === "bottom") startY = 460;

      // Wrap headline text
      ctx.font = `bold ${fontSize}px sans-serif`;
      const words = headline.split(" ");
      let line = "";
      const lines: string[] = [];
      const maxWidth = 1000;

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

      const lineHeight = fontSize * 1.25;
      const totalBlockHeight = lines.length * lineHeight + (subtitle ? 45 : 0);
      const boxStartY = startY - (totalBlockHeight / 2) + (fontSize * 0.2);

      // Render banner background if selected
      if (bannerStyle === "banner") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
        ctx.fillRect(0, boxStartY - 30, 1200, totalBlockHeight + 50);
      } else if (bannerStyle === "box") {
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        const boxWidth = Math.min(1080, Math.max(...lines.map((l) => ctx.measureText(l).width)) + 80);
        ctx.beginPath();
        ctx.roundRect((1200 - boxWidth) / 2, boxStartY - 25, boxWidth, totalBlockHeight + 40, 20);
        ctx.fill();
      }

      // Draw Headline Lines
      lines.forEach((l, idx) => {
        const currentY = startY - ((lines.length - 1) * lineHeight) / 2 + idx * lineHeight;

        if (bannerStyle === "shadow" || bannerStyle === "none") {
          ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
          ctx.shadowBlur = 16;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 4;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = textColor;
        ctx.fillText(l.trim(), 600, currentY);
      });

      // Draw Subtitle
      if (subtitle.trim()) {
        ctx.font = `500 ${Math.max(22, Math.round(fontSize * 0.45))}px sans-serif`;
        ctx.fillStyle = textColor === "#FFFFFF" ? "#E2E8F0" : textColor;
        const subY = startY + (lines.length * lineHeight) / 2 + 25;
        ctx.fillText(subtitle.trim(), 600, subY);
      }
    };

    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        // Aspect Fill background image
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const shiftX = (canvas.width - img.width * ratio) / 2;
        const shiftY = (canvas.height - img.height * ratio) / 2;

        ctx.drawImage(img, 0, 0, img.width, img.height, shiftX, shiftY, img.width * ratio, img.height * ratio);

        // Add subtle dark tint for readability
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, 1200, 630);

        renderText();
      };
      img.src = imageSrc;
    } else {
      // Draw Gradient Background
      const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
      gradient.addColorStop(0, activeGradient.colors[0]);
      gradient.addColorStop(1, activeGradient.colors[1]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 630);

      renderText();
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
    link.download = "facebook-text-graphic.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Type your headline and supporting subtitle.",
        "Upload a photo or choose from modern vibrant Facebook gradient presets.",
        "Adjust text size, contrast banner styles, and click Download High-Res Graphic.",
      ]}
      benefits={[
        "No complex design tools needed: Generate professional text-overlays in under 30 seconds.",
        "Engineered for Facebook Feed: Exact 1200x630 resolution prevents cropping or pixelation.",
        "High-Contrast Banners: Ensures text is effortlessly readable even on busy mobile screens.",
        "100% Private & Browser-based: Zero uploads or waiting time.",
      ]}
      tips={[
        "Keep your headline under 8 words so it can be read in 1.5 seconds while users scroll.",
        "Use high contrast: white text on dark/semi-transparent banners outperforms colored text on raw photos.",
        "Pair with a question in your post caption to maximize comment velocity.",
      ]}
      faqs={[
        {
          question: "Does Facebook still have a 20% text rule?",
          answer:
            "Facebook officially removed the hard 20% text penalty for paid ads. However, images where text is clean, centered, and unobstructed consistently receive lower CPC and higher organic engagement.",
        },
        {
          question: "What is the best image resolution for Facebook feed posts?",
          answer:
            "1200 x 630 pixels (1.91:1 aspect ratio) is the gold standard for landscape Facebook feed posts and link previews. This tool exports directly at 1200x630 at maximum PNG clarity.",
        },
      ]}
    >
      <div className="space-y-8">
        {/* Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Main Headline Hook
              </label>
              <textarea
                rows={2}
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="Enter compelling headline..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Supporting Subtitle (Optional)
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Swipe to learn more 👇"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Background Style: Photo vs Gradients */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Background Source
              </label>
              <div className="flex gap-2 mb-2.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Upload className="h-3.5 w-3.5 text-blue-600" />
                  <span>{imageSrc ? "Replace Photo" : "Upload Custom Photo"}</span>
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
                    className="text-xs text-rose-600 hover:underline px-2"
                  >
                    Use Gradient Instead
                  </button>
                )}
              </div>

              {!imageSrc && (
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_GRADIENTS.map((g) => (
                    <div
                      key={g.id}
                      onClick={() => setActiveGradient(g)}
                      style={{
                        background: `linear-gradient(135deg, ${g.colors[0]}, ${g.colors[1]})`,
                      }}
                      className={`h-9 rounded-xl cursor-pointer border-2 transition-all ${
                        activeGradient.id === g.id ? "border-white shadow-md scale-105" : "border-transparent opacity-80 hover:opacity-100"
                      }`}
                      title={g.name}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Contrast Banner & Text Position */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Contrast Style
                </label>
                <select
                  value={bannerStyle}
                  onChange={(e) => setBannerStyle(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="banner">Full Dark Ribbon</option>
                  <option value="box">Rounded Text Box</option>
                  <option value="shadow">Drop Shadow Only</option>
                  <option value="none">Clean Text</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Vertical Position
                </label>
                <select
                  value={position}
                  onChange={(e) => setPosition(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
              </div>
            </div>

            {/* Font Size & Color */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Font Size: {fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="28"
                  max="72"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Text Color
                </span>
                <div className="flex gap-2">
                  {["#FFFFFF", "#FEF08A", "#000000", "#67E8F9"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTextColor(c)}
                      style={{ backgroundColor: c }}
                      className={`h-7 w-7 rounded-lg border border-slate-300 dark:border-slate-600 transition-all ${
                        textColor === c ? "ring-2 ring-blue-500 scale-110" : ""
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas Live Preview & Export */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Live 1200 x 630 Facebook Graphic
                </span>
                <span className="text-xs text-slate-400">1.91:1 Landscape Feed</span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-300 shadow-md bg-slate-100 dark:border-slate-700 dark:bg-slate-950">
                <canvas ref={canvasRef} className="w-full h-auto block" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>Download 1200x630 Facebook Graphic</span>
            </button>
          </div>
        </div>
      </div>
    </ToolPageLayout>
  );
}
