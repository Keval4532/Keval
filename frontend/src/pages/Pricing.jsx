import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Crown, ChevronDown, ChevronUp, ShieldCheck, Sparkles, HelpCircle
} from "lucide-react";
import PublicPricingSection from "../components/monetization/PublicPricingSection";

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
    q: "How does the automated credential generation work?",
    a: "Upon checkout, our provisioning engine instantly generates your encrypted credentials and delivers an on-screen password modal with 1-click login. You will also receive an email confirmation and can update your password anytime in Settings."
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Yes. You can cancel your subscription with 1 click in 'My KEVALBIO' at any time without questions or penalties. Your Pro access will remain active until the end of your billing cycle."
  },
  {
    q: "What payment methods are supported?",
    a: "We support all major Credit Cards (Visa, MasterCard, American Express), Apple Pay, Google Pay, UPI, and international gateways via Stripe and Razorpay."
  }
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="space-y-12 pb-20">
      {/* High-Converting Public Pricing Section */}
      <PublicPricingSection showComparison={true} />

      {/* FAQ Accordion */}
      <div className="space-y-4 max-w-3xl mx-auto px-4">
        <h3 className="font-display text-2xl font-bold text-center text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOp = openFaq === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-5 space-y-2 cursor-pointer transition-all hover:border-slate-300 dark:hover:border-white/20 shadow-sm"
                onClick={() => setOpenFaq(isOp ? null : i)}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{faq.q}</span>
                  {isOp ? (
                    <ChevronUp className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 dark:text-[#64748B]" />
                  )}
                </div>
                {isOp && (
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] leading-relaxed font-normal pt-1 border-t border-slate-100 dark:border-white/5">
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
