import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ANATOMY_IMG =
  "https://images.unsplash.com/photo-1530210124550-912dc1381cb8?crop=entropy&cs=srgb&fm=jpg&q=85&w=800";

// Approx normalized coordinates (%) on a head-to-toe body image
const POS = {
  "Brain": [50, 8], "Nervous system": [58, 14], "Sleep/circadian": [42, 10],
  "Heart": [45, 34], "Blood vessels": [56, 38], "Lungs": [40, 32],
  "Liver": [42, 46], "Gut": [50, 52], "Kidneys": [58, 48],
  "Muscles": [30, 60], "Bones": [68, 62], "Metabolism": [50, 44],
  "Mitochondria": [36, 55], "Immune system": [64, 40], "Endocrine system": [52, 30],
  "Reproductive system": [50, 66], "Skin": [24, 44],
};

const LEVEL_COLOR = { primary: "#00F0FF", secondary: "#00E676", indirect: "#FFEA00" };

export default function BodySystemMap({ affects = [] }) {
  const [active, setActive] = useState(affects[0] || null);
  if (!affects.length) return null;

  return (
    <div className="grid gap-6 md:grid-cols-[300px_1fr]">
      <div className="relative mx-auto aspect-[3/5] w-full max-w-[300px] overflow-hidden border border-white/10 bg-[#0A0A0A]">
        <img src={ANATOMY_IMG} alt="Anatomy" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50" />
        {affects.map((a, i) => {
          const p = POS[a.system] || [50, 20 + (i * 9) % 60];
          const color = LEVEL_COLOR[a.level] || "#00F0FF";
          const isActive = active?.system === a.system;
          return (
            <button
              key={a.system + i}
              data-testid={`body-dot-${a.system.replace(/\W/g, "")}`}
              onClick={() => setActive(a)}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p[0]}%`, top: `${p[1]}%` }}
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping-slow" style={{ backgroundColor: color }} />
                <span className="relative inline-flex h-3 w-3 rounded-full ring-2 ring-black" style={{ backgroundColor: color, boxShadow: isActive ? `0 0 12px ${color}` : "none" }} />
              </span>
            </button>
          );
        })}
      </div>

      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          {affects.map((a, i) => (
            <button
              key={a.system + i}
              data-testid={`body-chip-${a.system.replace(/\W/g, "")}`}
              onClick={() => setActive(a)}
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors ${
                active?.system === a.system ? "text-white" : "text-white/55 hover:text-white"
              }`}
              style={{ borderColor: active?.system === a.system ? (LEVEL_COLOR[a.level] || "#00F0FF") : "rgba(255,255,255,0.1)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: LEVEL_COLOR[a.level] || "#00F0FF" }} />
              {a.system}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.system}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="mb-2 flex items-center gap-2">
                <h4 className="font-display text-lg">{active.system}</h4>
                <span className="rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest capitalize"
                  style={{ borderColor: LEVEL_COLOR[active.level], color: LEVEL_COLOR[active.level] }}>
                  {active.level}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">{active.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-3 flex gap-4 text-[10px] uppercase tracking-wider text-white/40">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#00F0FF]" /> Primary</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#00E676]" /> Secondary</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-[#FFEA00]" /> Indirect</span>
        </div>
      </div>
    </div>
  );
}
