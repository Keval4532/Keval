import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, CheckCircle2, Copy, Check, ArrowRight,
  ShieldCheck, Crown, Mail, Lock, X
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";

export default function AccountReadyModal() {
  const navigate = useNavigate();
  const { isAccountReadyModalOpen, closeAccountReadyModal, accountCredentials } = useAuth();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  if (!isAccountReadyModalOpen || !accountCredentials) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      toast.success("Login ID copied to clipboard");
    } else {
      setCopiedPassword(true);
      setTimeout(() => setCopiedPassword(false), 2000);
      toast.success("Password copied to clipboard");
    }
  };

  const handleStartExploring = () => {
    closeAccountReadyModal();
    toast.success("Logged in to KEVALBIO Pro!");
    navigate("/explore");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAccountReadyModal}
          className="fixed inset-0 bg-black/60 dark:bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-300 dark:border-emerald-500/40 bg-white dark:bg-[#0E141D] p-7 sm:p-9 shadow-2xl z-10 text-slate-900 dark:text-white"
        >
          {/* Top glowing ambient accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close X */}
          <button
            onClick={closeAccountReadyModal}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6 text-center sm:text-left relative">
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-400 font-mono w-fit mx-auto sm:mx-0">
                <Crown className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <span>Payment Confirmed — Pro Active</span>
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-[#64748B] text-center sm:text-right font-bold">
                Role: PRO_SUBSCRIBER
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2.5">
                <span>Welcome to</span>
                <span className="text-slate-900 dark:text-white">
                  KEVAL<span className="text-cyan-600 dark:text-cyan-400">BIO</span>
                </span>
                <span className="text-amber-500 dark:text-amber-400 font-bold text-2xl">Pro</span>
              </h2>
              <p className="text-sm text-slate-600 dark:text-[#94A3B8] font-normal leading-relaxed">
                Your credentials have been automatically provisioned and securely saved. We've logged you in automatically!
              </p>
            </div>

            {/* Credentials Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-[#1E2E42] bg-slate-50 dark:bg-black/70 p-5 space-y-4 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#64748B] font-mono flex items-center justify-between">
                <span>Your Generated Account Credentials</span>
                <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-bold">
                  <ShieldCheck className="h-3.5 w-3.5" /> Bcrypt Encrypted
                </span>
              </div>

              {/* Login ID Row */}
              <div className="rounded-xl border border-slate-200 dark:border-[#1E293B] bg-white dark:bg-[#080B10] p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Mail className="h-4 w-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <div className="min-w-0 text-left">
                    <div className="text-[10px] uppercase font-mono text-slate-400 dark:text-[#64748B]">Login ID (Email)</div>
                    <div className="font-mono text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {accountCredentials.email}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(accountCredentials.email, "email")}
                  className="shrink-0 flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 px-2.5 py-1.5 text-xs text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-200 dark:hover:bg-white/10 transition-colors font-mono"
                >
                  {copiedEmail ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedEmail ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Generated Password Row */}
              <div className="rounded-xl border border-amber-300 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-500/10 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <div className="min-w-0 text-left">
                    <div className="text-[10px] uppercase font-mono text-amber-800 dark:text-amber-300/80 font-bold">Auto-Generated Password</div>
                    <div className="font-mono text-sm sm:text-base font-extrabold text-amber-950 dark:text-amber-300 tracking-wider truncate">
                      {accountCredentials.temporary_password}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(accountCredentials.temporary_password, "password")}
                  className="shrink-0 flex items-center gap-1.5 rounded-lg border border-amber-300 dark:border-amber-400/30 bg-amber-200/60 dark:bg-amber-400/20 px-2.5 py-1.5 text-xs font-bold text-amber-950 dark:text-amber-200 hover:bg-amber-300 dark:hover:bg-amber-400/30 transition-colors font-mono"
                >
                  {copiedPassword ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedPassword ? "Copied" : "Copy"}</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-500 dark:text-[#64748B] text-center font-normal">
                * We recommend saving your password. You can also update it anytime in Settings.
              </div>
            </div>

            {/* Direct Auto-Login Action Button */}
            <div className="space-y-2.5">
              <button
                data-testid="account-ready-login-button"
                onClick={handleStartExploring}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white hover:scale-[1.02] active:scale-95 transition-all shadow-lg font-mono"
              >
                <span>1-Click Log In & Start Exploring</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
