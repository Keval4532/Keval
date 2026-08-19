import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Check, Lock, ShieldCheck, Crown, ArrowRight,
  CreditCard, Sparkles, AlertCircle, Zap
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

export default function CheckoutModal() {
  const { isCheckoutModalOpen, closeCheckoutModal, selectedTier, provisionSubscriber } = useAuth();
  const [tier, setTier] = useState(selectedTier || "PRO_ANNUAL");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState("USD"); // "USD" | "INR"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedTier) setTier(selectedTier);
  }, [selectedTier]);

  if (!isCheckoutModalOpen) return null;

  const isAnnual = tier === "PRO_ANNUAL";
  const priceDisplay = isAnnual
    ? (currency === "USD" ? "$79.99 / year" : "₹5,999 / year")
    : (currency === "USD" ? "$9.99 / month" : "₹799 / month");

  const monthlyEquivalent = isAnnual
    ? (currency === "USD" ? "~$6.67 / month" : "~₹499 / month")
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await provisionSubscriber({
        email: email.trim(),
        name: name.trim(),
        tier,
        provider: "stripe_direct"
      });
      // The auth context handles opening the AccountReadyModal and closing this modal
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Failed to process subscription. Please try again.");
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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[#1E2E42] bg-[#0E141D] p-6 sm:p-8 shadow-2xl z-10"
        >
          {/* Close X */}
          <button
            onClick={closeCheckoutModal}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-[11px] font-mono font-bold text-amber-300">
                <Crown className="h-3.5 w-3.5 text-amber-400" />
                <span>KEVALBIO Pro Checkout</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
                Unlock <span className="font-bold text-amber-400">Biological Intelligence</span>
              </h2>
              <p className="text-xs text-[#94A3B8] font-light">
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
                    ? "border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "border-[#1E293B] bg-black/40 hover:border-white/20"
                }`}
              >
                <div className="absolute -top-2.5 right-2 rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-bold text-black font-mono">
                  SAVE 33%
                </div>
                <div className="font-semibold text-xs text-white">Annual Pro</div>
                <div className="mt-1 font-mono text-sm font-bold text-amber-300">
                  {currency === "USD" ? "$79.99" : "₹5,999"}
                  <span className="text-[10px] text-[#94A3B8] font-normal"> / yr</span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono mt-0.5">
                  {monthlyEquivalent}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setTier("PRO_MONTHLY")}
                className={`relative rounded-2xl border p-3.5 text-left transition-all ${
                  !isAnnual
                    ? "border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                    : "border-[#1E293B] bg-black/40 hover:border-white/20"
                }`}
              >
                <div className="font-semibold text-xs text-white">Monthly Pro</div>
                <div className="mt-1 font-mono text-sm font-bold text-white">
                  {currency === "USD" ? "$9.99" : "₹799"}
                  <span className="text-[10px] text-[#94A3B8] font-normal"> / mo</span>
                </div>
                <div className="text-[10px] text-[#64748B] font-mono mt-0.5">
                  Flexible, cancel anytime
                </div>
              </button>
            </div>

            {/* Currency switcher & summary */}
            <div className="flex items-center justify-between text-xs text-[#94A3B8] px-1">
              <span>Total due today: <strong className="text-white font-mono">{priceDisplay}</strong></span>
              <div className="flex items-center gap-1 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setCurrency("USD")}
                  className={`px-2 py-0.5 rounded ${currency === "USD" ? "bg-white/10 text-white font-bold" : "text-[#64748B]"}`}
                >
                  USD ($)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("INR")}
                  className={`px-2 py-0.5 rounded ${currency === "INR" ? "bg-white/10 text-white font-bold" : "text-[#64748B]"}`}
                >
                  INR (₹)
                </button>
              </div>
            </div>

            {/* Error banner */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Checkout Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#94A3B8] font-mono">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full rounded-2xl border border-[#1E293B] bg-black/60 px-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[#94A3B8] font-mono">
                  Email for Login ID & Password Delivery <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-[#1E293B] bg-black/60 px-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-cyan-400 focus:outline-none font-mono"
                />
              </div>

              {/* Secure Payment Card Preview */}
              <div className="rounded-2xl border border-white/5 bg-black/50 p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 font-mono text-[11px]">
                    <CreditCard className="h-4 w-4 text-cyan-400" />
                    <span>Payment Gateway</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> 256-Bit SSL Encrypted
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#64748B] font-mono">
                  <span>Supported: Visa, Mastercard, Amex, Apple Pay, UPI</span>
                  <span>Instant Activation</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Generating Account & Provisioning...</span>
                ) : (
                  <>
                    <span>Complete Order & Generate Login ID</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Guarantees */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-[#64748B] font-mono">
              <span>✓ 1-Click Cancel Anytime</span>
              <span>✓ Automatic Password Delivery</span>
              <span>✓ 100% Science Backed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
