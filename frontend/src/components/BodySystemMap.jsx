import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Sparkles, Info } from "lucide-react";

const ANATOMY_IMG =
  "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?crop=entropy&cs=srgb&fm=jpg&q=85&w=800";

// Normalized coordinates (%) on head-to-toe body image
const POS = {
  "Brain": [50, 8],
  "Nervous system": [58, 14],
  "Sleep/circadian": [42, 10],
  "Heart": [45, 34],
  "Blood vessels": [56, 38],
  "Lungs": [40, 32],
  "Liver": [42, 46],
  "Gut": [50, 52],
  "Kidneys": [58, 48],
  "Muscles": [30, 60],
  "Bones": [68, 62],
  "Metabolism": [50, 44],
  "Mitochondria": [36, 55],
  "Immune system": [64, 40],
  "Endocrine system": [52, 30],
  "Reproductive system": [50, 66],
  "Skin": [24, 44],
};

const SYSTEM_GLOW_COLORS = {
  "Brain": "#8B5CF6",
  "Nervous system": "#8B5CF6",
  "Sleep/circadian": "#8B5CF6",
  "Bones": "#F59E0B",
  "Muscles": "#06B6D4",
  "Mitochondria": "#06B6D4",
  "Heart": "#F43F5E",
  "Blood vessels": "#F43F5E",
  "Liver": "#10B981",
  "Gut": "#10B981",
  "Endocrine system": "#D946EF",
  "Reproductive system": "#D946EF",
  "Immune system": "#38BDF8"
};

const LEVEL_COLOR = {
  primary: "#06B6D4",
  secondary: "#10B981",
  indirect: "#F59E0B"
};

export default function BodySystemMap({ affects = [] }) {
  const [active, setActive] = useState(affects[0] || null);
  const [hovered, setHovered] = useState(null);

  if (!affects.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr] items-start">
      {/* 3D Anatomical Body Map with Glowing Pulse Rings */}
      <div className="relative mx-auto aspect-[3/5] w-full max-w-[300px] overflow-hidden rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-[#0E141D] shadow-xl">
        <img
          src={ANATOMY_IMG}
          alt="Anatomical Physiology Map"
          className="h-full w-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-[#080B10]/60" />

        {/* Pulsing Nodes */}
        {affects.map((a, i) => {
          const p = POS[a.system] || [50, 20 + (i * 10) % 60];
          const color = SYSTEM_GLOW_COLORS[a.system] || LEVEL_COLOR[a.level] || "#06B6D4";
          const isActive = active?.system === a.system;
          const isHovered = hovered?.system === a.system;

          return (
            <button
              key={a.system + i}
              data-testid={`body-dot-${a.system.replace(/\W/g, "")}`}
              onClick={() => setActive(a)}
              onMouseEnter={() => setHovered(a)}
              onMouseLeave={() => setHovered(null)}
              className="absolute -translate-x-1/2 -translate-y-1/2 p-2 group cursor-pointer"
              style={{ left: `${p[0]}%`, top: `${p[1]}%` }}
            >
              <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                <span
                  className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping-slow"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="relative inline-flex h-3 w-3 rounded-full border-2 border-black"
                  style={{
                    backgroundColor: color,
                    boxShadow: isActive || isHovered ? `0 0 16px 3px ${color}` : `0 0 8px ${color}`
                  }}
                />
              </span>

              {/* Instant Node Tooltip */}
              {isHovered && !isActive && (
                <div
                  className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/20 bg-black/90 px-2.5 py-1 text-[10px] font-medium text-white shadow-xl z-20"
                >
                  {a.system} ({a.level})
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Target Physiology Details Card */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {affects.map((a, i) => {
            const isAct = active?.system === a.system;
            const color = SYSTEM_GLOW_COLORS[a.system] || LEVEL_COLOR[a.level] || "#06B6D4";

            return (
              <button
                key={a.system + i}
                data-testid={`body-chip-${a.system.replace(/\W/g, "")}`}
                onClick={() => setActive(a)}
                className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                  isAct
                    ? "bg-slate-100 dark:bg-white/[0.08] text-slate-900 dark:text-white font-bold shadow-sm"
                    : "border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#0E141D] text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20"
                }`}
                style={{ borderColor: isAct ? color : undefined }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                <span>{a.system}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.system}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-5 sm:p-6 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10"
                    style={{ backgroundColor: `${SYSTEM_GLOW_COLORS[active.system] || "#06B6D4"}15` }}
                  >
                    <Activity className="h-4 w-4" style={{ color: SYSTEM_GLOW_COLORS[active.system] || "#06B6D4" }} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white">{active.system}</h4>
                </div>

                <span
                  className="rounded-full border px-3 py-0.5 text-[10px] uppercase font-mono tracking-widest font-bold"
                  style={{
                    borderColor: LEVEL_COLOR[active.level] || "#06B6D4",
                    color: LEVEL_COLOR[active.level] || "#06B6D4",
                    backgroundColor: `${LEVEL_COLOR[active.level] || "#06B6D4"}15`
                  }}
                >
                  {active.level} Target
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-[#CBD5E1] font-normal">
                {active.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="flex items-center gap-5 text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 dark:text-[#64748B] pt-1">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#06B6D4]" /> Primary Target
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" /> Secondary System
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#F59E0B]" /> Indirect Pathway
          </span>
        </div>
      </div>
    </div>
  );
}
