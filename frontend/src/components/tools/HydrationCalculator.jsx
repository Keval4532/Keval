import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Droplets, Activity, Sparkles, Thermometer, ShieldCheck,
  Zap, Info, Scale, ArrowRight, GlassWater, Flame
} from "lucide-react";
import { getHydrationCalc } from "../../lib/api";

export default function HydrationCalculator() {
  const [durationMins, setDurationMins] = useState(60);
  const [intensity, setIntensity] = useState("moderate"); // low | moderate | high
  const [tempC, setTempC] = useState(25);
  const [humidity, setHumidity] = useState(50);
  const [useScale, setUseScale] = useState(false);
  const [preWeight, setPreWeight] = useState(75.0);
  const [postWeight, setPostWeight] = useState(74.2);
  const [data, setData] = useState(null);

  useEffect(() => {
    getHydrationCalc({
      duration_mins: durationMins,
      intensity: intensity,
      temp_c: tempC,
      humidity_pct: humidity,
      pre_weight_kg: useScale ? preWeight : null,
      post_weight_kg: useScale ? postWeight : null
    }).then(setData).catch(() => {});
  }, [durationMins, intensity, tempC, humidity, useScale, preWeight, postWeight]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
            <Droplets className="h-4 w-4" />
            <span>Sweat Rate & Precision Hydration Calculator</span>
          </div>

          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-cyan-300 border border-cyan-400/20">
            Osmotic Fluid & Electrolyte Balance
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
          Calculate Exact Fluid & Electrolyte Replenishment
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light max-w-3xl leading-relaxed">
          Dehydration of just 2% of body mass significantly reduces cognitive reaction speed, cardiac stroke volume, and athletic endurance. Calculate your personalized sweat rate, electrolyte loss, and DIY kitchen rehydration formula.
        </p>
      </div>

      {/* Inputs & Output Grid */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 5 Cols: Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Duration & Intensity */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-white block">
              1. Training Parameters
            </label>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Workout Duration:</span>
                <span className="font-mono text-cyan-300 font-bold">{durationMins} Minutes</span>
              </div>
              <input
                type="range"
                min="15"
                max="180"
                step="5"
                value={durationMins}
                onChange={(e) => setDurationMins(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            {/* Intensity Toggle */}
            <div>
              <span className="text-xs text-white/70 block mb-1.5">Intensity Level:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: "low", label: "Low (Walk/Yoga)" },
                  { id: "moderate", label: "Moderate (Weights)" },
                  { id: "high", label: "High (HIIT/Run)" }
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setIntensity(lvl.id)}
                    className={`rounded-xl py-2 px-1 text-center border text-[11px] font-medium transition-all ${
                      intensity === lvl.id
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow"
                        : "border-white/10 bg-black/40 text-white/60"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Environmental Conditions */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <label className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Thermometer className="h-3.5 w-3.5 text-cyan-400" />
              2. Environmental Thermal Load
            </label>

            <div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Ambient Temperature:</span>
                <span className="font-mono text-cyan-300">{tempC}°C ({Math.round(tempC * 1.8 + 32)}°F)</span>
              </div>
              <input
                type="range"
                min="10"
                max="42"
                value={tempC}
                onChange={(e) => setTempC(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-white/70 mb-1">
                <span>Relative Humidity:</span>
                <span className="font-mono text-cyan-300">{humidity}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="95"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-white/10 h-1.5 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Scale Precision Mode */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 space-y-3">
            <button
              onClick={() => setUseScale(!useScale)}
              className="flex items-center justify-between w-full text-left"
            >
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white">Scale Precision Mode (Optional)</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${useScale ? "bg-cyan-400 text-black" : "bg-white/10 text-white/50"}`}>
                {useScale ? "ON" : "OFF"}
              </span>
            </button>

            {useScale && (
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-white/60 block mb-1">Pre-Workout (kg):</span>
                  <input
                    type="number"
                    step="0.1"
                    value={preWeight}
                    onChange={(e) => setPreWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <span className="text-white/60 block mb-1">Post-Workout (kg):</span>
                  <input
                    type="number"
                    step="0.1"
                    value={postWeight}
                    onChange={(e) => setPostWeight(Number(e.target.value))}
                    className="w-full rounded-xl border border-white/15 bg-black px-3 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 7 Cols: Fluid Loss, Electrolyte Breakdown, and DIY Recipe */}
        <div className="lg:col-span-7 space-y-5">
          {data && (
            <>
              {/* Primary Fluid Loss Card */}
              <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-cyan-400/15 via-blue-500/10 to-transparent p-6 space-y-4 shadow-[0_0_35px_rgba(0,240,255,0.15)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-cyan-300 flex items-center gap-1.5">
                    <Droplets className="h-4 w-4" />
                    Hydration Replenishment Target
                  </span>
                  <span className="rounded-full bg-cyan-400/20 text-cyan-200 border border-cyan-400/40 px-3 py-1 text-xs font-mono font-semibold">
                    Sweat Rate: ~{data.sweat_rate_l_per_hr} L/Hour
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-1">
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="text-white/40 uppercase text-[10px] tracking-wider block">Estimated Fluid Loss</span>
                    <div className="font-display text-3xl font-bold text-cyan-300 mt-1">
                      {data.estimated_fluid_loss_ml} ml
                    </div>
                    <span className="text-[11px] text-white/60 mt-1 block">~{data.estimated_fluid_loss_oz} fl oz total</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="text-white/40 uppercase text-[10px] tracking-wider block">Sodium Lost</span>
                    <div className="font-display text-3xl font-bold text-emerald-300 mt-1">
                      ~{data.electrolytes_lost.sodium_mg} mg
                    </div>
                    <span className="text-[11px] text-white/60 mt-1 block">Primary extracellular electrolyte</span>
                  </div>
                </div>

                {/* Electrolyte Gauge */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center text-xs font-mono">
                  <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 text-[10px] block">Sodium (Na+)</span>
                    <span className="text-cyan-300 font-bold text-sm">{data.electrolytes_lost.sodium_mg} mg</span>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 text-[10px] block">Potassium (K+)</span>
                    <span className="text-purple-300 font-bold text-sm">{data.electrolytes_lost.potassium_mg} mg</span>
                  </div>
                  <div className="bg-black/40 p-2.5 rounded-xl border border-white/5">
                    <span className="text-white/40 text-[10px] block">Magnesium (Mg2+)</span>
                    <span className="text-emerald-300 font-bold text-sm">{data.electrolytes_lost.magnesium_mg} mg</span>
                  </div>
                </div>
              </div>

              {/* DIY Kitchen Rehydration Elixir Recipe */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <GlassWater className="h-4 w-4 text-cyan-400" />
                  {data.diy_rehydration_recipe.title}
                </span>

                <div className="space-y-2 text-xs text-white/80">
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-cyan-300 block mb-0.5">Liquid Base:</strong>
                    {data.diy_rehydration_recipe.liquid_base}
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-emerald-300 block mb-0.5">Sodium Replenishment:</strong>
                    {data.diy_rehydration_recipe.sodium_source}
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-purple-300 block mb-0.5">Potassium Co-Factor:</strong>
                    {data.diy_rehydration_recipe.potassium_source}
                  </div>
                  <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3">
                    <strong className="text-amber-300 block mb-0.5">Cellular Transport Trigger:</strong>
                    {data.diy_rehydration_recipe.flavor_glucose_transporter}
                  </div>
                </div>

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.02] p-3.5 text-[11px] text-white/70 font-light leading-relaxed">
                  <strong className="text-cyan-300 font-semibold block mb-0.5">When are commercial electrolyte packets justified?</strong>
                  {data.commercial_powder_guidance}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
