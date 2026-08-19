import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Lock, Mail, ArrowRight, Sparkles, AlertCircle,
  CheckCircle2, ShieldCheck, KeyRound, UserCheck, Eye, EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import { forgotPasswordApi } from "../../lib/api";
import { LOGIN } from "../../constants/testIds";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login, demoLogin, openCheckoutModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError("Please enter both your login email and password.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await login(email.trim(), password, rememberMe);
    } catch (err) {
      setError(err?.response?.data?.detail || err?.message || "Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await demoLogin("PRO_ANNUAL");
    } catch (err) {
      setError("Unable to launch demo session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await forgotPasswordApi({ email: forgotEmail.trim() });
      setForgotSent(true);
      toast.success("Recovery link dispatched to your inbox.");
    } catch {
      toast.error("Could not send recovery link.");
    } finally {
      setLoading(false);
    }
  };

  const shakeAnimation = error
    ? { x: [-10, 10, -8, 8, -4, 4, 0], transition: { duration: 0.4 } }
    : {};

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeLoginModal}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#1E2E42] bg-[#0E141D] p-6 sm:p-8 shadow-2xl z-10"
        >
          {/* Close Button */}
          <button
            onClick={closeLoginModal}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-colors"
            data-testid="login-close-button"
          >
            <X className="h-4 w-4" />
          </button>

          {!isForgotPassword ? (
            <motion.div animate={shakeAnimation} className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-mono text-cyan-300">
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Member Access</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-white">
                  Log in to <span className="font-bold text-white">KEVAL<span className="text-cyan-400">BIO</span></span>
                </h2>
                <p className="text-xs text-[#94A3B8] font-light">
                  Enter your Login ID and password to access your Pro intelligence engine.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 rounded-2xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                  <span className="leading-relaxed">{error}</span>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[#94A3B8] font-mono">
                    Login ID / Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                    <input
                      data-testid={LOGIN.emailInput}
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="name@example.com"
                      className="w-full rounded-2xl border border-[#1E293B] bg-black/60 pl-10 pr-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#94A3B8] font-mono">
                      Password
                    </label>
                    <button
                      type="button"
                      data-testid={LOGIN.forgotPasswordLink}
                      onClick={() => {
                        setForgotEmail(email);
                        setIsForgotPassword(true);
                        setError("");
                      }}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748B]" />
                    <input
                      data-testid={LOGIN.passwordInput}
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="Enter password"
                      className="w-full rounded-2xl border border-[#1E293B] bg-black/60 pl-10 pr-10 py-3 text-sm text-white placeholder-[#64748B] focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#94A3B8] select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-[#1E293B] bg-black text-cyan-400 focus:ring-0 focus:ring-offset-0"
                    />
                    <span>Remember me on this device</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  data-testid={LOGIN.submitButton}
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3.5 text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:opacity-95 hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <span>Log In to KEVALBIO</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Divider & 1-Click Demo Login */}
              <div className="relative pt-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#1E293B]" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                  <span className="bg-[#0E141D] px-3 text-[#64748B]">Or quick evaluator access</span>
                </div>
              </div>

              {/* 1-Click Pro Demo Button */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-amber-500/40 bg-amber-500/10 py-3 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 hover:border-amber-400 transition-all group"
              >
                <Sparkles className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span>1-Click Test Login as Pro Subscriber</span>
              </button>

              {/* New subscriber pitch */}
              <div className="pt-2 text-center text-xs text-[#94A3B8]">
                Don't have a Pro account yet?{" "}
                <button
                  type="button"
                  onClick={() => {
                    closeLoginModal();
                    openCheckoutModal("PRO_ANNUAL");
                  }}
                  className="font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-2 ml-1"
                >
                  Get KEVALBIO Pro ($9.99/mo)
                </button>
              </div>
            </motion.div>
          ) : (
            /* Forgot Password Flow */
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[11px] font-mono text-amber-300">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Password Recovery</span>
                </div>
                <h2 className="font-display text-2xl font-light text-white">Reset Password</h2>
                <p className="text-xs text-[#94A3B8] font-light">
                  Enter your subscriber email address. We'll dispatch instant reset instructions.
                </p>
              </div>

              {forgotSent ? (
                <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-400" />
                  <p className="text-xs text-emerald-200 leading-relaxed">
                    If an account exists for <strong className="text-white font-mono">{forgotEmail}</strong>, password instructions have been sent.
                  </p>
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setForgotSent(false);
                    }}
                    className="rounded-xl bg-emerald-400 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-300 transition-colors"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-medium uppercase tracking-wider text-[#94A3B8] font-mono">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-2xl border border-[#1E293B] bg-black/60 px-4 py-3 text-sm text-white placeholder-[#64748B] focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="flex-1 rounded-2xl border border-[#1E293B] py-3 text-xs font-semibold text-[#94A3B8] hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 rounded-2xl bg-cyan-400 py-3 text-xs font-bold text-black hover:bg-cyan-300 transition-colors disabled:opacity-50"
                    >
                      {loading ? "Sending..." : "Send Instructions"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
