import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Flame, Clock, Sparkles, Search, ShieldCheck, CheckCircle2,
  AlertTriangle, Info, Zap, ChevronRight, Activity, Coffee
} from "lucide-react";
import { getFastingTimeline, getFastBreakers } from "../../lib/api";

const PROTOCOLS = [
  { id: "14:10", label: "14:10 Gentle", target: 14.0 },
  { id: "16:8", label: "16:8 Classic", target: 16.0 },
  { id: "18:6", label: "18:6 Deep Fast", target: 18.0 },
  { id: "20:4", label: "20:4 / OMAD", target: 20.0 },
  { id: "24:0", label: "24-Hour Reset", target: 24.0 }
];

export default function FastingTimeline() {
  const [protocol, setProtocol] = useState("16:8");
  const [targetHours, setTargetHours] = useState(16.0);
  const [elapsedHours, setElapsedHours] = useState(14.5);
  const [searchQuery, setSearchQuery] = useState("");
  const [fastData, setFastData] = useState(null);
  const [fastBreakers, setFastBreakers] = useState([]);

  useEffect(() => {
    getFastingTimeline({
      fast_hours_elapsed: elapsedHours,
      protocol: protocol,
      target_fast_hours: targetHours
    }).then((d) => {
      setFastData(d);
      setFastBreakers(d.fast_breaker_dictionary || []);
    }).catch(() => {});
  }, [elapsedHours, protocol, targetHours]);

  const handleSelectProtocol = (p) => {
    setProtocol(p.id);
    setTargetHours(p.target);
  };

  const filteredItems = fastBreakers.filter((item) =>
    item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.verdict.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-widest">
            <Flame className="h-4 w-4" />
            <span>Fasting & Metabolic Shift Timeline</span>
          </div>

          <span className="rounded-full bg-purple-400/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-purple-300 border border-purple-400/20">
            AMPK / mTOR Molecular Kinetics
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
          Track Your Real-Time Cellular Fasting Phase
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light max-w-3xl leading-relaxed">
          See exactly which physiological shift your body is undergoing—from initial glycogen mobilization to AMPK enzyme activation and cellular autophagy.
        </p>
      </div>

      {/* Protocol & Duration Inputs */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 5 Cols: Fast Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Protocol Selector */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-white block">
              1. Choose Intermittent Protocol
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectProtocol(p)}
                  className={`rounded-2xl p-3 text-left border transition-all text-xs ${
                    protocol === p.id
                      ? "border-purple-400 bg-purple-400/10 text-white shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                      : "border-white/10 bg-black/40 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="font-medium text-xs text-white">{p.label}</div>
                  <div className="text-[10px] text-purple-300/70 font-mono mt-0.5">{p.target} Hours Target</div>
                </button>
              ))}
            </div>

            {/* Custom Elapsed Hours Slider */}
            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/70">Hours Fasted So Far:</span>
                <span className="font-mono text-purple-300 font-bold text-sm">{elapsedHours} Hours</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={elapsedHours}
                onChange={(e) => setElapsedHours(Number(e.target.value))}
                className="w-full accent-purple-400 bg-white/10 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>0h (Meal End)</span>
                <span>12h (Glycogen)</span>
                <span>18h (Autophagy)</span>
                <span>24h+</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Real-time Multi-Stage Progress & Current Phase */}
        <div className="lg:col-span-7 space-y-5">
          {fastData && (
            <>
              {/* Active Stage Banner Card */}
              <div className="rounded-3xl border border-purple-400/40 bg-gradient-to-r from-purple-400/15 via-pink-400/10 to-transparent p-6 space-y-4 shadow-[0_0_35px_rgba(168,85,247,0.15)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-purple-300 flex items-center gap-1.5">
                    <Activity className="h-4 w-4" />
                    Stage {fastData.current_stage.stage_number} of 4 Active
                  </span>
                  <span className="rounded-full bg-purple-400/20 text-purple-200 border border-purple-400/40 px-3 py-1 text-xs font-mono font-semibold">
                    {fastData.progress_percentage}% Goal Reached
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {fastData.current_stage.name} ({fastData.current_stage.range})
                  </h3>
                  <p className="text-xs text-white/70 font-light mt-1.5 leading-relaxed">
                    {fastData.current_stage.description}
                  </p>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2 pt-2 border-t border-white/10 text-xs">
                  <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
                    <span className="text-white/40 text-[10px] uppercase block">Primary Metabolic Fuel</span>
                    <span className="text-white font-medium text-xs mt-0.5 block">{fastData.current_stage.primary_fuel}</span>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/50 p-3">
                    <span className="text-white/40 text-[10px] uppercase block">Autophagy & Cellular Renewal</span>
                    <span className="text-purple-300 font-medium text-xs mt-0.5 block">{fastData.current_stage.autophagy}</span>
                  </div>
                </div>
              </div>

              {/* 4-Stage Progressive Timeline Bar */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6 space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                  Metabolic Phase Progression
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {fastData.stages.map((st) => (
                    <div
                      key={st.stage}
                      className={`rounded-2xl border p-3 text-left transition-all ${
                        st.active
                          ? "border-purple-400 bg-purple-400/10 text-white shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                          : "border-white/5 bg-black/30 text-white/50"
                      }`}
                    >
                      <div className="text-[10px] font-mono text-purple-300 font-bold uppercase">
                        Stage {st.stage}
                      </div>
                      <div className="text-xs font-medium text-white mt-0.5 truncate">{st.title}</div>
                      <div className="text-[10px] text-white/40 mt-1">{st.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* "Does This Break My Fast?" Search Utility */}
      <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-white flex items-center gap-2">
              <Coffee className="h-5 w-5 text-purple-400" />
              <span>"Does This Break My Fast?" Dictionary</span>
            </h3>
            <p className="text-xs text-white/50 mt-0.5">
              Instant physiological impact on insulin, mTOR, and cellular autophagy.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coffee, stevia, whey..."
              className="w-full rounded-2xl border border-white/15 bg-black/60 pl-10 pr-4 py-2.5 text-xs text-white outline-none focus:border-purple-400 placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {filteredItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-2 hover:border-purple-400/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm text-white">{item.item}</span>
                <span className="text-xs font-mono font-bold">{item.verdict_badge}</span>
              </div>
              <p className="text-xs text-white/70 font-light leading-relaxed">{item.explanation}</p>
              <div className="flex items-center gap-3 text-[10px] text-white/40 pt-1 border-t border-white/5 font-mono">
                <span>Insulin: {item.insulin_impact}</span>
                <span>•</span>
                <span>Autophagy: {item.autophagy_impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
