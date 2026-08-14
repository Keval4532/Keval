import React from "react";
import { Panel, SectionLabel } from "./primitives";
import { Bullets } from "./sections";
import { AlertTriangle } from "lucide-react";

const LIK = {
  common: { label: "Common", color: "#00F0FF" },
  possible: { label: "Possible", color: "#00E676" },
  less_common: { label: "Less common", color: "#FFEA00" },
  rule_out: { label: "Important to rule out", color: "#FF3B30" },
};

export function ResultSymptom({ data }) {
  const groups = ["common", "possible", "less_common", "rule_out"];
  return (
    <div className="space-y-6">
      <Panel className="p-6">
        <SectionLabel>Quick answer</SectionLabel>
        <p className="text-sm leading-relaxed text-white/80">{data.quick_answer}</p>
        <div className="mt-4 flex items-start gap-2 border border-yellow-400/20 bg-yellow-400/[0.04] p-3 text-xs text-yellow-200/80">
          <AlertTriangle className="h-4 w-4 shrink-0" />
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
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest" style={{ color: meta.color }}>
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />{meta.label}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((c, i) => (
                    <Panel key={i} className="p-4" testId={`contributor-${g}-${i}`}>
                      <div className="text-sm font-medium text-white/90">{c.name}</div>
                      {c.mechanism && <p className="mt-1 text-sm text-white/60">{c.mechanism}</p>}
                      {c.lifestyle && <p className="mt-2 text-xs text-white/45"><span className="text-white/60">Lifestyle:</span> {c.lifestyle}</p>}
                      {c.nutrition && <p className="mt-1 text-xs text-white/45"><span className="text-white/60">Nutrition:</span> {c.nutrition}</p>}
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
              <div key={i} className="border border-white/10 p-4">
                <div className="text-sm font-medium text-cyan-300">{b.marker}</div>
                <p className="mt-1 text-sm text-white/60">{b.matters} <span className="text-white/40">Limitations: {b.limitations}</span></p>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {data.red_flags?.length > 0 && (
        <Panel className="border-red-500/30 p-6">
          <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-[#FF3B30]"><AlertTriangle className="h-4 w-4" /> Red flags — seek medical care</div>
          <Bullets items={data.red_flags} color="#FF3B30" />
        </Panel>
      )}
    </div>
  );
}

export function ResultComparison({ data }) {
  const [a, b] = data.items || ["A", "B"];
  return (
    <div className="space-y-6">
      <Panel className="p-6"><SectionLabel>Summary</SectionLabel><p className="text-sm leading-relaxed text-white/80">{data.quick_answer}</p></Panel>
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-xs uppercase tracking-widest">
              <th className="px-4 py-3 text-white/40">Attribute</th>
              <th className="px-4 py-3 text-cyan-400">{a}</th>
              <th className="px-4 py-3 text-[#00E676]">{b}</th>
            </tr>
          </thead>
          <tbody>
            {(data.rows || []).map((r, i) => (
              <tr key={i} className="border-b border-white/5 last:border-0 align-top hover:bg-white/[0.02]" data-testid={`compare-row-${i}`}>
                <td className="px-4 py-3 text-[11px] uppercase tracking-wider text-white/45">{r.attribute}</td>
                <td className="px-4 py-3 text-white/75">{r.a}</td>
                <td className="px-4 py-3 text-white/75">{r.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.verdict && <Panel className="border-cyan-400/30 p-6"><SectionLabel>Verdict</SectionLabel><p className="text-sm leading-relaxed text-white/85">{data.verdict}</p></Panel>}
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
      <Panel className="p-6"><SectionLabel>Quick answer</SectionLabel><p className="text-sm leading-relaxed text-white/80">{data.quick_answer}</p></Panel>
      <div className="grid gap-3 sm:grid-cols-2">
        {fields.filter(([, v]) => v).map(([label, v]) => (
          <Panel key={label} className="p-5">
            <div className="mb-2 text-[11px] uppercase tracking-wider text-cyan-400">{label}</div>
            <p className="text-sm leading-relaxed text-white/75">{v}</p>
          </Panel>
        ))}
      </div>
      {l.influencing_factors?.length > 0 && (
        <Panel className="p-5"><SectionLabel>Factors that influence it</SectionLabel><Bullets items={l.influencing_factors} /></Panel>
      )}
      <div className="border border-yellow-400/20 bg-yellow-400/[0.04] p-4 text-xs text-yellow-200/80">
        A single laboratory value should always be interpreted in clinical context by a healthcare professional. KevalBio does not diagnose.
      </div>
    </div>
  );
}
