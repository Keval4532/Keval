import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ExpandCard, Bullets, Empty } from "./sections";
import { EvidenceBadge, Panel, SectionLabel, SafetyIndicator } from "./primitives";
import BodySystemMap from "./BodySystemMap";
import ShareCardModal from "./ShareCardModal";
import BiologyReceiptModal from "./BiologyReceiptModal";
import PersonaSwitcher from "./PersonaSwitcher";
import FeedbackWidget from "./FeedbackWidget";
import {
  Sparkles, Zap, BookOpen, Microscope, Share2, HelpCircle,
  ArrowRight, Utensils, Pill, CheckCircle2, AlertTriangle, ShieldCheck, Receipt, Copy, Check
} from "lucide-react";

function BeginnerAdvanced({ data }) {
  const [mode, setMode] = useState("beginner");
  if (!data) return <Empty />;
  return (
    <div className="space-y-4">
      <div className="flex w-fit gap-1 rounded-full border border-[#1E293B] bg-[#141C28] p-1 text-xs shadow-inner">
        {["beginner", "advanced"].map((m) => (
          <button
            key={m}
            data-testid={`whatis-${m}`}
            onClick={() => setMode(m)}
            className={`relative rounded-full px-4 py-1.5 capitalize font-bold transition-all ${
              mode === m ? "text-zinc-950 shadow-md font-mono" : "text-slate-400 hover:text-white"
            }`}
          >
            {mode === m && <motion.span layoutId="wi-toggle" className="absolute inset-0 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/25" />}
            <span className="relative z-10">{m === "beginner" ? "Simple Explanation" : "Advanced Human Physiology"}</span>
          </button>
        ))}
      </div>
      <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] font-normal">
        {data[mode] || data.beginner}
      </p>
    </div>
  );
}

