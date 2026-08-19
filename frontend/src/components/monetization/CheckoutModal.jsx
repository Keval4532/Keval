import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Crown, ShieldCheck, Check, ArrowRight,
  Sparkles, Lock, CreditCard, AlertCircle
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutModal() {
  const {
    isCheckoutModalOpen,
    closeCheckoutModal,
    checkoutTier,
    provisionSubscriber
  } = useAuth();

  const [tier, setTier] = useState(checkoutTier || "PRO_ANNUAL");
  const [currency, setCurrency] = useState("USD"); // "USD" | "INR"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isCheckoutModalOpen) return null;

  const isAnnual = tier === "PRO_ANNUAL";
  const priceDisplay = currency === "USD"
    ? (isAnnual ? "$79.99 / year" : "$9.99 / month")
    : (isAnnual ? "₹5,999 / year" : "₹799 / month");

  const monthlyEquivalent = currency === "USD"
    ? (isAnnual ? "$6.67 / mo" : "$9.99 / mo")
    : (isAnnual ? "₹499 / mo" : "₹799 / mo");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      await provisionSubscriber({
        email: email.trim(),
        name: name.trim() || undefined,
        tier: tier,
        payment_method: "instant_checkout"
      });
      // Context will close checkout modal and open AccountReadyModal
    } catch (err) {
      setError(err?.response?.data?.detail || "Could not complete order. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCheckoutModal}
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-8 shadow-2xl z-10 text-slate-900 dark:text-white"
        >
          {/* Close Button */}
          <button
            onClick={closeCheckoutModal}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/50 dark:border-amber-500/40 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-[11px] font-mono font-bold text-amber-800 dark:text-amber-300">
                <Crown className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                <span>KEVALBIO Pro Checkout</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Unlock <span className="font-extrabold text-amber-600 dark:text-amber-400">Biological Intelligence</span>
              </h2>
              <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal">
                Instant automated onboarding. Your credentials and login will be generated on the spot.
              </p>
            </div>

            {/* Plan Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTier("PRO_ANNUAL")}
                className={`relative rounded-2xl border p-3.5 text-left transition-all ${
                  isAnnual
                    ? "border-amber-400 bg-amber-50 dark:bg-amber-500/10 shadow-sm"
                    : "border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-black/40 hover:border-amber-300"
                }`}
              >
                <div className="absolute -top-2.5 right-2 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-extrabold text-black font-mono shadow-sm">
                  SAVE 33%
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">Annual Pro</div>
                <div className="mt-1 font-mono text-sm font-extrabold text-amber-700 dark:text-amber-300 tabular-nums">
                  {currency === "USD" ? "$79.99" : "₹5,999"}
                  <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-normal"> / yr</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#64748B] font-mono mt-0.5">
                  {monthlyEquivalent}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTier("PRO_MONTHLY")}
                className={`relative rounded-2xl border p-3.5 text-left transition-all ${
                  !isAnnual
                    ? "border-amber-400 bg-amber-50 dark:bg-amber-500/10 shadow-sm"
                    : "border-slate-200 dark:border-[#1E293B] bg-slate-50 dark:bg-black/40 hover:border-amber-300"
                }`}
              >
                <div className="font-bold text-xs text-slate-900 dark:text-white">Monthly Pro</div>
                <div className="mt-1 font-mono text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {currency === "USD" ? "$9.99" : "₹799"}
                  <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-normal"> / mo</span>
                </div>
                <div className="text-[10px] text-slate-500 dark:text-[#64748B] font-mono mt-0.5">
                  Flexible, cancel anytime
                </div>
              </button>
            </div>

            {/* Currency switcher & summary */}
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-[#94A3B8] px-1">
              <span>Total due today: <strong className="text-slate-900 dark:text-white font-mono font-bold">{priceDisplay}</strong></span>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-2 py-0.5 rounded transition-colors ${currency === "USD" ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold" : "text-slate-500 dark:text-[#64748B]"}`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("INR")}
                  className={`px-2 py-0.5 rounded transition-colors ${currency === "INR" ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold" : "text-slate-500 dark:text-[#64748B]"}`}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 p-3 text-xs text-red-800 dark:text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] font-mono">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748B] focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] font-mono">
                  Email Address (For Instant Login Delivery) *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex.vance@example.com"
                  className="w-full rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748B] focus:border-amber-400 focus:outline-none font-mono"
                />
              </div>

              {/* Payment simulation notice */}
              <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-black/30 p-3.5 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 dark:text-white font-mono">
                  <CreditCard className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Instant Verification Mode</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#64748B]">
                  Auto-generates your secure encrypted password and JWT session token immediately upon submission.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 py-3.5 text-xs font-extrabold uppercase tracking-wider text-black shadow-lg hover:scale-[1.01] active:scale-98 transition-all font-mono disabled:opacity-50"
              >
                {loading ? (
                  <span>Generating Pro Credentials...</span>
                ) : (
                  <>
                    <span>Complete Order & Generate Login ID</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
