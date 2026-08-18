import React from "react";
import { motion } from "framer-motion";
import { Share2, Copy, Check, X, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

export default function ShareCardModal({ isOpen, onClose, topicTitle, takeAway, bullets = [] }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const url = window.location.href;
  const shareText = `5 things you should know about ${topicTitle || "your biology"}:\n\n${
    takeAway || "Understand your body and make better decisions."
  }\n\nPowered by KEVALBIO: ${url}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText(shareText);
    toast.success("Card text copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#0A0A0A] p-6 sm:p-7 shadow-2xl space-y-5"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Share2 className="h-4 w-4" />
          Share with a Friend
        </div>

        {/* Visual Shareable Card */}
        <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.04] to-black p-5 space-y-3 shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold tracking-tight text-white">
              KEVAL<span className="text-cyan-400">BIO</span>
            </span>
            <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-cyan-300 border border-cyan-400/20">
              Personal Biology Guide
            </span>
          </div>

          <h3 className="font-display text-lg font-normal text-white">
            {topicTitle || "Understanding Your Biology"}
          </h3>

          <div className="rounded-xl border border-white/5 bg-black/50 p-3 text-xs text-white/80 leading-relaxed font-light">
            <strong className="text-cyan-300 block text-[10px] uppercase tracking-wider mb-1 font-semibold">
              The One Thing to Remember:
            </strong>
            {takeAway || "Food and sleep first—supplements only when they actually add value."}
          </div>

          {bullets.length > 0 && (
            <ul className="space-y-1 text-xs text-white/60 list-disc list-inside pt-1">
              {bullets.slice(0, 3).map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}

          <div className="pt-2 text-[10px] text-white/35">
            kevalbio.app • Evidence-based human physiology
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-cyan-400 py-2.5 text-xs font-semibold text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>

          <button
            onClick={handleCopyCard}
            className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-medium text-white hover:border-white/20 hover:bg-white/[0.06] transition-all"
          >
            <Share2 className="h-3.5 w-3.5 text-cyan-400" />
            Copy Card Text
          </button>
        </div>
      </motion.div>
    </div>
  );
}
