import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GitCompareArrows, ArrowRight } from "lucide-react";

const PRESETS = [
  ["Magnesium glycinate", "Magnesium citrate"],
  ["Creatine", "Beta-alanine"],
  ["Vitamin D2", "Vitamin D3"],
  ["Whey protein", "Whole food protein"],
  ["Coffee", "Pre-workout"],
];

export default function Compare() {
  const navigate = useNavigate();
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const go = (x, y) => {
    const av = (x ?? a).trim(), bv = (y ?? b).trim();
    if (!av || !bv) return;
    navigate(`/result?q=${encodeURIComponent(`${av} vs ${bv}`)}&level=${localStorage.getItem("apex_level") || "intermediate"}`);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400"><GitCompareArrows className="h-3.5 w-3.5" /> Comparison engine</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Compare</h1>
        <p className="mt-3 text-white/50">Compare two supplements, forms, or approaches side by side across mechanism, evidence, dosage, absorption, safety and best use case.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        <input data-testid="compare-input-a" value={a} onChange={(e) => setA(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="e.g. Creatine" className="border border-white/10 bg-[#0A0A0A] px-4 py-3.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
        <span className="text-center font-mono text-xs uppercase tracking-widest text-white/40">vs</span>
        <input data-testid="compare-input-b" value={b} onChange={(e) => setB(e.target.value)} onKeyDown={(e) => e.key === "Enter" && go()}
          placeholder="e.g. Beta-alanine" className="border border-white/10 bg-[#0A0A0A] px-4 py-3.5 text-sm focus:border-cyan-400/50 focus:outline-none" />
      </div>
      <button data-testid="compare-submit" onClick={() => go()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 px-4 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.01] active:scale-95">
        Compare <ArrowRight className="h-4 w-4" />
      </button>

      <div className="mt-8">
        <div className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40">Popular comparisons</div>
        <div className="flex flex-col gap-2">
          {PRESETS.map(([x, y]) => (
            <button key={x + y} data-testid={`compare-preset-${x.replace(/\W/g, "")}`} onClick={() => go(x, y)}
              className="flex items-center justify-between border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white">
              <span>{x} <span className="text-white/30">vs</span> {y}</span>
              <ArrowRight className="h-4 w-4 text-white/25" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
