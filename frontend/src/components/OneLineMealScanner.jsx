import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Utensils, Sparkles, CheckCircle2, AlertTriangle, ArrowRight,
  Loader2, Mic, MicOff, Flame, Heart, Info
} from "lucide-react";
import { toast } from "sonner";
import { scanMealText, getLocalProfile } from "../lib/api";

const PRESET_MEALS = [
  "2 eggs, dal rice, paneer, black coffee",
  "Oatmeal with berries, grilled chicken salad, greek yogurt",
  "Roti with moong dal, palak sabzi, roasted chana snack",
  "Tofu vegetable stir-fry, brown rice, almonds, green tea"
];

export default function OneLineMealScanner({ onCompleted }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const handleScan = async (overrideText) => {
    const meal = (overrideText ?? text).trim();
    if (!meal) return;
    setLoading(true);
    try {
      const res = await scanMealText(meal, getLocalProfile());
      setResult(res);
      toast.success("Meal scanned successfully!");
      if (onCompleted) onCompleted(res);
    } catch {
      toast.error("Could not scan meal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
        toast.info("Listening... Speak what you ate today.");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
        handleScan(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error("Voice recognition encountered an error.");
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
      toast.error("Could not initialize microphone.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.03] to-transparent p-6 sm:p-7 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
            <Utensils className="h-4 w-4" />
            <span>One-Line Zero-Friction Meal Scanner</span>
          </div>
          <span className="text-[11px] text-white/40">No gram-by-gram calorie counting required</span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleScan();
          }}
          className="relative flex items-center gap-2"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type what you ate today (e.g., 2 eggs, dal rice, paneer, black coffee)..."
            className="w-full rounded-2xl border border-white/15 bg-black/60 px-4 py-3.5 pr-24 text-sm text-white placeholder-white/30 outline-none focus:border-emerald-400 font-light"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`rounded-xl p-2 transition-colors ${
                isListening ? "bg-red-500 text-white animate-pulse" : "text-white/40 hover:bg-white/10 hover:text-white"
              }`}
              title="Speak your meal"
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-semibold text-black transition-all hover:scale-105 active:scale-95 disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
              <span>Scan</span>
            </button>
          </div>
        </form>

        {/* Quick Example Chips */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
          <span className="text-[10px] text-white/40 uppercase tracking-wider">Try:</span>
          {PRESET_MEALS.map((pm, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setText(pm);
                handleScan(pm);
              }}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1 text-[11px] text-white/70 hover:border-emerald-400/50 hover:text-white transition-colors truncate max-w-[220px]"
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* Output Results */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Quick Macro Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { label: "Calories", val: `~${result.estimated_macros?.calories} kcal`, color: "text-white" },
              { label: "Protein", val: `${result.estimated_macros?.protein}g`, color: "text-cyan-300" },
              { label: "Carbs", val: `${result.estimated_macros?.carbohydrates}g`, color: "text-emerald-300" },
              { label: "Fat", val: `${result.estimated_macros?.fat}g`, color: "text-yellow-300" },
              { label: "Fiber", val: `${result.estimated_macros?.fiber}g`, color: "text-orange-300" }
            ].map((m, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-3.5 text-center">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">{m.label}</span>
                <span className={`text-base font-bold font-mono mt-0.5 block ${m.color}`}>{m.val}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* 🟢 Bases Covered */}
            <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/[0.03] p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" />
                <span>Bases Covered Today</span>
              </div>

              <div className="space-y-2.5">
                {(result.bases_covered || []).map((bc, i) => (
                  <div key={i} className="rounded-2xl border border-emerald-500/20 bg-black/40 p-3.5 text-xs space-y-0.5">
                    <span className="font-semibold text-white text-sm block">{bc.name}</span>
                    <p className="text-white/70 font-light leading-relaxed">{bc.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟡 Likely Blind Spots */}
            <div className="rounded-3xl border border-yellow-400/30 bg-yellow-400/[0.03] p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-yellow-300 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="h-4 w-4" />
                <span>Likely Blind Spots</span>
              </div>

              <div className="space-y-2.5">
                {(result.likely_blind_spots || []).map((bs, i) => (
                  <div key={i} className="rounded-2xl border border-yellow-400/20 bg-black/40 p-3.5 text-xs space-y-1">
                    <span className="font-semibold text-yellow-200 text-sm block">{bs.nutrient}</span>
                    <p className="text-white/70 font-light leading-relaxed">{bs.why}</p>
                    <div className="text-[11px] text-cyan-300 font-medium">
                      <strong>Food Solution:</strong> {bs.food_solution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🥗 Instant Whole-Food Additions */}
          {result.instant_whole_food_additions && (
            <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/[0.03] p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Instant Whole-Food Additions (Close the Gap)</span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {result.instant_whole_food_additions.map((fa, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-1">
                    <span className="font-semibold text-white text-sm block">{fa.food}</span>
                    <div className="text-emerald-300 font-medium text-[11px]">{fa.benefit}</div>
                    <div className="text-white/50 text-[11px]">Timing: {fa.timing}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
