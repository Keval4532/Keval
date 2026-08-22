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
    <div className="space-y-6 text-[#F8FAFC]">
      <Panel className="p-6 sm:p-8">
        <SectionLabel>Quick answer</SectionLabel>
        <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] font-normal">{data.quick_answer}</p>
        <div className="mt-4 flex items-start gap-2 border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 rounded-2xl">
          <AlertTriangle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
          <span>{data.disclaimer || "A symptom alone does not establish a diagnosis or nutrient deficiency."}</span>
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
                <div className="mb-2.5 flex items-center gap-2 text-xs uppercase tracking-widest font-mono font-bold" style={{ color: meta.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />{meta.label}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((c, i) => (
                    <Panel key={i} className="p-5" testId={`contributor-${g}-${i}`}>
                      <div className="text-base font-bold text-white">{c.name}</div>
                      {c.mechanism && <p className="mt-1.5 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">{c.mechanism}</p>}
                      {c.lifestyle && <p className="mt-2.5 text-xs text-slate-400"><strong className="text-slate-200">Lifestyle:</strong> {c.lifestyle}</p>}
                      {c.nutrition && <p className="mt-1 text-xs text-slate-400"><strong className="text-slate-200">Nutrition:</strong> {c.nutrition}</p>}
                    </Panel>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {data.biomarkers?.length > 0 && (
        <Panel className="p-6 sm:p-8">
          <SectionLabel>Biomarkers to discuss with a clinician</SectionLabel>
          <div className="space-y-3">
            {data.biomarkers.map((b, i) => (
              <div key={i} className="border border-[#1E293B] rounded-2xl p-4 bg-[#141C28] shadow-sm">
                <div className="text-sm font-bold text-cyan-300 font-mono">{b.marker}</div>
                <p className="mt-1 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal">{b.matters} <span className="text-slate-400 block mt-1">Limitations: {b.limitations}</span></p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {data.red_flags?.length > 0 && (
        <Panel className="border-red-500/40 bg-red-500/10 p-6">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-red-400 font-bold font-mono"><AlertTriangle className="h-4 w-4" /> Red flags — seek medical care</div>
          <Bullets items={data.red_flags} color="#EF4444" />
        </Panel>
      )}
    </div>
  );
}

export function ResultComparison({ data }) {
  const [a, b] = data.items || ["A", "B"];
  return (
    <div className="space-y-6 text-[#F8FAFC]">
      <Panel className="p-6 sm:p-8"><SectionLabel>Summary</SectionLabel><p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] font-normal">{data.quick_answer}</p></Panel>
      <div className="overflow-x-auto border border-[#1E293B] rounded-2xl bg-[#141C28] shadow-xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#1E293B] bg-[#0E141D] text-xs uppercase font-bold font-mono tracking-widest text-slate-400">
              <th className="px-4 py-3.5">Attribute</th>
              <th className="px-4 py-3.5 text-cyan-400 font-bold">{a}</th>
              <th className="px-4 py-3.5 text-emerald-400 font-bold">{b}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]/60">
            {(data.rows || []).map((r, i) => (
              <tr key={i} className="align-top hover:bg-white/[0.02]" data-testid={`compare-row-${i}`}>
                <td className="px-4 py-3.5 text-[11px] uppercase tracking-wider text-slate-400 font-mono font-bold">{r.attribute}</td>
                <td className="px-4 py-3.5 text-[#CBD5E1] font-normal">{r.a}</td>
                <td className="px-4 py-3.5 text-[#CBD5E1] font-normal">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.verdict && <Panel className="border-cyan-500/30 p-6 sm:p-8"><SectionLabel>Verdict</SectionLabel><p className="text-sm sm:text-base leading-relaxed text-white font-normal">{data.verdict}</p></Panel>}
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
    <div className="space-y-6 text-[#F8FAFC]">
      <Panel className="p-6 sm:p-8"><SectionLabel>Quick answer</SectionLabel><p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1] font-normal">{data.quick_answer}</p></Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.filter(([, v]) => v).map(([label, v]) => (
          <Panel key={label} className="p-5">
            <div className="mb-2 text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-bold">{label}</div>
            <p className="text-sm leading-relaxed text-[#CBD5E1] font-normal">{v}</p>
          </Panel>
        ))}
      </div>
      {l.influencing_factors?.length > 0 && (
        <Panel className="p-6"><SectionLabel>Factors that influence it</SectionLabel><Bullets items={l.influencing_factors} color="#06B6D4" /></Panel>
      )}
      <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
        A single laboratory value should always be interpreted in clinical context by a healthcare professional. KevalBio does not diagnose.
      </div>
    </div>
  );
}
