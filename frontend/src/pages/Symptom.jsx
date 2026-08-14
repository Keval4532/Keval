import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, ArrowRight } from "lucide-react";

const PRESETS = ["I'm always tired", "I have muscle cramps", "My sleep is poor", "I feel weak", "Why am I gaining belly fat?", "I get brain fog"];

export default function Symptom() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const go = (t) => {
    const v = (t ?? q).trim();
    if (!v) return;
    navigate(`/result?q=${encodeURIComponent(v)}&level=${localStorage.getItem("apex_level") || "intermediate"}`);
  };
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><Stethoscope className="h-3.5 w-3.5" /> Symptom explorer</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Symptom Explorer</h1>
        <p className="mt-3 text-white/50">Describe what you're experiencing. ApexBio explains possible physiological contributors, ranked by likelihood — it does not diagnose.</p>
      </div>
      <div className="flex items-center gap-3 border border-white/10 bg-[#0A0A0A] px-4 py-3.5">
        <input data-testid="symptom-input" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="Describe your symptom…" className="w-full bg-transparent text-sm focus:outline-none" />
        <button data-testid="symptom-submit" onClick={() => go()} className="flex items-center gap-2 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-medium text-black">Explore <ArrowRight className="h-4 w-4" /></button>
      </div>
      <div className="mt-8">
        <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Common examples</div>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p} data-testid={`symptom-preset-${p.slice(0, 8).replace(/\W/g, "")}`} onClick={() => go(p)}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/65 hover:border-cyan-400/40 hover:text-white">{p}</button>
          ))}
        </div>
      </div>
      <div className="mt-8 border border-yellow-400/20 bg-yellow-400/[0.04] p-4 text-xs text-yellow-200/70">
        A symptom alone does not establish a diagnosis or nutrient deficiency. For severe or urgent symptoms, seek medical care immediately.
      </div>
    </div>
  );
}
