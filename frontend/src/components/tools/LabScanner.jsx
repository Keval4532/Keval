import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Upload, Camera, Sparkles, AlertTriangle, ShieldCheck,
  CheckCircle2, Info, ChevronDown, ChevronUp, Plus, Trash2, ArrowRight, HelpCircle, Activity
} from "lucide-react";
import { toast } from "sonner";
import { scanLabReport, getLabBiomarkers } from "../../lib/api";

const COMMON_BIOMARKERS = [
  { id: "vitamin_d", name: "Vitamin D [25(OH)D]", defaultVal: 28.5, unit: "ng/mL" },
  { id: "ferritin", name: "Ferritin", defaultVal: 32.0, unit: "ng/mL" },
  { id: "hemoglobin", name: "Hemoglobin", defaultVal: 13.8, unit: "g/dL" },
  { id: "fasting_glucose", name: "Fasting Glucose", defaultVal: 94.0, unit: "mg/dL" },
  { id: "hba1c", name: "HbA1c", defaultVal: 5.4, unit: "%" },
  { id: "tsh", name: "TSH", defaultVal: 2.8, unit: "uIU/mL" },
  { id: "total_testosterone", name: "Total Testosterone", defaultVal: 480.0, unit: "ng/dL" },
  { id: "alt_ast", name: "Liver ALT / AST", defaultVal: 38.0, unit: "U/L" },
  { id: "creatinine_egfr", name: "Creatinine & eGFR", defaultVal: 1.15, unit: "mg/dL" },
  { id: "lipid_panel", name: "Lipid Panel (Triglycerides/HDL)", defaultVal: 110.0, unit: "mg/dL" }
];

