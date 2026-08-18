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
      <div className="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/[0.04] to-transparent p-5 sm:p-6 text-left space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            <FlaskConical className="h-4 w-4" />
            <span>Active N-of-1 Experiment • Day {activeExp.current_day} of 7</span>
          </div>
          <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] text-cyan-300 font-mono">
            {activeExp.checkins?.length || 0}/7 Days
          </span>
        </div>

        <h4 className="font-display text-base font-normal text-white">{activeExp.title}</h4>
        <p className="text-xs text-white/60 font-light">Protocol: {activeExp.protocol}</p>

        {!checkedToday ? (
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-white/80 font-medium">How did you feel today?</span>
            <div className="flex gap-1.5">
              <button
                disabled={checkinLoading}
                onClick={() => handleCheckin("better")}
                className="flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300 hover:bg-emerald-500/20 transition-colors"
              >
                <ThumbsUp className="h-3 w-3" /> Better
              </button>
              <button
                disabled={checkinLoading}
                onClick={() => handleCheckin("same")}
                className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-white/10 transition-colors"
              >
                <Minus className="h-3 w-3" /> Same
              </button>
              <button
                disabled={checkinLoading}
                onClick={() => handleCheckin("worse")}
                className="flex items-center gap-1 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20 transition-colors"
              >
                <ThumbsDown className="h-3 w-3" /> Worse
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 pt-2 border-t border-white/10 text-xs text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>Today's check-in complete! Check back tomorrow for Day {Math.min(7, activeExp.current_day + 1)}.</span>
          </div>
        )}
      </div>
    );
  }

  // FULL VIEW (Used in My KEVALBIO)
  return (
    <div className="space-y-6">
      {/* Active Experiment or Day 7 Report */}
      {activeExp ? (
        <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/[0.05] via-black to-transparent p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-widest">
              <FlaskConical className="h-4 w-4" />
              <span>{activeExp.status === "completed" ? "Completed N-of-1 Experiment Report" : "Active 7-Day N-of-1 Micro-Experiment"}</span>
            </div>

            <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs font-mono text-cyan-300 border border-cyan-400/30">
              {activeExp.status === "completed" ? "Day 7 Finished" : `Day ${activeExp.current_day} of 7`}
            </span>
          </div>

          <div>
            <h3 className="font-display text-xl sm:text-2xl font-light text-white">{activeExp.title}</h3>
            <p className="text-xs sm:text-sm text-white/70 font-light mt-1">
              <strong>Daily Protocol:</strong> {activeExp.protocol}
            </p>
          </div>

          {/* 7-Day Tracker Dots */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-white/50">
              <span>7-Day Progression</span>
              <span>{activeExp.checkins?.length || 0} / 7 Check-ins Logged</span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                const check = (activeExp.checkins || []).find(c => c.day === d);
                return (
                  <div
                    key={d}
                    className={`rounded-2xl p-2.5 sm:p-3 text-center border transition-all ${
                      check
                        ? check.rating === "better"
                          ? "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                          : check.rating === "same"
                          ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                          : "border-red-400 bg-red-400/10 text-red-300"
                        : d === activeExp.current_day
                        ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 animate-pulse"
                        : "border-white/10 bg-white/[0.02] text-white/30"
                    }`}
                  >
                    <span className="text-[10px] uppercase block">D{d}</span>
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
            <div className="rounded-2xl border border-white/10 bg-black/50 p-4 space-y-2">
              <span className="text-xs text-white/80 font-medium block">Log Today's Result (Day {activeExp.current_day}):</span>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={checkinLoading}
                  onClick={() => handleCheckin("better")}
                  className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-all"
                >
                  <ThumbsUp className="h-3.5 w-3.5" /> Felt Better Today
                </button>
                <button
                  disabled={checkinLoading}
                  onClick={() => handleCheckin("same")}
                  className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 hover:bg-white/10 transition-all"
                >
                  <Minus className="h-3.5 w-3.5" /> Felt About the Same
                </button>
                <button
                  disabled={checkinLoading}
                  onClick={() => handleCheckin("worse")}
                  className="flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-300 hover:bg-red-500/20 transition-all"
                >
                  <ThumbsDown className="h-3.5 w-3.5" /> Felt Worse / Sluggish
                </button>
              </div>
            </div>
          )}

          {/* Day 7 Insight Summary */}
          {activeExp.status === "completed" && (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Trophy className="h-4 w-4" />
                <span>Day 7 Physiological Takeaway</span>
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light">
                You completed 7 days of {activeExp.title}! Tracking consistent micro-interventions gives direct feedback on how your biology responds to targeted lifestyle inputs without guesswork.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Template Launcher Grid */
        <div className="space-y-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 text-left space-y-2">
            <h3 className="font-display text-xl font-normal text-white">Start an N-of-1 Micro-Experiment</h3>
            <p className="text-xs text-white/50 font-light">
              Choose a 7-day science-backed routine. Log 1-tap feedback each day to discover what works best for your body.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {templates.map((tmpl) => (
              <div
                key={tmpl.id}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-left space-y-3 flex flex-col justify-between hover:border-cyan-400/40 transition-all"
              >
                <div>
                  <span className="text-[10px] uppercase font-semibold text-cyan-400 tracking-wider block">
                    {tmpl.category} • 7 Days
                  </span>
                  <h4 className="font-display text-base font-medium text-white mt-1">{tmpl.title}</h4>
                  <p className="text-xs text-white/60 font-light mt-1.5 leading-relaxed">
                    <strong>Protocol:</strong> {tmpl.protocol}
                  </p>
                </div>

                <button
                  onClick={() => handleStart(tmpl)}
                  className="mt-2 flex items-center justify-between rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-semibold text-black hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)]"
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
