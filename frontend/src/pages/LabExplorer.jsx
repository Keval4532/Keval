import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlaskConical, ArrowRight } from "lucide-react";

const MARKERS = ["Ferritin", "Vitamin D", "B12", "TSH", "HbA1c", "LDL", "HDL", "Triglycerides", "Testosterone", "ALT", "AST", "Creatinine", "eGFR", "CRP"];

export default function LabExplorer() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const go = (t) => {
    const v = (t ?? q).trim();
    if (!v) return;
    navigate(`/result?q=${encodeURIComponent(`Explain the lab marker ${v}`)}&level=${localStorage.getItem("apex_level") || "intermediate"}`);
  };
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><FlaskConical className="h-3.5 w-3.5" /> Lab explainer</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Lab Explorer</h1>
        <p className="mt-3 text-white/50">Understand what a laboratory marker measures, what it can't tell you, and why reference ranges vary. KevalBio explains — it does not interpret your personal results.</p>
      </div>
      <div className="flex items-center gap-3 border border-white/10 bg-[#0A0A0A] px-4 py-3.5">
        <input data-testid="lab-input" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="Enter a lab marker, e.g. Ferritin" className="w-full bg-transparent text-sm focus:outline-none" />
        <button data-testid="lab-submit" onClick={() => go()} className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black">Explain <ArrowRight className="h-4 w-4" /></button>
      </div>
      <div className="mt-8">
        <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Common markers</div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {MARKERS.map((m) => (
            <button key={m} data-testid={`lab-marker-${m.replace(/\W/g, "")}`} onClick={() => go(m)}
              className="border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm text-white/70 hover:border-cyan-400/40 hover:text-white">{m}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
