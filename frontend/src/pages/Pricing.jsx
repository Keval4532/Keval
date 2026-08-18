import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Crown, Check, X, Sparkles, ShieldCheck, Zap, ArrowRight,
  HelpCircle, ChevronDown, ChevronUp, DollarSign, Pill, Coffee, Utensils, FlaskConical
} from "lucide-react";
import { toast } from "sonner";
import { getSubscriptionStatus, createCheckoutSession, getDeviceId } from "../lib/api";

const COMPARISON_ROWS = [
  {
    feature: "Daily AI Biology Queries",
    free: "5 queries / day",
    pro: "Unlimited queries",
    highlight: true
  },
  {
    feature: "Caffeine Clearance Simulator",
    free: "Standard 5h half-life curve",
    pro: "Personalized (Hormones, Birth Control, CYP1A2, Age)",
    highlight: true
  },
  {
    feature: "Supplement Stack Waste Detector",
    free: "1 audit / week",
    pro: "Unlimited stack audits & synergy analysis",
    highlight: true
  },
  {
    feature: "One-Line Meal Scanner",
    free: "1 scan / day",
    pro: "Unlimited scans + Micronutrient gap tracker",
    highlight: true
  },
  {
    feature: "Lab Report Translator & OCR",
    free: "Basic reference ranges",
    pro: "Full biomarker physiology + Doctor talking points",
    highlight: true
  },
  {
    feature: "Research Explanations",
    free: "Simple & Go Deeper",
    pro: "Full 'Deep Science' + Direct PubMed DOIs",
    highlight: false
  },
  {
    feature: "N-of-1 Micro-Experiments",
    free: "1 active experiment",
    pro: "Unlimited concurrent experiments + Full export",
    highlight: false
  },
  {
    feature: "Viral Biology Receipts",
    free: "Standard theme",
    pro: "All custom themes & high-res export",
    highlight: false
  },
  {
    feature: "Emergency Red-Flag Safety Triage",
    free: "Included (Always Free)",
    pro: "Included (Always Free)",
    highlight: false
  }
];

const FAQS = [
  {
    q: "Why should I upgrade to KEVALBIO Pro instead of asking ChatGPT?",
    a: "ChatGPT outputs generic text walls without real-time interactive calculations. KEVALBIO Pro calculates dynamic 24-hour pharmacokinetic decay curves with your personal birth control/CYP1A2 genetics, automatically flags duplicate doses in your multi-ingredient supplement stack (saving you $40-$70/mo), and tracks 7-day personal biology experiments."
  },
  {
    q: "How does the Supplement Waste Detector save me money?",
    a: "Most supplement users take overlapping multi-vitamins, separate Zinc, ZMA, and low-bioavailability forms like Magnesium Oxide (~4% gut absorption). KEVALBIO audits your entire stack, flags redundancies exceeding upper limits, and recommends exactly what to cut, usually saving more than the entire subscription cost on day 1."
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel your subscription with 1 click in 'My KEVALBIO' at any time without questions or penalties. Your Pro access will remain active until the end of your billing cycle."
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major Credit Cards, Apple Pay, Google Pay, and regional gateways via Stripe and Razorpay."
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("annual");
  const [subStatus, setSubStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const deviceId = getDeviceId();
    getSubscriptionStatus(deviceId).then(setSubStatus).catch(() => {});
  }, []);

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

      toast.success(res.message || "Upgraded to KEVALBIO Pro successfully!");
      setSubStatus({
        ...subStatus,
        tier: tier,
        is_pro: true,
        tier_name: "KEVALBIO Pro"
      });
    } catch (err) {
      toast.error("Failed to activate upgrade. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-20">
      {/* Header */}
      <div className="text-center space-y-3 pt-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-bold text-amber-300 font-mono"
        >
          <Crown className="h-3.5 w-3.5 text-amber-400" />
          <span>Transparent Biology Pricing</span>
        </motion.div>

        <h1 className="font-display text-4xl sm:text-5xl font-light tracking-tight text-white">
          Invest in Your <span className="text-amber-400 font-normal">Biological Potential</span>
        </h1>
        <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
          Stop taking supplements blindly. Unlock personalized liver clearance, stack waste detection, and deep evidence-based science.
        </p>

        {/* Billing Switcher */}
        <div className="pt-3 inline-flex items-center rounded-2xl border border-[#1E2E42] bg-[#0E141D] p-1 shadow-lg">
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
        {/* Free Plan */}
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
                <span>1 stack waste audit per week</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>1 daily meal scan</span>
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
            {subStatus?.is_pro ? "Previous Plan" : "Active Plan"}
          </div>
        </div>

        {/* Pro Plan */}
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
                <strong className="text-white">Unlimited</strong> AI queries & problem analyses
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Personalized liver kinetics (Hormones, CYP1A2, Age, Smoking)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Unlimited supplement stack redundancy audits</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Unlimited meal micronutrient gap scans</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Full 'Deep Science' + PubMed clinical DOIs & links</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-400" />
                <span>Unlimited concurrent N-of-1 micro-experiments</span>
              </li>
            </ul>
          </div>

          <button
            onClick={handleUpgrade}
            disabled={loading || subStatus?.is_pro}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-400 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:bg-amber-300 hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {subStatus?.is_pro ? <span>Active Pro Member</span> : loading ? <span>Activating...</span> : <span>Upgrade to KEVALBIO Pro</span>}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="space-y-4 max-w-4xl mx-auto pt-6">
        <h2 className="font-display text-2xl font-light text-center text-white">
          Detailed Feature Comparison
        </h2>

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
              {COMPARISON_ROWS.map((row, i) => (
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

      {/* FAQ Accordion */}
      <div className="space-y-4 max-w-3xl mx-auto pt-6">
        <h2 className="font-display text-2xl font-light text-center text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOp = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-[#1E2E42] bg-[#0E141D] p-5 space-y-2 cursor-pointer transition-all"
                onClick={() => setOpenFaq(isOp ? null : i)}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-sm text-white">{faq.q}</span>
                  {isOp ? <ChevronUp className="h-4 w-4 text-amber-400" /> : <ChevronDown className="h-4 w-4 text-[#64748B]" />}
                </div>
                {isOp && (
                  <p className="text-xs text-[#94A3B8] leading-relaxed font-light pt-1 border-t border-white/5">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
