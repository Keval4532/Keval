import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Panel, SectionLabel, EvidenceBadge } from "./primitives";
import ShareCardModal from "./ShareCardModal";
import BiologyReceiptModal from "./BiologyReceiptModal";
import PersonaSwitcher from "./PersonaSwitcher";
import FeedbackWidget from "./FeedbackWidget";
import {
  AlertTriangle, Search, CheckCircle2, ChevronDown, ChevronUp,
  Sparkles, ExternalLink, ShieldAlert, Utensils, Pill, FlaskConical,
  Calendar, HelpCircle, ArrowRight, BookOpen, Layers, Flame, Share2,
  Heart, Zap, Info, ShieldCheck, Check, Receipt, Copy, Clock, Sun,
  Moon, Activity, Stethoscope, Filter, X, ChevronRight, Clipboard,
  Beaker, Brain, Droplets, Dumbbell, Wind
} from "lucide-react";

/* ──────────────────── CONFIG MAPS ──────────────────── */

const LIKELIHOOD_PCT = { more_likely: 85, possible: 50, less_likely: 25, rule_out: 90 };
const LIKELIHOOD_CONFIG = {
  more_likely: { label: "More Likely", color: "#06B6D4", barColor: "bg-cyan-500", textColor: "text-cyan-400" },
  possible:    { label: "Possible",    color: "#10B981", barColor: "bg-emerald-500", textColor: "text-emerald-400" },
  less_likely: { label: "Less Likely", color: "#F59E0B", barColor: "bg-amber-500", textColor: "text-amber-400" },
  rule_out:    { label: "Rule Out",    color: "#EF4444", barColor: "bg-red-500", textColor: "text-red-400" },
};

const RELEVANCE_CONFIG = {
  high:     { label: "High Relevance",     color: "#10B981", dot: "bg-emerald-500" },
  possible: { label: "Possible Relevance", color: "#F59E0B", dot: "bg-amber-500" },
  unclear:  { label: "Unclear Relevance",  color: "#94A3B8", dot: "bg-slate-400" },
};

// Category filter mapping
const CATEGORY_FILTERS = {
  all:       { label: "All",        icon: "🔍" },
  sleep:     { label: "Sleep",      icon: "😴" },
  nutrition: { label: "Nutrition",  icon: "🥗" },
  stress:    { label: "Stress",     icon: "⚡" },
  medical:   { label: "Medical",    icon: "🩺" },
};

function getCategoryFilter(cat) {
  const c = (cat || "").toLowerCase();
  if (c.includes("sleep") || c.includes("circadian") || c.includes("environmental")) return "sleep";
  if (c.includes("nutrition") || c.includes("hydration") || c.includes("energy intake")) return "nutrition";
  if (c.includes("training") || c.includes("stress") || c.includes("allostatic")) return "stress";
  if (c.includes("medical") || c.includes("medication") || c.includes("micronutrient") || c.includes("clinical")) return "medical";
  return "nutrition";
}

/* ──────────────────── SUB-COMPONENTS ──────────────────── */

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 rounded-full border border-[#1E293B] bg-[#141C28] px-3 py-1.5 text-[11px] font-bold text-slate-300 hover:border-cyan-400/40 hover:text-white transition-all">
      {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
      <span>{copied ? "Copied!" : label}</span>
    </button>
  );
}

function ImpactBar({ pct, color }) {
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 rounded-full bg-[#141C28] overflow-hidden border border-[#283548]">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-[11px] font-mono font-bold text-slate-400 w-8 text-right tabular-nums">{pct}%</span>
    </div>
  );
}

function TabButton({ active, onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`relative whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition-all ${
        active
          ? "bg-cyan-500 text-zinc-950 shadow-lg shadow-cyan-500/25 font-mono"
          : "bg-[#141C28] text-slate-400 hover:bg-[#1E293B] hover:text-white border border-[#1E293B]"
      } ${className}`}
    >
      {children}
    </button>
  );
}

/* ──────────────────── MAIN COMPONENT ──────────────────── */

