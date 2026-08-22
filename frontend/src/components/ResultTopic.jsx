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
      <div className="flex w-fit gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.02] p-1 text-xs shadow-sm">
        {["beginner", "advanced"].map((m) => (
          <button
            key={m}
            data-testid={`whatis-${m}`}
            onClick={() => setMode(m)}
            className={`relative rounded-full px-3.5 py-1.5 capitalize font-bold transition-all ${
              mode === m ? "text-white dark:text-black shadow" : "text-slate-600 dark:text-white/50 hover:text-slate-950 dark:hover:text-white"
            }`}
          >
            {mode === m && <motion.span layoutId="wi-toggle" className="absolute inset-0 rounded-full bg-cyan-500 dark:bg-cyan-400" />}
            <span className="relative">{m === "beginner" ? "Simple Explanation" : "Advanced Human Physiology"}</span>
          </button>
        ))}
      </div>
      <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-white/90 font-normal">
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
    <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#0E141D] shadow-sm">
      <table className="w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-[10px] uppercase font-bold tracking-wider text-slate-600 dark:text-white/50 font-mono">
            {cols.map((c) => (
              <th
                key={c.key}
                className="cursor-pointer px-4 py-3 hover:text-cyan-700 dark:hover:text-cyan-400"
                onClick={() => setSort((s) => ({ key: c.key, dir: s.key === c.key ? -s.dir : 1 }))}
                data-testid={`food-sort-${c.key}`}
              >
                {c.label}{sort.key === c.key ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
          {sorted.map((r, i) => (
            <tr key={i} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors">
              <td className="px-4 py-3 font-bold text-slate-900 dark:text-white/95">{r.food}</td>
              <td className="px-4 py-3 text-slate-600 dark:text-white/70">{r.amount}</td>
              <td className="px-4 py-3 font-mono font-bold text-cyan-700 dark:text-cyan-300 tabular-nums">{r.content}</td>
              <td className="px-4 py-3">
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[10px] uppercase font-bold font-mono"
                  style={{
                    borderColor: r.bioavailability?.toLowerCase().includes("high") ? "#10B981" : "#06B6D4",
                    color: r.bioavailability?.toLowerCase().includes("high") ? "#059669" : "#0891B2",
                    backgroundColor: r.bioavailability?.toLowerCase().includes("high") ? "rgba(16,185,129,0.08)" : "rgba(6,182,212,0.08)"
                  }}
                >
                  {r.bioavailability}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-white/70">{r.serving}</td>
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
    `Directly supports muscle contraction, nerve conduction, and recovery.`,
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
          className="flex w-full items-center justify-between rounded-2xl border border-cyan-300 dark:border-cyan-400/30 bg-cyan-50/70 dark:bg-cyan-400/10 p-4 transition-colors hover:bg-cyan-100 dark:hover:bg-cyan-400/20 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-cyan-500/10 dark:bg-cyan-400/20 p-2"><Receipt className="h-5 w-5 text-cyan-700 dark:text-cyan-300" /></div>
            <span className="text-sm font-bold text-cyan-900 dark:text-cyan-200">Biology Receipt</span>
          </div>
          <ArrowRight className="h-4 w-4 text-cyan-600 dark:text-white/50" />
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
        <p className="text-sm sm:text-base leading-relaxed text-slate-800 dark:text-white/85 font-normal">{s.mechanism.summary}</p>
        <div className="space-y-4">
          {(s.mechanism.steps || []).map((st, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 dark:border-cyan-400/40 bg-cyan-50 dark:bg-cyan-400/10 font-mono text-xs text-cyan-700 dark:text-cyan-300 font-bold">
                  {i + 1}
                </div>
                {i < s.mechanism.steps.length - 1 && <div className="my-1 h-full w-px bg-slate-200 dark:bg-white/10" />}
              </div>
              <div className="pb-4">
                <div className="text-sm font-bold text-slate-900 dark:text-cyan-300">{st.stage}</div>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-white/75 font-normal">{st.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    ) : <Empty />,
    "What Science Supports": s.uses ? (
      <div className="grid gap-4 sm:grid-cols-2">
        {[
          ["strong", "Strong Evidence", "#10B981", "text-emerald-700 dark:text-emerald-400"],
          ["moderate", "Good Evidence", "#06B6D4", "text-cyan-700 dark:text-cyan-400"],
          ["emerging", "Early Evidence", "#F59E0B", "text-amber-700 dark:text-amber-400"],
          ["insufficient", "Limited Evidence", "#64748B", "text-slate-600 dark:text-white/50"]
        ].map(([key, label, color, textClass]) => (
          <Panel key={key} className="p-5">
            <div className={`mb-3 flex items-center gap-2 text-xs uppercase font-bold tracking-wider font-mono ${textClass}`}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </div>
            {s.uses[key]?.length ? <Bullets items={s.uses[key]} color={color} /> : <p className="text-xs text-slate-400 dark:text-white/30">None listed.</p>}
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
            {s.deficiency.symptoms_note && <p className="mt-3 text-xs italic text-slate-500 dark:text-white/40">{s.deficiency.symptoms_note}</p>}
          </Panel>
          <Panel className="p-5"><SectionLabel>Who should be mindful</SectionLabel><Bullets items={s.deficiency.risk_groups} color="#10B981" /></Panel>
        </div>
        {s.deficiency.testing && (
          <Panel className="p-5">
            <SectionLabel>What could you check?</SectionLabel>
            <p className="text-sm text-slate-800 dark:text-white/80 font-normal leading-relaxed">{s.deficiency.testing}</p>
          </Panel>
        )}
      </div>
    ) : <Empty />,
    "Food Sources": s.food_sources ? (
      <div className="space-y-6">
        <Panel className="p-6 sm:p-8">
          <SectionLabel>Best Whole Food Sources</SectionLabel>
          <p className="mb-4 text-xs text-slate-600 dark:text-white/50 font-normal">
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
          <div className="rounded-2xl border border-cyan-300 dark:border-cyan-400/20 bg-cyan-50/70 dark:bg-cyan-400/[0.02] p-4 text-xs text-slate-800 dark:text-white/85 leading-relaxed font-normal">
            <strong className="text-cyan-800 dark:text-cyan-300 font-bold block mb-1 text-[11px] uppercase font-mono">
              KEVALBIO Recommendation Principle:
            </strong>
            If your everyday diet already provides enough {subject}, you may NOT need a supplement. Focus first on whole foods.
          </div>

          {s.absorption && (
            <div className="grid gap-3 sm:grid-cols-2 pt-2 text-xs">
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 space-y-2">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase text-[10px] tracking-wider block font-mono">How Well Your Body Absorbs It</span>
                <Bullets items={s.absorption.increases || []} color="#10B981" />
              </div>
              <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 space-y-2">
                <span className="font-bold text-amber-700 dark:text-amber-400 uppercase text-[10px] tracking-wider block font-mono">What Can Decrease Absorption</span>
                <Bullets items={s.absorption.decreases || []} color="#F59E0B" />
              </div>
            </div>
          )}

          {s.absorption?.forms && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-5 space-y-2 text-xs">
              <span className="font-bold text-cyan-700 dark:text-cyan-300 uppercase text-[10px] tracking-wider block font-mono">Comparing Different Forms</span>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700 dark:text-white/80 font-normal">
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
        <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl mt-3 bg-white dark:bg-[#0E141D] shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-[10px] uppercase font-bold tracking-wider text-slate-600 dark:text-white/40 font-mono">
                <th className="px-4 py-3">Factor</th>
                <th className="px-4 py-3 text-emerald-700 dark:text-emerald-400 font-bold">Whole Food Strategy</th>
                <th className="px-4 py-3 text-cyan-700 dark:text-cyan-400 font-bold">Supplemental Form</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              <tr className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-slate-600 dark:text-white/50 font-bold">Bioavailability</td>
                <td className="px-4 py-3 text-slate-800 dark:text-white/85">Provides organic mineral complexes with dietary fiber and polyphenols.</td>
                <td className="px-4 py-3 text-slate-800 dark:text-white/85">Provides standardized, isolated active compounds.</td>
              </tr>
              <tr className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-slate-600 dark:text-white/50 font-bold">Safety Margin</td>
                <td className="px-4 py-3 text-emerald-700 dark:text-emerald-300 font-medium">Natural homeostatic regulation; zero toxicity risk.</td>
                <td className="px-4 py-3 text-amber-700 dark:text-amber-300 font-medium">Requires staying within Upper Intake Limits (UL).</td>
              </tr>
              <tr className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-slate-600 dark:text-white/50 font-bold">Verdict</td>
                <td className="px-4 py-3 text-slate-800 dark:text-white/85">Everyday foundational baseline for all healthy individuals.</td>
                <td className="px-4 py-3 text-cyan-700 dark:text-cyan-300 font-medium">Targeted repletion, high training demands, or dietary gaps.</td>
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
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 block font-mono">Upper Safety Limit</span>
              <span className="text-slate-900 dark:text-white/90 text-sm font-bold mt-1 block">{s.safety.upper_limit}</span>
            </div>
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] p-4 shadow-sm">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-white/40 block font-mono">Toxicity Overview</span>
              <span className="text-slate-900 dark:text-white/90 text-sm font-bold mt-1 block">{s.safety.toxicity}</span>
            </div>
          </div>
          {s.safety.drug_interactions?.length > 0 && (
            <div className="rounded-2xl border border-amber-300 dark:border-yellow-400/20 bg-amber-50 dark:bg-yellow-400/[0.02] p-4 text-xs text-amber-900 dark:text-yellow-200 shadow-sm">
              <strong className="block mb-1 uppercase text-[10px] text-amber-700 dark:text-yellow-300 font-bold font-mono">Medication Considerations:</strong>
              <Bullets items={s.safety.drug_interactions} color="#F59E0B" />
            </div>
          )}
        </Panel>
      </div>
    ) : <Empty />,
    "Live Research": (
      <div className="space-y-4">
        <div className="rounded-2xl border border-cyan-300 dark:border-cyan-400/30 bg-cyan-50/70 dark:bg-cyan-400/[0.03] p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 dark:text-cyan-300 font-mono">
                🔎 Live Scientific Research Layer
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-white/60 font-medium">
              Verified against PubMed, NIH ODS, and JISSN Clinical Guidelines
            </div>
          </div>
        </div>

        {data.live_research?.studies?.length ? (
          <div className="space-y-3">
            {data.live_research.studies.map((st, i) => (
              <Panel key={i} className="p-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-sm text-cyan-800 dark:text-cyan-300">{st.title}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 dark:bg-white/10 px-2 py-0.5 text-[10px] text-slate-700 dark:text-white/80 font-bold font-mono">{st.year}</span>
                    <EvidenceBadge level={st.evidence_level || "strong"} />
                  </div>
                </div>
                <p className="text-xs text-slate-700 dark:text-white/80 leading-relaxed pt-1 font-normal">{st.main_result}</p>
                {st.url && (
                  <a
                    href={st.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-cyan-700 dark:text-cyan-400 hover:underline pt-1 font-bold"
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
                  <span className="font-mono text-xs text-cyan-700 dark:text-cyan-400 font-bold">{r.year}</span>
                  <EvidenceBadge level={r.evidence_level} />
                </div>
                <div className="mt-2 text-sm font-bold text-slate-900 dark:text-white/90">{r.title}</div>
                <p className="mt-1 text-xs text-slate-600 dark:text-white/60 font-normal">{r.summary}</p>
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
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4">
        {/* Progressive Depth Selector */}
        <div className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.02] p-1 text-xs shadow-sm">
          <button
            onClick={() => setDepth("quick")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all font-bold ${
              depth === "quick" ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-black shadow" : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Quick (30s)</span>
          </button>

          <button
            onClick={() => setDepth("go-deeper")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all font-bold ${
              depth === "go-deeper" ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-black shadow" : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Go Deeper</span>
          </button>

          <button
            onClick={() => setDepth("deep-science")}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all font-bold ${
              depth === "deep-science" ? "bg-cyan-500 text-white dark:bg-cyan-400 dark:text-black shadow" : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Microscope className="h-3.5 w-3.5" />
            <span>Deep Science</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setReceiptOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-cyan-300 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-400/20 transition-colors font-mono"
          >
            <Receipt className="h-3.5 w-3.5" />
            <span>Biology Receipt</span>
          </button>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-700 dark:text-white/70 hover:border-cyan-500/40 hover:text-slate-950 dark:hover:text-white transition-colors font-semibold"
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
            <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
              <Zap className="h-4 w-4" />
              <span>{subject} in 30 Seconds</span>
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base leading-relaxed text-slate-800 dark:text-white/85 list-disc list-inside font-normal">
              {quickBullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <div className="pt-2">
              <button
                onClick={() => setDepth("go-deeper")}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:underline"
              >
                Go deeper into how it works inside your body →
              </button>
            </div>
          </Panel>

          {/* Memorable takeaway */}
          <div className="rounded-3xl border border-cyan-300 dark:border-cyan-400/30 bg-gradient-to-r from-cyan-50 via-emerald-50 to-transparent dark:from-cyan-400/10 dark:to-transparent p-6 space-y-1.5 shadow-sm">
            <div className="text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-widest font-mono">The One Thing to Remember</div>
            <p className="text-slate-900 dark:text-white text-base sm:text-lg font-bold leading-snug">"{oneThingToRemember}"</p>
          </div>
        </motion.div>
      )}

      {/* GO DEEPER & DEEP SCIENCE Views */}
      {depth !== "quick" && (
        <div>
          <div className="sticky top-16 z-20 -mx-4 mb-6 overflow-x-auto border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080B10]/95 px-4 backdrop-blur sm:mx-0 sm:rounded-none sm:px-0 shadow-sm">
            <div className="flex gap-1 py-1">
              {tabs.map((t) => (
                <button
                  key={t}
                  data-testid={`tab-${t.toLowerCase().replace(/\s/g, "-")}`}
                  onClick={() => setTab(t)}
                  className={`relative whitespace-nowrap px-4 py-3 text-xs sm:text-sm font-bold transition-colors ${
                    activeTab === t ? "text-cyan-700 dark:text-cyan-400" : "text-slate-600 dark:text-white/50 hover:text-slate-950 dark:hover:text-white"
                  }`}
                >
                  {t}
                  {activeTab === t && <motion.span layoutId="tab-underline" className="absolute inset-x-2 -bottom-px h-[2px] bg-cyan-600 dark:bg-cyan-400" />}
                </button>
              ))}
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
        <div className="rounded-3xl border border-cyan-300 dark:border-cyan-400/40 bg-gradient-to-r from-cyan-50 via-emerald-50 to-transparent dark:from-cyan-400/10 dark:via-emerald-400/5 dark:to-transparent p-6 sm:p-7 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-widest font-mono">
              <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>The One Thing to Remember</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(`"${oneThingToRemember}" — KEVALBIO`);
                toast.success("Copied quote to clipboard!");
              }}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-cyan-400/30 bg-white dark:bg-black/40 px-3 py-1 text-xs text-slate-700 dark:text-cyan-300 hover:bg-slate-50 dark:hover:bg-cyan-400/20 hover:border-cyan-400 transition-all font-mono font-bold shadow-sm"
            >
              <Copy className="h-3 w-3" />
              <span>Copy Quote</span>
            </button>
          </div>
          <p className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug tracking-tight">
            "{oneThingToRemember}"
          </p>
        </div>
      )}

      {/* Your Next Best Question */}
      <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 sm:p-7 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-mono">
          <HelpCircle className="h-4 w-4" />
          <span>Your Next Best Question</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {followups.map((fq, i) => (
            <button
              key={i}
              onClick={() => onAskFollowup && onAskFollowup(fq)}
              className="flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-800 dark:text-white/85 transition-all hover:border-cyan-500 hover:bg-cyan-50 dark:hover:border-cyan-400/60 dark:hover:bg-cyan-400/10 hover:text-slate-950 dark:hover:text-white shadow-sm"
            >
              <span>{fq}</span>
              <ArrowRight className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
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