function FoodTable({ rows = [] }) {
  const [sort, setSort] = useState({ key: "food", dir: 1 });
  if (!rows.length) return <Empty />;
  const sorted = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? sort.dir : -sort.dir));
  const cols = [
    { key: "food", label: "Whole Food" },
    { key: "amount", label: "Portion" },
    { key: "content", label: "Nutrient Amount" },
    { key: "bioavailability", label: "How Well Absorbed" },
    { key: "serving", label: "Practical Serving" },
  ];
  return (
    <div className="overflow-x-auto border border-[#1E293B] rounded-2xl bg-[#141C28] shadow-lg">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-[#1E293B] bg-[#0E141D] text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
            {cols.map((c) => (
              <th
                key={c.key}
                className="cursor-pointer px-4 py-3 hover:text-cyan-400"
                onClick={() => setSort((s) => ({ key: c.key, dir: s.key === c.key ? -s.dir : 1 }))}
                data-testid={`food-sort-${c.key}`}
              >
                {c.label}{sort.key === c.key ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E293B]/60">
          {sorted.map((r, i) => (
            <tr key={i} className="hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-3.5 font-bold text-[#F8FAFC]">{r.food}</td>
              <td className="px-4 py-3.5 text-slate-400">{r.amount}</td>
              <td className="px-4 py-3.5 font-mono font-bold text-cyan-400 tabular-nums">{r.content}</td>
              <td className="px-4 py-3.5">
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[10px] uppercase font-bold font-mono inline-block"
                  style={{
                    borderColor: r.bioavailability?.toLowerCase().includes("high") ? "rgba(16,185,129,0.5)" : "rgba(6,182,212,0.5)",
                    color: r.bioavailability?.toLowerCase().includes("high") ? "#34D399" : "#38BDF8",
                    backgroundColor: r.bioavailability?.toLowerCase().includes("high") ? "rgba(16,185,129,0.1)" : "rgba(6,182,212,0.1)"
                  }}
                >
                  {r.bioavailability}
                </span>
              </td>
              <td className="px-4 py-3.5 text-slate-400">{r.serving}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ResultTopic({ data, onAskFollowup }) {
  const [depth, setDepth] = useState("go-deeper"); // "quick" | "go-deeper" | "deep-science"
  const [tab, setTab] = useState("Overview");
  const [shareOpen, setShareOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);
  const s = data.sections || {};
  const subject = data.subject || "Topic";

  // 30-Second Quick Bullets
  const quickBullets = [
    `Essential for cellular energy synthesis and active metabolic pathways.`,
    `Directly supports muscle contraction, nerve conduction, and cellular recovery.`,
    `Whole foods (seeds, leafy greens, legumes, animal protein) provide natural organic cofactors.`,
    `More isn't automatically better—the goal is consistent adequate daily intake.`,
    `Whether you need a supplement depends on your diet, training load, and blood markers.`
  ];

  const oneThingToRemember = `More is not always better. Your goal with ${subject} is consistent adequate intake—build your foundation with food and sleep first.`;

  const followups = data.followups || [
    `Which foods have the most ${subject}?`,
    `Do I actually need a ${subject} supplement?`,
    `What is the best form of ${subject}?`,
    `Can ${subject} help with sleep and recovery?`,
    `What happens if you take too much?`
  ];

  const content = {
    Overview: (
      <div className="space-y-6">
        {/* Explain It Like... Persona Switcher */}
        <PersonaSwitcher subject={subject} context={s.what_is_it?.beginner || s.why_important?.[0]?.summary || ""} data={data} />

        {/* Receipt Button */}
        <button
          onClick={() => setReceiptOpen(true)}
          className="flex w-full items-center justify-between rounded-3xl border border-[#1E293B] bg-[#0E141D] p-5 transition-all hover:border-cyan-500/40 hover:bg-[#141C28] shadow-xl"
        >
          <div className="flex items-center gap-3.5">
            <div className="rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-2.5">
              <Receipt className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Generate Biology Receipt</div>
              <div className="text-xs text-slate-400">Shareable snapshot of key metrics, safety limits & foods</div>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-cyan-400" />
        </button>

        {s.what_is_it && (
          <Panel className="p-6 sm:p-8">
            <SectionLabel>What is it?</SectionLabel>
            <BeginnerAdvanced data={s.what_is_it} />
          </Panel>
        )}
        {s.affects?.length > 0 && (
          <Panel className="p-6 sm:p-8">
            <SectionLabel>What does it affect inside your body?</SectionLabel>
            <BodySystemMap affects={s.affects} />
          </Panel>
        )}
        {s.why_important?.length > 0 && (
          <div>
            <SectionLabel>Why is it important?</SectionLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {s.why_important.map((f, i) => (
                <ExpandCard key={i} title={f.title} badge={f.evidence} testId={`why-card-${i}`}>
                  <Bullets items={f.bullets} color="#06B6D4" />
                </ExpandCard>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    "How It Works": s.mechanism ? (
      <Panel className="p-6 sm:p-8 space-y-6">
        <SectionLabel>How it works inside your body</SectionLabel>
        <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] font-normal">{s.mechanism.summary}</p>
        <div className="space-y-4">
          {(s.mechanism.steps || []).map((st, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/50 bg-cyan-500/10 font-mono text-xs text-cyan-300 font-extrabold shadow-sm">
                  {i + 1}
                </div>
                {i < s.mechanism.steps.length - 1 && <div className="my-1 h-full w-px bg-[#1E293B]" />}
              </div>
              <div className="pb-4">
                <div className="text-sm font-bold text-white">{st.stage}</div>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-[#CBD5E1] font-normal">{st.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    ) : <Empty />,
    "What Science Supports": s.uses ? (
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["strong", "Strong Evidence", "#10B981", "text-emerald-400 border-emerald-500/30 bg-emerald-500/5"],
          ["moderate", "Good Evidence", "#06B6D4", "text-cyan-400 border-cyan-500/30 bg-cyan-500/5"],
          ["emerging", "Early Evidence", "#F59E0B", "text-amber-400 border-amber-500/30 bg-amber-500/5"],
          ["insufficient", "Limited Evidence", "#94A3B8", "text-slate-400 border-slate-700 bg-slate-800/10"]
        ].map(([key, label, color, badgeStyle]) => (
          <Panel key={key} className="p-6">
            <div className={`mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs uppercase font-bold tracking-wider font-mono ${badgeStyle}`}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </div>
            {s.uses[key]?.length ? <Bullets items={s.uses[key]} color={color} /> : <p className="text-xs text-slate-500">None listed.</p>}
          </Panel>
        ))}
      </div>
    ) : <Empty />,
    "If You're Low": s.deficiency ? (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel className="p-5"><SectionLabel>Why low levels happen</SectionLabel><Bullets items={s.deficiency.causes} color="#06B6D4" /></Panel>
          <Panel className="p-5"><SectionLabel>Possible signs & effects</SectionLabel><Bullets items={s.deficiency.effects} color="#F59E0B" /></Panel>
          <Panel className="p-5">
            <SectionLabel>Common signs</SectionLabel>
            <Bullets items={s.deficiency.symptoms} color="#FF9F0A" />
            {s.deficiency.symptoms_note && <p className="mt-3 text-xs italic text-slate-400">{s.deficiency.symptoms_note}</p>}
          </Panel>
          <Panel className="p-5"><SectionLabel>Who should be mindful</SectionLabel><Bullets items={s.deficiency.risk_groups} color="#10B981" /></Panel>
        </div>
        {s.deficiency.testing && (
          <Panel className="p-5">
            <SectionLabel>What could you check?</SectionLabel>
            <p className="text-sm text-[#CBD5E1] font-normal leading-relaxed">{s.deficiency.testing}</p>
          </Panel>
        )}
      </div>
    ) : <Empty />,
    "Food Sources": s.food_sources ? (
      <div className="space-y-6">
        <Panel className="p-6 sm:p-8">
          <SectionLabel>Best Whole Food Sources</SectionLabel>
          <p className="mb-4 text-xs text-slate-400 font-normal">
            Whole food provides minerals in natural cellular matrices with essential dietary cofactors:
          </p>
          <FoodTable rows={s.food_sources} />
        </Panel>
      </div>
    ) : <Empty />,
    "Should You Supplement?": (
      <div className="space-y-6">
        <Panel className="p-6 sm:p-8 space-y-4">
          <SectionLabel>Should You Supplement?</SectionLabel>
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-xs text-[#CBD5E1] leading-relaxed font-normal shadow-inner">
            <strong className="text-cyan-300 font-bold block mb-1 text-[11px] uppercase font-mono">
              KEVALBIO Recommendation Principle:
            </strong>
            If your everyday diet already provides enough {subject}, you may NOT need a supplement. Focus first on whole foods.
          </div>

          {s.absorption && (
            <div className="grid gap-3 sm:grid-cols-2 pt-2 text-xs">
              <div className="rounded-2xl border border-[#283548] bg-[#141C28] p-4 space-y-2">
                <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block font-mono">How Well Your Body Absorbs It</span>
                <Bullets items={s.absorption.increases || []} color="#10B981" />
              </div>
              <div className="rounded-2xl border border-[#283548] bg-[#141C28] p-4 space-y-2">
                <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wider block font-mono">What Can Decrease Absorption</span>
                <Bullets items={s.absorption.decreases || []} color="#F59E0B" />
              </div>
            </div>
          )}

          {s.absorption?.forms && (
            <div className="rounded-2xl border border-[#283548] bg-[#141C28] p-5 space-y-2 text-xs">
              <span className="font-bold text-cyan-300 uppercase text-[10px] tracking-wider block font-mono">Comparing Different Forms</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-300 font-normal">
                {s.absorption.forms.map((fm, i) => (
                  <li key={i}>{fm}</li>
                ))}
              </ul>
            </div>
          )}
        </Panel>
      </div>
    ),
    "Food vs Supplement": (
      <Panel className="p-6 sm:p-8">
        <SectionLabel>Food vs Supplement Strategy</SectionLabel>
        <div className="overflow-x-auto border border-[#1E293B] rounded-2xl mt-3 bg-[#141C28] shadow-lg">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1E293B] bg-[#0E141D] text-[10px] uppercase font-bold tracking-wider text-slate-400 font-mono">
                <th className="px-4 py-3.5">Factor</th>
                <th className="px-4 py-3.5 text-emerald-400 font-bold">Whole Food Strategy</th>
                <th className="px-4 py-3.5 text-cyan-400 font-bold">Supplemental Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E293B]/60">
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 text-slate-400 font-bold">Bioavailability</td>
                <td className="px-4 py-3.5 text-[#F8FAFC]">Provides organic mineral complexes with dietary fiber and polyphenols.</td>
                <td className="px-4 py-3.5 text-[#F8FAFC]">Provides standardized, isolated active compounds.</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 text-slate-400 font-bold">Safety Margin</td>
                <td className="px-4 py-3.5 text-emerald-300 font-medium">Natural homeostatic regulation; zero toxicity risk.</td>
                <td className="px-4 py-3.5 text-amber-300 font-medium">Requires staying within Upper Intake Limits (UL).</td>
              </tr>
              <tr className="hover:bg-white/[0.02]">
                <td className="px-4 py-3.5 text-slate-400 font-bold">Verdict</td>
                <td className="px-4 py-3.5 text-[#F8FAFC]">Everyday foundational baseline for all healthy individuals.</td>
                <td className="px-4 py-3.5 text-cyan-300 font-medium">Targeted repletion, high training demands, or dietary gaps.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>
    ),
    Safety: s.safety ? (
      <div className="space-y-4">
        <Panel className="p-6 sm:p-8 space-y-4">
          <SectionLabel>How to Stay Safe</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-2xl border border-[#283548] bg-[#141C28] p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono">Upper Safety Limit</span>
              <span className="text-[#F8FAFC] text-sm font-bold mt-1 block">{s.safety.upper_limit}</span>
            </div>
            <div className="rounded-2xl border border-[#283548] bg-[#141C28] p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block font-mono">Toxicity Overview</span>
              <span className="text-[#F8FAFC] text-sm font-bold mt-1 block">{s.safety.toxicity}</span>
            </div>
          </div>
          {s.safety.drug_interactions?.length > 0 && (
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200 shadow-sm">
              <strong className="block mb-1 uppercase text-[10px] text-amber-400 font-bold font-mono">Medication Considerations:</strong>
              <Bullets items={s.safety.drug_interactions} color="#F59E0B" />
            </div>
          )}
        </Panel>
      </div>
    ) : <Empty />,
    "Live Research": (
      <div className="space-y-4">
        <div className="rounded-3xl border border-cyan-500/30 bg-[#0E141D] p-5 sm:p-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono">
                🔎 Live Scientific Research Layer
              </span>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Verified against PubMed, NIH ODS, and JISSN Clinical Guidelines
            </div>
          </div>
        </div>

        {data.live_research?.studies?.length ? (
          <div className="space-y-3">
            {data.live_research.studies.map((st, i) => (
              <Panel key={i} className="p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-sm text-cyan-300">{st.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-[#141C28] border border-[#283548] px-2.5 py-0.5 text-[10px] text-slate-300 font-bold font-mono">{st.year}</span>
                    <EvidenceBadge level={st.evidence_level || "strong"} />
                  </div>
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed pt-1 font-normal">{st.main_result}</p>
                {st.url && (
                  <a
                    href={st.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:underline pt-1 font-bold"
                  >
                    Open PubMed / NIH Record →
                  </a>
                )}
              </Panel>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {(s.research || []).map((r, i) => (
              <Panel key={i} className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-cyan-400 font-bold">{r.year}</span>
                  <EvidenceBadge level={r.evidence_level} />
                </div>
                <div className="mt-2 text-sm font-bold text-white">{r.title}</div>
                <p className="mt-1 text-xs text-slate-400 font-normal">{r.summary}</p>
              </Panel>
            ))}
          </div>
        )}
      </div>
    ),
  };

  const TABS_LIST = [
    "Overview",
    "How It Works",
    "What Science Supports",
    "If You're Low",
    "Food Sources",
    "Should You Supplement?",
    "Food vs Supplement",
    "Safety",
    "Live Research"
  ];

  const available = TABS_LIST.filter((t) => {
    const map = {
      Overview: s.what_is_it || s.why_important || s.affects,
      "How It Works": s.mechanism,
      "What Science Supports": s.uses,
      "If You're Low": s.deficiency,
      "Food Sources": s.food_sources,
      "Should You Supplement?": s.supplementation || s.absorption,
      "Food vs Supplement": true,
      Safety: s.safety,
      "Live Research": true,
    };
    return map[t];
  });

  const tabs = available.length ? available : ["Overview"];
  const activeTab = tabs.includes(tab) ? tab : tabs[0];

  return (
    <div className="space-y-8">
      {/* Top Bar with Share & Depth Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E293B] pb-4">
        {/* Progressive Depth Selector */}
        <div className="flex items-center gap-1 rounded-full border border-[#1E293B] bg-[#0E141D] p-1 text-xs shadow-inner">
          <button
            onClick={() => setDepth("quick")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all font-bold ${
              depth === "quick" ? "bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Quick (30s)</span>
          </button>

          <button
            onClick={() => setDepth("go-deeper")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all font-bold ${
              depth === "go-deeper" ? "bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Go Deeper</span>
          </button>

          <button
            onClick={() => setDepth("deep-science")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 transition-all font-bold ${
              depth === "deep-science" ? "bg-cyan-400 text-zinc-950 shadow-lg shadow-cyan-500/25" : "text-slate-400 hover:text-white"
            }`}
          >
            <Microscope className="h-3.5 w-3.5" />
            <span>Deep Science</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReceiptOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#1E293B] bg-[#141C28] px-3.5 py-2 text-xs font-bold text-slate-200 hover:text-white hover:border-cyan-400/40 hover:bg-cyan-500/10 transition-all font-mono shadow-sm"
          >
            <Receipt className="h-3.5 w-3.5 text-cyan-400" />
            <span>Receipt</span>
          </button>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-[#1E293B] bg-[#141C28] px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition-all shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* QUICK (30-Second) View */}
      {depth === "quick" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Panel className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Zap className="h-4 w-4" />
              <span>{subject} in 30 Seconds</span>
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base leading-relaxed text-[#CBD5E1] list-disc list-inside font-normal">
              {quickBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                onClick={() => setDepth("go-deeper")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
              >
                Go deeper into how it works inside your body →
              </button>
            </div>
          </Panel>

          {/* Memorable takeaway */}
          <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-transparent p-6 space-y-1.5 shadow-xl">
            <div className="text-cyan-300 text-xs font-bold uppercase tracking-widest font-mono">The One Thing to Remember</div>
            <p className="text-white text-base sm:text-lg font-bold leading-snug">"{oneThingToRemember}"</p>
          </div>
        </motion.div>
      )}

      {/* GO DEEPER & DEEP SCIENCE Views */}
      {depth !== "quick" && (
        <div>
          {/* Frosted Glass Sticky Sub-Navigation Bar */}
          <div className="sticky top-16 z-20 -mx-4 mb-6 overflow-x-auto border-b border-[#1E293B] bg-[#0E141D]/90 backdrop-blur-md px-4 sm:mx-0 sm:rounded-none sm:px-0 shadow-lg">
            <div className="flex gap-1 py-1">
              {tabs.map((t) => {
                const isAct = activeTab === t;
                return (
                  <button
                    key={t}
                    data-testid={`tab-${t.toLowerCase().replace(/\s/g, "-")}`}
                    onClick={() => setTab(t)}
                    className={`relative whitespace-nowrap px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
                      isAct ? "text-cyan-400" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t}
                    {isAct && (
                      <motion.span
                        layoutId="tab-underline"
                        className="absolute inset-x-2 -bottom-px h-[2px] bg-cyan-400 shadow-md shadow-cyan-400/50"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {content[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* The One Thing to Remember Banner with 1-Click Copy Quote / Share */}
      {depth !== "quick" && (
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-emerald-500/5 to-transparent p-6 sm:p-7 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest font-mono">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>The One Thing to Remember</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`"${oneThingToRemember}" — KEVALBIO`);
                toast.success("Copied quote to clipboard!");
              }}
              className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-[#141C28] px-3.5 py-1 text-xs text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all font-mono font-bold shadow-sm"
            >
              <Copy className="h-3 w-3" />
              <span>Copy Quote</span>
            </button>
          </div>
          <p className="font-display text-lg sm:text-xl font-bold text-white leading-snug tracking-tight">
            "{oneThingToRemember}"
          </p>
        </div>
      )}

      {/* Your Next Best Question */}
      <div className="rounded-3xl border border-[#1E293B] bg-[#0E141D] p-6 sm:p-7 space-y-3 shadow-xl">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
          <HelpCircle className="h-4 w-4" />
          <span>Your Next Best Question</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {followups.map((fq, i) => (
            <button
              key={i}
              onClick={() => onAskFollowup && onAskFollowup(fq)}
              className="flex items-center gap-1.5 rounded-full border border-[#1E293B] bg-[#141C28] px-4 py-2 text-xs font-semibold text-slate-200 transition-all hover:border-cyan-400/60 hover:bg-cyan-500/10 hover:text-white shadow-sm"
            >
              <span>{fq}</span>
              <ArrowRight className="h-3 w-3 text-cyan-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Feedback Widget */}
      <FeedbackWidget query={subject} />

      {/* Biology Receipt Modal */}
      <BiologyReceiptModal
        isOpen={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        topicTitle={subject}
        takeAway={oneThingToRemember}
        items={[
          { label: "Core Human Function", val: "Cellular Energy & Tone" },
          { label: "Food-First Priority", val: "Whole Food Matrices" },
          { label: "Safety / Upper Limit", val: s.safety?.upper_limit?.split(";")?.[0] || "Standard Clinical Range" }
        ]}
        evidenceGrade="Strong Evidence"
      />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        topicTitle={subject}
        takeAway={oneThingToRemember}
        bullets={quickBullets}
      />
    </div>
  );
}
