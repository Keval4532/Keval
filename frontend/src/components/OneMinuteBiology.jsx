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
    <div className="w-full rounded-2xl border border-cyan-400/30 bg-cyan-400/[0.03] p-5 sm:p-6 text-left transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-400">
            <Clock className="h-3.5 w-3.5" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300">
            1 Minute of Biology
          </span>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/60">
          Daily Bite • 60 Seconds
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-normal text-white sm:text-xl">
        {lesson.title}
      </h3>
      <p className="mt-1.5 text-xs text-white/70 leading-relaxed sm:text-sm font-light">
        {lesson.hook}
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-3 border-t border-white/10 pt-4"
          >
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {lesson.content}
            </p>

            <div className="rounded-xl border border-cyan-400/20 bg-black/40 p-3 text-xs text-cyan-200">
              <strong className="text-cyan-400 font-semibold block text-[10px] uppercase tracking-wider mb-1">
                The One Thing to Remember:
              </strong>
              {lesson.takeaway}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => navigate(`/result?q=${encodeURIComponent(lesson.deep_dive_query || lesson.title)}`)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Want the deeper explanation? <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors"
        >
          {expanded ? "Show Less" : "Learn in 60 seconds →"}
          {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>

        {!expanded && (
          <button
            onClick={() => navigate(`/result?q=${encodeURIComponent(lesson.deep_dive_query || lesson.title)}`)}
            className="text-[11px] text-white/40 hover:text-cyan-400 transition-colors"
          >
            Deep dive →
          </button>
        )}
      </div>
    </div>
  );
}