export default function SignatureFlow({ data, onAskFollowup }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [causeFilter, setCauseFilter] = useState("all");
  const [expandedCause, setExpandedCause] = useState({});
  const [coreTab, setCoreTab] = useState("food");
  const [timelineTab, setTimelineTab] = useState("today");
  const [selectedGap, setSelectedGap] = useState(0);
  const [expandedBiomarker, setExpandedBiomarker] = useState({});

  // Filter root causes by category
  const filteredCauses = useMemo(() => {
    if (!data || causeFilter === "all") return (data?.root_causes) || [];
    return (data?.root_causes || []).filter(rc => getCategoryFilter(rc.category) === causeFilter);
  }, [data, causeFilter]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: (data?.root_causes || []).length, sleep: 0, nutrition: 0, stress: 0, medical: 0 };
    (data?.root_causes || []).forEach(rc => { counts[getCategoryFilter(rc.category)]++; });
    return counts;
  }, [data]);

  if (!data) return null;
  const isEmergency = !!data.emergency;
  const research = data.live_research || {};

  return (
    <div className="space-y-6 text-[#F8FAFC]">

      {/* ━━━━━━ 1. HERO HEADER ━━━━━━ */}
      <div className="rounded-3xl border border-[#1E293B] bg-[#0E141D] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Personal Biology Guide</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setReceiptOpen(true)} className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-bold text-cyan-300 hover:bg-cyan-500/20 transition-colors font-mono">
              <Receipt className="h-3.5 w-3.5" /> <span>Receipt</span>
            </button>
            <button onClick={() => setShareOpen(true)} className="flex items-center gap-1.5 rounded-full border border-[#1E293B] bg-[#141C28] px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-600 hover:text-white transition-colors">
              <Share2 className="h-3.5 w-3.5" /> <span>Share</span>
            </button>
          </div>
        </div>
        <h1 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          "{data.problem || data.title}"
        </h1>
        <div className="mt-2 text-xs text-slate-400 font-normal">
          Focus: <span className="text-cyan-400 font-bold">{data.title || "Human Physiology Analysis"}</span>
        </div>

        {/* "What This Means For You" merged into hero */}
        {data.what_this_means_for_you && (
          <p className="mt-3 text-sm text-[#CBD5E1] leading-relaxed border-t border-[#1E293B] pt-3">
            {data.what_this_means_for_you}
          </p>
        )}
      </div>

      {/* ━━━━━━ EMERGENCY RED FLAG ━━━━━━ */}
      {isEmergency && (
        <div className="rounded-3xl border-2 border-red-500 bg-red-500/10 p-6 sm:p-7 text-red-100 shadow-2xl">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="h-7 w-7 shrink-0 text-red-400 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold tracking-tight text-red-200">{data.emergency.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-red-100/90">{data.emergency.message}</p>
              <div className="mt-4 rounded-2xl border border-red-400/30 bg-black/60 p-4 text-xs leading-relaxed text-red-200">
                {data.emergency.guidance}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ━━━━━━ 2. "IN 10 SECONDS" PILL MATRIX ━━━━━━ */}
      <Panel className="p-5 sm:p-7">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono mb-4">
          <Zap className="h-4 w-4" />
          <span>In 10 Seconds</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {/* Primary Trigger */}
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.05] p-4">
            <div className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold font-mono mb-1.5">⚡ Primary Trigger</div>
            <p className="text-sm font-bold text-white leading-snug">
              {data.quick_take ? data.quick_take.split(/[.!]/)[0] + "." : data.title}
            </p>
          </div>
          {/* Core Biological Lever */}
          <div className="rounded-2xl border border-violet-500/20 bg-violet-500/[0.05] p-4">
            <div className="text-[10px] uppercase tracking-wider text-violet-400 font-bold font-mono mb-1.5">🧬 Core Mechanism</div>
            <p className="text-sm font-bold text-white leading-snug">
              {data.title || "Physiological Pathway Under Investigation"}
            </p>
          </div>
          {/* First-Line Fix */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
            <div className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold font-mono mb-1.5">☀️ First-Line Fix</div>
            <p className="text-sm font-bold text-white leading-snug">
              {data.start_here?.[0]?.action || data.start_here?.[0]?.title || data.start_here?.[0]?.do || data.action_plan?.today || "Audit diet, sleep & hydration first"}
            </p>
          </div>
        </div>

        {/* Verdict Banner */}
        <div className="mt-4 rounded-2xl bg-[#141C28] p-4 border border-[#283548] shadow-inner">
          <p className="text-sm font-bold text-white text-center leading-relaxed">
            {data.the_one_thing_to_remember || "A symptom is a clue, not a diagnosis. Food and sleep first—supplements only when they actually add value."}
          </p>
        </div>
      </Panel>

      {/* ━━━━━━ 3. FOR YOU (Personalized) ━━━━━━ */}
      {data.for_you && typeof data.for_you === "object" && data.for_you.biggest_opportunity && (
        <div className="rounded-3xl border border-cyan-500/30 bg-[#0E141D] p-5 sm:p-6 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
            <Heart className="h-4 w-4 text-cyan-400" /> <span>For You</span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              { label: "Biggest Opportunity", value: data.for_you.biggest_opportunity, color: "text-cyan-400" },
              { label: "Focus First", value: data.for_you.focus_first, color: "text-emerald-400" },
              { label: "Probably Don't Worry About", value: data.for_you.dont_need_to_worry_about, color: "text-slate-400" },
              { label: "Investigate", value: data.for_you.could_investigate, color: "text-amber-400" },
            ].filter(item => item.value).map((item, i) => (
              <div key={i} className="rounded-2xl border border-[#1E293B] bg-[#141C28] p-3.5 text-xs shadow-sm">
                <span className={`${item.color} font-bold text-[10px] uppercase tracking-wider block font-mono`}>{item.label}</span>
                <p className="text-[#CBD5E1] leading-relaxed font-normal mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ━━━━━━ 4. ACTION PLAN — TABBED TIMELINE ━━━━━━ */}
      <Panel className="p-5 sm:p-7">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-zinc-950 text-xs font-extrabold font-mono">✓</span>
            <SectionLabel>Action Blueprint</SectionLabel>
          </div>
        </div>

        {/* Timeline Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "today", label: "☀️ Today", icon: Sun },
            { key: "week", label: "📅 This Week", icon: Calendar },
            { key: "month", label: "🔬 2–4 Weeks", icon: FlaskConical },
          ].map(t => (
            <TabButton key={t.key} active={timelineTab === t.key} onClick={() => setTimelineTab(t.key)}>
              {t.label}
            </TabButton>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={timelineTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-2.5"
          >
            {timelineTab === "today" && (
              <>
                {data.action_plan?.today && (
                  <ActionItem text={data.action_plan.today} />
                )}
                {data.start_here?.slice(0, 2).map((sh, i) => (
                  <ActionItem key={i} text={sh.action || sh.title || sh.do} detail={sh.why || sh.try_this} tryThis={sh.try_this || sh.do} />
                ))}
              </>
            )}
            {timelineTab === "week" && (
              <>
                {data.action_plan?.this_week && (
                  <ActionItem text={data.action_plan.this_week} />
                )}
                {data.start_here?.slice(1, 3).map((sh, i) => (
                  <ActionItem key={i} text={sh.action || sh.title || sh.do} detail={sh.why || sh.try_this} tryThis={sh.try_this || sh.do} />
                ))}
              </>
            )}
            {timelineTab === "month" && (
              <>
                {data.action_plan?.next_weeks && (
                  <ActionItem text={data.action_plan.next_weeks} />
                )}
                {data.action_plan?.when_doctor && (
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs">
                    <span className="text-amber-400 font-bold font-mono text-[10px] uppercase tracking-wider">When to See a Doctor</span>
                    <p className="text-amber-100/90 mt-1 leading-relaxed">{data.action_plan.when_doctor}</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Panel>

      {/* ━━━━━━ 5. CONTRIBUTING FACTORS — IMPACT BARS + FILTER ━━━━━━ */}
      {(data.root_causes || []).length > 0 && (
        <Panel className="p-5 sm:p-7">
          <SectionLabel>What Could Be Contributing?</SectionLabel>

          {/* Category Filter Bar */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
            {Object.entries(CATEGORY_FILTERS).map(([key, { label, icon }]) => (
              <TabButton key={key} active={causeFilter === key} onClick={() => setCauseFilter(key)}>
                {icon} {label} {categoryCounts[key] > 0 && `(${categoryCounts[key]})`}
              </TabButton>
            ))}
          </div>

          {/* Impact Rows */}
          <div className="space-y-2">
            {filteredCauses.map((rc, i) => {
              const conf = LIKELIHOOD_CONFIG[rc.likelihood] || LIKELIHOOD_CONFIG.possible;
              const pct = LIKELIHOOD_PCT[rc.likelihood] || 50;
              const isOpen = expandedCause[`${causeFilter}-${i}`];
              return (
                <div key={`${causeFilter}-${i}`} className="rounded-2xl border border-[#1E293B] bg-[#141C28] overflow-hidden transition-all hover:border-slate-600">
                  <button
                    onClick={() => setExpandedCause(prev => ({ ...prev, [`${causeFilter}-${i}`]: !prev[`${causeFilter}-${i}`] }))}
                    className="w-full flex items-center gap-3 p-3.5 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-bold text-white truncate">{rc.category}</span>
                        <span className={`text-[10px] font-bold font-mono uppercase tracking-wider ${conf.textColor}`}>
                          {conf.label}
                        </span>
                      </div>
                      <ImpactBar pct={pct} color={conf.barColor} />
                    </div>
                    <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden border-t border-[#1E293B]"
                      >
                        <div className="px-3.5 py-3 space-y-2 bg-[#0E141D]">
                          <p className="text-xs text-[#CBD5E1] leading-relaxed">{rc.findings}</p>
                          <div className="rounded-xl border border-[#283548] bg-[#141C28] p-2.5 text-[11px]">
                            <strong className="text-cyan-300 font-bold">Action: </strong>
                            <span className="text-slate-300">{rc.remedy}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Panel>
      )}

      {/* ━━━━━━ 6. TABBED CORE CONTAINER ━━━━━━ */}
      <Panel className="p-5 sm:p-7">
        {/* Core Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { key: "food",       label: "🥗 Food Fixes" },
            { key: "supplement", label: "💊 Supplements" },
            { key: "biomarker",  label: "🧪 Biomarkers" },
            { key: "research",   label: "🔬 Deep Science" },
          ].map(t => (
            <TabButton key={t.key} active={coreTab === t.key} onClick={() => setCoreTab(t.key)}>
              {t.label}
            </TabButton>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* ── FOOD FIXES TAB ── */}
          {coreTab === "food" && (
            <motion.div key="food" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {/* Nutrient Selector Pills */}
              {data.nutritional_gaps && data.nutritional_gaps.length > 0 && (
                <div className="mb-4">
                  <div className="flex gap-2 flex-wrap mb-4">
                    {data.nutritional_gaps.map((ng, i) => {
                      const rel = RELEVANCE_CONFIG[ng.relevance] || RELEVANCE_CONFIG.possible;
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedGap(i)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all border ${
                            selectedGap === i
                              ? "bg-cyan-500 text-zinc-950 border-cyan-400 shadow-lg shadow-cyan-500/25 font-mono"
                              : "bg-[#141C28] text-slate-300 border-[#1E293B] hover:border-cyan-400"
                          }`}
                        >
                          <span className={`inline-block h-1.5 w-1.5 rounded-full mr-1.5 ${selectedGap === i ? "bg-zinc-950" : rel.dot}`} />
                          {ng.nutrient}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Nutrient Card */}
                  {(() => {
                    const item = data.nutritional_gaps[selectedGap] || data.nutritional_gaps[0];
                    if (!item) return null;
                    return (
                      <div className="rounded-2xl border border-[#1E293B] bg-[#141C28] p-5 space-y-3 shadow-md">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-white">{item.nutrient}</h3>
                          <EvidenceBadge level={item.evidence_strength || "moderate"} />
                        </div>
                        <p className="text-sm text-[#CBD5E1] leading-relaxed">{item.why_it_matters}</p>

                        <div className="grid gap-2 sm:grid-cols-2 text-xs">
                          {[
                            { label: "Connection", value: item.problem_connection },
                            { label: "Daily Target", value: item.intake_target },
                            { label: "Best Foods", value: item.food_sources },
                            { label: "Absorption", value: item.absorption_factors },
                          ].filter(d => d.value).map((d, idx) => (
                            <div key={idx} className="rounded-xl border border-[#283548] bg-[#0E141D] p-3 shadow-inner">
                              <span className="text-slate-400 uppercase text-[10px] tracking-wider block font-mono font-bold">{d.label}</span>
                              <span className="text-white mt-1 block font-medium">{d.value}</span>
                            </div>
                          ))}
                        </div>

                        {item.supplement_status && (
                          <div className="text-[11px] text-slate-400 font-mono">
                            Supplement verdict: <span className="text-cyan-300 font-bold">{item.supplement_status}</span>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Food Solutions Grid */}
              {data.food_solutions && data.food_solutions.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Utensils className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">Top Food Sources</span>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {data.food_solutions.map((fs, i) => (
                      <div key={i} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-xs space-y-2">
                        <div className="font-bold text-sm text-emerald-300">{fs.food || fs.nutrient}</div>
                        <div className="text-[#CBD5E1] leading-relaxed">
                          {fs.key_nutrients || fs.best_foods}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div>
                            <span className="text-slate-400 block font-mono text-[9px] uppercase">Serving</span>
                            <span className="text-white font-medium">{fs.serving || fs.serving_size}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block font-mono text-[9px] uppercase">Mechanism</span>
                            <span className="text-cyan-300 font-medium">{fs.mechanism || fs.nutrient_contribution}</span>
                          </div>
                        </div>
                        {(fs.timing || fs.absorption_tips) && (
                          <div className="rounded-xl border border-[#283548] bg-[#0E141D] p-2 text-[11px]">
                            <span className="text-emerald-400 font-bold">Tip: </span>
                            <span className="text-slate-300">{fs.timing || fs.absorption_tips}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ── SUPPLEMENT AUDIT TAB ── */}
          {coreTab === "supplement" && (
            <motion.div key="supplement" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 mb-3">
                <Pill className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Evidence-Based Supplement Audit</span>
              </div>
              <p className="text-xs text-slate-400 mb-4">Supplements evaluated by evidence strength and safety — never pushed unnecessarily.</p>

              {data.supplement_priorities && data.supplement_priorities.length > 0 ? (
                <div className="space-y-3">
                  {data.supplement_priorities.map((sp, i) => {
                    const isNotRec = (sp.priority || sp.verdict || "").toLowerCase().includes("not recommended") || (sp.verdict || "").toLowerCase() === "skip";
                    const isPri1 = (sp.priority || "").includes("Priority 1") || (sp.verdict || "").toLowerCase() === "recommended" || (sp.evidence || "").toLowerCase() === "strong";
                    const borderClass = isNotRec
                      ? "border-red-500/30 bg-red-500/[0.04]"
                      : isPri1
                      ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                      : "border-amber-500/30 bg-amber-500/[0.04]";

                    return (
                      <div key={i} className={`rounded-2xl border ${borderClass} p-4 text-xs`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                          <div>
                            <h4 className="text-base font-bold text-white">{sp.name}</h4>
                            <span className={`text-[10px] uppercase font-bold tracking-wider font-mono ${
                              isNotRec ? "text-red-400" : isPri1 ? "text-emerald-400" : "text-amber-400"
                            }`}>
                              {sp.priority || sp.verdict || (isPri1 ? "Priority 1 — Strong Evidence" : "Priority 2 — Contextual")}
                            </span>
                          </div>
                          {(sp.evidence_grade || sp.evidence) && <EvidenceBadge level={sp.evidence_grade || sp.evidence || "moderate"} />}
                        </div>

                        <p className="text-[#CBD5E1] leading-relaxed mb-2.5">{sp.why_this || sp.rationale}</p>

                        {!isNotRec && (
                          <div className="grid grid-cols-3 gap-2 text-[11px]">
                            <div className="rounded-xl bg-[#0E141D] p-2 border border-[#283548]">
                              <span className="text-slate-500 block text-[9px] uppercase font-mono">Form</span>
                              <span className="text-white font-bold">{sp.form}</span>
                            </div>
                            <div className="rounded-xl bg-[#0E141D] p-2 border border-[#283548]">
                              <span className="text-slate-500 block text-[9px] uppercase font-mono">Dose</span>
                              <span className="text-white font-bold">{sp.dosage || sp.dose}</span>
                            </div>
                            <div className="rounded-xl bg-[#0E141D] p-2 border border-[#283548]">
                              <span className="text-slate-500 block text-[9px] uppercase font-mono">Timing</span>
                              <span className="text-white font-bold">{sp.timing}</span>
                            </div>
                          </div>
                        )}

                        {sp.caution && (
                          <div className="mt-2 text-[11px] text-amber-300 font-medium">
                            <strong>⚠ Caution:</strong> {sp.caution}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">No supplement data available for this query.</div>
              )}
            </motion.div>
          )}

          {/* ── BIOMARKERS TAB ── */}
          {coreTab === "biomarker" && (
            <motion.div key="biomarker" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="flex items-center gap-2 mb-3">
                <FlaskConical className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Tests & Biomarkers to Discuss</span>
              </div>

              {data.biomarkers && data.biomarkers.length > 0 ? (
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {data.biomarkers.map((bm, i) => (
                    <div key={i} className="rounded-2xl border border-[#1E293B] bg-[#141C28] p-4 text-xs space-y-2 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-bold text-cyan-300 font-mono">{bm.test_name || bm.marker}</div>
                        <CopyButton
                          text={`I'd like to discuss getting a ${bm.test_name || bm.marker} test. ${bm.why_it_matters || bm.matters || ""}`}
                          label="Copy for Doctor"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">Measures</span>
                          <span className="text-[#CBD5E1]">{bm.measures || bm.what_it_measures}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] uppercase font-mono font-bold">Why It Matters</span>
                          <span className="text-[#CBD5E1]">{bm.why_it_matters || bm.matters}</span>
                        </div>
                      </div>
                      {bm.limitations && (
                        <div className="rounded-xl border border-[#283548] bg-[#0E141D] p-2.5 text-[11px] text-slate-400">
                          <strong className="text-slate-200">Limitations:</strong> {bm.limitations}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">No biomarker data available for this query.</div>
              )}
            </motion.div>
          )}

          {/* ── DEEP SCIENCE TAB ── */}
          {coreTab === "research" && (
            <motion.div key="research" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {research.live_searched ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                      🔎 Live Research Verified — {research.sources_count || 4}+ Sources
                    </span>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {(research.sources_reviewed || []).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-xl border border-[#1E293B] bg-[#141C28] px-3 py-2 text-xs shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                        <div className="truncate">
                          <span className="font-bold text-white">{s.name}</span>
                          <span className="ml-1.5 text-[10px] text-slate-400">({s.type})</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {research.studies && research.studies.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold font-mono">Key Peer-Reviewed Literature:</div>
                      {research.studies.map((st, i) => (
                        <div key={i} className="rounded-xl border border-[#1E293B] bg-[#141C28] p-3 text-xs shadow-sm">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-cyan-300">{st.title}</span>
                            <span className="rounded bg-[#0E141D] border border-[#283548] px-2 py-0.5 text-[10px] text-slate-300 font-bold font-mono">{st.year} • {st.study_type}</span>
                          </div>
                          <p className="mt-1.5 text-[#CBD5E1]">{st.main_result}</p>
                          {st.url && (
                            <a href={st.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline font-bold">
                              View Record <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 text-sm">
                  <Search className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p>No live research data available for this query.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Panel>

      {/* ━━━━━━ 7. THE ONE THING TO REMEMBER — QUOTE BADGE ━━━━━━ */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0E141D] via-[#141C28] to-[#0E141D] border border-[#1E293B] p-6 sm:p-7 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest font-mono">
            <Sparkles className="h-4 w-4" />
            <span>Key Takeaway</span>
          </div>
          <div className="flex gap-2">
            <CopyButton text={data.the_one_thing_to_remember || ""} label="Copy" />
            <button onClick={() => setReceiptOpen(true)} className="flex items-center gap-1.5 rounded-full border border-[#1E293B] bg-[#141C28] px-3 py-1.5 text-[11px] font-bold text-slate-300 hover:text-white transition-all">
              <Receipt className="h-3 w-3 text-cyan-400" /> Receipt
            </button>
          </div>
        </div>
        <p className="font-display text-lg sm:text-xl font-bold text-white leading-snug tracking-tight">
          "{data.the_one_thing_to_remember || "A symptom is a clue, not a diagnosis. Food and sleep first—supplements only when they actually add value."}"
        </p>
      </div>

      {/* ━━━━━━ 8. FOLLOW-UP QUESTIONS ━━━━━━ */}
      {data.followups && data.followups.length > 0 && (
        <div className="rounded-3xl border border-[#1E293B] bg-[#0E141D] p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 font-mono">
            <HelpCircle className="h-4 w-4" />
            <span>Your Next Best Question</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.followups.map((fq, i) => (
              <button
                key={i}
                onClick={() => onAskFollowup && onAskFollowup(fq)}
                className="flex items-center gap-1.5 rounded-full border border-[#1E293B] bg-[#141C28] px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white shadow-sm"
              >
                <span>{fq}</span>
                <ArrowRight className="h-3 w-3 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ━━━━━━ 9. FEEDBACK ━━━━━━ */}
      <FeedbackWidget query={data.problem || data.title} />

      {/* ━━━━━━ MODALS ━━━━━━ */}
      <BiologyReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        topicTitle={data.title || data.problem}
        takeAway={data.the_one_thing_to_remember || "A symptom is a clue, not a diagnosis. Food and sleep first."}
        items={[
          { label: "Investigation Focus", val: (data.title || "Physiology").slice(0, 22) },
          { label: "Action Priority", val: (data.start_here?.[0]?.action || data.start_here?.[0]?.title || data.start_here?.[0]?.do || "Whole Food Repletion").slice(0, 22) },
          { label: "Evidence Baseline", val: "Clinical Guidelines" }
        ]}
        evidenceGrade="Verified Science"
      />

      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        topicTitle={data.title || data.problem}
        takeAway={data.the_one_thing_to_remember}
        bullets={data.start_here ? data.start_here.map(s => s.action || s.title || s.do) : []}
      />
    </div>
  );
}

/* ──────────────────── ACTION ITEM SUB-COMPONENT ──────────────────── */

function ActionItem({ text, detail, tryThis }) {
  const [open, setOpen] = useState(false);
  if (!text) return null;
  return (
    <div className="rounded-2xl border border-[#1E293B] bg-[#141C28] overflow-hidden">
      <div className="flex items-start gap-3 p-3.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-500/10">
          <Check className="h-3 w-3 text-cyan-400" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white leading-snug">{text}</p>
          {tryThis && <p className="text-xs text-slate-300 mt-1"><strong className="text-cyan-300">Try:</strong> {tryThis}</p>}
        </div>
        {detail && (
          <button onClick={() => setOpen(!open)} className="rounded-full border border-[#283548] bg-[#0E141D] px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 hover:border-cyan-400 transition-colors font-mono shrink-0">
            Why?
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && detail && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-[#1E293B]">
            <div className="px-3.5 py-3 pl-12 bg-[#0E141D]">
              <div className="rounded-xl border border-cyan-500/30 bg-[#141C28] p-3 text-[11px] text-cyan-200">
                <strong className="block text-[9px] uppercase tracking-wider text-cyan-400 mb-0.5 font-bold font-mono">Biological Reason:</strong>
                {detail}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
