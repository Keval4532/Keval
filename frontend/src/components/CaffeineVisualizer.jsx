import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Coffee, Moon, Clock, Sparkles, AlertTriangle, ShieldCheck,
  Zap, Info, ChevronDown, ChevronUp, Sliders, Activity, Flame, Heart
} from "lucide-react";
import { getCaffeineClearance } from "../lib/api";

const PRESETS = [
  { name: "Single Espresso", dose: 65, icon: "☕" },
  { name: "Double Espresso / Coffee", dose: 130, icon: "☕☕" },
  { name: "Cold Brew / Energy Drink", dose: 200, icon: "⚡" },
  { name: "Pre-Workout Scoop", dose: 300, icon: "🔥" },
  { name: "Indian Chai / Black Tea", dose: 40, icon: "🫖" },
  { name: "Green Tea", dose: 25, icon: "🍵" },
  { name: "Dark Chocolate", dose: 30, icon: "🍫" }
];

const TIME_OPTIONS = [
  { label: "6:00 AM", value: 6.0 },
  { label: "7:00 AM", value: 7.0 },
  { label: "8:00 AM", value: 8.0 },
  { label: "9:00 AM", value: 9.0 },
  { label: "10:00 AM", value: 10.0 },
  { label: "11:00 AM", value: 11.0 },
  { label: "12:00 PM (Noon)", value: 12.0 },
  { label: "1:00 PM", value: 13.0 },
  { label: "2:00 PM", value: 14.0 },
  { label: "3:00 PM", value: 15.0 },
  { label: "4:00 PM", value: 16.0 },
  { label: "5:00 PM", value: 17.0 },
  { label: "6:00 PM", value: 18.0 },
  { label: "7:00 PM", value: 19.0 },
  { label: "8:00 PM", value: 20.0 }
];

const BEDTIME_OPTIONS = [
  { label: "9:00 PM", value: 21.0 },
  { label: "9:30 PM", value: 21.5 },
  { label: "10:00 PM", value: 22.0 },
  { label: "10:30 PM", value: 22.5 },
  { label: "11:00 PM", value: 23.0 },
  { label: "11:30 PM", value: 23.5 },
  { label: "12:00 AM (Midnight)", value: 24.0 },
  { label: "1:00 AM", value: 25.0 }
];

