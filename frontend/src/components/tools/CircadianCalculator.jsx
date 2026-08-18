import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun, Moon, Clock, Sparkles, Eye, Brain, Flame, Zap, ShieldCheck,
  Compass, ChevronRight, Activity, AlertCircle, Info
} from "lucide-react";
import { getCircadianWindows } from "../../lib/api";

const WAKE_OPTIONS = [
  { label: "5:00 AM", value: 5.0 },
  { label: "5:30 AM", value: 5.5 },
  { label: "6:00 AM", value: 6.0 },
  { label: "6:30 AM", value: 6.5 },
  { label: "7:00 AM", value: 7.0 },
  { label: "7:30 AM", value: 7.5 },
  { label: "8:00 AM", value: 8.0 },
  { label: "8:30 AM", value: 8.5 },
  { label: "9:00 AM", value: 9.0 }
];

const LIGHT_CONDITIONS = [
  {
    id: "direct_sun",
    title: "Direct Sunlight",
    lux: "100,000+ Lux",
    duration: "10 – 15 Mins",
    icon: "☀️",
    desc: "Unobstructed outdoor sunlight directly stimulates melanopsin ganglion cells."
  },
  {
    id: "overcast",
    title: "Overcast / Cloudy",
    lux: "10,000 – 25,000 Lux",
    duration: "20 – 30 Mins",
    icon: "⛅",
    desc: "Cloud cover diffuses photons; double the viewing duration is required."
  },
  {
    id: "window",
    title: "Through Window Glass",
    lux: "< 2,000 Lux",
    duration: "60+ Mins (Inefficient)",
    icon: "🪟",
    desc: "Glass filters out key 480nm circadian wavelengths and reduces lux by 70–80%."
  }
];

export default function CircadianCalculator() {
  const [wakeHour, setWakeHour] = useState(6.5); // 6:30 AM
  const [daylightCondition, setDaylightCondition] = useState("direct_sun");
  const [data, setData] = useState(null);

  useEffect(() => {
    getCircadianWindows({
      wake_hour: wakeHour,
      daylight_condition: daylightCondition
    }).then(setData).catch(() => {});
  }, [wakeHour, daylightCondition]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-amber-500/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-widest">
            <Sun className="h-4 w-4" />
            <span>Circadian Light & Cortisol Window Calculator</span>
          </div>

          <span className="rounded-full bg-amber-400/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-amber-300 border border-amber-400/20">
            SCN Melanopsin Photobiology
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
          Align Your Biology with the Solar Day
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light max-w-3xl leading-relaxed">
          Your suprachiasmatic nucleus (SCN) requires morning photon exposure to anchor the Cortisol Awakening Response, time your peak cognitive blocks, and set an internal 14-hour countdown for night-time melatonin release.
        </p>
      </div>

      {/* Interactive Controls */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left 5 Cols: Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Wake Time Picker */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              1. Your Wake Time Today
            </label>
            <select
              value={wakeHour}
              onChange={(e) => setWakeHour(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/15 bg-black/80 px-4 py-3 text-sm text-white outline-none focus:border-amber-400 font-mono"
            >
              {WAKE_OPTIONS.map((w) => (
                <option key={w.value} value={w.value} className="bg-black text-white">
                  {w.label}
                </option>
              ))}
            </select>
          </div>

          {/* Daylight Conditions */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5 text-amber-400" />
              2. Morning Daylight Exposure
            </label>
            <div className="space-y-2">
              {LIGHT_CONDITIONS.map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => setDaylightCondition(cond.id)}
                  className={`w-full rounded-2xl p-3.5 text-left border transition-all ${
                    daylightCondition === cond.id
                      ? "border-amber-400 bg-amber-400/10 text-white shadow-[0_0_15px_rgba(255,191,0,0.18)]"
                      : "border-white/10 bg-black/40 text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xs text-white flex items-center gap-2">
                      <span>{cond.icon}</span>
                      <span>{cond.title}</span>
                    </span>
                    <span className="text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
                      {cond.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 font-light mt-1.5 leading-relaxed">{cond.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Calculated Biological Milestones & Windows */}
        <div className="lg:col-span-7 space-y-5">
          {data && (
            <>
              {/* Primary Visual Windows Card */}
              <div className="rounded-3xl border border-amber-400/40 bg-gradient-to-r from-amber-400/15 via-orange-400/10 to-transparent p-6 space-y-4 shadow-[0_0_35px_rgba(255,191,0,0.12)]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4" />
                    Circadian Retinal Action Plan
                  </span>
                  <span className="rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 text-xs font-semibold">
                    {data.recommended_viewing_duration} Outside
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 pt-1">
                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="text-white/40 uppercase text-[10px] tracking-wider block">
                      Morning Sunlight Window
                    </span>
                    <div className="font-display text-2xl font-bold text-amber-300 mt-1">
                      {data.morning_sunlight_window}
                    </div>
                    <span className="text-[11px] text-white/60 mt-1 block">
                      Suppresses melatonin & spikes healthy cortisol
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/60 p-4">
                    <span className="text-white/40 uppercase text-[10px] tracking-wider block">
                      Peak Cognitive Focus Block
                    </span>
                    <div className="font-display text-2xl font-bold text-cyan-300 mt-1">
                      {data.peak_cognitive_block}
                    </div>
                    <span className="text-[11px] text-white/60 mt-1 block">
                      Highest body temp & sympathetic alertness
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/70 font-light pt-1 border-t border-white/10">
                  {data.protocol_note}
                </p>
              </div>

              {/* Step-by-Step Chronobiology Milestones */}
              <div className="rounded-3xl border border-white/10 bg-black/40 p-5 sm:p-6 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                  Your Personalized 24-Hour Circadian Milestones
                </span>

                <div className="space-y-3">
                  {data.timeline.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition-all hover:border-white/15"
                    >
                      <span className="text-xl mt-0.5">{m.icon}</span>
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs text-white">{m.title}</span>
                          <span className="text-[11px] font-mono text-amber-300 font-bold">{m.time}</span>
                        </div>
                        <p className="text-[11px] text-white/60 font-light leading-relaxed">{m.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
