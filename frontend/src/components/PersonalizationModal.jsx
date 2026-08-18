import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { saveProfile, getDeviceId } from "../lib/api";

const GOALS = [
  "Improve energy",
  "Improve sleep",
  "Build muscle",
  "Lose fat",
  "Feel better",
  "Improve performance",
  "Learn about health",
  "General health"
];

const LEVELS = [
  { id: "beginner", label: "Just starting", desc: "Keep it simple and practical" },
  { id: "intermediate", label: "I know the basics", desc: "Balanced science and real-life steps" },
  { id: "advanced", label: "I'm advanced", desc: "Detailed mechanisms and clinical trials" }
];

const DIETS = [
  "Everything",
  "Vegetarian",
  "Vegan",
  "Other"
];

export default function PersonalizationModal({ isOpen, onClose, onCompleted }) {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("intermediate");
  const [diet, setDiet] = useState("");

  if (!isOpen) return null;

  const handleFinish = async () => {
    const profile = {
      device_id: getDeviceId(),
      goal,
      diet,
      level
    };
    try {
      localStorage.setItem("apex_profile", JSON.stringify(profile));
      localStorage.setItem("apex_level", level);
      await saveProfile(profile);
      toast.success("Profile saved! Your answers are now tailored for you.");
      if (onCompleted) onCompleted(profile);
    } catch {
      toast.success("Saved locally!");
      if (onCompleted) onCompleted(profile);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/15 bg-[#0D0D0D] p-6 sm:p-8 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="h-4 w-4" />
          <span>Personalize Your Experience • Step {step} of 3</span>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-light text-white">
                What's your main goal right now?
              </h2>
              <p className="text-xs text-white/50 mt-1">
                KEVALBIO will prioritize actionable advice around your focus.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`rounded-xl p-3 text-left text-xs sm:text-sm font-medium border transition-all ${
                    goal === g
                      ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={onClose}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                Skip for now
              </button>
              <button
                disabled={!goal}
                onClick={() => setStep(2)}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Knowledge Level */}
        {step === 2 && (
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-light text-white">
                How much biology do you want?
              </h2>
              <p className="text-xs text-white/50 mt-1">
                You can adjust depth on any topic at any time.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              {LEVELS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLevel(l.id)}
                  className={`w-full rounded-xl p-3.5 text-left border transition-all ${
                    level === l.id
                      ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <div className="font-medium text-sm text-white">{l.label}</div>
                  <div className="text-xs text-white/50 mt-0.5">{l.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-400 px-5 py-2.5 text-xs font-semibold text-black transition-all hover:scale-105 active:scale-95"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Diet */}
        {step === 3 && (
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-light text-white">
                How do you typically eat?
              </h2>
              <p className="text-xs text-white/50 mt-1">
                Helps us recommend whole-food sources that fit your lifestyle.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {DIETS.map((d) => (
                <button
                  key={d}
                  onClick={() => setDiet(d)}
                  className={`rounded-xl p-3.5 text-left text-sm font-medium border transition-all ${
                    diet === d
                      ? "border-cyan-400 bg-cyan-400/10 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                      : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-white/40 hover:text-white transition-colors"
              >
                Back
              </button>
              <button
                disabled={!diet}
                onClick={handleFinish}
                className="flex items-center gap-1.5 rounded-xl bg-cyan-400 px-6 py-2.5 text-xs font-semibold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
              >
                Save & Personalize <Check className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