export default function CaffeineVisualizer({ initialDose = 130 }) {
  const [dose, setDose] = useState(initialDose);
  const [consumptionHour, setConsumptionHour] = useState(14.0); // 2:00 PM
  const [bedtimeHour, setBedtimeHour] = useState(22.5); // 10:30 PM

  // Personal Demographics & Modifiers
  const [showModifiers, setShowModifiers] = useState(false);
  const [age, setAge] = useState(28);
  const [genderHormone, setGenderHormone] = useState("male");
  const [isSmoker, setIsSmoker] = useState(false);
  const [sensitivity, setSensitivity] = useState("normal");

  const [result, setResult] = useState(null);

  useEffect(() => {
    getCaffeineClearance({
      dose_mg: dose,
      consumption_hour: consumptionHour,
      bedtime_hour: bedtimeHour,
      age: age,
      gender_hormone_status: genderHormone,
      is_smoker: isSmoker,
      cyp1a2_sensitivity: sensitivity
    }).then(setResult).catch(() => {});
  }, [dose, consumptionHour, bedtimeHour, age, genderHormone, isSmoker, sensitivity]);

  const maxDose = Math.max(dose, 200);

  const svgPath = useMemo(() => {
    const pts = result?.curve || [];
    if (!pts.length) return "";
    const w = 600;
    const h = 200;
    const padding = 20;

    return pts.map((pt, i) => {
      const x = padding + (i / 24) * (w - 2 * padding);
      const y = h - padding - (pt.concentration_mg / maxDose) * (h - 2 * padding);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  }, [result?.curve, maxDose]);

  const ratingColor = result?.sleep_impact_rating === "low"
    ? "#00E676"
    : result?.sleep_impact_rating === "moderate"
    ? "#FFEA00"
    : "#FF3B30";

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-400/[0.04] via-white/[0.02] to-transparent p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
            <Coffee className="h-4 w-4" />
            <span>Caffeine & Sleep Metabolic Simulator</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-cyan-300 border border-cyan-400/20">
              Half-Life: {result?.half_life_hours || 5.0} hrs
            </span>
          </div>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
          Calculate Your Exact Daily Caffeine Cutoff
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light max-w-3xl leading-relaxed">
          Simulate how your liver's CYP1A2 enzyme clears caffeine across time. Even if you fall asleep effortlessly, circulating caffeine docks into adenosine receptors, suppressing deep Stage 3/4 slow-wave recovery.
        </p>
      </div>

      {/* Main Grid: Controls vs Results & Pharmacokinetic Curve */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 5 Cols: Input Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Beverage Preset Chips */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-3">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              1. Select Beverage or Dose
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setDose(p.dose)}
                  className={`rounded-2xl p-3 text-left border transition-all text-xs ${
                    dose === p.dose
                      ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.18)]"
                      : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-medium">
                    <span>{p.icon}</span>
                    <span className="truncate">{p.name}</span>
                  </div>
                  <div className="text-[10px] text-cyan-300/80 mt-1 font-mono">{p.dose} mg</div>
                </button>
              ))}
            </div>

            {/* Custom Dose Slider */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70">Custom Dose:</span>
                <span className="font-mono text-cyan-300 font-bold text-sm">{dose} mg</span>
              </div>
              <input
                type="range"
                min="0"
                max="500"
                step="5"
                value={dose}
                onChange={(e) => setDose(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>0 mg</span>
                <span>250 mg</span>
                <span>500 mg</span>
              </div>
            </div>
          </div>

          {/* Timing Selectors */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <label className="text-xs font-semibold text-white uppercase tracking-wider block">
              2. Timing Parameters
            </label>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-white/60 block mb-1.5 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-cyan-400" /> Consumption Time
                </span>
                <select
                  value={consumptionHour}
                  onChange={(e) => setConsumptionHour(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/15 bg-black/70 px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={t.value} value={t.value} className="bg-black text-white">
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="text-[11px] text-white/60 block mb-1.5 flex items-center gap-1">
                  <Moon className="h-3 w-3 text-purple-400" /> Target Bedtime
                </span>
                <select
                  value={bedtimeHour}
                  onChange={(e) => setBedtimeHour(Number(e.target.value))}
                  className="w-full rounded-2xl border border-white/15 bg-black/70 px-3 py-2.5 text-xs text-white outline-none focus:border-cyan-400"
                >
                  {BEDTIME_OPTIONS.map((b) => (
                    <option key={b.value} value={b.value} className="bg-black text-white">
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Personalize My Liver Clearance Accordion */}
          <div className="rounded-3xl border border-cyan-400/20 bg-white/[0.02] p-5 space-y-3">
            <button
              onClick={() => setShowModifiers(!showModifiers)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-cyan-400" />
                <div>
                  <div className="text-xs font-semibold text-white">Personalize My Liver Clearance</div>
                  <div className="text-[10px] text-white/50">Hormones, Age, Nicotine, & CYP1A2 Alleles</div>
                </div>
              </div>
              {showModifiers ? <ChevronUp className="h-4 w-4 text-cyan-400" /> : <ChevronDown className="h-4 w-4 text-white/50" />}
            </button>

            {showModifiers && (
              <div className="space-y-4 pt-3 border-t border-white/10 text-xs">
                {/* Age */}
                <div>
                  <div className="flex justify-between text-white/70 mb-1">
                    <span>Age:</span>
                    <span className="font-mono text-cyan-300">{age} years</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] text-white/40 block mt-0.5">55+ adds +1.0 hr due to reduced hepatic enzyme volume</span>
                </div>

                {/* Hormonal Status */}
                <div>
                  <span className="text-white/70 block mb-1.5">Gender & Hormonal Status:</span>
                  <select
                    value={genderHormone}
                    onChange={(e) => setGenderHormone(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-black/80 px-3 py-2 text-xs text-white outline-none focus:border-cyan-400"
                  >
                    <option value="male">Male (Standard ~5h baseline)</option>
                    <option value="female_normal">Female - Normal Cycle (Standard ~5h baseline)</option>
                    <option value="birth_control">Female - On Oral Contraceptives (1.8x ~9h half-life)</option>
                    <option value="pregnancy">Pregnancy - 3rd Trimester (2.7x ~13-15h half-life)</option>
                  </select>
                </div>

                {/* Smoker / Nicotine */}
                <div className="flex items-center justify-between bg-black/40 p-3 rounded-2xl border border-white/5">
                  <div>
                    <span className="text-white font-medium block">Tobacco / Nicotine Use</span>
                    <span className="text-[10px] text-white/40">Induces CYP1A2 (accelerates clearance by ~35%)</span>
                  </div>
                  <button
                    onClick={() => setIsSmoker(!isSmoker)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isSmoker ? "bg-emerald-400 text-black" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {isSmoker ? "Yes (Active)" : "No"}
                  </button>
                </div>

                {/* CYP1A2 Allele Preset */}
                <div>
                  <span className="text-white/70 block mb-1.5">CYP1A2 Genetic Sensitivity:</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "fast", label: "Fast (~3.5h)" },
                      { id: "normal", label: "Normal (~5h)" },
                      { id: "slow", label: "Slow (~8h)" }
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSensitivity(s.id)}
                        className={`rounded-xl py-2 px-1 text-center border text-[11px] font-medium transition-all ${
                          sensitivity === s.id
                            ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                            : "border-white/10 bg-black/40 text-white/60"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 7 Cols: Real-time Pharmacokinetics, Adenosine Blockade & SVG Curve */}
        <div className="lg:col-span-7 space-y-5">
          {/* Personalized Recommended Hard Cutoff Card */}
          {result && (
            <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 via-emerald-400/10 to-transparent p-6 space-y-4 shadow-[0_0_35px_rgba(0,240,255,0.15)]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-cyan-300 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Sleep Architecture Protection Protocol
                </span>
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: `${ratingColor}20`, color: ratingColor, border: `1px solid ${ratingColor}40` }}
                >
                  {result.rating_label}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 pt-1">
                <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                  <span className="text-white/40 uppercase text-[10px] tracking-wider block font-medium">
                    Hard Cutoff Time Today
                  </span>
                  <div className="font-display text-3xl font-bold text-cyan-300 mt-1">
                    {result.recommended_cutoff_time}
                  </div>
                  <span className="text-[11px] text-white/60 mt-1 block">
                    To reach &lt; 20mg active caffeine by {result.bedtime}
                  </span>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                  <span className="text-white/40 uppercase text-[10px] tracking-wider block font-medium">
                    Remaining at {result.bedtime}
                  </span>
                  <div className="font-display text-3xl font-bold mt-1" style={{ color: ratingColor }}>
                    ~{result.remaining_at_bedtime_mg} mg
                  </div>
                  <span className="text-[11px] text-white/60 mt-1 block">
                    {result.rating_detail}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Real-time Dynamic Metabolic Curve SVG with 3-Zone Bands */}
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs text-white/70 gap-2">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-cyan-400" />
                <span className="font-semibold text-white">Pharmacokinetic Clearance Curve</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-white/50">Dose: {dose}mg</span>
                <span className="text-cyan-300">Elapsed: {result?.elapsed_hours}h</span>
              </div>
            </div>

            {/* SVG Interactive Visualizer */}
            <div className="relative w-full overflow-hidden rounded-2xl bg-black/80 p-3 border border-white/10">
              <svg viewBox="0 0 600 200" className="w-full h-48 sm:h-56">
                <defs>
                  {/* Zone Gradients */}
                  <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#00F0FF" />
                    <stop offset="100%" stopColor="#00E676" />
                  </linearGradient>
                </defs>

                {/* 3 Zone Horizontal Reference Bands */}
                {/* Red Zone (> 45mg) */}
                <rect x="20" y="20" width="560" height={Math.max(0, 160 - (45 / maxDose) * 160)} fill="rgba(255,59,48,0.06)" />
                {/* Yellow Zone (20 - 45mg) */}
                <rect
                  x="20"
                  y={180 - (45 / maxDose) * 160}
                  width="560"
                  height={Math.max(0, ((45 - 20) / maxDose) * 160)}
                  fill="rgba(255,234,0,0.06)"
                />
                {/* Green Zone (< 20mg) */}
                <rect
                  x="20"
                  y={180 - (20 / maxDose) * 160}
                  width="560"
                  height={Math.max(0, (20 / maxDose) * 160)}
                  fill="rgba(0,230,118,0.06)"
                />

                {/* Threshold Reference Lines */}
                <line x1="20" y1="180" x2="580" y2="180" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

                {/* 20mg Safe Threshold Line */}
                {maxDose > 20 && (
                  <g>
                    <line
                      x1="20"
                      y1={180 - (20 / maxDose) * 160}
                      x2="580"
                      y2={180 - (20 / maxDose) * 160}
                      stroke="#00E676"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      opacity="0.8"
                    />
                    <text x="575" y={180 - (20 / maxDose) * 160 - 4} fill="#00E676" fontSize="8" textAnchor="end" fontFamily="monospace">
                      20mg Safe Line
                    </text>
                  </g>
                )}

                {/* 45mg Disruption Line */}
                {maxDose > 45 && (
                  <g>
                    <line
                      x1="20"
                      y1={180 - (45 / maxDose) * 160}
                      x2="580"
                      y2={180 - (45 / maxDose) * 160}
                      stroke="#FF3B30"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      opacity="0.7"
                    />
                    <text x="575" y={180 - (45 / maxDose) * 160 - 4} fill="#FF3B30" fontSize="8" textAnchor="end" fontFamily="monospace">
                      45mg Disruption Line
                    </text>
                  </g>
                )}

                {/* Continuous Metabolic Curve */}
                {svgPath && (
                  <path
                    d={svgPath}
                    fill="none"
                    stroke="url(#curveGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                )}

                {/* Bedtime Node Marker */}
                {result && result.elapsed_hours <= 24 && (
                  <g>
                    <line
                      x1={20 + (result.elapsed_hours / 24) * 560}
                      y1="20"
                      x2={20 + (result.elapsed_hours / 24) * 560}
                      y2="180"
                      stroke={ratingColor}
                      strokeWidth="1.5"
                      strokeDasharray="3"
                    />
                    <circle
                      cx={20 + (result.elapsed_hours / 24) * 560}
                      cy={180 - (result.remaining_at_bedtime_mg / maxDose) * 160}
                      r="6"
                      fill={ratingColor}
                      stroke="#000"
                      strokeWidth="2"
                    />
                    <text
                      x={20 + (result.elapsed_hours / 24) * 560}
                      y="15"
                      fill={ratingColor}
                      fontSize="9"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      Bedtime ({result.remaining_at_bedtime_mg}mg)
                    </text>
                  </g>
                )}

                {/* Curve Points */}
                {(result?.curve || []).filter((_, idx) => idx % 4 === 0).map((pt, i) => {
                  const x = 20 + (pt.offset_hours / 24) * 560;
                  const y = 180 - (pt.concentration_mg / maxDose) * 160;
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="3" fill="#00F0FF" />
                      <text x={x} y={y - 7} fill="rgba(255,255,255,0.7)" fontSize="8.5" textAnchor="middle" fontFamily="monospace">
                        {pt.concentration_mg}
                      </text>
                      <text x={x} y="195" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle">
                        +{pt.offset_hours}h
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Threshold legend */}
              <div className="flex flex-wrap items-center justify-between text-[10px] text-white/50 px-2 pt-2 border-t border-white/5 gap-2">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#00E676]" /> Green Zone (&lt; 20mg): Restorative Sleep
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#FFEA00]" /> Yellow Zone (20–45mg): Mild Disruption
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#FF3B30]" /> Red Zone (&gt; 45mg): High Disruption
                </span>
              </div>
            </div>

            {/* Adenosine Receptor & Molecular Imposter Card */}
            {result && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    Adenosine A1 / A2A Receptor Blockade at Bedtime
                  </span>
                  <span className="font-mono text-xs font-bold text-white bg-white/10 px-2.5 py-1 rounded-xl">
                    ~{result.adenosine_blockade_pct}% Blocked
                  </span>
                </div>

                {/* Visual Receptor Blockade Bar */}
                <div className="space-y-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${result.adenosine_blockade_pct}%`,
                        backgroundColor: ratingColor
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40">
                    <span>0% Sleep Pressure Free</span>
                    <span>100% Full Adenosine Blockade</span>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed font-light pt-1">
                  {result.adenosine_mechanism_explainer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
