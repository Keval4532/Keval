import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FlaskConical, CheckCircle2, Sparkles, Flame, Clock, Trophy,
  ArrowRight, ThumbsUp, Minus, ThumbsDown, RefreshCw, Layers
} from "lucide-react";
import { toast } from "sonner";
import {
  getExperimentTemplates, getActiveExperiment, startExperiment,
  checkinExperiment, getDeviceId
} from "../lib/api";

export default function MicroExperimentTracker({ compact = false }) {
  const [templates, setTemplates] = useState([]);
  const [activeExp, setActiveExp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkinLoading, setCheckinLoading] = useState(false);

  const loadData = async () => {
    const devId = getDeviceId();
    try {
      const [tmpl, act] = await Promise.all([
        getExperimentTemplates(),
        getActiveExperiment(devId)
      ]);
      setTemplates(tmpl || []);
      setActiveExp(act?.status === "active" || act?.status === "completed" ? act : null);
    } catch {
      // fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStart = async (tmpl) => {
    const devId = getDeviceId();
    try {
      const started = await startExperiment({
        device_id: devId,
        template_id: tmpl.id,
        title: tmpl.title,
        protocol: tmpl.protocol,
        expected_outcome: tmpl.hypothesis
      });
      setActiveExp(started);
      toast.success(`Started 7-Day Experiment: "${tmpl.title}"`);
    } catch {
      toast.error("Could not start experiment.");
    }
  };

  const handleCheckin = async (rating) => {
    if (!activeExp) return;
    setCheckinLoading(true);
    const devId = getDeviceId();
    try {
      const res = await checkinExperiment({
        device_id: devId,
        experiment_id: activeExp.id,
        day: activeExp.current_day || 1,
        rating: rating
      });
      await loadData();
      toast.success(`Day ${activeExp.current_day} check-in recorded!`);
    } catch {
      toast.error("Could not record check-in.");
    } finally {
      setCheckinLoading(false);
    }
  };

  if (loading) return null;

  // COMPACT HOME PROMPT VIEW
  if (compact && activeExp && activeExp.status === "active") {
    const checkedToday = (activeExp.checkins || []).some(c => c.day === activeExp.current_day);

    return (
      <div className="rounded-3xl border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50/60 dark:bg-gradient-to-r dark:from-cyan-400/[0.04] dark:to-transparent p-5 sm:p-6 text-left space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider font-mono">
            <FlaskConical className="h-4 w-4" />
            <span>Active N-of-1 Experiment • Day {activeExp.current_day} of 7</span>
          </div>
          <span className="rounded-full border border-cyan-300 dark:border-cyan-400/20 bg-white/80 dark:bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-800 dark:text-cyan-300 font-mono font-bold">
            {activeExp.checkins?.length || 0}/7 Days
          </span>
        </div>

        <h4 className="font-display text-base font-bold text-slate-900 dark:text-white tracking-tight">{activeExp.title}</h4>
        <p className="text-xs text-slate-600 dark:text-white/60 font-normal">Protocol: {activeExp.protocol}</p>

        {!checkedToday ? (
          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-800 dark:text-white/80 font-bold">How did you feel today?</span>
            <div className="flex gap-1.5">
              <button
                disabled={checkinLoading}
                onClick={() => handleCheckin("better")}
                className="flex items-center gap-1 rounded-lg border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 text-xs text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 font-bold transition-all"
              >
                <ThumbsUp className="h-3 w-3" /> Better
              </button>
              <button
                disabled={checkinLoading}
                onClick={() => handleCheckin("same")}
                className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-3 py-1 text-xs text-slate-700 dark:text-white/70 hover:bg-slate-100 font-medium transition-all"
              >
                <Minus className="h-3 w-3" /> Same
              </button>
              <button
                disabled={checkinLoading}
                onClick={() => handleCheckin("worse")}
                className="flex items-center gap-1 rounded-lg border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-3 py-1 text-xs text-red-800 dark:text-red-300 hover:bg-red-100 font-bold transition-all"
              >
                <ThumbsDown className="h-3 w-3" /> Worse
              </button>
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-bold font-mono">
            <CheckCircle2 className="h-3.5 w-3.5" /> Day {activeExp.current_day} check-in recorded! Keep it up.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Active or Completed Overview */}
      {activeExp ? (
        <div className="rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-7 text-left space-y-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-[#1E293B] pb-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider font-mono">
                <FlaskConical className="h-4 w-4" />
                <span>N-of-1 Biology Experiment in Progress</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                {activeExp.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-cyan-300 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-800 dark:text-cyan-300 font-mono">
                Day {activeExp.current_day || 1} of 7
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-[#080B10] p-4 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-[#64748B] font-mono">Prescribed Daily Protocol:</span>
              <p className="text-slate-800 dark:text-white/90 font-medium leading-relaxed">{activeExp.protocol}</p>
            </div>

            {/* 7-Day Timeline Bar */}
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                const check = (activeExp.checkins || []).find(c => c.day === d);
                const isCurrent = activeExp.current_day === d;
                return (
                  <div
                    key={d}
                    className={`rounded-xl border p-2 text-center font-mono transition-all ${
                      check
                        ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 font-bold"
                        : isCurrent
                        ? "border-cyan-500 bg-cyan-50 dark:bg-cyan-400/20 text-cyan-800 dark:text-cyan-300 font-extrabold"
                        : "border-slate-200 dark:border-[#1E293B] bg-slate-100 dark:bg-black/30 text-slate-400 dark:text-[#64748B]"
                    }`}
                  >
                    <span className="text-[10px] uppercase block font-bold">D{d}</span>
                    <span className="text-xs font-bold mt-0.5 block">
                      {check ? (check.rating === "better" ? "👍" : check.rating === "same" ? "➖" : "👎") : "•"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 1-Tap Check-in Prompt */}
          {activeExp.status === "active" && (
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/50 p-4 space-y-2">
              <span className="text-xs text-slate-800 dark:text-white/80 font-bold block">Log Today's Result (Day {activeExp.current_day}):</span>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={checkinLoading}
                  onClick={() => handleCheckin("better")}
                  className="flex items-center gap-1.5 rounded-xl border border-emerald-300 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all"
                >
                  <ThumbsUp className="h-3.5 w-3.5" /> Felt Better Today
                </button>
                <button
                  disabled={checkinLoading}
                  onClick={() => handleCheckin("same")}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-white/70 hover:bg-slate-100 transition-all"
                >
                  <Minus className="h-3.5 w-3.5" /> Felt About the Same
                </button>
                <button
                  disabled={checkinLoading}
                  onClick={() => handleCheckin("worse")}
                  className="flex items-center gap-1.5 rounded-xl border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-2 text-xs font-bold text-red-800 dark:text-red-300 hover:bg-red-100 transition-all"
                >
                  <ThumbsDown className="h-3.5 w-3.5" /> Felt Worse / Sluggish
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Template Launcher Grid */
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-6 text-left space-y-2 shadow-sm">
            <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-white">Start an N-of-1 Micro-Experiment</h3>
            <p className="text-xs text-slate-600 dark:text-white/60 font-normal">
              Choose a 7-day science-backed routine. Log 1-tap feedback each day to discover what works best for your body.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {templates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] p-5 text-left space-y-3 flex flex-col justify-between hover:border-cyan-500/40 dark:hover:border-cyan-400/40 transition-all shadow-sm"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-400 tracking-wider block font-mono">
                    {tmpl.category} • 7 Days
                  </span>
                  <h4 className="font-display text-base font-bold text-slate-900 dark:text-white mt-1 tracking-tight">{tmpl.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-white/70 font-normal mt-1.5 leading-relaxed">
                    <strong className="text-slate-800 dark:text-white font-bold">Protocol:</strong> {tmpl.protocol}
                  </p>
                </div>

                <button
                  onClick={() => handleStart(tmpl)}
                  className="mt-2 flex items-center justify-between rounded-xl bg-cyan-500 dark:bg-cyan-400 px-4 py-2.5 text-xs font-extrabold text-white dark:text-black hover:bg-cyan-600 dark:hover:bg-cyan-300 hover:scale-[1.02] transition-all shadow-md font-mono"
                >
                  <span>Launch 7-Day Experiment</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
