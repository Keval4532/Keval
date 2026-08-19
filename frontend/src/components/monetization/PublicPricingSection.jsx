import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown, Check, ArrowRight, ShieldCheck, Zap,
  Sparkles, HelpCircle, ChevronDown, ChevronUp
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const COMPARISON_MATRIX = [
  {
    feature: "AI Biology & Symptom Deep Dives",
    free: "5 queries / day",
    pro: "Unlimited 24/7 Queries",
    highlight: true
  },
  {
    feature: "Caffeine Clearance Simulator",
    free: "Generic 5h curve",
    pro: "Personalized (CYP1A2, Hormones, Age, Sleep Target)",
    highlight: true
  },
  {
    feature: "Supplement Stack Waste Detector",
    free: "1 scan / week",
    pro: "Unlimited Audits + Proprietary Blend Unmasker",
    highlight: true
  },
  {
    feature: "One-Line Meal & Nutrient Scanner",
    free: "1 scan / day",
    pro: "Unlimited Logs + Daily Micronutrient Gap Tracker",
    highlight: true
  },
  {
    feature: "Lab Report OCR & Doctor Talking Points",
    free: "Basic reference ranges",
    pro: "Full OCR Scanner + Doctor Discussion Scripts",
    highlight: true
  },
  {
    feature: "Deep Science & PubMed DOI Citations",
    free: "Simple overviews",
    pro: "Full Molecular Mechanisms + Direct PubMed DOIs",
    highlight: false
  },
  {
    feature: "N-of-1 Biology Micro-Experiments",
    free: "1 active experiment",
    pro: "Unlimited Concurrent Protocols & Export",
    highlight: false
  },
  {
    feature: "Exportable Personal Biology Receipts",
    free: "Standard layout",
    pro: "High-Res Viral Themes & Complete Audit History",
    highlight: false
  }
];

export default function PublicPricingSection({ showComparison = true }) {
  const { openCheckoutModal, isPro } = useAuth();
  const [billingCycle, setBillingCycle] = useState("annual"); // "annual" | "monthly"

  return (
    <div id="pricing-section" className="mx-auto max-w-5xl px-4 space-y-12 py-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 font-mono"
        >
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>Transparent Biology Pricing</span>
        </motion.div>

        <h2 className="font-display text-3xl sm:text-5xl font-light tracking-tight text-white">
          Invest in Your <span className="text-amber-400 font-normal">Biological Intelligence</span>
        </h2>
        <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
          No vague advice or supplement marketing hype. Full evidence-based pharmacokinetic engines and waste detection.
        </p>

        {/* Billing Switcher */}
        <div className="pt-2 inline-flex items-center rounded-2xl border border-[#1E2E42] bg-[#0E141D] p-1 shadow-lg">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`rounded-xl px-5 py-2 text-xs font-semibold transition-all ${
              billingCycle === "monthly"
                ? "bg-amber-400 text-black shadow font-bold"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            Monthly ($9.99 / ₹799)
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`rounded-xl px-5 py-2 text-xs font-semibold transition-all flex items-center gap-2 ${
              billingCycle === "annual"
                ? "bg-amber-400 text-black shadow font-bold"
                : "text-[#94A3B8] hover:text-white"
            }`}
          >
            <span>Annual ($79.99 / ₹5,999)</span>
            <span className="rounded-md bg-black/40 px-2 py-0.5 text-[9px] font-bold text-white font-mono">
              SAVE 33%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
        {/* Free Starter Card */}
        <div className="rounded-3xl border border-[#1E293B] bg-[#0E141D]/90 p-7 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-light text-white">Free Starter</h3>
              <p className="text-xs text-[#64748B] mt-1 font-light">Fundamental evidence-based biology and food foundations.</p>
            </div>

            <div className="font-display text-4xl font-light text-white">
              $0 <span className="text-xs text-[#64748B] font-mono">forever free</span>
            </div>

            <ul className="space-y-3 text-xs text-[#94A3B8]">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>5 AI biology queries per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Standard 5h Caffeine clearance curve</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>1 supplement stack audit per week</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>1 daily meal micronutrient scan</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Basic Lab reference ranges</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Simple & Go Deeper explanations</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/5 bg-black/40 py-3 text-center text-xs text-[#64748B] font-mono">
            {isPro ? "Previous Plan" : "Active Free Tier"}
          </div>
        </div>

        {/* Pro Plan Card */}
        <div className="relative rounded-3xl border border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-[#0E141D] to-[#0E141D] p-7 flex flex-col justify-between space-y-6 shadow-[0_0_40px_rgba(245,158,11,0.18)]">
          <div className="absolute -top-3 right-8 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black font-mono shadow-md">
            Save 33% — Recommended
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-display text-2xl font-bold text-amber-300 flex items-center gap-2">
                <Crown className="h-6 w-6 text-amber-400" />
                <span>KEVALBIO Pro</span>
              </h3>
              <p className="text-xs text-[#94A3B8] mt-1 font-light">Complete, unconstrained biology & performance intelligence.</p>
            </div>

            <div>
              <div className="font-display text-5xl font-bold text-white">
                {billingCycle === "annual" ? "$79.99" : "$9.99"}
                <span className="text-xs text-amber-300/80 font-mono font-normal ml-1.5">
                  {billingCycle === "annual" ? "/ year ($6.67/mo)" : "/ month"}
                </span>
              </div>
              <div className="text-[11px] text-[#64748B] font-mono mt-1">
                {billingCycle === "annual" ? "₹5,999 / year billed annually" : "₹799 / month billed monthly"}
              </div>
            </div>

            <ul className="space-y-3 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <strong className="text-white">Unlimited</strong> AI questions & deep-science citations
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Full access to all 8 interactive biology tools</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Lab PDF & photo OCR translator + doctor talking points</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Supplement stack redundancy & waste detector</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Exportable personal biology receipts & micro-experiments</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Priority AI lab processing & ultra-low latency</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => openCheckoutModal(billingCycle === "annual" ? "PRO_ANNUAL" : "PRO_MONTHLY")}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isPro ? <span>Active Pro Member</span> : <span>Subscribe to Pro & Generate Credentials</span>}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Feature Comparison Table */}
      {showComparison && (
        <div className="space-y-4 max-w-4xl mx-auto pt-6">
          <h3 className="font-display text-2xl font-light text-center text-white">
            Full Platform Feature Comparison
          </h3>

          <div className="overflow-x-auto rounded-3xl border border-[#1E2E42] bg-[#0E141D]/90">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#1E293B] bg-black/40 text-[10px] uppercase tracking-wider text-[#64748B]">
                  <th className="px-6 py-4 font-mono">Platform Feature</th>
                  <th className="px-6 py-4 font-mono text-white/60">Free Starter</th>
                  <th className="px-6 py-4 font-mono text-amber-300 font-bold">KEVALBIO Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/60">
                {COMPARISON_MATRIX.map((row, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-3.5 font-medium text-white">{row.feature}</td>
                    <td className="px-6 py-3.5 text-[#94A3B8]">{row.free}</td>
                    <td className="px-6 py-3.5 font-semibold text-amber-300">{row.pro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
