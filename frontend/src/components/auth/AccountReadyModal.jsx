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
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-500/40 bg-[#0E141D] p-7 sm:p-9 shadow-[0_0_60px_rgba(16,185,129,0.15)] z-10"
        >
          {/* Top glowing ambient accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close X */}
          <button
            onClick={closeAccountReadyModal}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-6 text-center sm:text-left relative">
            {/* Header Badge */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-400 font-mono w-fit mx-auto sm:mx-0">
                <Crown className="h-4 w-4 text-amber-400" />
                <span>Payment Confirmed — Pro Active</span>
              </div>
              <span className="text-[11px] font-mono text-[#64748B] text-center sm:text-right">
                Role: PRO_SUBSCRIBER
              </span>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white flex items-center justify-center sm:justify-start gap-2.5">
                <span>Welcome to</span>
                <span className="text-white">
                  KEVAL<span className="text-cyan-400">BIO</span>
                </span>
                <span className="text-amber-400 font-normal text-2xl">Pro</span>
              </h2>
              <p className="text-sm text-[#94A3B8] font-light leading-relaxed">
                Your credentials have been automatically provisioned and securely saved. We've logged you in automatically!
              </p>
            </div>

            {/* Credentials Card */}
            <div className="rounded-2xl border border-[#1E2E42] bg-black/70 p-5 space-y-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#64748B] font-mono flex items-center justify-between">
                <span>Your Generated Account Credentials</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> Bcrypt Encrypted
                </span>
              </div>

              {/* Login ID Row */}
              <div className="space-y-1">
                <span className="block text-[11px] text-[#94A3B8] font-mono">Login ID (Email)</span>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-[#1E293B] bg-[#0E141D] px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                    <span className="font-mono text-sm text-white font-medium truncate">
                      {accountCredentials.email}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(accountCredentials.email, "email")}
                    className="flex h-7 items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 text-[11px] font-mono text-[#CBD5E1] hover:border-cyan-400/40 hover:text-cyan-300 transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Row */}
              <div className="space-y-1">
                <span className="block text-[11px] text-[#94A3B8] font-mono">Auto-Generated Password</span>
                <div className="flex items-center justify-between gap-2 rounded-xl border border-[#1E293B] bg-[#0E141D] px-3.5 py-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Lock className="h-4 w-4 shrink-0 text-amber-400" />
                    <span className="font-mono text-sm text-amber-300 font-semibold tracking-wider truncate">
                      {accountCredentials.temporary_password}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(accountCredentials.temporary_password, "password")}
                    className="flex h-7 items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 text-[11px] font-mono text-amber-300 hover:border-amber-400 hover:bg-amber-500/20 transition-colors"
                  >
                    {copiedPassword ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Email dispatch notice */}
            <div className="flex items-start gap-2.5 text-xs text-[#64748B] font-light">
              <Mail className="h-4 w-4 shrink-0 text-emerald-400 mt-0.5" />
              <span>
                A copy of these credentials has also been sent to your email. You can change your password anytime in <strong>Settings</strong>.
              </span>
            </div>

            {/* 1-Click Instant Enter Button */}
            <button
              onClick={handleStartExploring}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 py-4 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-95 transition-all"
            >
              <span>1-Click Log In & Start Exploring</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
