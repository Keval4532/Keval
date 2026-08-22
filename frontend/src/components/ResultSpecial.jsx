import React from "react";
import { Panel, SectionLabel } from "./primitives";
import { Bullets } from "./sections";
import { AlertTriangle } from "lucide-react";

const LIK = {
  common: { label: "Common", color: "#06B6D4" },
  possible: { label: "Possible", color: "#10B981" },
  less_common: { label: "Less common", color: "#F59E0B" },
  rule_out: { label: "Important to rule out", color: "#EF4444" },
};

export function ResultSymptom({ data }) {
  const groups = ["common", "possible", "less_common", "rule_out"];
  return (
    <div className="space-y-6">
      <Panel className="p-6">
        <SectionLabel>Quick answer</SectionLabel>
        <p className="text-sm leading-relaxed text-slate-800 dark:text-white/85 font-normal">{data.quick_answer}</p>
        <div className="mt-4 flex items-start gap-2 border border-amber-300 dark:border-yellow-400/20 bg-amber-50 dark:bg-yellow-400/[0.04] p-3 text-xs text-amber-900 dark:text-yellow-200/80 rounded-xl">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-yellow-400" />
          {data.disclaimer || "A symptom alone does not establish a diagnosis or nutrient deficiency."}
        </div>
      </Panel>

      <div>
        <SectionLabel>Possible physiological contributors</SectionLabel>
        <div className="space-y-4">
          {groups.map((g) => {
            const items = (data.contributors || []).filter((c) => c.likelihood === g);
            if (!items.length) return null;
            const meta = LIK[g];
            return (
              <div key={g}>
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest font-mono font-bold" style={{ color: meta.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />{meta.label}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((c, i) => (
                    <Panel key={i} className="p-4" testId={`contributor-${g}-${i}`}>
                      <div className="text-sm font-bold text-slate-900 dark:text-white/95">{c.name}</div>
                      {c.mechanism && <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-white/70 leading-relaxed font-normal">{c.mechanism}</p>}
                      {c.lifestyle && <p className="mt-2 text-xs text-slate-600 dark:text-white/60"><strong className="text-slate-900 dark:text-white/80">Lifestyle:</strong> {c.lifestyle}</p>}
                      {c.nutrition && <p className="mt-1 text-xs text-slate-600 dark:text-white/60"><strong className="text-slate-900 dark:text-white/80">Nutrition:</strong> {c.nutrition}</p>}
                    </Panel>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {data.biomarkers?.length > 0 && (
        <Panel className="p-6">
          <SectionLabel>Biomarkers to discuss with a clinician</SectionLabel>
          <div className="space-y-3">
            {data.biomarkers.map((b, i) => (
              <div key={i} className="border border-slate-200 dark:border-white/10 rounded-2xl p-4 bg-slate-50 dark:bg-white/[0.02]">
                <div className="text-sm font-bold text-cyan-800 dark:text-cyan-300 font-mono">{b.marker}</div>
                <p className="mt-1 text-xs sm:text-sm text-slate-700 dark:text-white/70 leading-relaxed font-normal">{b.matters} <span className="text-slate-500 dark:text-white/40">Limitations: {b.limitations}</span></p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {data.red_flags?.length > 0 && (
        <Panel className="border-red-400/40 bg-red-50/50 dark:bg-red-500/10 p-6">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-red-700 dark:text-red-400 font-bold font-mono"><AlertTriangle className="h-4 w-4" /> Red flags — seek medical care</div>
          <Bullets items={data.red_flags} color="#EF4444" />
        </Panel>
      )}
    </div>
  );
}

export function ResultComparison({ data }) {
  const [a, b] = data.items || ["A", "B"];
  return (
    <div className="space-y-6">
      <Panel className="p-6"><SectionLabel>Summary</SectionLabel><p className="text-sm leading-relaxed text-slate-800 dark:text-white/85 font-normal">{data.quick_answer}</p></Panel>
      <div className="overflow-x-auto border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#0E141D] shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-xs uppercase font-bold font-mono tracking-widest text-slate-600 dark:text-white/50">
              <th className="px-4 py-3">Attribute</th>
              <th className="px-4 py-3 text-cyan-700 dark:text-cyan-400 font-bold">{a}</th>
              <th className="px-4 py-3 text-emerald-700 dark:text-[#10B981] font-bold">{b}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {(data.rows || []).map((r, i) => (
              <tr key={i} className="align-top hover:bg-slate-50/70 dark:hover:bg-white/[0.02]" data-testid={`compare-row-${i}`}>
                <td className="px-4 py-3 text-[11px] uppercase tracking-wider text-slate-500 dark:text-white/45 font-mono font-bold">{r.attribute}</td>
                <td className="px-4 py-3 text-slate-800 dark:text-white/80 font-normal">{r.a}</td>
                <td className="px-4 py-3 text-slate-800 dark:text-white/80 font-normal">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.verdict && <Panel className="border-cyan-300 dark:border-cyan-400/30 p-6"><SectionLabel>Verdict</SectionLabel><p className="text-sm leading-relaxed text-slate-800 dark:text-white/85 font-normal">{data.verdict}</p></Panel>}
    </div>
  );
}

export function ResultLab({ data }) {
  const l = data.lab || {};
  const fields = [
    ["What the marker is", l.what_it_is], ["What produces it", l.produced_by],
    ["What it tells us", l.what_it_tells], ["What it does NOT tell us", l.what_it_does_not],
    ["Reference ranges", l.reference_ranges], ["Why ranges differ", l.why_ranges_differ],
    ["When clinicians investigate", l.when_investigated],
  ];
  return (
    <div className="space-y-6">
      <Panel className="p-6"><SectionLabel>Quick answer</SectionLabel><p className="text-sm leading-relaxed text-slate-800 dark:text-white/85 font-normal">{data.quick_answer}</p></Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.filter(([, v]) => v).map(([label, v]) => (
          <Panel key={label} className="p-5">
            <div className="mb-2 text-[11px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-mono font-bold">{label}</div>
            <p className="text-sm leading-relaxed text-slate-800 dark:text-white/80 font-normal">{v}</p>
          </Panel>
        ))}
      </div>
      {l.influencing_factors?.length > 0 && (
        <Panel className="p-5"><SectionLabel>Factors that influence it</SectionLabel><Bullets items={l.influencing_factors} color="#06B6D4" /></Panel>
      )}
      <div className="rounded-2xl border border-amber-300 dark:border-yellow-400/20 bg-amber-50 dark:bg-yellow-400/[0.04] p-4 text-xs text-amber-900 dark:text-yellow-200/80">
        A single laboratory value should always be interpreted in clinical context by a healthcare professional. KevalBio does not diagnose.
      </div>
    </div>
  );
}
