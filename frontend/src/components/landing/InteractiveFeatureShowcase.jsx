import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee, Utensils, FileText, Pill, Sparkles,
  ArrowRight, ShieldCheck, Check, AlertCircle,
  TrendingDown, Zap, Clock, DollarSign, Activity
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function InteractiveFeatureShowcase() {
  const { openCheckoutModal } = useAuth();

  // Micro-Demo 1: Caffeine State
  const [caffeineDose, setCaffeineDose] = useState(150); // mg
  const [caffeineHour, setCaffeineHour] = useState(14); // 2:00 PM
  const bedtime = 22.5; // 10:30 PM
  const hoursToSleep = Math.max(0, bedtime - caffeineHour);
  const halfLife = 5.0;
  const remainingAtBedtime = Math.round(caffeineDose * Math.pow(0.5, hoursToSleep / halfLife));
  const adenosineBlockade = Math.min(100, Math.round((remainingAtBedtime / 100) * 45));

  // Micro-Demo 2: Meal Scanner State
  const MEAL_EXAMPLES = [
    { text: "3 whole eggs, 2 slices sourdough, black coffee", protein: "24g", choline: "420mg (76% DV)", gap: "Low Magnesium (18mg)" },
    { text: "Grilled salmon fillet, quinoa, steamed broccoli", protein: "38g", choline: "120mg", gap: "Optimal Micronutrients" },
    { text: "Oatmeal with whey protein, banana, almond butter", protein: "32g", choline: "45mg", gap: "Low Vitamin B12" }
  ];
  const [activeMealIdx, setActiveMealIdx] = useState(0);
  const activeMeal = MEAL_EXAMPLES[activeMealIdx];

  // Micro-Demo 3: Lab Translator State
  const LAB_EXAMPLES = [
    {
      marker: "Serum Ferritin",
      value: "18 ng/mL",
      ref: "30 – 400 ng/mL",
      status: "Low / Subclinical",
      translation: "Cellular iron stores are depleted despite normal total hemoglobin. Often the hidden root cause of daytime fatigue and reduced exercise recovery.",
      doctorNote: "Ask physician: 'Should we evaluate total iron binding capacity (TIBC) and transferrin saturation?'"
    },
    {
      marker: "25-OH Vitamin D",
      value: "22 ng/mL",
      ref: "30 – 100 ng/mL",
      status: "Insufficient",
      translation: "Sub-optimal circulating D3 compromises calcium absorption and T-cell adaptive immunity. Optimal functional target is 40–60 ng/mL.",
      doctorNote: "Ask physician: 'Is a daily 4,000 IU D3 + K2 (MK-7) protocol appropriate for 8 weeks?'"
    }
  ];
  const [activeLabIdx, setActiveLabIdx] = useState(0);
  const activeLab = LAB_EXAMPLES[activeLabIdx];

  return (
    <div className="mx-auto max-w-6xl px-4 space-y-10 py-8">
      {/* Section Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-500/10 dark:bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-bold text-cyan-700 dark:text-cyan-300">
          <Zap className="h-3.5 w-3.5" />
          <span>Interactive Biology Engine</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          State-of-the-Art <span className="font-extrabold text-cyan-600 dark:text-cyan-400">Live Micro-Tools</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-[#94A3B8] font-medium">
          Experience the computational precision built into KEVALBIO. Try the live interactive teasers below.
        </p>
      </div>

      {/* Grid of 4 Interactive Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* CARD 1: Caffeine Half-Life & Sleep Cutoff */}
        <div className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-lg dark:shadow-xl hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Coffee className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Caffeine Clearance & Sleep Cutoff</h3>
                  <p className="text-[11px] text-slate-500 dark:text-[#64748B] font-mono">Pharmacokinetic Decay Curve</p>
                </div>
              </div>
              <span className="rounded-full bg-amber-100 dark:bg-amber-400/10 border border-amber-300 dark:border-amber-400/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:text-amber-300 font-mono">
                Interactive
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
              Calculate exact bloodstream caffeine concentration and adenosine A2A receptor blockade at bedtime.
            </p>

            {/* Slider Controls */}
            <div className="space-y-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/50 p-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-600 dark:text-[#94A3B8]">Dose (mg):</span>
                  <span className="text-amber-600 dark:text-amber-300 font-extrabold tabular-nums">{caffeineDose} mg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="400"
                  step="25"
                  value={caffeineDose}
                  onChange={(e) => setCaffeineDose(Number(e.target.value))}
                  className="w-full accent-amber-500 dark:accent-amber-400 bg-slate-200 dark:bg-[#1E293B] h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-600 dark:text-[#94A3B8]">Intake Time:</span>
                  <span className="text-cyan-700 dark:text-cyan-300 font-extrabold">
                    {caffeineHour === 12 ? "12:00 PM" : caffeineHour > 12 ? `${caffeineHour - 12}:00 PM` : `${caffeineHour}:00 AM`}
                  </span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="19"
                  step="1"
                  value={caffeineHour}
                  onChange={(e) => setCaffeineHour(Number(e.target.value))}
                  className="w-full accent-cyan-600 dark:accent-cyan-400 bg-slate-200 dark:bg-[#1E293B] h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Live Calculation Output */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-slate-100/80 dark:bg-[#080B10] p-3.5 text-center">
                <div className="font-mono text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {remainingAtBedtime} <span className="text-xs text-slate-500 dark:text-[#64748B] font-normal">mg</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-mono mt-0.5 font-bold">At Bedtime (10:30 PM)</div>
              </div>

              <div className={`rounded-2xl border p-3.5 text-center ${
                adenosineBlockade > 25 ? "border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300" : "border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              }`}>
                <div className="font-mono text-xl sm:text-2xl font-extrabold tabular-nums">
                  {adenosineBlockade}%
                </div>
                <div className="text-[10px] font-mono mt-0.5 font-bold">
                  {adenosineBlockade > 25 ? "High Sleep Disruption" : "Sleep Safe Zone"}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => openCheckoutModal("PRO_ANNUAL")}
            className="flex items-center justify-between rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all group"
          >
            <span>Unlock CYP1A2 & Birth Control Hormone Modifiers in Pro</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARD 2: One-Line Meal & Micronutrient Scanner */}
        <div className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-lg dark:shadow-xl hover:border-emerald-500/40 dark:hover:border-emerald-400/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Utensils className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">One-Line Meal & Nutrient Scanner</h3>
                  <p className="text-[11px] text-slate-500 dark:text-[#64748B] font-mono">Instant Micronutrient Gap Extraction</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-400/10 border border-emerald-300 dark:border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                Live Demo
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
              Type or select a single free-text meal log to automatically detect bioavailable micronutrient gaps.
            </p>

            {/* Quick Example Selector */}
            <div className="space-y-2">
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {MEAL_EXAMPLES.map((meal, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMealIdx(idx)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-mono transition-all whitespace-nowrap ${
                      activeMealIdx === idx
                        ? "bg-emerald-600 dark:bg-emerald-400 text-white dark:text-black font-extrabold shadow-sm"
                        : "border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Meal #{idx + 1}
                  </button>
                ))}
              </div>

              {/* Display text */}
              <div className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 p-3.5 font-mono text-xs text-slate-800 dark:text-white">
                "{activeMeal.text}"
              </div>
            </div>

            {/* Extracted Data Preview */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-100/80 dark:bg-[#080B10] p-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between font-mono">
                <span className="text-slate-600 dark:text-[#94A3B8]">Bioavailable Protein:</span>
                <span className="text-emerald-700 dark:text-emerald-300 font-extrabold tabular-nums">{activeMeal.protein}</span>
              </div>
              <div className="flex items-center justify-between font-mono">
                <span className="text-slate-600 dark:text-[#94A3B8]">Key Micronutrient:</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-extrabold tabular-nums">{activeMeal.choline}</span>
              </div>
              <div className="flex items-center justify-between font-mono border-t border-slate-200 dark:border-white/5 pt-2">
                <span className="text-slate-600 dark:text-[#94A3B8]">Detected Gap:</span>
                <span className="text-amber-700 dark:text-amber-400 font-extrabold">{activeMeal.gap}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openCheckoutModal("PRO_ANNUAL")}
            className="flex items-center justify-between rounded-2xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-3 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all group"
          >
            <span>Scan Unlimited Daily Meals & Micronutrient Trends</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARD 3: Lab Report OCR Translator */}
        <div className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-lg dark:shadow-xl hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Lab Report OCR Translator</h3>
                  <p className="text-[11px] text-slate-500 dark:text-[#64748B] font-mono">Bloodwork to Plain-English Triage</p>
                </div>
              </div>
              <span className="rounded-full bg-cyan-100 dark:bg-cyan-400/10 border border-cyan-300 dark:border-cyan-400/30 px-2.5 py-0.5 text-[10px] font-bold text-cyan-800 dark:text-cyan-300 font-mono">
                Side-by-Side
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
              Converts complex lab abbreviations into doctor-ready talking points and cellular context.
            </p>

            {/* Marker switcher */}
            <div className="flex gap-2">
              {LAB_EXAMPLES.map((l, i) => (
                <button
                  key={i}
                  onClick={() => setActiveLabIdx(i)}
                  className={`rounded-xl px-3 py-1 text-xs font-mono transition-all ${
                    activeLabIdx === i ? "bg-cyan-600 dark:bg-cyan-400 text-white dark:text-black font-extrabold shadow-sm" : "border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#94A3B8]"
                  }`}
                >
                  {l.marker}
                </button>
              ))}
            </div>

            {/* Side-by-Side Box */}
            <div className="space-y-3 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/60 p-4">
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-200 dark:border-white/10 pb-2">
                <div>
                  <span className="text-slate-900 dark:text-white font-bold">{activeLab.marker}: </span>
                  <span className="text-amber-700 dark:text-amber-400 font-extrabold tabular-nums">{activeLab.value}</span>
                </div>
                <span className="text-slate-500 dark:text-[#64748B]">Ref: {activeLab.ref}</span>
              </div>

              <div className="text-xs text-slate-800 dark:text-white/90 font-normal leading-relaxed">
                {activeLab.translation}
              </div>

              <div className="rounded-xl border border-cyan-300 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/5 p-2.5 text-[11px] text-cyan-900 dark:text-cyan-200 font-medium">
                <strong>Doctor Talking Point:</strong> {activeLab.doctorNote}
              </div>
            </div>
          </div>

          <button
            onClick={() => openCheckoutModal("PRO_ANNUAL")}
            className="flex items-center justify-between rounded-2xl border border-cyan-300 dark:border-cyan-500/30 bg-cyan-50 dark:bg-cyan-500/10 px-4 py-3 text-xs font-bold text-cyan-800 dark:text-cyan-300 hover:bg-cyan-100 dark:hover:bg-cyan-500/20 transition-all group"
          >
            <span>Upload Complete Lab PDFs with OCR in Pro</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* CARD 4: Supplement Waste & Blend Auditor */}
        <div className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-lg dark:shadow-xl hover:border-pink-500/40 dark:hover:border-pink-400/40 transition-colors">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-pink-500/30 bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <Pill className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Supplement Waste & Blend Auditor</h3>
                  <p className="text-[11px] text-slate-500 dark:text-[#64748B] font-mono">Unmasking Underdosed Matrices</p>
                </div>
              </div>
              <span className="rounded-full bg-pink-100 dark:bg-pink-400/10 border border-pink-300 dark:border-pink-400/30 px-2.5 py-0.5 text-[10px] font-bold text-pink-800 dark:text-pink-300 font-mono">
                Audit Preview
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
              Detects low-bioavailability forms, unmasks proprietary blends, and calculates monthly money saved.
            </p>

            {/* Audit breakdown visual */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/60 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-900 dark:text-white font-bold">"Pre-Workout Energy Matrix"</span>
                <span className="text-red-600 dark:text-red-400 font-extrabold tabular-nums">500mg Total Blend</span>
              </div>

              <div className="space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between text-slate-600 dark:text-[#94A3B8]">
                  <span>• L-Citrulline content:</span>
                  <span className="text-red-600 dark:text-red-400 font-bold">~250mg (Needs 6,000mg)</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-[#94A3B8]">
                  <span>• Beta-Alanine content:</span>
                  <span className="text-red-600 dark:text-red-400 font-bold">~150mg (Needs 3,200mg)</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-[#94A3B8]">
                  <span>• Overlapping Vitamin B6:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">3x RDA Duplicate</span>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-2.5 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-800 dark:text-emerald-300 font-bold">Estimated Stack Waste:</span>
                <span className="font-extrabold text-slate-900 dark:text-white tabular-nums">$45.00 / month</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => openCheckoutModal("PRO_ANNUAL")}
            className="flex items-center justify-between rounded-2xl border border-pink-300 dark:border-pink-500/30 bg-pink-50 dark:bg-pink-500/10 px-4 py-3 text-xs font-bold text-pink-800 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-500/20 transition-all group"
          >
            <span>Audit Your Entire Supplement Stack with Pro</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
