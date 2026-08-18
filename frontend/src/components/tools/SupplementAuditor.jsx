import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Pill, AlertTriangle, ShieldCheck, Sparkles, DollarSign,
  Search, ArrowRight, CheckCircle2, Info, HelpCircle, Layers
} from "lucide-react";
import { toast } from "sonner";
import { auditSupplementFormula } from "../../lib/api";

const SAMPLES = [
  {
    name: "Commercial Pre-Workout Blend",
    text: "Proprietary Performance Energy Matrix 2800mg (Caffeine Anhydrous, L-Arginine, Beta-Alanine, Taurine, L-Tyrosine, Green Tea Extract), Magnesium Oxide 100mg"
  },
  {
    name: "Overpriced Sleep Aid Capsule",
    text: "Deep Sleep Proprietary Complex 750mg (Magnesium Oxide, Valerian Root, Chamomile, Melatonin 5mg), Cyanocobalamin 500mcg"
  },
  {
    name: "Greens & Superfood Powder",
    text: "Organic Superfood Absorption Matrix 3200mg (Spirulina, Wheatgrass, Ashwagandha Root, Chlorella, Beet Root Powder), D-Alpha Tocopherol"
  },
  {
    name: "Transparent Single-Ingredient Stack",
    text: "Creapure Creatine Monohydrate 5000mg, Pure L-Citrulline 6000mg, Magnesium Bisglycinate 300mg elemental, Vitamin D3 3000IU + K2 MK7 100mcg"
  }
];

export default function SupplementAuditor() {
  const [formulaText, setFormulaText] = useState(SAMPLES[0].text);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAudit = async () => {
    if (!formulaText.trim()) {
      toast.error("Please paste a supplement facts label or ingredient list.");
      return;
    }
    setLoading(true);
    try {
      const data = await auditSupplementFormula(formulaText);
      setResults(data);
      toast.success("Supplement formula audited!");
    } catch (err) {
      toast.error("Failed to audit formula. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            <Pill className="h-4 w-4" />
            <span>Supplement Value & Proprietary Blend Auditor</span>
          </div>

          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-emerald-300 border border-emerald-400/20">
            Consumer Science & Transparency
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
          Unmask Under-Dosed Blends & Stop Wasting Money
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light max-w-3xl leading-relaxed">
          Audit supplement labels to detect hidden proprietary matrices, identify cheap low-bioavailability filler forms (like Magnesium Oxide at ~4% absorption), and compare doses against clinical human trials.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7 space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-white block">
            1. Paste Supplement Facts / Label Text
          </span>
          <p className="text-[11px] text-white/50 mt-0.5">
            Or pick one of the sample formulas below to test:
          </p>
        </div>

        {/* Sample Chips */}
        <div className="flex flex-wrap gap-2">
          {SAMPLES.map((s) => (
            <button
              key={s.name}
              onClick={() => {
                setFormulaText(s.text);
                toast.info(`Loaded: ${s.name}`);
              }}
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-1.5 text-xs text-white/70 hover:border-emerald-400/40 hover:text-white transition-all"
            >
              {s.name}
            </button>
          ))}
        </div>

        <textarea
          rows={4}
          value={formulaText}
          onChange={(e) => setFormulaText(e.target.value)}
          placeholder="Paste ingredients (e.g. Proprietary Energy Complex 2500mg, Magnesium Oxide 200mg, Creatine 1000mg)..."
          className="w-full rounded-2xl border border-white/15 bg-black/70 p-4 text-xs text-white font-mono outline-none focus:border-emerald-400 placeholder:text-white/30"
        />

        <div className="flex justify-end">
          <button
            onClick={handleAudit}
            disabled={loading || !formulaText.trim()}
            className="flex items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(0,230,118,0.25)] hover:bg-emerald-300 transition-all disabled:opacity-50"
          >
            {loading ? <span>Auditing Formula...</span> : <span>Audit Formula Transparency</span>}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Output Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5 pt-2"
        >
          {/* Proprietary Blend Status Card */}
          <div className="rounded-3xl border border-white/10 bg-black/50 p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-semibold text-white">
                {results.proprietary_blend_audit.verdict}
              </span>
              <span
                className={`rounded-full px-3 py-0.5 text-xs font-mono font-bold ${
                  results.proprietary_blend_audit.detected
                    ? "bg-red-400/20 text-red-300 border border-red-400/30"
                    : "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                }`}
              >
                {results.proprietary_blend_audit.detected ? "Hidden Dosages" : "Transparent"}
              </span>
            </div>
            <p className="text-xs text-white/70 font-light leading-relaxed">
              {results.proprietary_blend_audit.explanation}
            </p>
          </div>

          {/* Form & Bioavailability Audit */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-400" />
              <span>Chemical Form & Bioavailability Flags</span>
            </h3>

            <div className="space-y-3">
              {results.form_and_bioavailability_flags.map((flag, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{flag.ingredient}</span>
                    <span className="text-[10px] text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-lg font-mono">
                      {flag.issue}
                    </span>
                  </div>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    <strong>Recommendation:</strong> {flag.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Dosing Comparison */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
            <h3 className="font-display text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Clinical Trial Dosing Benchmarks</span>
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {results.clinical_trial_comparisons.map((c, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 text-xs"
                >
                  <span className="font-bold text-white block text-sm">{c.ingredient}</span>
                  <div className="space-y-1 text-white/70">
                    <div><strong className="text-cyan-300">Clinically Effective Dose:</strong> {c.clinical_standard_dose}</div>
                    <div><strong className="text-emerald-300">Optimal Form:</strong> {c.optimal_form}</div>
                    <div><strong className="text-purple-300">Whole-Food Alternative:</strong> {c.food_alternative}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Money Saving Strategy */}
          <div className="rounded-3xl border border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 to-transparent p-6 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <DollarSign className="h-4 w-4" />
              Smart Money-Saving Recommendation
            </span>
            <p className="text-xs text-white/80 font-light leading-relaxed">
              {results.money_saving_strategy}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
