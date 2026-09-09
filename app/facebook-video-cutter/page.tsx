"use client";

import React, { useState, useRef } from "react";
import { Scissors, Upload, Play, Pause, Download, VolumeX, Sparkles } from "lucide-react";
import { ToolPageLayout } from "@/components/ToolPageLayout";
import { TOOLS } from "@/data/tools";

export default function FacebookVideoCutterPage() {
  const tool = TOOLS.find((t) => t.slug === "facebook-video-cutter")!;

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(15);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVideoSrc(url);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = Math.floor(videoRef.current.duration);
      setDuration(dur);
      setStartTime(0);
      setEndTime(Math.min(dur, 30));
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.currentTime = startTime;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      if (videoRef.current.currentTime >= endTime) {
        videoRef.current.pause();
        setIsPlaying(false);
        videoRef.current.currentTime = startTime;
      }
    }
  };

  return (
    <ToolPageLayout
      tool={tool}
      howToUse={[
        "Upload any MP4, MOV, or WebM video file from your device.",
        "Use the start and end sliders to choose the exact segment for your Facebook Reel or Feed post.",
        "Preview the trimmed segment in real-time and export your cut clip.",
      ]}
      benefits={[
        "Quickly cut out dead air, silent intros, or long conclusions without heavy editing software.",
        "Optimized for Facebook Reels (under 60s) and Facebook Feed posts.",
        "Processes preview directly in your browser with zero latency.",
      ]}
      tips={[
        "Hook viewers in the first 3 seconds with movement or dialogue.",
        "Facebook Reels between 15 and 30 seconds have the highest completion and replay rates.",
      ]}
      faqs={[
        {
          question: "What is the best video length for Facebook Reels?",
          answer:
            "While Facebook Reels can be up to 90 seconds, videos between 15 and 30 seconds typically generate the highest algorithmic distribution and viewer retention.",
        },
        {
          question: "Can I mute the audio for silent autoplay?",
          answer:
            "Yes! You can toggle the mute option before exporting, which is great for visual demonstrations where users browse Facebook with audio off.",
        },
      ]}
    >
      {!videoSrc ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50/20 transition-all dark:border-slate-700 dark:bg-slate-900/40"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400 mb-3">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Click to select a video to trim
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Supports MP4, WebM, MOV (Instant local browser preview)
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Video Player */}
          <div className="relative overflow-hidden rounded-2xl bg-black flex items-center justify-center max-h-[420px]">
            <video
              ref={videoRef}
              src={videoSrc}
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              muted={isMuted}
              className="max-h-[420px] w-auto"
            />
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
            <button
              type="button"
              onClick={togglePlay}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span>{isPlaying ? "Pause Preview" : "Play Segment"}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                isMuted
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                  : "bg-white text-slate-700 dark:bg-slate-700 dark:text-slate-200"
              }`}
            >
              <VolumeX className="h-4 w-4" />
              <span>{isMuted ? "Audio Muted" : "Mute Audio"}</span>
            </button>
          </div>

          {/* Trimmer Range Sliders */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950 space-y-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Start: {startTime}s</span>
              <span className="text-blue-600 dark:text-blue-400">
                Segment Duration: {Math.max(0, endTime - startTime)}s
              </span>
              <span>End: {endTime}s (Total: {duration}s)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Start Time (seconds)</label>
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, endTime - 1)}
                  value={startTime}
                  onChange={(e) => setStartTime(Number(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">End Time (seconds)</label>
                <input
                  type="range"
                  min={startTime + 1}
                  max={duration || 60}
                  value={endTime}
                  onChange={(e) => setEndTime(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolPageLayout>
  );
}
