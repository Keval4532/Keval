import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, Zap, Sparkles, ShieldCheck, Crown, ArrowRight,
  FlaskConical, Pill, Utensils, BookOpen, Clock, HeartHandshake
} from "lucide-react";
import { toast } from "sonner";
import { createCheckoutSession, getDeviceId } from "../lib/api";

const TIERS = [
  {
    id: "FREE",
    name: "Free Starter",
    price: "$0",
    period: "forever free",
    description: "Essential biology tools and fundamental evidence guidance.",
    features: [
      "5 AI biology queries per day",
      "Standard 5h Caffeine clearance curve",
      "1 supplement stack waste audit per week",
      "1 daily meal micronutrient scan",
      "Simple & Go Deeper explanations",
      "1 active N-of-1 micro-experiment",
      "Biology receipts download"
    ],
    cta: "Current Plan",
    disabled: true
  },
  {
    id: "PRO",
    name: "KEVALBIO Pro",
    popular: true,
    badge: "Save 33% — Most Popular",
    priceMonthly: "$9.99",
    priceMonthlyAlt: "₹799 / month",
    priceAnnual: "$79.99",
    priceAnnualAlt: "₹5,999 / year (~$6.67/mo)",
    description: "Unlimited biology intelligence, personalized liver kinetics, and deep PubMed science.",
    features: [
      "Unlimited AI questions & symptom triage",
      "Personalized liver clearance (Hormones, CYP1A2, Age)",
      "Unlimited supplement stack redundancy audits",
      "Unlimited meal micronutrient gap scans",
      "Full 'Deep Science' + PubMed study DOIs & links",
      "Unlimited concurrent N-of-1 micro-experiments",
      "Custom dark-mode receipt themes & export",
      "Priority AI model latency & response speed"
    ],
    cta: "Upgrade to Pro",
    disabled: false
  }
];

export default function PricingModal({ isOpen, onClose, onUpgraded }) {
  const [billingCycle, setBillingCycle] = useState("annual"); // "annual" | "monthly"
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpgrade = async () => {
    setLoading(true);
    const deviceId = getDeviceId();
    const tier = billingCycle === "annual" ? "PRO_ANNUAL" : "PRO_MONTHLY";

    try {
      const res = await createCheckoutSession({
        device_id: deviceId,
        tier: tier,
        provider: "simulation"
      });

      toast.success(res.message || "Upgraded to KEVALBIO Pro!");
      if (onUpgraded) onUpgraded();
      onClose();
    } catch (err) {
      toast.error("Failed to activate upgrade. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const proTier = TIERS[1];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-[#1E2E42] bg-[#0E141D] p-6 sm:p-8 text-white shadow-2xl z-10 space-y-6"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-[#64748B] hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 font-mono">
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>Unlock Complete Biology Intelligence</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
              Upgrade to <span className="text-amber-400 font-semibold">KEVALBIO Pro</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-light">
              Stop guessing. Calculate exact metabolic decay, unmask proprietary supplement waste, and access clinical research.
            </p>

            {/* Billing Cycle Switcher */}
            <div className="pt-2 inline-flex items-center rounded-2xl border border-[#1E293B] bg-black/50 p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all ${
                  billingCycle === "monthly"
                    ? "bg-amber-400 text-black shadow"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                Monthly ($9.99 / ₹799)
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`rounded-xl px-4 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual"
                    ? "bg-amber-400 text-black shadow"
                    : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <span>Annual ($79.99 / ₹5,999)</span>
                <span className="rounded-md bg-black/40 px-1.5 py-0.5 text-[9px] font-bold text-white font-mono">
                  SAVE 33%
                </span>
              </button>
            </div>
          </div>

          {/* Tier Cards Grid */}
          <div className="grid gap-5 md:grid-cols-2 pt-2">
            {/* Free Tier */}
            <div className="rounded-3xl border border-[#1E293B] bg-black/40 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-xl font-medium text-white">{TIERS[0].name}</h3>
                  <p className="text-xs text-[#64748B] mt-1">{TIERS[0].description}</p>
                </div>
                <div className="font-display text-3xl font-light text-white">
                  $0 <span className="text-xs text-[#64748B] font-mono">forever free</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#94A3B8]">
                  {TIERS[0].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-2.5 text-center text-xs text-[#64748B] font-mono font-medium">
                Current Baseline Plan
              </div>
            </div>

            {/* Pro Tier */}
            <div className="relative rounded-3xl border border-amber-500/50 bg-gradient-to-b from-amber-500/10 via-[#0E141D] to-[#0E141D] p-6 flex flex-col justify-between space-y-6 shadow-[0_0_35px_rgba(245,158,11,0.15)]">
              <div className="absolute -top-3 right-6 rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black font-mono shadow-md">
                {proTier.badge}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-amber-300 flex items-center gap-2">
                    <Crown className="h-5 w-5 text-amber-400" />
                    <span>{proTier.name}</span>
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">{proTier.description}</p>
                </div>

                <div>
                  <div className="font-display text-4xl font-bold text-white">
                    {billingCycle === "annual" ? proTier.priceAnnual : proTier.priceMonthly}
                    <span className="text-xs text-amber-300/80 font-mono font-normal ml-1">
                      {billingCycle === "annual" ? "/ year ($6.67/mo)" : "/ month"}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748B] font-mono mt-0.5">
                    {billingCycle === "annual" ? proTier.priceAnnualAlt : proTier.priceMonthlyAlt}
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-white/90">
                  {proTier.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:scale-[1.02] transition-all disabled:opacity-50"
              >
                {loading ? <span>Activating...</span> : <span>Unlock Pro Membership</span>}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="text-center text-[11px] text-[#64748B] pt-2">
            🔒 30-day money-back guarantee • 1-click instant cancellation in My KEVALBIO • Encrypted & Secure
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
