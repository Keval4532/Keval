import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Baby, Microscope, Sparkles, Loader2 } from "lucide-react";
import { getPersonaExplain } from "../lib/api";

const PERSONAS = [
  {
    id: "coach",
    label: "Coach Mode",
    icon: Dumbbell,
    desc: "Practical, motivating, action-focused",
    colorClass: "border-emerald-500 bg-emerald-500/10 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]",
    iconColor: "text-emerald-400",
    headerColor: "text-emerald-400"
  },
  {
    id: "five_year_old",
    label: "5-Year-Old Mode",
    icon: Baby,
    desc: "Zero jargon, simple analogies only",
    colorClass: "border-amber-500 bg-amber-500/10 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    iconColor: "text-amber-400",
    headerColor: "text-amber-400"
  },
  {
    id: "biochemist",
    label: "Biochemist Mode",
    icon: Microscope,
    desc: "Receptors, pathways & molecular kinetics",
    colorClass: "border-violet-500 bg-violet-500/10 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]",
    iconColor: "text-violet-400",
    headerColor: "text-violet-400"
  }
];

export default function PersonaSwitcher({ subject, context = "" }) {
  const [activePersona, setActivePersona] = useState("coach");
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSwitch = async (pId) => {
    if (pId === activePersona && explanation) return;
    setActivePersona(pId);
    setLoading(true);
    try {
      const res = await getPersonaExplain(subject, pId, context);
      setExplanation(res.explanation);
    } catch {
      setExplanation(null);
    } finally {
      setLoading(false);
    }
  };

  const currentPersonaConfig = PERSONAS.find((p) => p.id === activePersona) || PERSONAS[0];

  return (
    <div className="rounded-3xl border border-[#1E2E42] bg-[#0E141D] p-5 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="h-4 w-4" />
          <span>Explain It Like... (Adaptive Persona Switcher)</span>
        </div>
        <span className="text-[11px] text-[#64748B] font-mono">Switch perspective in real-time</span>
      </div>

      {/* Persona Toggle Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {PERSONAS.map((p) => {
          const Icon = p.icon;
          const isAct = activePersona === p.id;
          return (
            <button
              key={p.id}
              onClick={() => handleSwitch(p.id)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 rounded-2xl p-2.5 sm:p-3 text-xs transition-all border ${
                isAct
                  ? `${p.colorClass} font-semibold`
                  : "border-[#1E293B] bg-black/30 text-[#94A3B8] hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isAct ? p.iconColor : "text-white/40"}`} />
              <span className="truncate">{p.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Persona Explanation Box */}
      <div className="min-h-[70px] rounded-2xl border border-[#1E293B] bg-black/50 p-4 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-light">
        {loading ? (
          <div className="flex items-center gap-2 text-cyan-300 py-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Adapting explanation for {currentPersonaConfig.label}...</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activePersona}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              <div className={`text-[10px] font-mono uppercase tracking-widest ${currentPersonaConfig.headerColor}`}>
                {currentPersonaConfig.desc}:
              </div>
              <p>
                {explanation ||
                  (activePersona === "five_year_old"
                    ? `Imagine your body is like a superhero car. ${subject} is like the special clean fuel that keeps your motor running at full speed! When you get enough ${subject} from yummy real food, you can play all day, jump high, and wake up super happy.`
                    : activePersona === "biochemist"
                    ? `From a molecular physiology perspective, ${subject} acts as a critical enzymatic cofactor and allosteric regulator. It modulates transmembrane ion gradients, activates ATP synthase complexes, and optimizes cellular mitochondrial bioenergetics across Target tissue receptors.`
                    : `Think of ${subject} as a foundational cornerstone of your daily physical performance. Focus on nutrient-dense whole foods first to hit optimal baseline levels, lock in restorative sleep, and only supplement strategically when dietary intake falls short.`)}
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
