import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, ChevronDown, ChevronUp, ArrowRight, BookOpen } from "lucide-react";
import { getDailyLesson } from "../lib/api";

export default function OneMinuteBiology() {
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    getDailyLesson().then(setLesson).catch(() => {});
  }, []);

  if (!lesson) return null;

  return (
    <div className="w-full rounded-3xl border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50/50 dark:bg-cyan-400/[0.03] p-5 sm:p-6 text-left transition-all shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-700 dark:text-cyan-400">
            <Clock className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-800 dark:text-cyan-300 font-mono">
            1 Minute of Biology
          </span>
        </div>
        <span className="rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/10 px-2.5 py-0.5 text-[10px] font-bold text-slate-600 dark:text-white/60 font-mono">
          Daily Bite • 60 Seconds
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold text-slate-900 dark:text-white sm:text-xl tracking-tight">
        {lesson.title}
      </h3>
      <p className="mt-1.5 text-xs text-slate-600 dark:text-white/70 leading-relaxed sm:text-sm font-normal">
        {lesson.hook}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3 border-t border-slate-200 dark:border-white/10 pt-4"
          >
            <p className="text-xs sm:text-sm text-slate-800 dark:text-white/85 leading-relaxed">
              {lesson.content}
            </p>

            <div className="rounded-2xl border border-cyan-500/20 dark:border-cyan-400/20 bg-white dark:bg-black/40 p-3.5 text-xs text-cyan-900 dark:text-cyan-200 shadow-sm">
              <strong className="text-cyan-700 dark:text-cyan-400 font-bold block text-[10px] uppercase tracking-wider mb-1 font-mono">
                The One Thing to Remember:
              </strong>
              {lesson.takeaway}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => navigate(`/result?q=${encodeURIComponent(lesson.related_topic || lesson.title)}`)}
                className="flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:underline"
              >
                <span>Deep dive into this topic</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 flex items-center gap-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-400 hover:text-cyan-900 dark:hover:text-cyan-300 transition-colors"
      >
        <span>{expanded ? "Show less" : "Read 60-second explanation"}</span>
        {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
    </div>
  );
}
