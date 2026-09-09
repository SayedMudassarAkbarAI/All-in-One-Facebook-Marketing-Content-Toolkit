"use client";

import React, { useState, useRef } from "react";
import { Upload, Download, Film, Sparkles, Camera } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

export default function FacebookVideoThumbnailGeneratorPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-video-thumbnail-generator")!;

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [captured, setCaptured] = useState<string | null>(null);
  const [format, setFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  const [isCapturing, setIsCapturing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
    setCaptured(null);
  };

  const handleVideoLoaded = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    setCurrentTime(t);
    const video = videoRef.current;
    if (video) {
      video.currentTime = t;
    }
  };

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setIsCapturing(true);
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL(format, 0.95);
      setCaptured(dataUrl);
    }
    setIsCapturing(false);
  };

  const handleDownload = () => {
    if (!captured) return;
    const link = document.createElement("a");
    link.download = `facebook-thumbnail.${format === "image/jpeg" ? "jpg" : "png"}`;
    link.href = captured;
    link.click();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Upload your video file (MP4, WebM, MOV) from your device.",
        "Drag the timeline slider to find the perfect frame—preview it in real-time.",
        "Click Capture Frame and download the high-resolution thumbnail ready for Facebook.",
      ]}
      benefits={[
        "Zero Uploads: Your video never leaves your browser — all processing is 100% local.",
        "Frame-Perfect Precision: Scrub through any video frame at any timestamp for the ideal shot.",
        "Full Video Resolution: Captures at your video's native resolution for crystal-clear thumbnails.",
        "No Video Compression: Download the raw frame pixel-perfect without additional quality loss.",
      ]}
      tips={[
        "The best thumbnail frames are ones where the subject is making eye contact with the camera or showing strong emotion.",
        "Capture a frame from 3-5 seconds into the video — intros typically have the best lighting and composition.",
        "After capturing, use the Facebook Text On Image tool to add a bold headline overlay to your thumbnail.",
      ]}
      faqs={[
        {
          question: "What video formats does this tool support?",
          answer:
            "This browser-based tool supports all formats your browser can natively play: MP4 (H.264), WebM, and MOV. MP4 has the widest compatibility across browsers.",
        },
        {
          question: "Can I upload large video files?",
          answer:
            "Yes! Since all processing happens locally in your browser, there are no server upload size limits. However, very large files (2GB+) may require a few seconds to load into your browser's video player.",
        },
      ]}
    >
      <div className="space-y-8">
        {/* Upload */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-10 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50/30 dark:border-slate-700 dark:bg-slate-900/40 dark:hover:border-blue-500"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 mb-4">
            <Film className="h-7 w-7" />
          </div>
          <p className="text-base font-bold text-slate-900 dark:text-white">
            {videoSrc ? "Click to Load a Different Video" : "Upload your Facebook video file"}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            MP4, WebM, MOV • Processed 100% locally in your browser
          </p>
        </div>

        {/* Video Player & Controls */}
        {videoSrc && (
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Video Preview */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Video Preview
                </label>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-black dark:border-slate-700 shadow-md">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    onLoadedMetadata={handleVideoLoaded}
                    className="w-full h-auto block"
                    preload="metadata"
                  />
                </div>

                {/* Timeline Scrubber */}
                {duration > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>Frame Position</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      step="0.04"
                      value={currentTime}
                      onChange={handleTimeChange}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                      <span>Start</span>
                      <span>↔ Drag to pick the perfect frame</span>
                      <span>End</span>
                    </div>
                  </div>
                )}

                {/* Format Selector */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Output Format:
                  </span>
                  <div className="flex gap-2">
                    {(["image/jpeg", "image/png"] as const).map((f) => (
                      <button
                        key={f}
                        type="button"
                        onClick={() => setFormat(f)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                          format === f
                            ? "bg-blue-600 text-white"
                            : "border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {f === "image/jpeg" ? "JPEG (Smaller)" : "PNG (Lossless)"}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCapture}
                  disabled={isCapturing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-all"
                >
                  <Camera className="h-4 w-4" />
                  <span>Capture This Frame as Thumbnail</span>
                </button>
              </div>

              {/* Captured Thumbnail */}
              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Captured Thumbnail
                </label>

                {captured ? (
                  <div className="space-y-4">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md dark:border-slate-700">
                      <img src={captured} alt="Captured thumbnail" className="w-full h-auto block" />
                    </div>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download Thumbnail</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-16 text-center dark:border-slate-800 dark:bg-slate-900">
                    <Camera className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-3" />
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Scrub the timeline and click Capture to extract your thumbnail
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </ToolPageLayout>
  );
}
