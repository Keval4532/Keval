import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bookmark, Sparkles, Flame, Trophy, Trash2, ArrowRight, BookOpen,
  HelpCircle, Pill, Target, Compass, Clock, CheckCircle2, FlaskConical, Crown, ShieldCheck, Zap
} from "lucide-react";
import { toast } from "sonner";
import { getSaved, getDeviceId, getLocalProfile, getSubscriptionStatus, createCheckoutSession } from "../lib/api";
import MicroExperimentTracker from "../components/MicroExperimentTracker";

const PROGRESSION_LEVELS = [
  { name: "Beginner", min: 0, max: 5 },
  { name: "Explorer", min: 5, max: 15 },
  { name: "Advanced", min: 15, max: 30 },
  { name: "Biology Expert", min: 30, max: 100 }
];

export default function MyKevalBio() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [subStatus, setSubStatus] = useState(null);
  const [activeTab, setActiveTab] = useState("saved"); // saved | experiments | goals | stack | learnings | membership

  useEffect(() => {
    const devId = getDeviceId();
    setProfile(getLocalProfile());
    getSubscriptionStatus(devId).then(setSubStatus).catch(() => {});
    getSaved(devId)
      .then(setSaved)
      .catch(() => setSaved([]))
      .finally(() => setLoading(false));
  }, []);

  const totalTopics = saved.length;
  let currentLevel = PROGRESSION_LEVELS[0];
  for (const lvl of PROGRESSION_LEVELS) {
    if (totalTopics >= lvl.min) currentLevel = lvl;
  }

  const handleDeleteSaved = async (e, subject) => {
    e.stopPropagation();
    try {
      const { deleteSaved } = await import("../lib/api");
      await deleteSaved(getDeviceId(), subject);
      setSaved((prev) => prev.filter((s) => s.subject !== subject));
      toast.success(`Removed "${subject}" from saved topics`);
    } catch {
      setSaved((prev) => prev.filter((s) => s.subject !== subject));
      toast.success(`Removed "${subject}"`);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      {/* Header Profile & Progression Banner */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-cyan-400/[0.02] to-transparent p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="h-4 w-4" />
              <span>Personal Knowledge Library</span>
            </div>
            <h1 className="mt-2 font-display text-2xl sm:text-3xl font-light text-white">
              My <span className="font-semibold text-cyan-400">KEVALBIO</span>
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Your personalized hub for saved biology topics, daily learnings, goals, and habits.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 text-cyan-300 font-mono text-xl font-bold">
                <Flame className="h-4 w-4 text-orange-400" />
                <span>{saved.length > 0 ? "3" : "1"}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/40 block mt-0.5">Day Streak</span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-300 font-mono text-xl font-bold">
                <Trophy className="h-4 w-4 text-yellow-400" />
                <span>{saved.length}</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-white/40 block mt-0.5">Saved Insights</span>
            </div>
          </div>
        </div>

        {/* Level Progression */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300 border border-cyan-400/30">
              Level: {currentLevel.name}
            </span>
            <span className="text-xs text-white/40">
              {totalTopics < 5 ? `${5 - totalTopics} more topics to Explorer` : "Steady biology progress"}
            </span>
          </div>

          <div className="flex-1 max-w-md space-y-1.5">
            <div className="flex justify-between text-[11px] text-white/50">
              <span>{totalTopics} Topics Explored & Saved</span>
              <span>Next: {totalTopics >= 30 ? "Master" : "Explorer"}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (totalTopics / 15) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-white/10 pb-3">
        {[
          { id: "saved", label: "Saved Topics", count: saved.length, icon: Bookmark },
          { id: "experiments", label: "N-of-1 Micro-Experiments", icon: FlaskConical },
          { id: "goals", label: "My Goals & Profile", icon: Target },
          { id: "stack", label: "My Supplements", icon: Pill },
          { id: "learnings", label: "Key Takeaways", icon: BookOpen },
          { id: "membership", label: "Pro Membership", icon: Crown }
        ].map((t) => {
          const Icon = t.icon;
          const isAct = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                isAct
                  ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                  : "border border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{t.label}</span>
              {t.count !== undefined && (
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isAct ? "bg-black/20 text-black" : "bg-white/10 text-white/60"}`}>
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: Saved Topics */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[0.02]" />
              ))}
            </div>
          ) : saved.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.01] p-10 text-center space-y-3">
              <Compass className="mx-auto h-8 w-8 text-white/30" />
              <h3 className="text-base font-normal text-white">Nothing saved here yet.</h3>
              <p className="text-xs text-white/50 max-w-sm mx-auto">
                Save any topic or symptom investigation while exploring KEVALBIO to build your personal library.
              </p>
              <button
                onClick={() => navigate("/explore")}
                className="mt-2 inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-black hover:scale-105 transition-all"
              >
                Explore Topics <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {saved.map((item) => (
                <div
                  key={item.subject || item.id}
                  onClick={() => navigate(`/result?q=${encodeURIComponent(item.subject)}`)}
                  className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs space-y-2 transition-all hover:border-cyan-400/40 hover:bg-white/[0.04]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/60">
                      {item.category || "Nutrient"}
                    </span>
                    <button
                      onClick={(e) => handleDeleteSaved(e, item.subject)}
                      className="rounded-full p-1 text-white/30 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <h3 className="font-display text-base font-medium text-white group-hover:text-cyan-300 transition-colors">
                    {item.subject}
                  </h3>
                  <p className="text-white/60 line-clamp-2 leading-relaxed font-light">
                    {item.one_liner || "Scientifically validated overview and actionable protocols."}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-cyan-400 font-medium">
                    <span>Review Guide</span>
                    <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: N-of-1 Micro-Experiments */}
      {activeTab === "experiments" && (
        <MicroExperimentTracker />
      )}

      {/* TAB 3: Goals & Profile */}
      {activeTab === "goals" && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-white">Your Personal Health Focus</h3>
            <p className="text-xs text-white/50 mt-1">
              KEVALBIO tailors action plans and nutritional priorities to these preferences.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
              <span className="text-white/40 uppercase text-[10px] tracking-wider block">Primary Goal</span>
              <span className="text-white font-medium text-sm block">{profile?.goal || "Improve energy & vitality"}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
              <span className="text-white/40 uppercase text-[10px] tracking-wider block">Dietary Pattern</span>
              <span className="text-white font-medium text-sm block">{profile?.diet || "Standard Whole Foods"}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
              <span className="text-white/40 uppercase text-[10px] tracking-wider block">Biology Depth Level</span>
              <span className="text-white font-medium text-sm block">{profile?.level || "Intermediate"}</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
              <span className="text-white/40 uppercase text-[10px] tracking-wider block">Activity Level</span>
              <span className="text-white font-medium text-sm block">{profile?.activity_level || "Active"}</span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigate("/profile")}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/[0.06] transition-colors"
            >
              Update Preferences →
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: Supplements */}
      {activeTab === "stack" && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-medium text-white">Your Supplement Stack</h3>
              <p className="text-xs text-white/50 mt-1">
                Evaluate mineral competition, timing synergy, and unnecessary duplicates.
              </p>
            </div>

            <button
              onClick={() => navigate("/stack")}
              className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-semibold text-black hover:scale-105 transition-all"
            >
              <Pill className="h-3.5 w-3.5" />
              Analyze My Stack
            </button>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.02] p-5 text-xs text-white/80 space-y-2">
            <strong className="text-cyan-300 font-semibold block text-[11px] uppercase">
              The KEVALBIO Supplement Rule:
            </strong>
            Food first. Supplements should only fill verified nutritional gaps or support high physiological demands—never replace real food.
          </div>
        </div>
      )}

      {/* TAB 4: Key Takeaways */}
      {activeTab === "learnings" && (
        <div className="space-y-3">
          {[
            { topic: "Magnesium", takeaway: "Magnesium is an essential cellular ATP cofactor, but adequate intake from food (seeds, spinach) is the true foundation—not megadosing." },
            { topic: "Iron & Energy", takeaway: "Pairing plant-based non-heme iron with Vitamin C boosts absorption 3-4x. Avoid chai/coffee near meals." },
            { topic: "Sleep & Recovery", takeaway: "7-9 hours of consistent sleep is your body's essential nightly biological maintenance window for ATP and cellular repair." },
            { topic: "Creatine", takeaway: "Supports both physical power and cognitive energy resilience under acute sleep restriction." }
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-xs space-y-1.5">
              <span className="text-cyan-400 font-semibold uppercase text-[10px] tracking-wider block">{item.topic}</span>
              <p className="text-white/85 text-sm font-light leading-relaxed">"{item.takeaway}"</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: Pro Membership */}
      {activeTab === "membership" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-cyan-400/40 bg-gradient-to-br from-cyan-400/15 via-white/[0.02] to-black/60 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-300 uppercase tracking-widest">
                  <Crown className="h-3.5 w-3.5" />
                  <span>{subStatus?.tier_name || "Free Starter"}</span>
                </span>
                <h2 className="font-display text-2xl font-semibold text-white mt-2">
                  {subStatus?.is_pro ? "KEVALBIO Pro Active" : "Free Starter Tier"}
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  {subStatus?.is_pro
                    ? "You have full unlimited access to all AI models, personalized liver kinetics, and clinical PubMed research."
                    : "You are currently on the Free Starter plan. Upgrade to unlock unlimited AI queries and hormone-adjusted caffeine clearance."}
                </p>
              </div>

              <div>
                {!subStatus?.is_pro ? (
                  <button
                    onClick={() => navigate("/pricing")}
                    className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:bg-cyan-300 transition-all"
                  >
                    <span>Upgrade to Pro ($8/mo)</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-xs text-emerald-300 font-semibold flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>Pro Membership Active</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features Breakdown */}
            <div className="grid gap-3 sm:grid-cols-2 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Unlimited AI Questions & Symptom Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Personalized Hormonal & CYP1A2 Liver Clearance</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Unlimited Supplement Redundancy & Waste Audits</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <ShieldCheck className="h-4 w-4 text-cyan-400" />
                <span>Unlimited Free-Text Meal Micronutrient Scans</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
