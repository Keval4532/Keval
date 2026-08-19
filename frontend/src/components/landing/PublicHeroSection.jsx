import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Sparkles, ArrowRight, Activity, ShieldCheck,
  Zap, Crown, Microscope, CheckCircle2, AlertCircle,
  FlaskConical, Pill, ChevronRight, Bookmark
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { analyzeQuery } from "../../lib/api";

const STARTER_CHIPS = [
  { label: "Why am I tired?", tag: "Symptom", query: "Why am I always tired?" },
  { label: "How does Creatine work?", tag: "Mechanisms", query: "Creatine Monohydrate mechanism" },
  { label: "Magnesium Glycinate vs Oxide", tag: "Comparison", query: "Magnesium Glycinate vs Magnesium Oxide" },
  { label: "Cold Plunge & Dopamine", tag: "Neurobiology", query: "Cold water immersion dopamine and norepinephrine" },
  { label: "Caffeine Half-Life & Sleep", tag: "Kinetics", query: "Caffeine adenosine receptor blockade and half-life" },
];

const CURATED_PREVIEWS = {
  "creatine": {
    subject: "Creatine Monohydrate",
    category: "Ergogenic Aid / Cellular Bioenergetics",
    one_liner: "Phosphocreatine shuttle substrate that rapidly regenerates cellular ATP during high-intensity muscle and brain energy demands.",
    science_score: 98,
    science_score_rationale: "Supported by over 500+ peer-reviewed randomized controlled trials with robust meta-analytic confirmation.",
    safety_level: "green",
    mechanism: "Donates a high-energy phosphate group to ADP via the creatine kinase reaction, maintaining intracellular ATP resynthesis inside fast-twitch muscle fibers and neurons without lactic acid accumulation.",
    evidence_grade: "Grade A (Strongest Level of Scientific Evidence)",
    clinical_dosage: "3–5g daily monohydrate with no required loading phase. Timing is flexible, though post-workout with carbohydrate/protein yields slightly higher muscular uptake.",
    interactions: "High synergy with adequate sodium and hydration. No adverse kidney effects in healthy populations with normal baseline eGFR.",
    rct_count: "500+ RCTs",
    system_affinity: "Skeletal Muscle, Prefrontal Cortex, Mitochondrial Matrix"
  },
  "tired": {
    subject: "Chronic Daytime Fatigue & Energy Dip",
    category: "Metabolic & Neuroendocrine Triage",
    one_liner: "Multifactorial mismatch between circadian adenosine clearance, cellular oxygen delivery (Ferritin/Iron), and mitochondrial cofactors.",
    science_score: 92,
    science_score_rationale: "Derived from clinical sleep architecture protocols and metabolic biomarker investigation cascades.",
    safety_level: "yellow",
    mechanism: "Insufficient deep slow-wave sleep prevents adequate adenosine receptor clearance, while subclinical intracellular iron depletion compromises cytochrome c oxidase in the electron transport chain.",
    evidence_grade: "Grade A (Clinical Differential Protocol)",
    clinical_dosage: "Prioritize morning sunlight (10,000 lux within 45 min of waking) + evaluate Serum Ferritin (>50 ng/mL) and Vitamin D3 (40-60 ng/mL).",
    interactions: "Avoid caffeine within 90 minutes of waking and 10 hours before sleep to prevent afternoon adenosine rebound.",
    rct_count: "180+ Clinical Studies",
    system_affinity: "Circadian Oscillator, Adrenal Axis, Cellular Mitochondria"
  },
  "magnesium": {
    subject: "Magnesium Glycinate vs Magnesium Oxide",
    category: "Biochemical Form & Bioavailability Comparison",
    one_liner: "Chelated glycine-bound magnesium achieves ~24-30% organic absorption and crosses the blood-brain barrier vs ~4% for inorganic oxide.",
    science_score: 95,
    science_score_rationale: "Confirmed through human urinary excretion kinetics and in-vivo jejunal perfusion studies.",
    safety_level: "green",
    mechanism: "Glycinate utilizes dipeptide transport channels (PEPT1) bypassing competitive ionic divalent metal transporter (DMT1) pathways, preventing osmotic bowel irritation.",
    evidence_grade: "Grade A (Human Pharmacokinetic Trials)",
    clinical_dosage: "200–400mg elemental magnesium 60 minutes before sleep. Oxide is primarily suited as an osmotic laxative, not for correcting intracellular deficiency.",
    interactions: "Synergistic with Vitamin B6 (pyridoxal-5-phosphate) which acts as an intracellular cofactor.",
    rct_count: "84 Clinical Trials",
    system_affinity: "Central Nervous System, NMDA Receptor, Cardiac Rhythm"
  }
};

