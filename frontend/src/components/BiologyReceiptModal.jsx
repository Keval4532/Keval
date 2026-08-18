import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Receipt, Download, Copy, Check, X, Sparkles, Share2,
  QrCode, Smartphone, Layers
} from "lucide-react";
import { toast } from "sonner";

export default function BiologyReceiptModal({
  isOpen,
  onClose,
  topicTitle = "Magnesium Physiology",
  takeAway = "More is not always better. Your goal is adequate daily intake from whole foods first.",
  items = [
    { label: "ATP Cofactor Binding", val: "300+ Enzymes" },
    { label: "Top Whole Food", val: "Pumpkin Seeds (156mg/oz)" },
    { label: "Optimal Timing", val: "Evening (1-2h before sleep)" }
  ],
  evidenceGrade = "Strong Evidence",
  dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}) {
  const receiptRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState("1:1"); // "1:1" | "9:16"
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownloadImage = async () => {
    setDownloading(true);
    try {
      // Draw receipt to canvas natively
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const isStory = aspectRatio === "9:16";

      const width = 1080;
      const height = isStory ? 1920 : 1080;
      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      // Receipt Card Box
      const cardW = 840;
      const cardH = isStory ? 1400 : 920;
      const cardX = (width - cardW) / 2;
      const cardY = (height - cardH) / 2;

      ctx.fillStyle = "#121212";
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, 32);
      ctx.fill();
      ctx.stroke();

      // Header
      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 36px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("KEVALBIO RECEIPT", width / 2, cardY + 90);

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "20px monospace";
      ctx.fillText(`BIOLOGY RECORD • ${dateStr.toUpperCase()}`, width / 2, cardY + 130);

      // Divider
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(cardX + 40, cardY + 160);
      ctx.lineTo(cardX + cardW - 40, cardY + 160);
      ctx.stroke();
      ctx.setLineDash([]);

      // Topic Title
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 44px 'Inter', sans-serif";
      ctx.fillText(topicTitle, width / 2, cardY + 230);

      ctx.fillStyle = "#00E676";
      ctx.font = "22px monospace";
      ctx.fillText(`[ ${evidenceGrade.toUpperCase()} ]`, width / 2, cardY + 275);

      // Itemized rows
      let yOffset = cardY + 340;
      ctx.textAlign = "left";
      ctx.font = "24px monospace";

      items.forEach((item) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        ctx.fillText(item.label, cardX + 60, yOffset);

        ctx.textAlign = "right";
        ctx.fillStyle = "#00F0FF";
        ctx.fillText(item.val, cardX + cardW - 60, yOffset);

        ctx.textAlign = "left";
        yOffset += 55;
      });

      // The One Thing to Remember Box
      yOffset += 20;
      ctx.fillStyle = "rgba(0, 240, 255, 0.06)";
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(cardX + 40, yOffset, cardW - 80, 160, 20);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#00F0FF";
      ctx.font = "bold 18px monospace";
      ctx.fillText("THE ONE THING TO REMEMBER:", cardX + 65, yOffset + 40);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "22px 'Inter', sans-serif";
      // wrap text
      const words = takeAway.split(" ");
      let line = "";
      let lineY = yOffset + 80;
      words.forEach((w) => {
        const testLine = line + w + " ";
        if (ctx.measureText(testLine).width > cardW - 140) {
          ctx.fillText(line, cardX + 65, lineY);
          line = w + " ";
          lineY += 32;
        } else {
          line = testLine;
        }
      });
      ctx.fillText(line, cardX + 65, lineY);

      // Barcode / Footer at bottom
      const footerY = cardY + cardH - 120;
      ctx.textAlign = "center";
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.font = "18px monospace";
      ctx.fillText("||| | |||| ||| ||||| | ||| |||| | |||||", width / 2, footerY);

      ctx.fillStyle = "#00F0FF";
      ctx.font = "20px monospace";
      ctx.fillText("kevalbio.app • Understand Your Body", width / 2, footerY + 40);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement("a");
        link.download = `KEVALBIO_${topicTitle.replace(/\s/g, "_")}_Receipt.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        toast.success(`Biology receipt downloaded (${aspectRatio})!`);
        setDownloading(false);
      });
    } catch {
      toast.error("Could not export receipt image.");
      setDownloading(false);
    }
  };

  const handleCopyText = () => {
    const text = `🧾 KEVALBIO BIOLOGY RECEIPT\n\nTopic: ${topicTitle}\nEvidence: ${evidenceGrade}\n\n${items.map(i => `• ${i.label}: ${i.val}`).join("\n")}\n\n💡 The One Thing to Remember:\n"${takeAway}"\n\nPowered by KEVALBIO (kevalbio.app)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Receipt text copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        className="relative w-full max-w-md rounded-3xl border border-white/15 bg-[#080808] p-6 sm:p-7 shadow-2xl space-y-5 my-8"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Receipt className="h-4 w-4" />
          <span>Viral Biology Receipt</span>
        </div>

        {/* Aspect Ratio Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAspectRatio("1:1")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs transition-all ${
              aspectRatio === "1:1"
                ? "bg-cyan-400 text-black font-semibold"
                : "border border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>1:1 Square (Twitter/Chat)</span>
          </button>

          <button
            onClick={() => setAspectRatio("9:16")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs transition-all ${
              aspectRatio === "9:16"
                ? "bg-cyan-400 text-black font-semibold"
                : "border border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>9:16 Story (Instagram)</span>
          </button>
        </div>

        {/* Visual Receipt Card Component */}
        <div
          ref={receiptRef}
          className="relative rounded-3xl border-2 border-cyan-400/40 bg-gradient-to-b from-[#111111] via-[#0E0E0E] to-[#0A0A0A] p-6 space-y-4 shadow-[0_0_30px_rgba(0,240,255,0.15)] font-mono text-left"
        >
          {/* Header */}
          <div className="text-center space-y-1 pb-3 border-b border-white/10 border-dashed">
            <div className="font-display text-base font-bold tracking-tight text-white">
              KEVAL<span className="text-cyan-400">BIO</span> RECEIPT
            </div>
            <div className="text-[10px] text-white/40 tracking-wider">
              {dateStr.toUpperCase()} • BIOLOGY RECORD
            </div>
          </div>

          {/* Topic Title & Badge */}
          <div className="text-center space-y-1">
            <h3 className="font-display text-xl font-normal text-white">{topicTitle}</h3>
            <span className="inline-block rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-400/20">
              {evidenceGrade}
            </span>
          </div>

          {/* Itemized Breakdown Rows */}
          <div className="space-y-2 py-2 border-t border-b border-white/10 border-dashed text-xs">
            {items.map((it, idx) => (
              <div key={idx} className="flex justify-between items-center text-[11px]">
                <span className="text-white/60">{it.label}</span>
                <span className="text-cyan-300 font-semibold">{it.val}</span>
              </div>
            ))}
          </div>

          {/* The One Thing to Remember */}
          <div className="rounded-2xl border border-cyan-400/20 bg-black/60 p-3.5 text-xs text-white/90 space-y-1">
            <strong className="text-cyan-400 text-[10px] uppercase tracking-wider block">
              The One Thing to Remember:
            </strong>
            <p className="font-light text-[11px] leading-relaxed text-white/80">"{takeAway}"</p>
          </div>

          {/* Barcode / Tagline Footer */}
          <div className="text-center pt-2 space-y-1">
            <div className="text-xs tracking-[0.3em] text-white/30 font-mono select-none">
              ||| | |||| ||| ||||| | |||
            </div>
            <div className="text-[10px] text-cyan-400/80">
              kevalbio.app • Understand Your Biology
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleDownloadImage}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl bg-cyan-400 py-3 text-xs font-semibold text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{downloading ? "Generating..." : "Save Image"}</span>
          </button>

          <button
            onClick={handleCopyText}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-2xl border border-white/15 bg-white/[0.03] py-3 text-xs font-medium text-white hover:border-white/30 hover:bg-white/[0.06] transition-all"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-cyan-400" />}
            <span>{copied ? "Copied!" : "Copy Text"}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
