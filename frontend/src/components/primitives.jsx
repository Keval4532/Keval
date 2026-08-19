import React from "react";
import { motion } from "framer-motion";

export const EVIDENCE = {
  strong: { label: "Strong", color: "#00E676", dot: "#00E676" },
  moderate: { label: "Moderate", color: "#00F0FF", dot: "#00F0FF" },
  emerging: { label: "Emerging", color: "#FFEA00", dot: "#FFEA00" },
  limited: { label: "Limited", color: "rgba(100,116,139,0.7)", dot: "rgba(100,116,139,0.7)" },
  insufficient: { label: "Insufficient", color: "rgba(100,116,139,0.7)", dot: "rgba(100,116,139,0.7)" },
};

export function EvidenceBadge({ level = "moderate", testId }) {
  const e = EVIDENCE[level] || EVIDENCE.moderate;
  return (
    <span
      data-testid={testId}
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-mono font-bold"
      style={{ borderColor: e.color, color: e.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e.dot }} />
      {e.label}
    </span>
  );
}

const SAFETY = {
  green: { label: "Generally low risk at normal intake", color: "#00E676" },
  yellow: { label: "Requires context / caution", color: "#FFEA00" },
  red: { label: "High-risk situations exist", color: "#FF3B30" },
};

export function SafetyIndicator({ level = "green", testId }) {
  const s = SAFETY[level] || SAFETY.green;
  return (
    <div
      data-testid={testId}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 bg-slate-50 dark:bg-white/[0.02]"
      style={{ borderColor: s.color }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping-slow" style={{ backgroundColor: s.color }} />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
      </span>
      <span className="text-xs font-semibold" style={{ color: s.color }}>{s.label}</span>
    </div>
  );
}

export function ScoreGauge({ score = 0, size = 128 }) {
  const clamped = Math.max(0, Math.min(100, score || 0));
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const color = clamped >= 70 ? "#06B6D4" : clamped >= 40 ? "#F59E0B" : "#EF4444";
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }} data-testid="science-score-gauge">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-slate-200 dark:stroke-white/10" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * clamped) / 100 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-3xl font-extrabold tabular-nums text-slate-900 dark:text-white" style={{ color }}>{clamped}</span>
        <span className="text-[9px] uppercase tracking-[0.2em] font-mono font-bold text-slate-500 dark:text-white/40">Science</span>
      </div>
    </div>
  );
}

export function Panel({ children, className = "", testId }) {
  return (
    <div data-testid={testId} className={`rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0E141D] text-slate-900 dark:text-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function SectionLabel({ children }) {
  return <div className="text-[10px] uppercase tracking-[0.25em] font-bold font-mono text-cyan-700 dark:text-cyan-400 mb-3">{children}</div>;
}
