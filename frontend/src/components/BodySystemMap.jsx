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
  "Heart & Blood Vessels": [48, 36],
  "Blood vessels": [56, 38],
  "Cardiovascular": [48, 36],
  "Lungs": [40, 32],
  "Respiratory": [40, 32],
  "Liver": [42, 46],
  "Gut": [50, 52],
  "Gastrointestinal": [50, 52],
  "Kidneys": [58, 48],
  "Muscles": [30, 60],
  "Musculoskeletal": [30, 60],
  "Bones": [68, 62],
  "Metabolism": [50, 44],
  "Mitochondria": [36, 55],
  "Cellular Energy": [36, 55],
  "Immune system": [64, 40],
  "Endocrine system": [52, 30],
  "Hormonal": [52, 30],
  "Reproductive system": [50, 66],
  "Skin": [24, 44],
};

const SYSTEM_GLOW_COLORS = {
  "Brain": "#8B5CF6",
  "Nervous system": "#8B5CF6",
  "Sleep/circadian": "#8B5CF6",
  "Bones": "#F59E0B",
  "Muscles": "#06B6D4",
  "Musculoskeletal": "#06B6D4",
  "Mitochondria": "#06B6D4",
  "Cellular Energy": "#06B6D4",
  "Heart": "#F43F5E",
  "Heart & Blood Vessels": "#F43F5E",
  "Cardiovascular": "#F43F5E",
  "Blood vessels": "#F43F5E",
  "Liver": "#10B981",
  "Gut": "#10B981",
  "Gastrointestinal": "#10B981",
  "Endocrine system": "#D946EF",
  "Hormonal": "#D946EF",
  "Reproductive system": "#D946EF",
  "Immune system": "#38BDF8"
};

const LEVEL_COLOR = {
  primary: "#06B6D4",
  secondary: "#10B981",
  indirect: "#F59E0B"
};

function getSysName(sys) {
  if (!sys) return "Target System";
  if (typeof sys === "string") return sys;
  return sys.system || sys.name || sys.title || sys.target || "Target System";
}

function getSysDetail(sys) {
  if (!sys) return "";
  if (typeof sys === "string") return sys;
  return sys.detail || sys.description || sys.mechanism || sys.summary || "Crucial physiological target system influenced by this compound.";
}

function getSysLevel(sys) {
  if (!sys || typeof sys === "string") return "primary";
  return sys.level || sys.impact || "primary";
}

export default function BodySystemMap({ affects = [] }) {
  // Normalize affects list
  const normalizedAffects = (affects || []).filter(Boolean);
  const [active, setActive] = useState(normalizedAffects[0] || null);
  const [hovered, setHovered] = useState(null);

  if (!normalizedAffects.length) return null;

  const activeSysName = getSysName(active);
  const activeSysDetail = getSysDetail(active);
  const activeSysLevel = getSysLevel(active);

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr] items-start">
      {/* 3D Anatomical Body Map with Glowing Pulse Rings */}
      <div className="relative mx-auto aspect-[3/5] w-full max-w-[300px] overflow-hidden rounded-3xl border border-[#1E293B] bg-[#0E141D] shadow-2xl">
        <img
          src={ANATOMY_IMG}
          alt="Anatomical Physiology Map"
          className="h-full w-full object-cover opacity-60 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B10] via-transparent to-[#080B10]/70" />

        {/* Pulsing Nodes */}
        {normalizedAffects.map((a, i) => {
          const sysName = getSysName(a);
          const p = POS[sysName] || [50, 20 + (i * 12) % 60];
          const color = SYSTEM_GLOW_COLORS[sysName] || LEVEL_COLOR[getSysLevel(a)] || "#06B6D4";
          const isActive = activeSysName === sysName;
          const isHovered = hovered === sysName;

          return (
            <button
              key={sysName + i}
              data-testid={`body-dot-${sysName.replace(/\W/g, "")}`}
              onClick={() => setActive(a)}
              onMouseEnter={() => setHovered(sysName)}
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
                  className="absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-white/20 bg-black/95 px-2.5 py-1 text-[10px] font-bold text-white shadow-xl z-20"
                >
                  {sysName} ({getSysLevel(a)})
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Target Physiology Details Card */}
      <div className="space-y-4">
        {/* System Pill Buttons */}
        <div className="flex flex-wrap gap-2">
          {normalizedAffects.map((sys, idx) => {
            const sysName = getSysName(sys);
            const sysLevel = getSysLevel(sys);
            const color = SYSTEM_GLOW_COLORS[sysName] || LEVEL_COLOR[sysLevel] || "#06B6D4";
            const isAct = activeSysName === sysName;

            return (
              <button
                key={idx}
                data-testid={`body-chip-${sysName.replace(/\W/g, "")}`}
                onClick={() => setActive(sys)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isAct
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-lg shadow-cyan-500/20'
                    : 'bg-[#141C28] text-slate-400 border-[#1E293B] hover:text-white hover:border-slate-600'
                }`}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                <span>{sysName}</span>
              </button>
            );
          })}
        </div>

        {/* Selected System Impact Card */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={activeSysName}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-3xl border border-[#1E293B] bg-[#0E141D] p-5 sm:p-6 space-y-3 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10"
                  >
                    <Activity className="h-4.5 w-4.5 text-[#06B6D4]" />
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                    {activeSysName}
                  </h4>
                </div>

                <span
                  className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono tracking-widest"
                >
                  {activeSysLevel} Target
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-[#CBD5E1] font-normal pt-1">
                {activeSysDetail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="flex items-center gap-5 text-[10px] uppercase font-mono font-bold tracking-wider text-[#64748B] pt-1">
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
