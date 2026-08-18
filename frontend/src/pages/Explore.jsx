import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight, Coffee, Utensils, Pill, Sparkles, FileText,
  Sun, Flame, Droplets, Search, Layers, Compass, Crown
} from "lucide-react";
import { getExplore } from "../lib/api";

const INTERACTIVE_TOOLS = [
  {
    title: "Lab Report Translator",
    path: "/tools/lab-scanner",
    desc: "Educational blood panel interpreter with non-pathological context and doctor talking points.",
    icon: FileText,
    color: "from-emerald-500/15 border-emerald-400/30 text-emerald-400"
  },
  {
    title: "Circadian Light & Cortisol",
    path: "/tools/circadian",
    desc: "Calculate morning lux viewing windows, ultradian focus peaks, and melatonin timing.",
    icon: Sun,
    color: "from-amber-500/15 border-amber-400/30 text-amber-400"
  },
  {
    title: "Fasting Metabolic Timeline",
    path: "/tools/fasting",
    desc: "Track glycogen depletion, AMPK enzyme activation, and search 'Does This Break My Fast?'.",
    icon: Flame,
    color: "from-purple-500/15 border-purple-400/30 text-purple-400"
  },
  {
    title: "Sweat Rate & Hydration",
    path: "/tools/hydration",
    desc: "Calculate precision fluid loss, electrolyte replenishment, and DIY rehydration elixir.",
    icon: Droplets,
    color: "from-cyan-500/15 border-cyan-400/30 text-cyan-400"
  },
  {
    title: "Supplement Blend Auditor",
    path: "/tools/supplement-auditor",
    desc: "Unmask underdosed proprietary matrices and compare doses against human clinical trials.",
    icon: Pill,
    color: "from-pink-500/15 border-pink-400/30 text-pink-400"
  },
  {
    title: "Caffeine Sleep Cutoff",
    path: "/caffeine",
    desc: "Pharmacokinetic clearance curve with personal hormones, age, and adenosine receptor blockage.",
    icon: Coffee,
    color: "from-yellow-500/15 border-yellow-400/30 text-yellow-400"
  },
  {
    title: "One-Line Meal Scanner",
    path: "/diet",
    desc: "Instant macro distribution, blind spots, and whole-food additions without calorie counting.",
    icon: Utensils,
    color: "from-emerald-500/15 border-emerald-400/30 text-emerald-400"
  },
  {
    title: "Stack Waste Detector",
    path: "/stack",
    desc: "Redundancy Index (0-100%), bioavailability form audit, and 3-phase timing schedule.",
    icon: Layers,
    color: "from-blue-500/15 border-blue-400/30 text-blue-400"
  }
];

export default function Explore() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  useEffect(() => { getExplore().then((d) => setCats(d.categories || [])).catch(() => {}); }, []);

  const open = (name) => navigate(`/result?q=${encodeURIComponent(name)}&level=${localStorage.getItem("apex_level") || "intermediate"}`);

  return (
    <div className="space-y-12 pb-16">
      <div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-semibold">Interactive Biology Suite</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Explore</h1>
        <p className="mt-3 max-w-2xl text-white/60 font-light">
          Run real-time physiological calculations or browse curated topics across nutrition, hormones, metabolism, and training.
        </p>
      </div>

      {/* High-Impact Interactive Biology Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Sparkles className="h-4 w-4 text-cyan-400" />
            <span>Interactive Biology Tools</span>
          </div>
          <span className="text-[11px] text-white/40 font-mono">8 tools available</span>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {INTERACTIVE_TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.title}
                onClick={() => navigate(t.path)}
                className={`rounded-3xl border bg-gradient-to-br ${t.color} to-transparent p-5 text-left flex flex-col justify-between space-y-3 hover:scale-[1.02] transition-all group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-black/40 border border-white/10">
                    <Icon className="h-4 w-4" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-white">{t.title}</div>
                  <p className="text-[11px] text-white/60 font-light mt-1 line-clamp-2 leading-relaxed">{t.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-10">
        {cats.map((cat, ci) => (
          <section key={cat.name}>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
              <h2 className="font-display text-xl">{cat.name}</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {cat.items.map((item, i) => (
                <motion.button
                  key={item}
                  data-testid={`explore-item-${item.replace(/\W/g, "")}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (ci * 0.02) + i * 0.015 }}
                  onClick={() => open(item)}
                  className="group flex items-center justify-between border border-white/10 bg-white/[0.02] p-4 text-left transition-colors hover:border-cyan-400/40 hover:bg-white/[0.04]"
                >
                  <span className="text-sm text-white/80 group-hover:text-white">{item}</span>
                  <ArrowUpRight className="h-4 w-4 text-white/25 transition-colors group-hover:text-cyan-400" />
                </motion.button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
