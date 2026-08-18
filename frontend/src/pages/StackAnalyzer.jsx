import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Pill, ShieldCheck, AlertTriangle, Clock, Sparkles, CheckCircle2,
  ArrowRight, Loader2, Info, Scissors, DollarSign, Share2, Check, Flame
} from "lucide-react";
import { toast } from "sonner";
import { Panel, SectionLabel, EvidenceBadge } from "../components/primitives";
import { analyzeStack } from "../lib/api";
import ShareCardModal from "../components/ShareCardModal";
import FeedbackWidget from "../components/FeedbackWidget";

const PRESET_STACKS = [
  "Multivitamin + Vitamin D3 5000IU + Zinc Picolinate + ZMA + Whey Protein + Creatine",
  "Vitamin D + Magnesium Glycinate + Zinc + Omega-3 + Creatine",
  "Magnesium Oxide + Multivitamin + Pre-workout + B-Complex",
  "Ashwagandha + Magnesium Glycinate + L-Theanine"
];

export default function StackAnalyzer() {
  const [stackInput, setStackInput] = useState("Multivitamin + Vitamin D3 5000IU + Zinc Picolinate + ZMA + Whey Protein + Creatine");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleAnalyze = async (text) => {
    const input = (text || stackInput).trim();
    if (!input) return;
    setLoading(true);
    try {
      const res = await analyzeStack(input);
      setResult(res);
      toast.success("Stack analysis complete!");
    } catch (e) {
      toast.error("Could not analyze supplement stack.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
            <Pill className="h-3.5 w-3.5" />
            <span>Supplement Stack Waste Detector & Redundancy Index</span>
          </div>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Audit</span>
          </button>
        </div>

        <h1 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-4xl">
          Supplement <span className="text-cyan-400">Waste Detector</span> & Redundancy Index
        </h1>
        <p className="mt-2 text-sm text-white/50 max-w-2xl font-light">
          Enter your current supplements or multi-vitamin stack. KEVALBIO checks for wasteful overlaps, chemical bioavailability issues, mineral competition, and builds your optimal daily timing schedule.
        </p>
      </div>

      {/* Preset Stacks */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-white/40 uppercase tracking-wider text-[10px]">Try Stack:</span>
        {PRESET_STACKS.map((ps, i) => (
          <button
            key={i}
            onClick={() => { setStackInput(ps); handleAnalyze(ps); }}
            className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
          >
            {ps.split("+")[0]}...
          </button>
        ))}
      </div>

      {/* Input Form */}
      <Panel className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            placeholder="e.g. Multivitamin + D3 5000IU + Zinc Picolinate + ZMA + Whey Protein + Creatine..."
            className="w-full rounded-2xl border border-white/10 bg-black/50 px-4 py-3.5 text-sm text-white placeholder:text-white/30 focus:border-cyan-400 focus:outline-none"
          />
          <button
            onClick={() => handleAnalyze()}
            disabled={loading}
            className="shrink-0 flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            Detect Waste & Redundancies
          </button>
        </div>
      </Panel>

      {/* Results Dashboard */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* 1. Redundancy Index & Score Gauge */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-6 sm:p-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-300">Stack Efficiency Diagnostic</span>
                <h3 className="font-display text-xl sm:text-2xl font-light text-white mt-1">
                  Redundancy Index: <span className="font-semibold text-cyan-400">{result.redundancy_score}%</span>
                </h3>
                <span className="text-xs text-white/50 block mt-0.5">{result.waste_index_rating}</span>
              </div>

              {/* Visual Meter Bar */}
              <div className="w-full sm:w-64 space-y-1.5">
                <div className="flex justify-between text-[11px] text-white/50 font-mono">
                  <span>0% (Clean)</span>
                  <span>100% (High Waste)</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${Math.max(5, result.redundancy_score)}%`,
                      backgroundColor: result.redundancy_score > 30 ? "#FF3B30" : result.redundancy_score > 0 ? "#FFEA00" : "#00E676"
                    }}
                  />
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light border-t border-white/10 pt-4">
              {result.verdict}
            </p>
          </div>

          {/* 2. "What to Keep" vs "What to Cut" (Money Saving Advice) */}
          <div className="grid gap-5 sm:grid-cols-2">
            {/* What to Keep */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.03] p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" />
                <span>What to Keep (High-Value Foundations)</span>
              </div>

              <div className="space-y-3">
                {(result.what_to_keep || []).map((k, i) => (
                  <div key={i} className="rounded-2xl border border-emerald-500/20 bg-black/40 p-4 text-xs space-y-1.5">
                    <div className="font-semibold text-sm text-white">{k.name}</div>
                    <p className="text-white/70 font-light leading-relaxed">{k.reason}</p>
                    <div className="text-[11px] text-emerald-300 font-medium pt-1">
                      <strong>Action:</strong> {k.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What to Cut */}
            <div className="rounded-3xl border border-red-500/30 bg-red-500/[0.03] p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Scissors className="h-4 w-4" />
                <span>What to Cut / Streamline (Save Money & Safety)</span>
              </div>

              <div className="space-y-3">
                {(result.what_to_cut || []).map((c, i) => (
                  <div key={i} className="rounded-2xl border border-red-500/20 bg-black/40 p-4 text-xs space-y-1.5">
                    <div className="font-semibold text-sm text-red-200">{c.name}</div>
                    <p className="text-white/70 font-light leading-relaxed">{c.reason}</p>
                    <div className="text-[11px] text-red-300 font-medium pt-1">
                      <strong>Action:</strong> {c.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Bioavailability Form Audits */}
          {result.form_audits && result.form_audits.length > 0 && (
            <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/[0.02] p-6 sm:p-7 space-y-3">
              <div className="flex items-center gap-2 text-yellow-300 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>Bioavailability Form Audit (Low-Absorption Alerts)</span>
              </div>

              <div className="space-y-3 pt-1">
                {result.form_audits.map((fa, i) => (
                  <div key={i} className="rounded-2xl border border-yellow-400/20 bg-black/50 p-4 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-yellow-200">{fa.nutrient}</span>
                      <span className="rounded bg-yellow-400/20 px-2 py-0.5 text-[10px] text-yellow-300">{fa.issue}</span>
                    </div>
                    <p className="text-white/70 font-light leading-relaxed">{fa.detail}</p>
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-[11px] text-cyan-300">
                      <strong>Optimal Switch:</strong> {fa.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. Synergies & Positive Interactions */}
          {result.synergies_detected && result.synergies_detected.length > 0 && (
            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/[0.02] p-6 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Positive Synergies in Your Stack</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 pt-1">
                {result.synergies_detected.map((syn, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1">
                    <div className="font-semibold text-cyan-300">{syn.pair}</div>
                    <p className="text-white/70 font-light leading-relaxed">{syn.mechanism}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Mineral Competition & Interactions */}
          {result.interactions && result.interactions.length > 0 && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-3">
              <SectionLabel>Absorption Competition Warnings</SectionLabel>
              <div className="space-y-3 pt-1">
                {result.interactions.map((int, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white text-sm">{int.substance_a} vs. {int.substance_b}</span>
                      <span className="rounded bg-yellow-400/15 px-2 py-0.5 text-[10px] text-yellow-300">{int.severity}</span>
                    </div>
                    <p className="text-white/70 leading-relaxed font-light">{int.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. Optimal 3-Phase Daily Timing Schedule */}
          <Panel className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              <SectionLabel>Optimal Daily Timing Protocol</SectionLabel>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold uppercase text-[10px] tracking-wider">
                  <span>🌅 Morning (With Fat)</span>
                </div>
                <p className="text-white/50 text-[11px]">Best for fat-soluble vitamins and active compounds.</p>
                <div className="space-y-1 pt-1">
                  {(result.timing_schedule?.morning || []).length ? (
                    result.timing_schedule.morning.map((s, i) => (
                      <div key={i} className="rounded bg-white/5 px-2.5 py-1 text-white/90 font-medium">{s}</div>
                    ))
                  ) : (
                    <div className="text-white/30 italic">None scheduled</div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold uppercase text-[10px] tracking-wider">
                  <span>🥗 With Main Meals / Lunch</span>
                </div>
                <p className="text-white/50 text-[11px]">Prevents gastric nausea and buffers trace minerals.</p>
                <div className="space-y-1 pt-1">
                  {(result.timing_schedule?.with_meals || []).length ? (
                    result.timing_schedule.with_meals.map((s, i) => (
                      <div key={i} className="rounded bg-white/5 px-2.5 py-1 text-white/90 font-medium">{s}</div>
                    ))
                  ) : (
                    <div className="text-white/30 italic">None scheduled</div>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold uppercase text-[10px] tracking-wider">
                  <span>🌙 Evening (1-2h Before Bed)</span>
                </div>
                <p className="text-white/50 text-[11px]">Supports neuromuscular relaxation and deep sleep.</p>
                <div className="space-y-1 pt-1">
                  {(result.timing_schedule?.evening || []).length ? (
                    result.timing_schedule.evening.map((s, i) => (
                      <div key={i} className="rounded bg-white/5 px-2.5 py-1 text-white/90 font-medium">{s}</div>
                    ))
                  ) : (
                    <div className="text-white/30 italic">None scheduled</div>
                  )}
                </div>
              </div>
            </div>
          </Panel>
        </motion.div>
      )}

      {/* Feedback Widget */}
      <FeedbackWidget query="Supplement Stack Waste Detector" />

      {/* Share Modal */}
      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        topicTitle="Supplement Stack Redundancy Audit"
        takeAway={result?.verdict || "Food first. Stack supplements with precise timing and zero duplicate overlap."}
        bullets={[
          `Redundancy Index: ${result?.redundancy_score || 0}%`,
          "Separated competing minerals (Zinc vs Copper, Iron vs Calcium).",
          "Optimized 3-phase morning, meal, and evening schedule."
        ]}
      />
    </div>
  );
}
