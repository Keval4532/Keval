import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandCard, Bullets, Empty } from "./sections";
import { EvidenceBadge, Panel, SectionLabel, SafetyIndicator } from "./primitives";
import BodySystemMap from "./BodySystemMap";

const TABS = [
  "Overview", "Mechanism", "Benefits", "Deficiency", "Food Sources",
  "Supplementation", "Safety", "Interactions", "Performance", "Biomarkers", "Myths", "Research",
];

function BeginnerAdvanced({ data }) {
  const [mode, setMode] = useState("beginner");
  if (!data) return <Empty />;
  return (
    <div>
      <div className="mb-4 flex w-fit gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 text-xs">
        {["beginner", "advanced"].map((m) => (
          <button
            key={m}
            data-testid={`whatis-${m}`}
            onClick={() => setMode(m)}
            className={`relative rounded-full px-3.5 py-1.5 capitalize ${mode === m ? "text-black" : "text-white/50"}`}
          >
            {mode === m && <motion.span layoutId="wi-toggle" className="absolute inset-0 rounded-full bg-cyan-400" />}
            <span className="relative">{m === "beginner" ? "Beginner" : "Advanced Physiology"}</span>
          </button>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-white/75">{data[mode] || data.beginner}</p>
    </div>
  );
}

function FoodTable({ rows = [] }) {
  const [sort, setSort] = useState({ key: "food", dir: 1 });
  if (!rows.length) return <Empty />;
  const sorted = [...rows].sort((a, b) => (a[sort.key] > b[sort.key] ? sort.dir : -sort.dir));
  const cols = [
    { key: "food", label: "Food" }, { key: "amount", label: "Amount" },
    { key: "content", label: "Nutrient content" }, { key: "bioavailability", label: "Bioavailability" },
    { key: "serving", label: "Practical serving" },
  ];
  return (
    <div className="overflow-x-auto border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-widest text-white/40">
            {cols.map((c) => (
              <th key={c.key} className="cursor-pointer px-4 py-3 hover:text-cyan-400"
                onClick={() => setSort((s) => ({ key: c.key, dir: s.key === c.key ? -s.dir : 1 }))}
                data-testid={`food-sort-${c.key}`}>
                {c.label}{sort.key === c.key ? (sort.dir === 1 ? " ↑" : " ↓") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium text-white/90">{r.food}</td>
              <td className="px-4 py-3 text-white/60">{r.amount}</td>
              <td className="px-4 py-3 font-mono text-cyan-300/90 tabular-nums">{r.content}</td>
              <td className="px-4 py-3">
                <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase capitalize"
                  style={{ borderColor: r.bioavailability === "high" ? "#00E676" : r.bioavailability === "low" ? "#FF9F0A" : "#00F0FF",
                    color: r.bioavailability === "high" ? "#00E676" : r.bioavailability === "low" ? "#FF9F0A" : "#00F0FF" }}>
                  {r.bioavailability}
                </span>
              </td>
              <td className="px-4 py-3 text-white/60">{r.serving}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KeyRows({ obj = {}, labels = {} }) {
  const entries = Object.entries(obj).filter(([, v]) => v && typeof v === "string");
  if (!entries.length) return null;
  return (
    <div className="divide-y divide-white/5 border border-white/10">
      {entries.map(([k, v]) => (
        <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[180px_1fr]">
          <div className="text-[11px] uppercase tracking-wider text-white/40">{labels[k] || k.replace(/_/g, " ")}</div>
          <div className="text-sm text-white/75">{v}</div>
        </div>
      ))}
    </div>
  );
}

export default function ResultTopic({ data }) {
  const [tab, setTab] = useState("Overview");
  const s = data.sections || {};

  const content = {
    Overview: (
      <div className="space-y-6">
        {s.what_is_it && (
          <Panel className="p-6"><SectionLabel>What is it?</SectionLabel><BeginnerAdvanced data={s.what_is_it} /></Panel>
        )}
        {s.affects?.length > 0 && (
          <Panel className="p-6"><SectionLabel>What does it affect?</SectionLabel><BodySystemMap affects={s.affects} /></Panel>
        )}
        {s.why_important?.length > 0 && (
          <div>
            <SectionLabel>Why is it important?</SectionLabel>
            <div className="grid gap-3 sm:grid-cols-2">
              {s.why_important.map((f, i) => (
                <ExpandCard key={i} title={f.title} badge={f.evidence} testId={`why-card-${i}`}>{f.detail}</ExpandCard>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    Mechanism: s.mechanism ? (
      <Panel className="p-6">
        <SectionLabel>How does it work?</SectionLabel>
        <p className="mb-6 text-sm leading-relaxed text-white/75">{s.mechanism.summary}</p>
        <div className="space-y-3">
          {(s.mechanism.steps || []).map((st, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/5 font-mono text-xs text-cyan-400">{i + 1}</div>
                {i < s.mechanism.steps.length - 1 && <div className="my-1 h-full w-px bg-white/10" />}
              </div>
              <div className="pb-4">
                <div className="text-sm font-medium text-cyan-300">{st.stage}</div>
                <p className="mt-1 text-sm leading-relaxed text-white/70">{st.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    ) : <Empty />,
    Benefits: s.uses ? (
      <div className="grid gap-4 sm:grid-cols-2">
        {[["strong", "Strong Evidence", "#00E676"], ["moderate", "Moderate Evidence", "#00F0FF"],
          ["emerging", "Emerging Evidence", "#FFEA00"], ["insufficient", "Insufficient Evidence", "rgba(255,255,255,0.4)"]]
          .map(([key, label, color]) => (
            <Panel key={key} className="p-5">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color }}>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />{label}
              </div>
              {s.uses[key]?.length ? <Bullets items={s.uses[key]} color={color} /> : <p className="text-xs text-white/30">None listed.</p>}
            </Panel>
          ))}
      </div>
    ) : <Empty />,
    Deficiency: s.deficiency ? (
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Panel className="p-5"><SectionLabel>Why deficiency happens</SectionLabel><Bullets items={s.deficiency.causes} /></Panel>
          <Panel className="p-5"><SectionLabel>Possible effects</SectionLabel><Bullets items={s.deficiency.effects} color="#FFEA00" /></Panel>
          <Panel className="p-5">
            <SectionLabel>Possible signs / symptoms</SectionLabel>
            <Bullets items={s.deficiency.symptoms} color="#FF9F0A" />
            {s.deficiency.symptoms_note && <p className="mt-3 text-xs italic text-white/40">{s.deficiency.symptoms_note}</p>}
          </Panel>
          <Panel className="p-5"><SectionLabel>Risk groups</SectionLabel><Bullets items={s.deficiency.risk_groups} color="#00E676" /></Panel>
        </div>
        {s.deficiency.testing && <Panel className="p-5"><SectionLabel>Testing</SectionLabel><p className="text-sm text-white/70">{s.deficiency.testing}</p></Panel>}
        {s.if_low?.length > 0 && (
          <Panel className="p-5">
            <SectionLabel>If you are low — practical pathway</SectionLabel>
            <ol className="space-y-2">
              {s.if_low.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/75">
                  <span className="font-mono text-cyan-400">{String(i + 1).padStart(2, "0")}</span>{step}
                </li>
              ))}
            </ol>
          </Panel>
        )}
      </div>
    ) : <Empty />,
    "Food Sources": s.food_sources ? <FoodTable rows={s.food_sources} /> : <Empty />,
    Supplementation: (
      <div className="space-y-4">
        {s.absorption && (
          <Panel className="p-5">
            <SectionLabel>Absorption & Bioavailability</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><div className="mb-2 text-xs text-[#00E676]">Increases absorption</div><Bullets items={s.absorption.increases} color="#00E676" /></div>
              <div><div className="mb-2 text-xs text-[#FF9F0A]">Decreases absorption</div><Bullets items={s.absorption.decreases} color="#FF9F0A" /></div>
            </div>
            {s.absorption.forms?.length > 0 && <div className="mt-4"><div className="mb-2 text-xs text-white/50">Common forms</div><Bullets items={s.absorption.forms} /></div>}
            {s.absorption.notes && <p className="mt-3 text-xs italic text-white/40">{s.absorption.notes}</p>}
          </Panel>
        )}
        {s.requirements && (
          <Panel className="p-5">
            <SectionLabel>Daily Requirements</SectionLabel>
            <div className="grid gap-3 sm:grid-cols-3">
              {s.requirements.rda && <div className="border border-white/10 p-3"><div className="text-[10px] uppercase text-white/40">RDA / AI</div><div className="mt-1 font-mono text-cyan-300">{s.requirements.rda}</div></div>}
              {s.requirements.ul && <div className="border border-white/10 p-3"><div className="text-[10px] uppercase text-white/40">Upper limit</div><div className="mt-1 font-mono text-[#FF9F0A]">{s.requirements.ul}</div></div>}
            </div>
            {s.requirements.groups?.length > 0 && (
              <div className="mt-4 divide-y divide-white/5 border border-white/10">
                {s.requirements.groups.map((g, i) => (
                  <div key={i} className="flex justify-between px-4 py-2.5 text-sm"><span className="text-white/60">{g.group}</span><span className="font-mono text-white/85 tabular-nums">{g.amount}</span></div>
                ))}
              </div>
            )}
            {s.requirements.note && <p className="mt-3 text-xs italic text-white/40">{s.requirements.note}</p>}
          </Panel>
        )}
        {s.supplementation ? (
          <Panel className="p-5">
            <SectionLabel>Supplementation</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><div className="mb-2 text-xs text-[#00E676]">Who might consider it</div><Bullets items={s.supplementation.who_might} color="#00E676" /></div>
              <div><div className="mb-2 text-xs text-white/50">Who probably doesn't need it</div><Bullets items={s.supplementation.who_probably_not} /></div>
            </div>
            <div className="mt-4">
              <KeyRows obj={{ forms: (s.supplementation.forms || []).join(", "), typical_amounts: s.supplementation.typical_amounts, timing: s.supplementation.timing, with_food: s.supplementation.with_food, duration: s.supplementation.duration, cycling: s.supplementation.cycling }} />
            </div>
          </Panel>
        ) : (!s.absorption && !s.requirements && <Empty />)}
        {s.timing && (
          <Panel className="p-5"><SectionLabel>Best time to take it</SectionLabel><p className="text-sm text-white/75">{s.timing.detail}</p></Panel>
        )}
      </div>
    ),
    Safety: s.safety ? (
      <div className="space-y-4">
        <Panel className="p-6">
          <div className="mb-4"><SafetyIndicator level={s.safety.level} testId="safety-level" /></div>
          <KeyRows obj={{ upper_limit: s.safety.upper_limit, toxicity: s.safety.toxicity, overdose: s.safety.overdose }} labels={{ upper_limit: "Upper limit", overdose: "Overdose risk" }} />
        </Panel>
        <div className="grid gap-4 sm:grid-cols-3">
          <Panel className="p-5"><SectionLabel>Drug interactions</SectionLabel><Bullets items={s.safety.drug_interactions} color="#FF9F0A" /></Panel>
          <Panel className="p-5"><SectionLabel>Contraindications</SectionLabel><Bullets items={s.safety.contraindications} color="#FF3B30" /></Panel>
          <Panel className="p-5"><SectionLabel>Special populations</SectionLabel><Bullets items={s.safety.special_populations} /></Panel>
        </div>
        {s.if_too_much && (
          <Panel className="p-5">
            <SectionLabel>If you get too much</SectionLabel>
            <KeyRows obj={{ acute: s.if_too_much.acute, chronic: s.if_too_much.chronic, mechanism: s.if_too_much.mechanism, signs: s.if_too_much.signs, when_medical: s.if_too_much.when_medical }} labels={{ when_medical: "When to seek care" }} />
          </Panel>
        )}
      </div>
    ) : <Empty />,
    Interactions: s.interactions?.length ? (
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-white/10 bg-white/[0.02] text-[10px] uppercase tracking-widest text-white/40">
            <th className="px-4 py-3">Substance</th><th className="px-4 py-3">Interaction</th><th className="px-4 py-3">Mechanism</th><th className="px-4 py-3">Importance</th>
          </tr></thead>
          <tbody>
            {s.interactions.map((r, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white/90">{r.substance}</td>
                <td className="px-4 py-3 text-white/65">{r.interaction}</td>
                <td className="px-4 py-3 text-white/50">{r.mechanism}</td>
                <td className="px-4 py-3"><span className="rounded-full border px-2 py-0.5 text-[10px] uppercase capitalize"
                  style={{ borderColor: r.importance === "high" ? "#FF3B30" : r.importance === "moderate" ? "#FFEA00" : "#00E676",
                    color: r.importance === "high" ? "#FF3B30" : r.importance === "moderate" ? "#FFEA00" : "#00E676" }}>{r.importance}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : <Empty />,
    Performance: s.performance ? (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(s.performance).filter(([, v]) => v).map(([k, v]) => (
          <Panel key={k} className="p-4">
            <div className="mb-2 text-[11px] uppercase tracking-wider text-cyan-400">{k.replace(/_/g, " ")}</div>
            <p className="text-sm text-white/70">{v}</p>
          </Panel>
        ))}
      </div>
    ) : <Empty />,
    Biomarkers: s.biomarkers?.length ? (
      <div className="space-y-3">
        <SectionLabel>How do I know if it's working?</SectionLabel>
        {s.biomarkers.map((b, i) => (
          <Panel key={i} className="p-5">
            <div className="mb-3 font-display text-base text-cyan-300">{b.marker}</div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[["What it measures", b.measures], ["Why it matters", b.matters], ["Limitations", b.limitations], ["When to test", b.when]].map(([l, v]) => (
                <div key={l}><div className="text-[10px] uppercase tracking-wider text-white/35">{l}</div><p className="mt-1 text-sm text-white/70">{v}</p></div>
              ))}
            </div>
          </Panel>
        ))}
      </div>
    ) : <Empty />,
    Myths: s.myths?.length ? (
      <div className="grid gap-4 sm:grid-cols-2">
        {s.myths.map((m, i) => (
          <Panel key={i} className="p-5">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF3B30]">Myth</div>
            <p className="mb-4 text-sm italic text-white/60">"{m.myth}"</p>
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-[#00E676]">Fact</div>
            <p className="text-sm text-white/80">{m.fact}</p>
          </Panel>
        ))}
      </div>
    ) : <Empty />,
    Research: (
      <div className="space-y-4">
        {s.mistakes?.length > 0 && (
          <Panel className="p-5"><SectionLabel>Common mistakes</SectionLabel><Bullets items={s.mistakes} color="#FF9F0A" /></Panel>
        )}
        {s.research?.length ? s.research.map((r, i) => (
          <Panel key={i} className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs text-cyan-400">{r.year}</span>
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">{r.study_type}</span>
              <EvidenceBadge level={r.evidence_level} />
            </div>
            <div className="mt-2 text-sm font-medium text-white/90">{r.title}</div>
            <p className="mt-1 text-sm text-white/60">{r.summary}</p>
            {r.source && <div className="mt-2 text-[11px] text-white/35">Source: {r.source}</div>}
          </Panel>
        )) : <Empty>No research citations were generated for this topic.</Empty>}
      </div>
    ),
  };

  const available = TABS.filter((t) => {
    const map = {
      Overview: s.what_is_it || s.why_important || s.affects,
      Mechanism: s.mechanism, Benefits: s.uses, Deficiency: s.deficiency,
      "Food Sources": s.food_sources, Supplementation: s.supplementation || s.absorption || s.requirements || s.timing,
      Safety: s.safety, Interactions: s.interactions, Performance: s.performance,
      Biomarkers: s.biomarkers, Myths: s.myths, Research: s.research || s.mistakes,
    };
    return map[t];
  });
  const tabs = available.length ? available : ["Overview"];
  const activeTab = tabs.includes(tab) ? tab : tabs[0];

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-4 mb-6 overflow-x-auto border-b border-white/10 bg-black/80 px-4 backdrop-blur sm:mx-0 sm:rounded-none sm:px-0">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t}
              data-testid={`tab-${t.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => setTab(t)}
              className={`relative whitespace-nowrap px-3.5 py-3 text-sm transition-colors ${activeTab === t ? "text-cyan-400" : "text-white/50 hover:text-white"}`}
            >
              {t}
              {activeTab === t && <motion.span layoutId="tab-underline" className="absolute inset-x-2 -bottom-px h-[2px] bg-cyan-400" />}
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
  );
}
