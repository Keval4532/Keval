import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, Sparkles, BookOpen, Stethoscope,
  Utensils, Pill, Flame, Heart, Zap, Coffee,
  FileText, Sun, Droplets, ArrowUpRight, Layers,
  Plus, Activity, Filter, CheckCircle2, ChevronRight
} from "lucide-react";
import { getTrending, getLocalProfile } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import OneMinuteBiology from "../components/OneMinuteBiology";
import PersonalizationModal from "../components/PersonalizationModal";
import MicroExperimentTracker from "../components/MicroExperimentTracker";
import PublicHeroSection from "../components/landing/PublicHeroSection";
import InteractiveFeatureShowcase from "../components/landing/InteractiveFeatureShowcase";
import PublicPricingSection from "../components/monetization/PublicPricingSection";

// ----------------------------- DATA MATRICES -----------------------------

const LEARN_CATEGORIES = [
  {
    id: "vitamins_minerals",
    name: "Vitamins & Minerals",
    color: "border-cyan-400/40 text-cyan-300 bg-cyan-400/10",
    topics: [
      "Vitamin D3", "Magnesium Glycinate", "Zinc Picolinate", "B12 (Methylcobalamin)",
      "Iron & Ferritin", "Potassium", "Boron", "Calcium", "Iodine", "Selenium"
    ]
  },
  {
    id: "supplements_ergogenics",
    name: "Supplements & Ergogenics",
    color: "border-emerald-500/40 text-emerald-300 bg-emerald-500/10",
    topics: [
      "Creatine Monohydrate", "Ashwagandha KSM-66", "Omega-3 (EPA/DHA)", "L-Theanine",
      "L-Citrulline", "Beta-Alanine", "Rhodiola Rosea", "CoQ10", "Alpha-GPC", "Glutamine"
    ]
  },
  {
    id: "hormones_neurotransmitters",
    name: "Hormones & Neurotransmitters",
    color: "border-fuchsia-500/40 text-fuchsia-300 bg-fuchsia-500/10",
    topics: [
      "Insulin & Glucose", "Cortisol", "Testosterone", "Growth Hormone",
      "Melatonin", "Dopamine", "Serotonin", "Thyroid (TSH/fT3/fT4)", "Estrogen", "DHEA"
    ]
  },
  {
    id: "physiological_processes",
    name: "Physiological Processes",
    color: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10",
    topics: [
      "Muscle Hypertrophy", "Autophagy Induction", "Mitochondrial Biogenesis", "Ketosis",
      "Insulin Resistance", "Glycogen Depletion", "Neuroplasticity", "Gut Microbiome"
    ]
  },
  {
    id: "longevity_recovery",
    name: "Longevity & Recovery",
    color: "border-amber-500/40 text-amber-300 bg-amber-500/10",
    topics: [
      "Circadian Entrainment", "Heart Rate Variability (HRV)", "Zone 2 Cardio",
      "Cold Thermogenesis", "Heat Shock Proteins", "Deep Sleep Architecture"
    ]
  }
];

const SOLVE_CATEGORIES = [
  {
    id: "energy_focus",
    name: "Energy & Focus",
    color: "border-amber-500/40 text-amber-300 bg-amber-500/10",
    symptoms: [
      "Afternoon energy slump around 3 PM",
      "Brain fog after carb-heavy meals",
      "Low motivation and training drive",
      "Waking up unrefreshed despite 8h sleep",
      "Jittery caffeine crash"
    ]
  },
  {
    id: "sleep_recovery",
    name: "Sleep & Recovery",
    color: "border-indigo-500/40 text-indigo-300 bg-indigo-500/10",
    symptoms: [
      "Trouble falling asleep (high sleep latency)",
      "Waking up at 3 AM unable to sleep",
      "Restless legs at night",
      "Delayed muscle soreness lasting > 4 days",
      "Poor overnight HRV recovery score"
    ]
  },
  {
    id: "physical_performance",
    name: "Physical & Performance",
    color: "border-cyan-400/40 text-cyan-300 bg-cyan-400/10",
    symptoms: [
      "Calf / foot cramps during heavy training",
      "Sudden strength drop mid-workout",
      "Joint stiffness post-exercise",
      "Persistent bloat after protein shakes",
      "High perceived exertion during warmups"
    ]
  },
  {
    id: "metabolism_body_comp",
    name: "Metabolism & Body Comp",
    color: "border-rose-500/40 text-rose-300 bg-rose-500/10",
    symptoms: [
      "Fat loss plateau despite caloric deficit",
      "Intense sugar cravings in the evening",
      "Cold hands and feet during fasting",
      "Post-meal reactive hypoglycemia",
      "Digestive heaviness and bloating"
    ]
  }
];