export default function LabScanner() {
  const [mode, setMode] = useState("manual"); // manual | upload | ocr
  const [selectedMarkers, setSelectedMarkers] = useState([
    { biomarker: "Vitamin D [25(OH)D]", value: 28.5, unit: "ng/mL" },
    { biomarker: "Ferritin", value: 32.0, unit: "ng/mL" },
    { biomarker: "Fasting Glucose", value: 94.0, unit: "mg/dL" }
  ]);
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleAddMarker = (item) => {
    if (selectedMarkers.some((m) => m.biomarker === item.name)) {
      toast.info(`${item.name} is already in your entry matrix.`);
      return;
    }
    setSelectedMarkers([...selectedMarkers, { biomarker: item.name, value: item.defaultVal, unit: item.unit }]);
  };

  const handleRemoveMarker = (index) => {
    setSelectedMarkers(selectedMarkers.filter((_, i) => i !== index));
  };

  const handleValueChange = (index, val) => {
    const updated = [...selectedMarkers];
    updated[index].value = val;
    setSelectedMarkers(updated);
  };

  const handleAnalyze = async () => {
    if (mode === "manual" && selectedMarkers.length === 0) {
      toast.error("Please add at least one biomarker to analyze.");
      return;
    }
    if (mode === "upload" && !rawText.trim()) {
      toast.error("Please paste lab report text or upload a document.");
      return;
    }

    setLoading(true);
    try {
      const data = await scanLabReport(
        mode === "manual" ? selectedMarkers : [],
        mode === "upload" ? rawText : ""
      );
      setResults(data);
      toast.success("Lab report translated successfully!");
    } catch (err) {
      toast.error("Failed to analyze lab panel. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSampleUpload = () => {
    setRawText(`COMPLETE METABOLIC & LIPID PANEL:
25-Hydroxy Vitamin D: 26.4 ng/mL (Reference: 30.0 - 100.0)
Ferritin: 24 ng/mL (Reference: 30 - 400)
Fasting Blood Glucose: 92 mg/dL (Reference: 70 - 99)
Total Cholesterol: 195 mg/dL
HDL Cholesterol: 48 mg/dL
Triglycerides: 110 mg/dL
Serum Creatinine: 1.18 mg/dL
eGFR: 88 mL/min/1.73m2`);
    toast.success("Loaded sample clinical lab report text!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/[0.05] via-white/[0.02] to-transparent p-6 sm:p-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
            <FileText className="h-4 w-4" />
            <span>Lab Report Translator & Biomarker Interpreter</span>
          </div>

          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] uppercase font-mono tracking-wider text-emerald-300 border border-emerald-400/20">
            Educational & Non-Diagnostic
          </span>
        </div>

        <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
          Demystify Your Blood Panel in Plain English
        </h2>
        <p className="text-xs sm:text-sm text-white/60 font-light max-w-3xl leading-relaxed">
          Translate complex laboratory numbers into actionable physiological insights, non-pathological lifestyle context (e.g. how hard workouts shift AST and Creatinine), and structured questions for your doctor.
        </p>

        {/* Input Mode Toggle */}
        <div className="inline-flex items-center rounded-2xl border border-white/10 bg-black/60 p-1 mt-2">
          <button
            onClick={() => setMode("manual")}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
              mode === "manual" ? "bg-emerald-400 text-black font-bold shadow" : "text-white/60 hover:text-white"
            }`}
          >
            Manual Quick-Entry
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 ${
              mode === "upload" ? "bg-emerald-400 text-black font-bold shadow" : "text-white/60 hover:text-white"
            }`}
          >
            <Upload className="h-3 w-3" />
            <span>Paste / Upload Text</span>
          </button>
        </div>
      </div>

      {/* Input Sections */}
      {mode === "manual" ? (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Biomarker Catalog Selector (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                1. Select Biomarkers to Add
              </span>
              <p className="text-[11px] text-white/50 mt-0.5">Click any marker to add to your entry matrix:</p>
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto pr-1">
              {COMMON_BIOMARKERS.map((b) => (
                <button
                  key={b.id}
                  onClick={() => handleAddMarker(b)}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 p-3 text-left hover:border-emerald-400/40 hover:bg-white/[0.04] transition-all group"
                >
                  <div>
                    <span className="text-xs font-medium text-white group-hover:text-emerald-300 transition-colors block">
                      {b.name}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">Default: ~{b.defaultVal} {b.unit}</span>
                  </div>
                  <Plus className="h-4 w-4 text-white/30 group-hover:text-emerald-400 transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Active Entry Matrix (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                  2. Enter Your Lab Values
                </span>
                <span className="text-[11px] text-white/50">{selectedMarkers.length} biomarker(s) selected</span>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading || selectedMarkers.length === 0}
                className="flex items-center gap-2 rounded-2xl bg-emerald-400 px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(0,230,118,0.25)] hover:bg-emerald-300 transition-all disabled:opacity-50"
              >
                {loading ? <span>Analyzing...</span> : <span>Translate Results</span>}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {selectedMarkers.map((m, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 p-3"
                >
                  <span className="text-xs font-medium text-white flex-1 truncate">{m.biomarker}</span>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      value={m.value}
                      onChange={(e) => handleValueChange(idx, e.target.value)}
                      className="w-24 rounded-xl border border-white/15 bg-black px-2.5 py-1.5 text-xs text-emerald-300 font-mono font-bold text-right outline-none focus:border-emerald-400"
                    />
                    <span className="text-[10px] text-white/50 w-12 truncate">{m.unit}</span>

                    <button
                      onClick={() => handleRemoveMarker(idx)}
                      className="text-white/30 hover:text-red-400 p-1 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Upload / Paste Mode */
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-white block">
                Paste Lab Report Text or OCR Content
              </span>
              <p className="text-[11px] text-white/50">Paste values directly from your Quest, Labcorp, or hospital portal:</p>
            </div>

            <button
              onClick={handleSampleUpload}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline font-medium"
            >
              Load Sample Panel Text
            </button>
          </div>

          <textarea
            rows={6}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste your lab report text here (e.g. Vitamin D: 28 ng/mL, Ferritin: 32 ng/mL, Fasting Glucose: 95 mg/dL)..."
            className="w-full rounded-2xl border border-white/15 bg-black/60 p-4 text-xs text-white font-mono outline-none focus:border-emerald-400 placeholder:text-white/30"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading || !rawText.trim()}
              className="flex items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_15px_rgba(0,230,118,0.25)] hover:bg-emerald-300 transition-all disabled:opacity-50"
            >
              {loading ? <span>Processing OCR...</span> : <span>Translate Lab Text</span>}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Output Results Cards */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-4 border-t border-white/10"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-semibold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span>Biomarker Translation Breakdown</span>
            </h3>
            <span className="text-xs text-white/50 font-mono">
              {results.results.length} markers analyzed
            </span>
          </div>

          <div className="space-y-4">
            {results.results.map((item, idx) => {
              const isExp = expandedIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6 space-y-4 transition-all"
                >
                  <div
                    onClick={() => setExpandedIndex(isExp ? null : idx)}
                    className="flex cursor-pointer items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                        <Activity className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-display text-base font-semibold text-white">
                          {item.biomarker}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono mt-0.5">
                          <span className="text-emerald-400 font-bold">Your Value: {item.value} {item.unit}</span>
                          <span className="text-white/40">• Standard: {item.standard_range}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/70">
                        Optimal: {item.optimal_lifestyle_range}
                      </span>
                      {isExp ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
                    </div>
                  </div>

                  {isExp && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4 border-t border-white/5 pt-4 text-xs text-white/80"
                    >
                      {/* Plain-English Role Card */}
                      <div className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-1">
                        <span className="text-emerald-400 font-semibold uppercase text-[10px] tracking-wider block">
                          What This Biomarker Does:
                        </span>
                        <p className="text-white/80 leading-relaxed font-light">{item.role}</p>
                      </div>

                      {/* Lifestyle & Context Factors */}
                      <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.03] p-4 space-y-1 text-amber-200/90">
                        <span className="text-amber-300 font-semibold uppercase text-[10px] tracking-wider block flex items-center gap-1">
                          <Info className="h-3 w-3" /> Non-Pathological Context & Why Values Fluctuate:
                        </span>
                        <p className="leading-relaxed font-light">{item.lifestyle_factors}</p>
                      </div>

                      {/* Food-First Nutrition Links */}
                      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.03] p-4 space-y-1">
                        <span className="text-emerald-300 font-semibold uppercase text-[10px] tracking-wider block">
                          🥗 Food-First Whole-Food Support:
                        </span>
                        <p className="text-white/80 leading-relaxed font-light">{item.food_first_strategy}</p>
                      </div>

                      {/* Questions for Your Doctor */}
                      <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.03] p-4 space-y-2">
                        <span className="text-cyan-300 font-semibold uppercase text-[10px] tracking-wider block flex items-center gap-1">
                          <HelpCircle className="h-3 w-3" /> Structured Questions for Your Healthcare Practitioner:
                        </span>
                        <ul className="list-disc list-inside space-y-1 text-white/80 font-light">
                          {item.doctor_questions.map((q, qi) => (
                            <li key={qi}>"{q}"</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Strict Educational Disclaimer */}
          <div className="rounded-2xl border border-white/10 bg-black/60 p-4 text-center text-[11px] text-white/50 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-white/70 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Medical & Educational Safety Boundary</span>
            </div>
            <p>{results.disclaimer}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
