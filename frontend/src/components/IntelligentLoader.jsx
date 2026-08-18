import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, BookOpen, Check } from "lucide-react";

const STEPS = [
  "🔎 Checking current research...",
  "📚 Comparing scientific sources...",
  "🧠 Building your explanation...",
  "✓ Your KEVALBIO answer is ready."
];

export default function IntelligentLoader({ query }) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStepIdx(1), 1200);
    const timer2 = setTimeout(() => setStepIdx(2), 2600);
    const timer3 = setTimeout(() => setStepIdx(3), 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center text-center space-y-6 px-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <Loader2 className="h-14 w-14 animate-spin text-cyan-400 opacity-80" />
        <Sparkles className="absolute h-5 w-5 text-cyan-300 animate-pulse" />
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="font-display text-lg font-normal text-white">
          "{query}"
        </h3>

        <div className="h-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIdx}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs sm:text-sm font-medium text-cyan-300"
            >
              {STEPS[stepIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-[11px] text-white/40 pt-1">
          Evaluating evidence across PubMed, NIH, USDA, and clinical literature
        </p>
      </div>
    </div>
  );
}
