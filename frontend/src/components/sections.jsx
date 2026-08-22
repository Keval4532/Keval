import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EvidenceBadge } from "./primitives";

export function ExpandCard({ title, badge, children, defaultOpen = false, testId }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] overflow-hidden shadow-sm transition-colors hover:border-slate-300 dark:hover:border-white/20">
      <button
        data-testid={testId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-slate-100/50 dark:hover:bg-white/[0.03]"
      >
        <span className="flex items-center gap-3 text-sm font-bold text-slate-900 dark:text-white">
          {title}
          {badge && <EvidenceBadge level={badge} />}
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 dark:text-white/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }} className="overflow-hidden"
          >
            <div className="px-4 pb-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-white/75 font-normal border-t border-slate-100 dark:border-white/5 pt-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Bullets({ items = [], color = "#06B6D4" }) {
  if (!items) return null;
  const list = Array.isArray(items) ? items : [items];
  if (!list.length) return null;
  return (
    <ul className="space-y-2.5">
      {list.map((it, i) => {
        if (!it) return null;
        const text = typeof it === "object" ? (it.detail || it.text || it.title || JSON.stringify(it)) : String(it);
        return (
          <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-white/85 font-normal leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            <span>{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

export function Empty({ children = "Not applicable for this topic." }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 dark:border-white/10 p-6 text-center text-xs sm:text-sm text-slate-400 dark:text-white/35">{children}</div>;
}
