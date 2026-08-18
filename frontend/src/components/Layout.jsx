import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Compass, Dumbbell, Bookmark, Activity, UserRound,
  Crown, ChevronDown, Coffee, Utensils, Pill, FileText,
  Flame, Sun, Droplets, ArrowUpRight, Zap
} from "lucide-react";

const TOOLS_MENU = [
  { to: "/caffeine", label: "Caffeine & Sleep Simulator", desc: "Clearance curve & sleep cutoff", icon: Coffee, color: "text-amber-400" },
  { to: "/diet", label: "One-Line Meal Scanner", desc: "Instant micronutrient gap analysis", icon: Utensils, color: "text-emerald-400" },
  { to: "/tools/supplement-auditor", label: "Supplement Stack Auditor", desc: "Redundancy & blend analysis", icon: Pill, color: "text-pink-400" },
  { to: "/tools/lab-scanner", label: "Lab Report Scanner", desc: "Educational blood panel interpreter", icon: FileText, color: "text-cyan-400" },
  { to: "/tools/fasting", label: "Fasting & Metabolic Shift", desc: "Live AMPK vs mTOR phases", icon: Flame, color: "text-purple-400" },
  { to: "/tools/circadian", label: "Circadian Light & Cortisol", desc: "Morning lux & focus blocks", icon: Sun, color: "text-yellow-400" },
  { to: "/tools/hydration", label: "Sweat Rate & Hydration", desc: "Precision fluid & DIY recipe", icon: Droplets, color: "text-blue-400" },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [toolsOpen, setToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsOpen(false);
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
    <div className="min-h-screen bg-[#080B10] text-[#CBD5E1]">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-[#0E141D]/90 backdrop-blur-md border-b border-[#1E293B]">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <button
            data-testid="brand-logo"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
          >
            <span className="relative flex h-8 w-8 items-center justify-center border border-cyan-400/40 bg-cyan-400/5 rounded-lg">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/60 rounded-lg transition-colors" />
            </span>
            <div className="leading-none text-left">
              <span className="font-display text-lg font-bold tracking-tight text-white">
                KEVAL<span className="text-cyan-400">BIO</span>
              </span>
              <div className="text-[8px] uppercase tracking-[0.3em] text-[#64748B] mt-0.5 font-mono">
                Biology Intelligence
              </div>
            </div>
          </button>

          {/* Consolidated 5-Item Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {/* 1. Home */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-cyan-400" : "text-[#94A3B8] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-400" />
                  )}
                </span>
              )}
            </NavLink>

            {/* 2. Explore */}
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-cyan-400" : "text-[#94A3B8] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  <Compass className="h-4 w-4" />
                  <span>Explore</span>
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-400" />
                  )}
                </span>
              )}
            </NavLink>

            {/* 3. Coach */}
            <NavLink
              to="/coach"
              className={({ isActive }) =>
                `relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-cyan-400" : "text-[#94A3B8] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  <Dumbbell className="h-4 w-4" />
                  <span>Coach</span>
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-400" />
                  )}
                </span>
              )}
            </NavLink>

            {/* 4. Tools Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`relative px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1.5 rounded-xl ${
                  isToolsActive ? "text-cyan-400 bg-white/[0.04]" : "text-[#94A3B8] hover:text-white"
                }`}
              >
                <Zap className="h-4 w-4 text-cyan-400" />
                <span>Tools</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
                {isToolsActive && (
                  <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-400" />
                )}
              </button>

              <AnimatePresence>
                {toolsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-2 w-80 rounded-3xl border border-[#1E2E42] bg-[#0E141D] p-2.5 shadow-2xl backdrop-blur-xl z-50 space-y-1"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
                      <span>Interactive Suite</span>
                      <span className="text-cyan-400">7 Tools</span>
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
                          className="flex items-start gap-3 rounded-2xl p-2.5 text-left w-full hover:bg-white/[0.04] transition-all group"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-black/40 border border-[#1E293B]">
                            <Icon className={`h-4 w-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-xs text-white group-hover:text-cyan-300 transition-colors truncate">
                              {item.label}
                            </div>
                            <div className="text-[10px] text-[#64748B] truncate mt-0.5">
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
                `relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-cyan-400" : "text-[#94A3B8] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <span className="flex items-center gap-1.5">
                  <Bookmark className="h-4 w-4" />
                  <span>My KEVALBIO</span>
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-400" />
                  )}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Far Right: Pro Button & Avatar */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/pricing"
              className="flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 px-3.5 py-1.5 text-xs font-bold text-amber-300 hover:border-amber-400 hover:scale-105 transition-all shadow-[0_0_15px_rgba(245,158,11,0.25)]"
            >
              <Crown className="h-3.5 w-3.5 text-amber-400" />
              <span>Pro</span>
            </NavLink>

            <NavLink
              to="/profile"
              data-testid="nav-profile"
              className={({ isActive }) =>
                `flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                  isActive ? "border-cyan-400 text-cyan-400 bg-cyan-400/10" : "border-[#1E293B] text-[#94A3B8] hover:border-cyan-400/40 hover:text-white"
                }`
              }
            >
              <UserRound className="h-4 w-4" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Canvas Container */}
      <main className="mx-auto max-w-[1400px] px-4 pb-28 pt-6 sm:px-6 md:pb-12">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 bg-[#0E141D]/95 backdrop-blur-md border-t border-[#1E293B] md:hidden">
        {[
          { to: "/", label: "Home", icon: Home },
          { to: "/explore", label: "Explore", icon: Compass },
          { to: "/coach", label: "Coach", icon: Dumbbell },
          { to: "/tools/lab-scanner", label: "Tools", icon: Zap },
          { to: "/my-bio", label: "My Bio", icon: Bookmark }
        ].map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-cyan-400 font-bold" : "text-[#64748B] hover:text-white"
              }`
            }
          >
            <n.icon className="h-4 w-4" />
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
