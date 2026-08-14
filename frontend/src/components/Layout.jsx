import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home, Compass, GitCompareArrows, FlaskConical, Stethoscope,
  Bookmark, Activity, LayoutDashboard, Dumbbell,
} from "lucide-react";

const NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/coach", label: "Coach", icon: Dumbbell },
  { to: "/compare", label: "Compare", icon: GitCompareArrows },
  { to: "/labs", label: "Labs", icon: FlaskConical },
  { to: "/symptoms", label: "Symptoms", icon: Stethoscope },
  { to: "/saved", label: "Saved", icon: Bookmark },
];

const MOBILE_NAV = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/coach", label: "Coach", icon: Dumbbell },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/saved", label: "Saved", icon: Bookmark },
];

export default function Layout({ children }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-[#FFFBF5]">
      {/* Top nav */}
      <header className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6">
          <button
            data-testid="brand-logo"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 group"
          >
            <span className="relative flex h-8 w-8 items-center justify-center border border-cyan-400/40 bg-cyan-400/5">
              <Activity className="h-4 w-4 text-cyan-400" />
              <span className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/60 transition-colors" />
            </span>
            <div className="leading-none">
              <span className="font-display text-lg font-bold tracking-tight">KEVAL<span className="text-cyan-400">BIO</span></span>
              <div className="text-[8px] uppercase tracking-[0.3em] text-white/35 mt-0.5">Understand your biology</div>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm transition-colors ${
                    isActive ? "text-cyan-400" : "text-white/55 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="flex items-center gap-1.5">
                    <n.icon className="h-3.5 w-3.5" />
                    {n.label}
                    {isActive && (
                      <motion.span layoutId="nav-underline" className="absolute -bottom-[1px] left-2 right-2 h-[2px] bg-cyan-400" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 pb-28 pt-6 sm:px-6 md:pb-12">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 glass border-t border-white/10 lg:hidden">
        {MOBILE_NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            data-testid={`bottomnav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[9px] ${
                isActive ? "text-cyan-400" : "text-white/50"
              }`
            }
          >
            <n.icon className="h-4 w-4" />
            {n.label.split(" ")[0]}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
