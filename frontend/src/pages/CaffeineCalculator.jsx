import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Sparkles, Coffee } from "lucide-react";
import CaffeineVisualizer from "../components/CaffeineVisualizer";
import ShareCardModal from "../components/ShareCardModal";
import FeedbackWidget from "../components/FeedbackWidget";

export default function CaffeineCalculator() {
  const navigate = useNavigate();
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <button
          onClick={() => setShareOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share Tool
        </button>
      </div>

      {/* Visualizer */}
      <CaffeineVisualizer onShare={() => setShareOpen(true)} />

      {/* Feedback Widget */}
      <FeedbackWidget query="Caffeine Half-Life & Sleep Cutoff Tool" />

      {/* Share Modal */}
      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        topicTitle="Caffeine Clearance & Sleep Architecture"
        takeAway="Caffeine has a 5-hour half-life. Lingering blood levels past bedtime block slow-wave restorative deep sleep."
        bullets={[
          "Calculate your personal cutoff time based on 5h metabolic decay.",
          "Keep blood concentration <25mg before sleep to protect deep sleep.",
          "CYP1A2 genetics dictate fast vs slow clearance."
        ]}
      />
    </div>
  );
}
