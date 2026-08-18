import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Utensils, PieChart, Sparkles, CheckCircle2, AlertCircle, ArrowRight,
  Loader2, RefreshCw, Zap, BookOpen, Share2
} from "lucide-react";
import { toast } from "sonner";
import { Panel, SectionLabel } from "../components/primitives";
import { analyzeDiet, getLocalProfile } from "../lib/api";
import OneLineMealScanner from "../components/OneLineMealScanner";
import ShareCardModal from "../components/ShareCardModal";
import FeedbackWidget from "../components/FeedbackWidget";

const PRESETS = [
  {
    name: "Indian Vegetarian",
    meals: {
      breakfast: "2 moong dal chilas + 1 cup curd",
      lunch: "1 cup rajma + 2 bajra rotis + cucumber salad",
      dinner: "1 cup palak paneer + 2 whole wheat rotis + dal",
      snack: "Handful of roasted pumpkin seeds + 1 banana"
    }
  },
  {
    name: "High-Protein Active",
    meals: {
      breakfast: "3 eggs + 2 slices toast + black coffee",
      lunch: "150g grilled chicken + 1 cup rice + steamed broccoli",
      dinner: "1 fillet salmon + roasted potatoes + salad",
      snack: "1 scoop whey protein + 1 apple + almonds"
    }
  },
  {
    name: "Plant-Based / Vegan",
    meals: {
      breakfast: "Oats with chia seeds, soy milk, and berries",
      lunch: "Tofu grain bowl with quinoa, spinach, and tahini",
      dinner: "Lentil soup with whole grain bread and roasted vegetables",
      snack: "Hummus with carrots and pumpkin seeds"
    }
  }
];

export default function DietAnalyzer() {
  const [activeMode, setActiveMode] = useState("oneline"); // "oneline" | "structured"
  const [meals, setMeals] = useState({
    breakfast: "3 eggs + toast",
    lunch: "Dal + rice + vegetables",
    dinner: "Chicken + roti + salad",
    snack: "Fruit + yogurt"
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await analyzeDiet(meals, getLocalProfile());
      setResult(res);
      toast.success("Diet analysis complete!");
    } catch {
      toast.error("Could not analyze food log.");
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (preset) => {
    setMeals(preset.meals);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 text-xs text-cyan-300">
            <Utensils className="h-3.5 w-3.5" />
            <span>KevalBio Nutrition & Micronutrient Gap Engine</span>
          </div>

          <button
            onClick={() => setShareOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </button>
        </div>

        <h1 className="mt-3 font-display text-3xl font-light tracking-tight sm:text-4xl">
          Diet & <span className="text-cyan-400">Nutrient Gap Dashboard</span>
        </h1>
        <p className="mt-2 text-sm text-white/50 max-w-2xl font-light">
          Scan your meals to estimate macronutrients, fiber, and essential micronutrients. Spot biological blind spots before taking supplements.
        </p>

        {/* Mode Selector Tabs */}
        <div className="mt-6 flex items-center gap-2">
          <button
            onClick={() => setActiveMode("oneline")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeMode === "oneline"
                ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                : "border border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
            }`}
          >
            <Zap className="h-3.5 w-3.5" />
            <span>One-Line Quick Scanner</span>
          </button>

          <button
            onClick={() => setActiveMode("structured")}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              activeMode === "structured"
                ? "bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                : "border border-white/10 bg-white/[0.02] text-white/60 hover:text-white"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>Full Daily Meal Log</span>
          </button>
        </div>
      </div>

      {/* MODE 1: One-Line Zero-Friction Scanner */}
      {activeMode === "oneline" && (
        <OneLineMealScanner />
      )}

      {/* MODE 2: Structured Full Day Log */}
      {activeMode === "structured" && (
        <div className="space-y-6">
          {/* Preset Quick Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-white/40 uppercase tracking-wider text-[10px]">Load Preset:</span>
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => applyPreset(p)}
                className="rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1.5 text-xs text-white/70 hover:border-cyan-400/40 hover:text-white transition-colors"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Inputs Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {["breakfast", "lunch", "dinner", "snack"].map((m) => (
              <Panel key={m} className="p-4 space-y-2">
                <div className="flex items-center justify-between text-xs text-white/60 capitalize font-medium">
                  <span>{m}</span>
                </div>
                <textarea
                  rows={2}
                  value={meals[m] || ""}
                  onChange={(e) => setMeals({ ...meals, [m]: e.target.value })}
                  placeholder={`e.g. 2 eggs, oatmeal, berries...`}
                  className="w-full rounded-xl border border-white/10 bg-black/50 p-3 text-sm text-white placeholder:text-white/25 focus:border-cyan-400 focus:outline-none"
                />
              </Panel>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-semibold text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PieChart className="h-4 w-4" />}
              Analyze My Day of Eating
            </button>
          </div>

          {/* Results Dashboard */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-4 border-t border-white/10"
            >
              {/* Macro Summary Row */}
              <Panel className="p-6">
                <SectionLabel>Macronutrient Breakdown</SectionLabel>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-white/40 uppercase tracking-wider block">Calories</span>
                    <span className="text-xl font-display font-light text-white mt-1 block">{result.summary?.calories} kcal</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-cyan-400 uppercase tracking-wider block">Protein</span>
                    <span className="text-xl font-display font-light text-cyan-300 mt-1 block">{result.summary?.protein}g</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-emerald-400 uppercase tracking-wider block">Carbs</span>
                    <span className="text-xl font-display font-light text-emerald-300 mt-1 block">{result.summary?.carbohydrates}g</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-yellow-400 uppercase tracking-wider block">Fat</span>
                    <span className="text-xl font-display font-light text-yellow-300 mt-1 block">{result.summary?.fat}g</span>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                    <span className="text-[10px] text-orange-400 uppercase tracking-wider block">Fiber</span>
                    <span className="text-xl font-display font-light text-orange-300 mt-1 block">{result.summary?.fiber}g</span>
                  </div>
                </div>
              </Panel>

              {/* Micronutrient Audit Dashboard */}
              <Panel className="p-6 sm:p-8 space-y-4">
                <SectionLabel>Micronutrient Coverage & Estimated Gaps</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {(result.dashboard || []).map((d, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-4 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">{d.nutrient}</span>
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                          style={{
                            backgroundColor: d.status_color === "green" ? "rgba(0,230,118,0.15)" : "rgba(255,234,0,0.15)",
                            color: d.status_color === "green" ? "#00E676" : "#FFEA00"
                          }}
                        >
                          {d.status}
                        </span>
                      </div>
                      <div className="text-white/60">Estimated: <span className="text-white font-mono">{d.estimated_amount}</span> / Target: {d.target}</div>
                      <p className="text-[11px] text-white/50 font-light">{d.notes}</p>
                    </div>
                  ))}
                </div>
              </Panel>
            </motion.div>
          )}
        </div>
      )}

      {/* Feedback Widget */}
      <FeedbackWidget query="Diet Gap Analyzer" />

      {/* Share Card Modal */}
      <ShareCardModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        topicTitle="Daily Diet & Micronutrient Scan"
        takeAway="Whole foods deliver vitamins and minerals in natural cellular matrices with zero risk of toxicity."
        bullets={[
          "Estimated protein and fiber distribution.",
          "Identified potential magnesium and omega-3 blind spots.",
          "Instant food-first hacks to close gaps."
        ]}
      />
    </div>
  );
}