const HOME_TOOLS = [
  {
    title: "Lab Report Translator",
    subtitle: "Translate blood tests & get doctor questions",
    path: "/tools/lab-scanner",
    icon: FileText,
    badge: "OCR & Manual",
    color: "from-emerald-500/20 border-emerald-400/40 text-emerald-400"
  },
  {
    title: "Circadian Light & Cortisol",
    subtitle: "Morning lux windows & focus peaks",
    path: "/tools/circadian",
    icon: Sun,
    badge: "Photobiology",
    color: "from-amber-500/20 border-amber-400/40 text-amber-400"
  },
  {
    title: "Fasting & Metabolic Shift",
    subtitle: "AMPK vs mTOR & Fast-Breaker dictionary",
    path: "/tools/fasting",
    icon: Flame,
    badge: "Live Stage",
    color: "from-purple-500/20 border-purple-400/40 text-purple-400"
  },
  {
    title: "Sweat & Hydration Calc",
    subtitle: "Precision fluid & DIY electrolyte recipe",
    path: "/tools/hydration",
    icon: Droplets,
    badge: "Electrolytes",
    color: "from-cyan-500/20 border-cyan-400/40 text-cyan-400"
  },
  {
    title: "Supplement Value Auditor",
    subtitle: "Unmask underdosed proprietary blends",
    path: "/tools/supplement-auditor",
    icon: Pill,
    badge: "Transparency",
    color: "from-pink-500/20 border-pink-400/40 text-pink-400"
  },
  {
    title: "Caffeine Sleep Cutoff",
    subtitle: "Pharmacokinetic curve & adenosine blockade",
    path: "/caffeine",
    icon: Coffee,
    badge: "Half-Life",
    color: "from-yellow-500/20 border-yellow-400/40 text-yellow-400"
  },
  {
    title: "One-Line Meal Scanner",
    subtitle: "Free-text macro & micronutrient gaps",
    path: "/diet",
    icon: Utensils,
    badge: "Nutrition",
    color: "from-emerald-500/20 border-emerald-400/40 text-emerald-400"
  },
  {
    title: "Stack Waste Detector",
    subtitle: "Redundancy index & optimal timing",
    path: "/stack",
    icon: Layers,
    badge: "Savings",
    color: "from-blue-500/20 border-blue-400/40 text-blue-400"
  }
];

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [mode, setMode] = useState("learn"); // "learn" | "solve"
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const [personalizeOpen, setPersonalizeOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => {
    setProfile(getLocalProfile());
  }, []);

  // When unauthenticated, render the high-converting Public Preview Landing Experience
  if (!isAuthenticated) {
    return (
      <div className="relative space-y-16 pb-20">
        {/* 1. Public Hero Section with "Try 1 Free Search" Sandbox */}
        <PublicHeroSection />

        {/* 2. Interactive Feature Showcase Live Micro-Demos */}
        <InteractiveFeatureShowcase />

        {/* 3. Public Pricing Matrix & Plan Comparison */}
        <PublicPricingSection showComparison={true} />

        {/* 4. One-Minute Biology & Micro-Learning */}
        <div className="mx-auto max-w-4xl px-4">
          <OneMinuteBiology />
        </div>
      </div>
    );
  }

  const handleSearch = (customQuery) => {
    const text = (customQuery ?? q).trim();
    if (!text) return;

    const lower = text.toLowerCase();

    // Specific Tool Navigation only when explicitly requested
    if (lower === "lab scanner" || lower === "scan lab" || lower === "blood test scanner") {
      navigate(`/tools/lab-scanner`);
      return;
    }
    if (lower === "circadian calculator" || lower === "circadian tool") {
      navigate(`/tools/circadian`);
      return;
    }
    if (lower === "fasting calculator" || lower === "fasting tracker") {
      navigate(`/tools/fasting`);
      return;
    }
    if (lower === "hydration calculator" || lower === "sweat calculator") {
      navigate(`/tools/hydration`);
      return;
    }
    if (lower === "supplement auditor" || lower === "label auditor") {
      navigate(`/tools/supplement-auditor`);
      return;
    }
    if (lower === "caffeine calculator" || lower === "caffeine cutoff") {
      navigate(`/caffeine`);
      return;
    }
    if (lower === "meal scanner" || lower === "diet analyzer") {
      navigate(`/diet`);
      return;
    }
    if (lower === "stack auditor" || lower === "stack waste detector") {
      navigate(`/stack`);
      return;
    }

    // Routing by Mode or Problem Content
    if (mode === "solve" || lower.startsWith("why am i") || lower.includes("fatigue") || lower.includes("brain fog") || lower.includes("afternoon slump") || lower.includes("trouble falling asleep")) {
      navigate(`/problem?q=${encodeURIComponent(text)}`);
    } else {
      navigate(`/result?q=${encodeURIComponent(text)}`);
    }
  };

  const handleChipClick = (itemText) => {
    setQ(itemText);
    handleSearch(itemText);
  };

  const handleAddCustom = (prefix) => {
    setQ(prefix);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Real-time suggestions based on current input text
  const allLearnTopics = LEARN_CATEGORIES.flatMap((c) => c.topics);
  const allSolveSymptoms = SOLVE_CATEGORIES.flatMap((c) => c.symptoms);
  const filteredSuggestions = q.trim().length > 1
    ? (mode === "learn" ? allLearnTopics : allSolveSymptoms).filter((item) =>
        item.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 4)
    : [];

  return (
    <div className="relative pb-24 space-y-12">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />

      {/* HERO SECTION */}
      <div className="mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center pt-6 sm:pt-10 text-center">
        
        {/* Brand Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3.5 py-1.5"
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300 font-mono">
            Understand your biology. Make better decisions.
          </span>
        </motion.div>

        {/* Central Dynamic Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl font-light leading-tight tracking-tight sm:text-5xl lg:text-6xl text-white max-w-3xl"
        >
          {mode === "learn" ? (
            <>
              What do you want <span className="text-cyan-400 font-normal">to understand?</span>
            </>
          ) : (
            <>
              What are you <span className="text-emerald-400 font-normal">experiencing?</span>
            </>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-3 max-w-xl text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-light"
        >
          {mode === "learn"
            ? "Ask about any nutrient, hormone, supplement, food, organ, biomarker, or biological pathway."
            : "Describe any symptom, energy gap, workout cramp, sleep disruption, or compound scenario."}
        </motion.p>

        {/* Dual-Path Mode Pill Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-6 inline-flex items-center rounded-2xl border border-[#1E2E42] bg-[#0E141D] p-1.5 shadow-xl"
        >
          <button
            onClick={() => {
              setMode("learn");
              setActiveCategory("all");
            }}
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-xs font-semibold transition-all ${
              mode === "learn"
                ? "bg-cyan-400 text-black shadow font-bold"
                : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Path 1 • Teach me about a topic</span>
          </button>

          <button
            onClick={() => {
              setMode("solve");
              setActiveCategory("all");
            }}
            className={`flex items-center gap-2 rounded-xl px-4 sm:px-5 py-2 text-xs font-semibold transition-all ${
              mode === "solve"
                ? "bg-emerald-400 text-black shadow font-bold"
                : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
            }`}
          >
            <Stethoscope className="h-4 w-4" />
            <span>Path 2 • I'm experiencing something</span>
          </button>
        </motion.div>

        {/* Search Input Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-6 w-full max-w-2xl px-2"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className={`group relative flex items-center rounded-3xl border transition-all duration-300 ${
              focused
                ? mode === "learn"
                  ? "border-cyan-400 bg-[#0E141D] search-glow"
                  : "border-emerald-400 bg-[#0E141D] shadow-[0_0_25px_-5px_rgba(16,185,129,0.35)]"
                : "border-[#1E2E42] bg-[#0E141D]/90 hover:border-white/30"
            }`}
          >
            <div className="pl-5 text-[#64748B]">
              <Search className="h-5 w-5" />
            </div>

            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 200)}
              placeholder={
                mode === "learn"
                  ? "Enter any nutrient, hormone, biomarker, or concept (e.g. 'How does mTOR trigger hypertrophy?', 'Inositol for sleep')..."
                  : "Describe what you are feeling in detail (e.g. 'Afternoon crash around 3 PM even after 8h sleep', 'Cramps during deadlifts')..."
              }
              className="w-full bg-transparent px-4 py-4 sm:py-5 text-sm sm:text-base text-white placeholder-[#64748B] outline-none font-light"
              autoFocus
            />

            <div className="pr-3">
              <button
                type="submit"
                className={`flex items-center gap-1.5 rounded-2xl px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95 shadow-md ${
                  mode === "learn" ? "bg-cyan-400" : "bg-emerald-400"
                }`}
              >
                <span>{mode === "learn" ? "Explain" : "Investigate"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Real-time Dynamic Suggestions Dropdown */}
          <AnimatePresence>
            {focused && filteredSuggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-2 rounded-2xl border border-[#1E2E42] bg-[#0E141D] p-2 text-left shadow-2xl space-y-1"
              >
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#64748B] font-mono">
                  Matching Suggestions:
                </div>
                {filteredSuggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleChipClick(sug)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-[#CBD5E1] hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>{sug}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-[#64748B]" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Personalized Prompt Banner */}
        {!profile && (
          <div className="mt-5">
            <button
              onClick={() => setPersonalizeOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#1E293B] bg-[#0E141D] px-4 py-1.5 text-xs text-[#94A3B8] hover:border-cyan-400/40 hover:text-white transition-colors"
            >
              <Heart className="h-3.5 w-3.5 text-cyan-400" />
              <span>Want personalized biological context? (30 sec)</span>
            </button>
          </div>
        )}
      </div>

      {/* DYNAMIC CATEGORIZED DISCOVERY MATRICES */}
      <div className="mx-auto max-w-5xl px-2 space-y-6">
        {mode === "learn" ? (
          /* PATH 1: COMPREHENSIVE TOPIC DISCOVERY GRID */
          <div className="rounded-3xl border border-[#1E2E42] bg-[#0E141D]/90 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  <BookOpen className="h-4 w-4" />
                  <span>Topic Discovery Matrix</span>
                </div>
                <h3 className="font-display text-xl font-light text-white mt-1">
                  Explore Curated Topics or Search Anything Custom
                </h3>
              </div>

              <button
                onClick={() => handleAddCustom("Teach me everything about: ")}
                className="flex items-center gap-1.5 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-400/20 transition-all font-mono"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Custom Topic</span>
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-[#1E293B]">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-cyan-400 text-black font-bold"
                    : "border border-[#1E293B] bg-black/40 text-[#94A3B8] hover:text-white"
                }`}
              >
                All Categories
              </button>
              {LEARN_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-cyan-400 text-black font-bold"
                      : "border border-[#1E293B] bg-black/40 text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Categorized Topic Clusters */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {LEARN_CATEGORIES.filter(
                (cat) => activeCategory === "all" || activeCategory === cat.id
              ).map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-2xl border border-[#1E293B] bg-black/40 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white block">{cat.name}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${cat.color}`}>
                      {cat.topics.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.topics.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleChipClick(t)}
                        className="rounded-xl border border-white/5 bg-[#0E141D] px-2.5 py-1 text-xs text-[#CBD5E1] hover:border-cyan-400/50 hover:text-white hover:bg-cyan-400/10 transition-all text-left"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* PATH 2: CATEGORIZED SYMPTOM & PROBLEM DISCOVERY MATRIX */
          <div className="rounded-3xl border border-[#1E2E42] bg-[#0E141D]/90 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  <Stethoscope className="h-4 w-4" />
                  <span>Symptom & Root-Cause Matrix</span>
                </div>
                <h3 className="font-display text-xl font-light text-white mt-1">
                  Common Clinical Scenarios & Multi-Factor Complaints
                </h3>
              </div>

              <button
                onClick={() => handleAddCustom("I am experiencing: ")}
                className="flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/20 transition-all font-mono"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Describe Custom Symptom</span>
              </button>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-[#1E293B]">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-emerald-400 text-black font-bold"
                    : "border border-[#1E293B] bg-black/40 text-[#94A3B8] hover:text-white"
                }`}
              >
                All Systems
              </button>
              {SOLVE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                    activeCategory === cat.id
                      ? "bg-emerald-400 text-black font-bold"
                      : "border border-[#1E293B] bg-black/40 text-[#94A3B8] hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Categorized Symptom Clusters */}
            <div className="grid gap-4 sm:grid-cols-2">
              {SOLVE_CATEGORIES.filter(
                (cat) => activeCategory === "all" || activeCategory === cat.id
              ).map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-2xl border border-[#1E293B] bg-black/40 p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-white">{cat.name}</span>
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${cat.color}`}>
                      {cat.symptoms.length} Scenarios
                    </span>
                  </div>

                  <div className="space-y-2">
                    {cat.symptoms.map((symptom) => (
                      <button
                        key={symptom}
                        onClick={() => handleChipClick(symptom)}
                        className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-[#0E141D] p-3 text-xs text-[#CBD5E1] hover:border-emerald-400/50 hover:text-white hover:bg-emerald-400/10 transition-all text-left group"
                      >
                        <span className="font-light">"{symptom}"</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#64748B] group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FEATURED: INTERACTIVE BIOLOGY TOOLS LAUNCHPAD */}
      <div className="mx-auto max-w-5xl px-2 space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span>Interactive Biology Tools Suite</span>
          </div>
          <button
            onClick={() => navigate("/explore")}
            className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium font-mono"
          >
            <span>View All Tools</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_TOOLS.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.title}
                onClick={() => navigate(t.path)}
                className={`rounded-3xl border bg-gradient-to-br ${t.color} to-transparent p-4 text-left flex flex-col justify-between space-y-2 hover:scale-[1.02] transition-all group`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black/50 border border-white/10">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-mono text-white/80">
                    {t.badge}
                  </span>
                </div>

                <div>
                  <div className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{t.title}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/30 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8] font-light mt-0.5 line-clamp-2 leading-relaxed">
                    {t.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DAILY RETENTION: "Your Biology Today" & "1 Minute of Biology" */}
      <div className="mx-auto max-w-5xl space-y-6 px-2 pt-2">
        {/* Active N-of-1 Micro-Experiment 1-Tap Daily Check-in Card */}
        <MicroExperimentTracker compact={true} />

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Your Biology Today Card */}
          <div className="rounded-3xl border border-[#1E2E42] bg-[#0E141D] p-6 sm:p-7 text-left space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-300">
              <Flame className="h-4 w-4 text-orange-400" />
              <span>Your Biology Today</span>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div
                onClick={() => navigate(`/result?q=Protein`)}
                className="cursor-pointer rounded-2xl border border-white/5 bg-black/40 p-3.5 hover:border-cyan-400/30 transition-all"
              >
                <span className="text-cyan-400 font-semibold uppercase text-[10px] tracking-wider block font-mono">Learn</span>
                <span className="text-white text-sm font-medium mt-0.5 block">Why protein triggers muscle protein synthesis</span>
                <span className="text-[#94A3B8] text-[11px] mt-0.5 block">How leucine pulses activate the mTORC1 pathway.</span>
              </div>

              <div
                onClick={() => navigate(`/problem?q=Why am I tired?`)}
                className="cursor-pointer rounded-2xl border border-white/5 bg-black/40 p-3.5 hover:border-emerald-400/30 transition-all"
              >
                <span className="text-emerald-400 font-semibold uppercase text-[10px] tracking-wider block font-mono">Investigate</span>
                <span className="text-white text-sm font-medium mt-0.5 block">Afternoon Fatigue vs. Sleep Debt</span>
                <span className="text-[#94A3B8] text-[11px] mt-0.5 block">Investigate adenosine accumulation and circadian dips.</span>
              </div>

              <div
                onClick={() => navigate(`/result?q=Magnesium`)}
                className="cursor-pointer rounded-2xl border border-white/5 bg-black/40 p-3.5 hover:border-cyan-400/30 transition-all"
              >
                <span className="text-cyan-400 font-semibold uppercase text-[10px] tracking-wider block font-mono">Explore</span>
                <span className="text-white text-sm font-medium mt-0.5 block">Magnesium & ATP Bioenergetics</span>
              </div>
            </div>
          </div>

          {/* 1 Minute of Biology */}
          <div className="flex flex-col justify-between">
            <OneMinuteBiology />
          </div>
        </div>
      </div>

      {/* Personalization Modal */}
      <PersonalizationModal
        isOpen={personalizeOpen}
        onClose={() => setPersonalizeOpen(false)}
        onCompleted={(p) => setProfile(p)}
      />
    </div>
  );
}
