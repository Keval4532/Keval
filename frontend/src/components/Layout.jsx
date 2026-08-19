import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Compass, Dumbbell, Bookmark, Activity, UserRound,
  Crown, ChevronDown, Coffee, Utensils, Pill, FileText,
  Flame, Sun, Moon, Droplets, ArrowUpRight, Zap, LogIn, LogOut,
  Sparkles, ShieldCheck, User, Settings
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import LoginModal from "./auth/LoginModal";
import CheckoutModal from "./monetization/CheckoutModal";
import AccountReadyModal from "./auth/AccountReadyModal";

const TOOLS_MENU = [
  { to: "/caffeine", label: "Caffeine & Sleep Simulator", desc: "Clearance curve & sleep cutoff", icon: Coffee, color: "text-amber-500 dark:text-amber-400" },
  { to: "/diet", label: "One-Line Meal Scanner", desc: "Instant micronutrient gap analysis", icon: Utensils, color: "text-emerald-500 dark:text-emerald-400" },
  { to: "/tools/supplement-auditor", label: "Supplement Stack Auditor", desc: "Redundancy & blend analysis", icon: Pill, color: "text-pink-500 dark:text-pink-400" },
  { to: "/tools/lab-scanner", label: "Lab Report Scanner", desc: "Educational blood panel interpreter", icon: FileText, color: "text-cyan-600 dark:text-cyan-400" },
  { to: "/tools/fasting", label: "Fasting & Metabolic Shift", desc: "Live AMPK vs mTOR phases", icon: Flame, color: "text-purple-500 dark:text-purple-400" },
  { to: "/tools/circadian", label: "Circadian Light & Cortisol", desc: "Morning lux & focus blocks", icon: Sun, color: "text-yellow-500 dark:text-yellow-400" },
  { to: "/tools/hydration", label: "Sweat Rate & Hydration", desc: "Precision fluid & DIY recipe", icon: Droplets, color: "text-blue-500 dark:text-blue-400" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    isPro,
    logout,
    openLoginModal,
    openCheckoutModal
  } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  const [toolsOpen, setToolsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isToolsActive = location.pathname.startsWith("/tools") ||
    location.pathname === "/caffeine" ||
    location.pathname === "/diet" ||
    location.pathname === "/stack";

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#080B10] text-[#0F172A] dark:text-[#CBD5E1] transition-colors duration-200 flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0E141D]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#1E293B]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          
          {/* Brand Logo */}
          <button
            data-testid="brand-logo"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
          >
            <span className="relative flex h-8 w-8 items-center justify-center border border-cyan-500/30 dark:border-cyan-400/40 bg-cyan-500/10 dark:bg-cyan-400/5 rounded-xl shadow-sm">
              <Activity className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/50 rounded-xl transition-colors" />
            </span>
            <div className="leading-none text-left">
              <span className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                KEVAL<span className="text-cyan-600 dark:text-cyan-400">BIO</span>
              </span>
              <div className="text-[8px] uppercase tracking-[0.25em] text-slate-500 dark:text-[#64748B] mt-0.5 font-mono font-semibold">
                Biology Intelligence
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {isAuthenticated ? (
              /* Authenticated Navigation */
              <>
                {/* 1. Home */}
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <Home className="h-4 w-4" />
                      <span>Home</span>
                      {isActive && (
                        <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-500 dark:bg-cyan-400" />
                      )}
                    </span>
                  )}
                </NavLink>

                {/* 2. Explore */}
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <Compass className="h-4 w-4" />
                      <span>Explore</span>
                      {isActive && (
                        <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-500 dark:bg-cyan-400" />
                      )}
                    </span>
                  )}
                </NavLink>

                {/* 3. Coach */}
                <NavLink
                  to="/coach"
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <Dumbbell className="h-4 w-4" />
                      <span>Coach</span>
                      {isActive && (
                        <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-500 dark:bg-cyan-400" />
                      )}
                    </span>
                  )}
                </NavLink>

                {/* 4. Tools Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setToolsOpen(!toolsOpen)}
                    className={`relative px-3.5 py-2 text-sm font-semibold transition-colors flex items-center gap-1.5 rounded-xl ${
                      isToolsActive ? "text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-white/[0.04]" : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white"
                    }`}
                  >
                    <Zap className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Tools</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                    {isToolsActive && (
                      <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-500 dark:bg-cyan-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {toolsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-80 rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-2.5 shadow-2xl backdrop-blur-xl z-50 space-y-1"
                      >
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#64748B] flex items-center justify-between font-mono">
                          <span>Interactive Suite</span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold">7 Tools</span>
                        </div>

                        {TOOLS_MENU.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.to}
                              onClick={() => {
                                navigate(item.to);
                                setToolsOpen(false);
                              }}
                              className="flex items-start gap-3 rounded-2xl p-2.5 text-left w-full hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all group"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-[#1E293B]">
                                <Icon className={`h-4 w-4 ${item.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                                  {item.label}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-[#64748B] truncate mt-0.5 font-medium">
                                  {item.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 5. My KEVALBIO */}
                <NavLink
                  to="/my-bio"
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <span className="flex items-center gap-1.5">
                      <Bookmark className="h-4 w-4" />
                      <span>My KEVALBIO</span>
                      {isActive && (
                        <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-500 dark:bg-cyan-400" />
                      )}
                    </span>
                  )}
                </NavLink>
              </>
            ) : (
              /* Public / Logged-Out Navigation */
              <>
                <button
                  onClick={() => {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Overview
                </button>

                <button
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      const el = document.getElementById("pricing-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white transition-colors"
                >
                  Live Demo
                </button>

                {/* Tools Dropdown in Public View */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setToolsOpen(!toolsOpen)}
                    className="px-3.5 py-2 text-sm font-semibold text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>Tools</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {toolsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-80 rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-2.5 shadow-2xl backdrop-blur-xl z-50 space-y-1"
                      >
                        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-[#64748B] flex items-center justify-between font-mono">
                          <span>Interactive Biology Suite</span>
                          <span className="text-cyan-600 dark:text-cyan-400 font-bold">7 Tools</span>
                        </div>

                        {TOOLS_MENU.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.to}
                              onClick={() => {
                                navigate(item.to);
                                setToolsOpen(false);
                              }}
                              className="flex items-start gap-3 rounded-2xl p-2.5 text-left w-full hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-all group"
                            >
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-[#1E293B]">
                                <Icon className={`h-4 w-4 ${item.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors truncate">
                                  {item.label}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-[#64748B] truncate mt-0.5 font-medium">
                                  {item.desc}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    `px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-[#94A3B8] hover:text-slate-950 dark:hover:text-white"
                    }`
                  }
                >
                  Pricing
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Theme Toggle Button (Light/Dark) */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle color theme"
              data-testid="theme-toggle-button"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:border-cyan-500/50 hover:bg-slate-200 dark:hover:bg-white/10 transition-all shadow-sm group"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="h-4 w-4 text-slate-700 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            {isAuthenticated ? (
              /* Authenticated User Menu */
              <div className="flex items-center gap-2.5">
                {/* Pro Badge */}
                {isPro && (
                  <span className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-extrabold text-amber-600 dark:text-amber-300 font-mono shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Crown className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                    <span>PRO</span>
                  </span>
                )}

                {/* User Dropdown */}
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    data-testid="nav-profile"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/40 bg-cyan-500/10 dark:bg-cyan-400/10 text-cyan-600 dark:text-cyan-300 hover:border-cyan-500 hover:scale-105 transition-all shadow-sm"
                  >
                    <UserRound className="h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-64 rounded-3xl border border-slate-200 dark:border-[#1E2E42] bg-white dark:bg-[#0E141D] p-3 shadow-2xl backdrop-blur-xl z-50 space-y-2"
                      >
                        <div className="px-3 py-2 border-b border-slate-200 dark:border-[#1E293B]">
                          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {user?.name || "Pro Member"}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-[#64748B] font-mono truncate mt-0.5">
                            {user?.email}
                          </div>
                          <div className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            <ShieldCheck className="h-3 w-3" />
                            <span>{user?.tier || "PRO_SUBSCRIBER"}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            navigate("/profile");
                            setProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white transition-colors"
                        >
                          <User className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                          <span>Goal Profile & Biology Stats</span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/my-bio");
                            setProfileMenuOpen(false);
                          }}
                          className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-950 dark:hover:text-white transition-colors"
                        >
                          <Bookmark className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                          <span>Saved Topics & Receipts</span>
                        </button>

                        <div className="border-t border-slate-200 dark:border-[#1E293B] pt-1">
                          <button
                            data-testid="logout-button"
                            onClick={() => {
                              setProfileMenuOpen(false);
                              logout();
                            }}
                            className="flex items-center gap-2.5 w-full rounded-xl px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            <span>Log Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Public / Logged-Out Action Buttons */
              <div className="flex items-center gap-2">
                {/* [Login] Button */}
                <button
                  data-testid="nav-login-button"
                  onClick={openLoginModal}
                  className="flex items-center gap-1.5 rounded-full border border-slate-300 dark:border-white/15 bg-white dark:bg-transparent px-3.5 py-1.5 text-xs font-bold text-slate-800 dark:text-white hover:border-cyan-500 hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm"
                >
                  <LogIn className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>Login</span>
                </button>

                {/* [Get Pro] Button */}
                <button
                  data-testid="nav-get-pro-button"
                  onClick={() => openCheckoutModal("PRO_ANNUAL")}
                  className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 px-4 py-1.5 text-xs font-extrabold text-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] font-mono"
                >
                  <Crown className="h-3.5 w-3.5" />
                  <span>Get Pro</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto max-w-[1400px] w-full px-4 pb-28 pt-6 sm:px-6 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 bg-white/95 dark:bg-[#0E141D]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#1E293B] md:hidden shadow-lg">
        {isAuthenticated
          ? [
              { to: "/", label: "Home", icon: Home },
              { to: "/explore", label: "Explore", icon: Compass },
              { to: "/coach", label: "Coach", icon: Dumbbell },
              { to: "/tools/lab-scanner", label: "Tools", icon: Zap },
              { to: "/my-bio", label: "My Bio", icon: Bookmark },
            ].map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                    isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-white"
                  }`
                }
              >
                <n.icon className="h-4 w-4" />
                <span>{n.label}</span>
              </NavLink>
            ))
          : [
              { to: "/", label: "Overview", icon: Home, action: null },
              { to: "/pricing", label: "Pricing", icon: Crown, action: null },
              { to: "/caffeine", label: "Caffeine", icon: Coffee, action: null },
              { to: "/diet", label: "Meals", icon: Utensils, action: null },
              { to: "#", label: "Login", icon: LogIn, action: openLoginModal },
            ].map((n, i) =>
              n.action ? (
                <button
                  key={i}
                  onClick={n.action}
                  className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold text-slate-500 dark:text-[#64748B] hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <n.icon className="h-4 w-4" />
                  <span>{n.label}</span>
                </button>
              ) : (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors ${
                      isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-500 dark:text-[#64748B] hover:text-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  <n.icon className="h-4 w-4" />
                  <span>{n.label}</span>
                </NavLink>
              )
            )}
      </nav>

      {/* Global Modals */}
      <LoginModal />
      <CheckoutModal />
      <AccountReadyModal />
    </div>
  );
}
