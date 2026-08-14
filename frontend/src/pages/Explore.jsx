import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { getExplore } from "../lib/api";

export default function Explore() {
  const navigate = useNavigate();
  const [cats, setCats] = useState([]);

  useEffect(() => { getExplore().then((d) => setCats(d.categories || [])).catch(() => {}); }, []);

  const open = (name) => navigate(`/result?q=${encodeURIComponent(name)}&level=${localStorage.getItem("apex_level") || "intermediate"}`);

  return (
    <div>
      <div className="mb-8">
        <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-400">Knowledge library</div>
        <h1 className="mt-2 font-display text-4xl font-light tracking-tight sm:text-5xl">Explore</h1>
        <p className="mt-3 max-w-2xl text-white/50">Browse curated topics across nutrition, physiology, hormones and training. Tap any card to generate its full evidence-based profile.</p>
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
