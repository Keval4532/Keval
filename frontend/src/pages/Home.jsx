import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { getTrending } from "../lib/api";

const EXAMPLES = [
  "Teach me everything about Vitamin D",
  "Why is magnesium important?",
  "How does creatine work?",
  "Why do I feel tired?",
  "How does muscle growth happen?",
  "What does insulin do?",
];

const LEVELS = ["beginner", "intermediate", "advanced"];

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [level, setLevel] = useState(localStorage.getItem("apex_level") || "intermediate");
  const [focused, setFocused] = useState(false);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrending().then((d) => setTrending(d.topics || [])).catch(() => {});
  }, []);

  const submit = (query) => {
    const text = (query ?? q).trim();
    if (!text) return;
    localStorage.setItem("apex_level", level);
    navigate(`/result?q=${encodeURIComponent(text)}&level=${level}`);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-24 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center py-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">Evidence-based biology engine</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl font-light leading-[1.05] tracking-tighter sm:text-5xl lg:text-6xl"
        >
          What do you want to understand
          <br className="hidden sm:block" /> about <span className="text-cyan-400 text-glow">your body?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="mt-5 max-w-xl text-sm text-white/45 sm:text-base"
        >
          Ask about a nutrient, vitamin, mineral, hormone, symptom, supplement, food,
          exercise, biological process, or health concept.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mt-9 w-full"
        >
          <div
            className="relative rounded-2xl p-[1px] transition-colors"
            style={{ background: focused ? "linear-gradient(120deg, rgba(0,240,255,0.7), rgba(0,230,118,0.4), rgba(0,240,255,0.1))" : "rgba(255,255,255,0.12)" }}
          >
            <div className="flex items-center gap-3 rounded-2xl bg-[#0A0A0A] px-4 py-3 sm:px-5 sm:py-4">
              <Search className="h-5 w-5 shrink-0 text-white/40" />
              <input
                data-testid="home-search-input"
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                placeholder="Teach me everything about Magnesium…"
                className="w-full bg-transparent text-base text-white placeholder:text-white/30 focus:outline-none sm:text-lg"
              />
              <button
                data-testid="home-analyze-btn"
                onClick={() => submit()}
                className="group flex shrink-0 items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03] active:scale-95"
              >
                Analyze
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Level toggle */}
          <div className="mt-4 flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/[0.02] p-1 text-xs w-fit mx-auto">
            {LEVELS.map((l) => (
              <button
                key={l}
                data-testid={`home-level-${l}`}
                onClick={() => setLevel(l)}
                className={`relative rounded-full px-3.5 py-1.5 capitalize transition-colors ${
                  level === l ? "text-black" : "text-white/50 hover:text-white"
                }`}
              >
                {level === l && <motion.span layoutId="home-level" className="absolute inset-0 rounded-full bg-cyan-400" />}
                <span className="relative">{l}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              data-testid={`example-chip-${ex.slice(0, 12).replace(/\W/g, "")}`}
              onClick={() => { setQ(ex); submit(ex); }}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/60 transition-colors hover:border-cyan-400/40 hover:text-white"
            >
              {ex}
            </button>
          ))}
        </motion.div>

        {trending.length > 0 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-white/40">
            <TrendingUp className="h-3.5 w-3.5 text-cyan-400" /> Trending:
            {trending.map((t) => (
              <button key={t.name} onClick={() => submit(t.name)} className="text-cyan-400/80 hover:text-cyan-400">
                {t.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
