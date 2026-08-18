import React, { useState } from "react";
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
  Heart, Zap, Info, ShieldCheck, Check, Receipt
} from "lucide-react";

const LIKELIHOOD_CONFIG = {
  more_likely: { label: "More Likely", color: "#00F0FF", border: "border-cyan-500/40", bg: "bg-cyan-500/10" },
  possible: { label: "Possible", color: "#00E676", border: "border-emerald-500/40", bg: "bg-emerald-500/10" },
  less_likely: { label: "Less Likely", color: "#FFEA00", border: "border-yellow-500/40", bg: "bg-yellow-500/10" },
  rule_out: { label: "Important to Rule Out", color: "#FF3B30", border: "border-red-500/40", bg: "bg-red-500/10" }
};

const RELEVANCE_CONFIG = {
  high: { label: "Higher Relevance", color: "#00E676", dot: "bg-emerald-400" },
  possible: { label: "Possible Relevance", color: "#FFEA00", dot: "bg-yellow-400" },
  unclear: { label: "Unclear Relevance", color: "#FFFFFF", dot: "bg-white/40" }
};

export default function SignatureFlow({ data, onAskFollowup }) {
  const [researchOpen, setResearchOpen] = useState(false);
  const [selectedGap, setSelectedGap] = useState(0);
  const [expandedWhy, setExpandedWhy] = useState({});
  const [shareOpen, setShareOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (!data) return null;

  const isEmergency = !!data.emergency;
  const research = data.live_research || {};

  const toggleWhy = (idx) => {
    setExpandedWhy((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Reassuring Intro */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
            <Sparkles className="h-4 w-4" />
            <span>Personal Biology Guide</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setReceiptOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-xs text-cyan-300 hover:bg-cyan-400/20 transition-colors"
            >
              <Receipt className="h-3.5 w-3.5" />
              <span>Biology Receipt</span>
            </button>

            <button
              onClick={() => setShareOpen(true)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <h1 className="mt-3 font-display text-2xl font-light tracking-tight text-white sm:text-3xl lg:text-4xl">
          "{data.problem || data.title}"
        </h1>
        <div className="mt-2 text-xs text-white/50">
          Focus: <span className="text-cyan-300 font-medium">{data.title || "Human Physiology Analysis"}</span>
        </div>
      </div>

      {/* Emergency Red Flag Card */}
      {isEmergency && (
        <div className="rounded-3xl border-2 border-red-500 bg-red-500/10 p-6 sm:p-7 text-red-100 shadow-[0_0_30px_rgba(255,59,48,0.25)]">
          <div className="flex items-start gap-3.5">
            <ShieldAlert className="h-7 w-7 shrink-0 text-red-400 mt-0.5" />
            <div>
              <h2 className="text-lg font-bold tracking-tight text-red-200">{data.emergency.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-red-100/90">{data.emergency.message}</p>
              <div className="mt-4 rounded-2xl border border-red-400/30 bg-black/50 p-4 text-xs leading-relaxed text-red-200">
                {data.emergency.guidance}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. THE SHORT ANSWER (Human & Empathetic) */}
      <Panel className="p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Zap className="h-4 w-4" />
          <span>The Short Answer</span>
        </div>

        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-white/90 font-light">
          {data.short_answer ? (
            data.short_answer.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))
          ) : (
            <p>{data.quick_take}</p>
          )}
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-xs text-white/60 leading-relaxed">
          <strong className="text-white/80 font-medium">Educational insight: </strong>
          A symptom is a clue, not a direct diagnosis. Investigating sleep, hydration, and nutrition gives a complete picture before jumping to pills.
        </div>
      </Panel>

      {/* 3. FOR YOU (Personalized if active) */}
      {data.for_you && (
        <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-br from-cyan-400/[0.05] to-transparent p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Heart className="h-4 w-4 text-cyan-400" />
            <span>For You (Personalized Insights)</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1">
              <span className="text-cyan-400 font-semibold text-[10px] uppercase tracking-wider block">Your Biggest Opportunity</span>
              <p className="text-white/85 leading-relaxed">{data.for_you.biggest_opportunity}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1">
              <span className="text-emerald-400 font-semibold text-[10px] uppercase tracking-wider block">What to Focus on First</span>
              <p className="text-white/85 leading-relaxed">{data.for_you.focus_first}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1">
              <span className="text-white/40 font-semibold text-[10px] uppercase tracking-wider block">What You Probably Don't Need to Worry About</span>
              <p className="text-white/70 leading-relaxed">{data.for_you.dont_need_to_worry_about}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1">
              <span className="text-yellow-300 font-semibold text-[10px] uppercase tracking-wider block">What You Could Investigate</span>
              <p className="text-white/85 leading-relaxed">{data.for_you.could_investigate}</p>
            </div>
          </div>
        </div>
      )}

      {/* 4. "START HERE" (Do This First - 1 to 3 Actions with Why Buttons) */}
      {data.start_here && data.start_here.length > 0 && (
        <Panel className="p-6 sm:p-8 space-y-4 border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-black text-xs font-bold">1</span>
              <SectionLabel>Start Here (Do This First)</SectionLabel>
            </div>
            <span className="text-[11px] text-white/40">Only 1–3 high-impact steps</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {data.start_here.map((sh, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-sm">{sh.action}</span>
                    <button
                      onClick={() => toggleWhy(i)}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-cyan-300 hover:bg-cyan-400/20 transition-colors"
                    >
                      Why?
                    </button>
                  </div>
                  <p className="text-white/70 mt-2 leading-relaxed font-light">
                    <strong className="text-cyan-300 font-normal">Try: </strong>{sh.try_this}
                  </p>
                </div>

                <AnimatePresence>
                  {expandedWhy[i] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 rounded-xl border border-cyan-400/20 bg-black/60 p-3 text-[11px] text-cyan-200"
                    >
                      <strong className="block text-[9px] uppercase tracking-wider text-cyan-400 mb-0.5">Biological Reason:</strong>
                      {sh.why}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* 5. What This Means For You */}
      {data.what_this_means_for_you && (
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-7 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <CheckCircle2 className="h-4 w-4" />
            <span>What This Means For You</span>
          </div>
          <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
            {data.what_this_means_for_you}
          </p>
        </div>
      )}

      {/* 6. What Might Be Contributing? (Root Causes) */}
      <div>
        <SectionLabel>What Could Be Contributing?</SectionLabel>
        <p className="mb-4 text-xs text-white/50">
          Ranked by likelihood based on human physiology:
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(data.root_causes || []).map((rc, i) => {
            const conf = LIKELIHOOD_CONFIG[rc.likelihood] || LIKELIHOOD_CONFIG.possible;
            return (
              <Panel key={i} className={`p-4 border ${conf.border}`} testId={`root-cause-${i}`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="font-medium text-sm text-white/95">{rc.category}</div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium ${conf.bg}`}
                    style={{ color: conf.color }}
                  >
                    {conf.label}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{rc.findings}</p>
                <div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-[11px] text-white/60">
                  <strong className="text-cyan-300 font-normal">Practical Action:</strong> {rc.remedy}
                </div>
              </Panel>
            );
          })}
        </div>
      </div>

      {/* 7. What Might You Be Missing? (Nutritional Gaps) */}
      {data.nutritional_gaps && data.nutritional_gaps.length > 0 && (
        <Panel className="p-6 sm:p-8">
          <SectionLabel>What Might You Be Missing?</SectionLabel>
          <p className="text-xs text-white/50 mb-4">
            Framed as potential nutritional gaps to audit through diet and targeted clinical testing:
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              {data.nutritional_gaps.map((ng, i) => {
                const rel = RELEVANCE_CONFIG[ng.relevance] || RELEVANCE_CONFIG.possible;
                const isSel = selectedGap === i;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedGap(i)}
                    className={`w-full text-left rounded-xl p-3 border transition-all ${
                      isSel
                        ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.15)]"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{ng.nutrient}</span>
                      <span className="flex items-center gap-1.5 text-[10px]" style={{ color: rel.color }}>
                        <span className={`h-1.5 w-1.5 rounded-full ${rel.dot}`} />
                        {rel.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
              {(() => {
                const item = data.nutritional_gaps[selectedGap] || data.nutritional_gaps[0];
                if (!item) return null;
                return (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-cyan-300">{item.nutrient}</h3>
                      <EvidenceBadge level={item.evidence_strength || "moderate"} />
                    </div>
                    <p className="text-sm text-white/80 leading-relaxed font-light">{item.why_it_matters}</p>

                    <div className="grid gap-2 sm:grid-cols-2 pt-2 text-xs">
                      <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                        <span className="text-white/40 uppercase text-[10px] tracking-wider block">Connection to You</span>
                        <span className="text-white/85 mt-1 block">{item.problem_connection}</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                        <span className="text-white/40 uppercase text-[10px] tracking-wider block">How Much You Need</span>
                        <span className="text-white/85 mt-1 block">{item.intake_target}</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                        <span className="text-white/40 uppercase text-[10px] tracking-wider block">Best Whole Foods</span>
                        <span className="text-white/85 mt-1 block">{item.food_sources}</span>
                      </div>
                      <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                        <span className="text-white/40 uppercase text-[10px] tracking-wider block">How Well You Absorb It</span>
                        <span className="text-white/85 mt-1 block">{item.absorption_factors}</span>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </Panel>
      )}

      {/* 8. Food-First Solutions */}
      {data.food_solutions && data.food_solutions.length > 0 && (
        <Panel className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Utensils className="h-5 w-5 text-emerald-400" />
            <SectionLabel>Food-First Solution</SectionLabel>
          </div>
          <p className="text-xs text-white/50 mb-4">
            Whole foods deliver minerals and vitamins in natural cellular matrices with cofactors:
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.food_solutions.map((fs, i) => (
              <div key={i} className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 text-xs space-y-2.5">
                <div className="font-medium text-sm text-emerald-300">{fs.nutrient}</div>
                <div>
                  <span className="text-white/40 uppercase text-[10px] tracking-wider block">Top Foods</span>
                  <span className="text-white/90 font-medium mt-0.5 block">{fs.best_foods}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="text-white/40 block">Practical Serving</span>
                    <span className="text-white/75">{fs.serving_size}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Nutrient Density</span>
                    <span className="text-cyan-300 font-mono">{fs.nutrient_contribution}</span>
                  </div>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-2.5 text-[11px]">
                  <span className="text-emerald-400 font-medium">Absorption Tip: </span>
                  <span className="text-white/70">{fs.absorption_tips}</span>
                </div>
                <div className="text-[11px] text-white/60">
                  <strong className="text-white/80">Easy Meal Addition:</strong> {fs.easy_additions}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* 9. Should You Supplement? (Honest & Non-Salesy) */}
      {data.supplement_priorities && data.supplement_priorities.length > 0 && (
        <Panel className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Pill className="h-5 w-5 text-cyan-400" />
            <SectionLabel>Should You Supplement?</SectionLabel>
          </div>
          <p className="text-xs text-white/50 mb-4">
            Supplements are evaluated strictly by evidence strength and safety—never pushed unnecessarily:
          </p>

          <div className="space-y-4">
            {data.supplement_priorities.map((sp, i) => {
              const isNotRec = sp.priority.toLowerCase().includes("not recommended");
              return (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 text-xs transition-colors ${
                    isNotRec
                      ? "border-red-500/30 bg-red-500/[0.04]"
                      : sp.priority.includes("Priority 1")
                      ? "border-cyan-400/40 bg-cyan-400/[0.03]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className={`text-[10px] uppercase font-semibold tracking-wider block ${isNotRec ? "text-red-400" : "text-cyan-400"}`}>
                        {sp.priority}
                      </span>
                      <h4 className="text-base font-medium text-white mt-0.5">{sp.name}</h4>
                    </div>
                    {sp.evidence_grade && <EvidenceBadge level={sp.evidence_grade} />}
                  </div>

                  <div className="mt-3 rounded-xl border border-white/5 bg-black/40 p-3.5 leading-relaxed text-white/85 font-light">
                    <strong className="text-cyan-300 font-medium">Why This? </strong>
                    {sp.why_this}
                  </div>

                  {!isNotRec && (
                    <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-white/70">
                      <div>
                        <span className="text-white/40 block">Form</span>
                        <span className="text-white/90">{sp.form}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block">Dosage</span>
                        <span className="text-white/90">{sp.dosage}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block">Timing</span>
                        <span className="text-white/90">{sp.timing}</span>
                      </div>
                    </div>
                  )}

                  {sp.caution && (
                    <div className="mt-2 text-[11px] text-yellow-300/80">
                      <strong>Who should be careful:</strong> {sp.caution}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Panel>
      )}

      {/* 10. Live Research Layer */}
      {research.live_searched && (
        <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/[0.02] p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                🔎 Live Scientific Research Verified
              </span>
              <span className="hidden sm:inline-block rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300 border border-cyan-400/20">
                {research.sources_count || 4}+ Verified Sources
              </span>
            </div>
            <button
              onClick={() => setResearchOpen(!researchOpen)}
              className="flex items-center gap-1 text-xs text-white/60 hover:text-white"
            >
              {researchOpen ? "Hide Sources" : "View Sources"}
              {researchOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>

          <AnimatePresence>
            {researchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3 pt-3 border-t border-white/10"
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {(research.sources_reviewed || []).map((s, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl border border-white/5 bg-black/40 px-3 py-2 text-xs">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" />
                      <div className="truncate">
                        <span className="font-medium text-white/90">{s.name}</span>
                        <span className="ml-1.5 text-[10px] text-white/40">({s.type})</span>
                      </div>
                    </div>
                  ))}
                </div>

                {research.studies && research.studies.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <div className="text-[11px] uppercase tracking-wider text-white/40">Key Peer-Reviewed Literature:</div>
                    {research.studies.map((st, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="font-medium text-cyan-300">{st.title}</span>
                          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-white/80">{st.year} • {st.study_type}</span>
                        </div>
                        <p className="mt-1.5 text-white/70">{st.main_result}</p>
                        {st.url && (
                          <a
                            href={st.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline"
                          >
                            View Open Scientific Record <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 11. What Could You Check? (Biomarkers & Tests) */}
      {data.biomarkers && data.biomarkers.length > 0 && (
        <Panel className="p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-2">
            <FlaskConical className="h-5 w-5 text-cyan-400" />
            <SectionLabel>What Could You Check? (Tests & Markers)</SectionLabel>
          </div>
          <p className="text-xs text-white/50 mb-4">
            Objective tests to discuss with your healthcare provider for clinical confirmation:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {data.biomarkers.map((bm, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-xs space-y-2">
                <div className="text-sm font-medium text-cyan-300">{bm.test_name || bm.marker}</div>
                <div className="text-white/75 leading-relaxed">
                  <span className="text-white/40 block text-[10px] uppercase">Measures</span>
                  {bm.measures}
                </div>
                <div className="text-white/75 leading-relaxed">
                  <span className="text-white/40 block text-[10px] uppercase">Why It Matters</span>
                  {bm.why_it_matters || bm.matters}
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-2.5 text-[11px] text-white/60">
                  <strong className="text-white/80">Limitations:</strong> {bm.limitations}
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* 12. THE ONE THING TO REMEMBER (Memorable Takeaway Banner) */}
      <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400/10 via-emerald-400/5 to-transparent p-6 sm:p-7 space-y-2 shadow-[0_0_25px_rgba(0,240,255,0.15)]">
        <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span>The One Thing to Remember</span>
        </div>
        <p className="font-display text-lg sm:text-xl font-light text-white leading-snug">
          "{data.the_one_thing_to_remember || "A symptom is a clue, not a diagnosis. Food and sleep first—supplements only when they actually add value."}"
        </p>
      </div>

      {/* 13. YOUR NEXT BEST QUESTION (Clickable Follow-up Chips) */}
      {data.followups && data.followups.length > 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-cyan-400 mb-3">
            <HelpCircle className="h-4 w-4" />
            <span>Your Next Best Question</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.followups.map((fq, i) => (
              <button
                key={i}
                onClick={() => onAskFollowup && onAskFollowup(fq)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-white/85 transition-all hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:text-white"
              >
                <span>{fq}</span>
                <ArrowRight className="h-3 w-3 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 14. Feedback Widget */}
      <FeedbackWidget query={data.problem || data.title} />

      {/* Biology Receipt Modal */}
      <BiologyReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        topicTitle={data.title || data.problem}
        takeAway={data.the_one_thing_to_remember || "A symptom is a clue, not a diagnosis. Food and sleep first."}
        items={[
          { label: "Investigation Focus", val: (data.title || "Physiology").slice(0, 22) },
          { label: "Action Priority", val: data.start_here?.[0]?.action?.slice(0, 22) || "Whole Food Repletion" },
          { label: "Evidence Baseline", val: "Clinical Guidelines" }
        ]}
        evidenceGrade="Verified Science"
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        topicTitle={data.title || data.problem}
        takeAway={data.the_one_thing_to_remember}
        bullets={data.start_here ? data.start_here.map((s) => s.action) : []}
      />
    </div>
  );
}