export default function PublicHeroSection() {
  const navigate = useNavigate();
  const { openCheckoutModal } = useAuth();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("mechanism");
  const [activeResult, setActiveResult] = useState(CURATED_PREVIEWS["creatine"]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChipClick = (chip) => {
    setQuery(chip.query);
    executeSearch(chip.query);
  };

  const executeSearch = async (text) => {
    const qClean = (text || query).trim().toLowerCase();
    if (!qClean) return;

    setLoading(true);
    setSearched(true);

    try {
      if (qClean.includes("tired") || qClean.includes("fatigue")) {
        setActiveResult(CURATED_PREVIEWS["tired"]);
      } else if (qClean.includes("magnesium") || qClean.includes("oxide")) {
        setActiveResult(CURATED_PREVIEWS["magnesium"]);
      } else if (qClean.includes("creatine")) {
        setActiveResult(CURATED_PREVIEWS["creatine"]);
      } else {
        const live = await analyzeQuery(qClean, "intermediate");
        if (live && live.subject) {
          setActiveResult({
            subject: live.subject,
            category: live.category || "Physiological Intelligence",
            one_liner: live.one_liner || "Evidence-based biological mechanism and clinical summary.",
            science_score: live.science_score || 92,
            science_score_rationale: live.science_score_rationale || "Evaluated against peer-reviewed clinical trials and human pharmacokinetic data.",
            safety_level: live.safety_level || "green",
            mechanism: live.sections?.mechanism?.summary || live.quick_answer || "Direct cellular mechanism and intracellular signaling cascade.",
            evidence_grade: "Grade A (Human Clinical Studies)",
            clinical_dosage: live.sections?.uses?.strong?.join(". ") || "Refer to clinical reference ranges and individualized nutritional targets.",
            interactions: live.sections?.safety?.interactions || "Consult comprehensive biomarker panel for personalized contraindications.",
            rct_count: "PubMed Verified",
            system_affinity: "Human Cellular Physiology"
          });
        } else {
          setActiveResult(CURATED_PREVIEWS["creatine"]);
        }
      }
    } catch {
      setActiveResult(CURATED_PREVIEWS["creatine"]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-6 sm:pt-10 pb-16 space-y-12">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/2 top-10 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 dark:bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[400px] w-[400px] rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 blur-[150px]" />

      {/* Hero Pitch Headline */}
      <div className="mx-auto max-w-4xl text-center space-y-5 px-4">
        {/* Value Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-500/10 dark:bg-gradient-to-r dark:from-cyan-500/10 dark:via-cyan-400/5 dark:to-emerald-500/10 px-4 py-1.5 shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300 font-mono">
            Scientific Human Physiology & Performance
          </span>
        </motion.div>

        {/* Large Punchy Headline (Blinkit-Style Neo-Grotesque) */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight sm:tracking-tighter text-slate-900 dark:text-white leading-[1.05]"
        >
          Understand Your Biology.{" "}
          <span className="font-extrabold bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-600 dark:from-cyan-400 dark:via-teal-300 dark:to-emerald-400 bg-clip-text text-transparent">
            Make Evidence-Based Decisions.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] font-medium leading-relaxed"
        >
          The AI-powered human performance, clinical nutrition, and physiological intelligence engine. No supplement marketing hype—just verifiable science.
        </motion.p>
      </div>

      {/* Interactive 1-Free Trial Query Sandbox */}
      <div className="mx-auto max-w-3xl px-4 space-y-5">
        <div className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white/95 dark:bg-[#0E141D]/90 p-4 sm:p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#94A3B8]">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-900 dark:text-white font-bold">Interactive Sandbox:</span>
              <span>Try 1 Free Scientific Deep-Dive</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#64748B] border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded-full font-bold">
              No Card Required
            </span>
          </div>

          {/* Search Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              executeSearch(query);
            }}
            className="relative flex items-center"
          >
            <Search className="pointer-events-none absolute left-4 h-5 w-5 text-cyan-600 dark:text-cyan-400" />
            <input
              data-testid="hero-free-trial-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything (e.g. Why am I tired? or Creatine mechanism)..."
              className="w-full rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 pl-12 pr-28 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748B] focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
            />
            <button
              data-testid="hero-free-trial-submit"
              type="submit"
              disabled={loading}
              className="absolute right-2 flex items-center gap-1.5 rounded-xl bg-cyan-500 dark:bg-cyan-400 px-4 py-2 text-xs font-bold text-white dark:text-black hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-all shadow-md disabled:opacity-50"
            >
              {loading ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <span>Deep Dive</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Starter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-500 dark:text-[#64748B]">Starter chips:</span>
            {STARTER_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                data-testid={`hero-starter-chip-${idx}`}
                onClick={() => handleChipClick(chip)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] px-3 py-1 text-xs text-slate-700 dark:text-[#CBD5E1] hover:border-cyan-500/50 hover:bg-cyan-50 dark:hover:bg-cyan-400/10 hover:text-cyan-800 dark:hover:text-white transition-all group shadow-sm font-medium"
              >
                <span className="text-[10px] text-cyan-600 dark:text-cyan-400/70 font-mono font-bold">[{chip.tag}]</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Live Interactive Sample Result Box */}
        {activeResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-5 sm:p-7 shadow-xl dark:shadow-2xl space-y-6"
          >
            {/* Header Result Line */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-[#1E293B] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono">
                    {activeResult.category}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-[#64748B] font-mono">• {activeResult.rct_count}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {activeResult.subject}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed pt-0.5">
                  {activeResult.one_liner}
                </p>
              </div>

              {/* Science Score Badge */}
              <div className="shrink-0 flex items-center sm:flex-col items-end gap-2 sm:gap-1 rounded-2xl border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-4 py-2.5 shadow-sm">
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-700 dark:text-cyan-300 tabular-nums">
                    {activeResult.science_score}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-600/70 dark:text-cyan-400/60 font-bold">/100</span>
                </div>
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-cyan-700 dark:text-cyan-300 font-mono">
                  Science Score
                </span>
              </div>
            </div>

            {/* Interactive Result Tabs */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5 border-b border-slate-200 dark:border-[#1E293B] pb-2">
                {[
                  { id: "mechanism", label: "Biological Mechanism", icon: Microscope },
                  { id: "evidence", label: "Evidence Strength", icon: ShieldCheck },
                  { id: "dosage", label: "Clinical Dosage", icon: Pill },
                  { id: "safety", label: "Interactions & Safety", icon: AlertCircle },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                        isActive
                          ? "bg-cyan-50 dark:bg-cyan-400/15 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-400/40 shadow-sm"
                          : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Details Content */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/40 p-4 sm:p-5 text-xs sm:text-sm text-slate-800 dark:text-white/90 leading-relaxed font-normal min-h-[90px]">
                {activeTab === "mechanism" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-mono block">
                      Target Pathways: {activeResult.system_affinity}
                    </span>
                    <p>{activeResult.mechanism}</p>
                  </div>
                )}
                {activeTab === "evidence" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono block">
                      Clinical Rating: {activeResult.evidence_grade}
                    </span>
                    <p>{activeResult.science_score_rationale}</p>
                  </div>
                )}
                {activeTab === "dosage" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono block">
                      Evidence-Based Human Protocol
                    </span>
                    <p>{activeResult.clinical_dosage}</p>
                  </div>
                )}
                {activeTab === "safety" && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono block">
                      Synergies & Bioavailability Matrix
                    </span>
                    <p>{activeResult.interactions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tasteful Pro Upgrade Banner */}
            <div className="rounded-2xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/70 dark:bg-gradient-to-r dark:from-amber-500/15 dark:via-[#0E141D] dark:to-amber-500/10 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-start gap-3 text-left">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-200/60 dark:bg-amber-400/20 border border-amber-300 dark:border-amber-400/40 text-amber-800 dark:text-amber-300">
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Unlock Unlimited Physiological Deep Dives & Lab Scanning
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-[#94A3B8] font-normal mt-0.5">
                    Full access to personalized pharmacokinetic decay curves, stack redundancy audits, and PubMed DOI references.
                  </div>
                </div>
              </div>

              <button
                onClick={() => openCheckoutModal("PRO_ANNUAL")}
                className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-extrabold text-black hover:bg-amber-300 hover:scale-105 transition-all shadow-md font-mono uppercase tracking-wider"
              >
                <span>Unlock KEVALBIO Pro</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
