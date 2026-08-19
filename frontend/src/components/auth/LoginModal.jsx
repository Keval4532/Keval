import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, LogIn, KeyRound, Mail, Lock, ShieldCheck,
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, Eye, EyeOff
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginModal() {
  const {
    isLoginModalOpen,
    closeLoginModal,
    login,
    demoLogin,
    forgotPassword
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both your Login ID and password.");
      triggerShake();
      return;
    }

    setError("");
    setLoading(true);
    try {
      await login(email.trim(), password.trim(), rememberMe);
      closeLoginModal();
    } catch (err) {
      setError(err?.response?.data?.detail || "Invalid login credentials. Please check your password.");
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError("");
    setLoading(true);
    try {
      await demoLogin();
      closeLoginModal();
    } catch {
      setError("Could not log into demo account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setResetEmailSent(true);
    } catch {
      setError("Could not send recovery instructions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const shakeAnimation = shake
    ? {
        x: [-8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.4 }
      }
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
          className="fixed inset-0 bg-black/60 dark:bg-black/85 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-6 sm:p-8 shadow-2xl z-10 text-slate-900 dark:text-white"
        >
          {/* Close Button */}
          <button
            onClick={closeLoginModal}
            className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-white/10 text-slate-500 dark:text-white/60 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            data-testid="login-close-button"
          >
            <X className="h-4 w-4" />
          </button>

          {!isForgotPassword ? (
            <motion.div animate={shakeAnimation} className="space-y-6">
              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-3 py-1 text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-300">
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Member Access</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Log in to <span className="font-extrabold text-slate-900 dark:text-white">KEVAL<span className="text-cyan-600 dark:text-cyan-400">BIO</span></span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal">
                  Enter your Login ID and password to access your Pro intelligence engine.
                </p>
              </div>

              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 rounded-2xl border border-red-300 dark:border-red-500/40 bg-red-50 dark:bg-red-500/10 p-3.5 text-xs text-red-800 dark:text-red-200"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
                  <span className="leading-relaxed font-medium">{error}</span>
                </motion.div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] font-mono">
                    Login ID / Email
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400 dark:text-[#64748B]" />
                    <input
                      data-testid="login-email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. member@kevalbio.ai"
                      className="w-full rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 pl-10 pr-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748B] focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] font-mono">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400 dark:text-[#64748B]" />
                    <input
                      data-testid="login-password-input"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 pl-10 pr-11 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748B] focus:border-cyan-500 dark:focus:border-cyan-400 focus:outline-none font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 text-slate-400 dark:text-[#64748B] hover:text-slate-700 dark:hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 dark:text-[#94A3B8]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 dark:border-[#1E293B] bg-slate-100 dark:bg-black/60 text-cyan-600 focus:ring-cyan-500"
                    />
                    <span>Remember me on this device (90 days)</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  data-testid="login-submit-button"
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 dark:bg-cyan-400 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white dark:text-black hover:bg-cyan-600 dark:hover:bg-cyan-300 transition-all shadow-md font-mono disabled:opacity-50"
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

              {/* Demo 1-Click Login Box */}
              <div className="border-t border-slate-200 dark:border-[#1E293B] pt-4 space-y-2.5">
                <div className="text-center text-[11px] text-slate-500 dark:text-[#64748B] font-mono">
                  — Evaluator Quick Access —
                </div>
                <button
                  type="button"
                  data-testid="demo-login-button"
                  onClick={handleDemoLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 py-3 text-xs font-bold text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all font-mono shadow-sm"
                >
                  <Sparkles className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <span>1-Click Test Login as Pro Subscriber</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Forgot Password View */
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 dark:border-cyan-400/30 bg-cyan-50 dark:bg-cyan-400/10 px-3 py-1 text-[11px] font-mono font-bold text-cyan-700 dark:text-cyan-300">
                  <span>Account Recovery</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                  Reset Your Password
                </h2>
                <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-normal">
                  Enter your registered email and we'll dispatch instant recovery instructions.
                </p>
              </div>

              {resetEmailSent ? (
                <div className="rounded-2xl border border-emerald-300 dark:border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/10 p-4 space-y-2 text-center">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <div className="font-bold text-xs text-emerald-900 dark:text-emerald-300">
                    Recovery Instructions Sent
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-[#94A3B8]">
                    We have dispatched password reset instructions to <strong>{email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setResetEmailSent(false);
                    }}
                    className="mt-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 underline"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] font-mono">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. member@kevalbio.ai"
                      className="w-full rounded-2xl border border-slate-300 dark:border-[#1E293B] bg-slate-50 dark:bg-black/60 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-[#64748B] focus:border-cyan-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-cyan-500 dark:bg-cyan-400 py-3.5 text-xs font-extrabold uppercase tracking-wider text-white dark:text-black font-mono shadow-md"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="text-xs text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-white"
                    >
                      Cancel and return to Login
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
